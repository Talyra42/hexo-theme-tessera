#!/usr/bin/env bash
#
# release.sh —— 发布主题新版本并创建 GitHub Release。
#
# 流程：
#   1. 校验：在 main 分支、工作区干净、已安装 gh 并登录。
#   2. 确定版本号（参数指定，或在 package.json 当前版本上递增）。
#   3. 更新 package.json 的 version，提交 "chore(release): vX.Y.Z"。
#   4. 打 tag vX.Y.Z 并推送 main 与 tag。
#   5. 用 git archive 打包主题 zip（仅含已跟踪文件，不含 .git）。
#   6. gh release create 创建 Release，自动生成说明，并附带 zip。
#
# 用法：
#   tools/release.sh                 # 用 package.json 里当前的版本号发布
#   tools/release.sh patch           # 1.0.0 -> 1.0.1
#   tools/release.sh minor           # 1.0.0 -> 1.1.0
#   tools/release.sh major           # 1.0.0 -> 2.0.0
#   tools/release.sh 1.4.2           # 指定明确版本号
#
# 选项：
#   -d, --draft     创建草稿 Release（不直接公开）
#   -y, --yes       跳过确认
#   -h, --help      显示帮助
#
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

DRAFT=0
ASSUME_YES=0
BUMP=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    -d|--draft) DRAFT=1; shift ;;
    -y|--yes) ASSUME_YES=1; shift ;;
    -h|--help)
      awk 'NR==1 && /^#!/ {next} /^#/ {sub(/^# ?/,""); print; next} {exit}' "${BASH_SOURCE[0]}"
      exit 0 ;;
    -*) echo "未知选项：$1" >&2; exit 1 ;;
    *) BUMP="$1"; shift ;;
  esac
done

die() { echo "✗ $*" >&2; exit 1; }

# --- 1. 校验环境 ---
command -v gh >/dev/null 2>&1 || die "未找到 gh（GitHub CLI），请先安装：https://cli.github.com/"
command -v node >/dev/null 2>&1 || die "未找到 node。"
gh auth status >/dev/null 2>&1 || die "gh 未登录，请先执行：gh auth login"

branch="$(git rev-parse --abbrev-ref HEAD)"
[[ "$branch" == "main" ]] || die "当前在 '$branch' 分支，请切到 main 再发布。"
[[ -z "$(git status --porcelain)" ]] || die "工作区有未提交改动，请先提交或暂存。"

# --- 2. 确定版本号 ---
current="$(node -p "require('./package.json').version")"

compute_bump() {
  node -e '
    const [cur, kind] = process.argv.slice(1)
    let [a, b, c] = cur.split(".").map(Number)
    if (kind === "major") { a++; b = 0; c = 0 }
    else if (kind === "minor") { b++; c = 0 }
    else if (kind === "patch") { c++ }
    else process.exit(2)
    console.log(`${a}.${b}.${c}`)
  ' "$1" "$2"
}

case "$BUMP" in
  "")                 new_version="$current" ;;
  major|minor|patch)  new_version="$(compute_bump "$current" "$BUMP")" ;;
  [0-9]*.[0-9]*.[0-9]*) new_version="$BUMP" ;;
  *) die "无法识别的版本参数：'$BUMP'（应为 patch/minor/major 或 X.Y.Z）" ;;
esac

tag="v$new_version"

# tag 不能已存在
if git rev-parse "$tag" >/dev/null 2>&1; then
  die "tag $tag 已存在。"
fi
if gh release view "$tag" >/dev/null 2>&1; then
  die "GitHub 上已存在 Release $tag。"
fi

echo "当前版本: $current"
echo "发布版本: $new_version  (tag: $tag)"
[[ "$DRAFT" -eq 1 ]] && echo "模式    : 草稿 (draft)"

if [[ "$ASSUME_YES" -ne 1 ]]; then
  read -r -p "确认发布？[y/N] " reply
  case "$reply" in y|Y|yes|YES) ;; *) echo "已取消。"; exit 0 ;; esac
fi

# --- 3. 更新 package.json 并提交（仅当版本有变化）---
if [[ "$new_version" != "$current" ]]; then
  node -e '
    const fs = require("fs"), p = "./package.json"
    const j = JSON.parse(fs.readFileSync(p, "utf8"))
    j.version = process.argv[1]
    fs.writeFileSync(p, JSON.stringify(j, null, 2) + "\n")
  ' "$new_version"
  git add package.json
  git commit -m "chore(release): $tag"
  echo "→ 已更新 package.json 并提交。"
fi

# --- 4. 打 tag 并推送 ---
git tag -a "$tag" -m "$tag"
echo "→ 推送 main 与 tag…"
git push origin main
git push origin "$tag"

# --- 5. 打包主题 zip（仅已跟踪文件）---
dist_dir="$REPO_ROOT/dist"
mkdir -p "$dist_dir"
zip_path="$dist_dir/tessera-$tag.zip"
git archive --format=zip --prefix="tessera/" -o "$zip_path" "$tag"
echo "→ 已生成压缩包：$zip_path"

# --- 6. 创建 GitHub Release ---
gh_args=("$tag" "$zip_path" --title "$tag" --generate-notes)
[[ "$DRAFT" -eq 1 ]] && gh_args+=(--draft)

echo "→ 创建 GitHub Release…"
gh release create "${gh_args[@]}"

echo "✓ 发布完成：$tag"
gh release view "$tag" --web >/dev/null 2>&1 || true
