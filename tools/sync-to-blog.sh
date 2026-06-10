#!/usr/bin/env bash
#
# sync-to-blog.sh —— 把当前主题源码同步到本地 Hexo 博客的 themes 目录。
#
# 不再走 `git pull`：直接清空目标主题目录，再把本仓库的内容复制过去。
# 这样本地未提交的改动也能立刻在博客里预览。
#
# 用法：
#   tools/sync-to-blog.sh [目标主题目录]
#
# 目标目录解析顺序（前者优先）：
#   1. 命令行第一个参数
#   2. 环境变量 TESSERA_BLOG_THEME
#   3. 默认值 /mnt/CoreData/CodeSpace/Talyra42/tessera-blog/themes/tessera
#
# 选项：
#   -y, --yes     跳过删除确认
#   -h, --help    显示帮助
#
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEFAULT_TARGET="/mnt/CoreData/CodeSpace/Talyra42/tessera-blog/themes/tessera"

ASSUME_YES=0
TARGET=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    -y|--yes) ASSUME_YES=1; shift ;;
    -h|--help)
      awk 'NR==1 && /^#!/ {next} /^#/ {sub(/^# ?/,""); print; next} {exit}' "${BASH_SOURCE[0]}"
      exit 0 ;;
    -*) echo "未知选项：$1" >&2; exit 1 ;;
    *) TARGET="$1"; shift ;;
  esac
done

TARGET="${TARGET:-${TESSERA_BLOG_THEME:-$DEFAULT_TARGET}}"

# 这些文件/目录只属于开发仓库，不需要进博客
EXCLUDES=(
  ".git"
  "node_modules"
  "tools"
  ".github"
  ".vscode"
  "CLAUDE.md"
)

echo "源目录 : $REPO_ROOT"
echo "目标目录: $TARGET"

# 安全检查：目标路径必须看起来像一个主题目录，避免误删别的东西
parent_dir="$(dirname "$TARGET")"
if [[ ! -d "$parent_dir" ]]; then
  echo "✗ 目标的父目录不存在：$parent_dir" >&2
  echo "  请确认博客路径，或用参数 / TESSERA_BLOG_THEME 指定正确目录。" >&2
  exit 1
fi
case "$(basename "$parent_dir")" in
  themes) ;;
  *)
    echo "⚠ 目标父目录不是 'themes'（实际为 '$(basename "$parent_dir")'）。" >&2
    echo "  为防误删，请确认目标确实是 Hexo 主题目录。" >&2
    ;;
esac

if [[ "$ASSUME_YES" -ne 1 ]]; then
  read -r -p "将删除并重建 '$TARGET'，继续？[y/N] " reply
  case "$reply" in
    y|Y|yes|YES) ;;
    *) echo "已取消。"; exit 0 ;;
  esac
fi

echo "→ 清空目标目录…"
rm -rf "$TARGET"
mkdir -p "$TARGET"

echo "→ 复制主题文件…"
if command -v rsync >/dev/null 2>&1; then
  rsync_args=(-a)
  for e in "${EXCLUDES[@]}"; do
    rsync_args+=(--exclude="$e")
  done
  rsync "${rsync_args[@]}" "$REPO_ROOT/" "$TARGET/"
else
  # 回退方案：tar 管道，按 --exclude 排除
  tar_excludes=()
  for e in "${EXCLUDES[@]}"; do
    tar_excludes+=(--exclude="./$e")
  done
  tar -C "$REPO_ROOT" "${tar_excludes[@]}" -cf - . | tar -C "$TARGET" -xf -
fi

echo "✓ 同步完成：$TARGET"
echo "  接下来在博客根目录执行： hexo clean && hexo generate （或 hexo server）"
