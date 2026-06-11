# 标签插件

标签插件（Tag Plugin）是写在 Markdown 正文里的 `{% %}` 语法，用于插入主题提供的增强组件。下面列出 Tessera 内置的全部标签插件。

::: tip 参数分隔符
不同插件的参数分隔方式不同（有的用**逗号**，有的用**空格**），下文每个插件都已注明。带 `{% end... %}` 的是「闭合标签」，需要成对使用。
:::

## note 提示框

```markdown
{% note [class] [icon] [style] %}
这里是提示内容，支持 **Markdown**。
{% endnote %}
```

- 参数**空格分隔**，均可选：
  - `class` —— 颜色类，如 `info` / `success` / `warning` / `danger` 等（取决于你的样式约定）
  - `icon` —— Font Awesome 图标类（需以 `fa` 开头，如 `fa-solid fa-lightbulb`）
  - `style` —— `flat` / `modern` / `simple` / `disabled`，省略时用 [`note.style`](/config/reference#tag-plugins) 配置
- 别名：`{% subnote %}...{% endsubnote %}` 用法相同。

## tabs 选项卡

```markdown
{% tabs 名称,默认激活序号 %}
<!-- tab 标签一@fas fa-code -->
第一个选项卡的内容
<!-- endtab -->
<!-- tab 标签二 -->
第二个选项卡的内容
<!-- endtab -->
{% endtabs %}
```

- 第一参数是标签组名称（缺省 `tab`，用于自动命名未写标题的页签）；第二参数是默认激活的页签序号（从 1 开始，`0` 表示第一个）。
- 每个页签用 `<!-- tab 标题@图标类 -->` 开头、`<!-- endtab -->` 结尾；`@图标类` 可省略。

## timeline 时间线

```markdown
{% timeline 标题,颜色 %}
<!-- timeline 2026-01 起步 -->
项目立项。
<!-- endtimeline -->
<!-- timeline 2026-06 发布 -->
正式发布。
<!-- endtimeline -->
{% endtimeline %}
```

- 第一参数为时间线总标题（可选），第二参数为颜色 / 样式类（可选），**逗号分隔**。
- 每个节点用 `<!-- timeline 节点标题 -->` 与 `<!-- endtimeline -->` 包裹。

## btn 按钮

```markdown
{% btn 链接,文字,图标,选项 %}
```

- 参数**逗号分隔**：`url,text,icon,option`，均可选。
- `option` 可组合：颜色（`default`/`blue`/`pink`/`red`/`purple`/`orange`/`green`）、`outline`、`center`、`block`、`larger`。

示例：

```markdown
{% btn https://github.com,访问 GitHub,fab fa-github,blue %}
{% btn /about/,了解更多,,center larger %}
```

## label 文字高亮

```markdown
{% label 文字 颜色类 %}
```

- 参数**空格分隔**：第一个是文字，第二个是颜色类（缺省 `default`）。
- 渲染为 `<mark>` 高亮，常用类如 `default` / `blue` / `pink` / `red` / `green`（取决于样式约定）。

## hide 隐藏 / 折叠

三种形式，参数均**逗号分隔**：

```markdown
<!-- 行内隐藏：点击按钮显示内容 -->
{% hideInline 被隐藏的内容,按钮文字,背景色,文字色 %}

<!-- 块级隐藏 -->
{% hideBlock 按钮文字,背景色,文字色 %}
这里是被隐藏的 **Markdown** 内容。
{% endhideBlock %}

<!-- 折叠开关 -->
{% hideToggle 按钮文字,背景色,文字色 %}
折叠内容。
{% endhideToggle %}
```

- `hideInline` 的内容里若要用引号，请用 `&apos;` 转义。
- 背景色、文字色可省略。

## inlineImg 行内图片

```markdown
这是一段文字 {% inlineImg /img/icon.png 1.2em %} 后面继续。
```

- 参数**空格分隔**：第一个是图片路径，第二个是高度（可选，CSS 值，如 `24px` / `1.2em`）。

## gallery 相册

两种用法：

```markdown
<!-- 用法一：内联 Markdown 图片 -->
{% gallery 是否显示按钮,总数上限,首屏数量 %}
![](/img/1.jpg)
![](/img/2.jpg)
{% endgallery %}

<!-- 用法二：从外部 JSON 读取 -->
{% gallery url,/data/photos.json,是否显示按钮 %}
```

配套的 `galleryGroup` 用于做相册入口卡（参数**空格分隔**）：

```markdown
{% galleryGroup 相册名 描述 链接 封面图 %}
```

## flink 友链卡片 {#flink}

在任意文章内联渲染友链卡片，内容为 YAML：

```markdown
{% flink %}
- class_name: 朋友们
  class_desc: 分组描述
  link_list:
    - name: 示例博客
      link: https://example.com
      avatar: https://example.com/avatar.png
      descr: 一句话介绍
{% endflink %}
```

> 若要做整页友链墙，见[特色页面 · 友链页](/guide/pages#flink)。

## series 系列

列出与当前文章同一系列的全部文章。需先开启 [`series.enable`](/config/reference#tag-plugins)，并在文章 front-matter 写 `series: 系列名`。

```markdown
{% series %}            <!-- 当前文章所属系列 -->
{% series 某系列名 %}    <!-- 指定系列 -->
```

## mermaid 流程图

需开启 [`mermaid.enable`](/config/reference#tag-plugins)。

```markdown
{% mermaid %}
graph LR
  A[开始] --> B{判断}
  B -->|是| C[继续]
  B -->|否| D[结束]
{% endmermaid %}
```

第一参数可传一段 JSON 配置（可选）。也可通过 `mermaid.code_write: true` 直接用代码块书写 mermaid。

## chartjs 图表

需开启 [`chartjs.enable`](/config/reference#tag-plugins)。

```markdown
{% chartjs 宽度,是否并排,图表ID %}
<!-- chart -->
{ "type": "bar", "data": { "labels": ["A","B"], "datasets": [{ "data": [3,5] }] } }
<!-- endchart -->
<!-- desc -->
图表说明文字（可选，Markdown）。
<!-- enddesc -->
{% endchartjs %}
```

- 参数**逗号分隔**，均可选：宽度（百分比）、是否与说明并排（`true`/`false`）、自定义图表 ID。
- `<!-- chart -->` 区块是必填的 Chart.js 配置（JSON）。

## score 乐谱

需开启 [`abcjs.enable`](/config/reference#tag-plugins)，使用 [ABC 记谱法](https://abcnotation.com/)。

```markdown
{% score %}
{"scale": 1.1}
------
T: 示例曲
M: 4/4
L: 1/8
K: C
CDEF GABc|
{% endscore %}
```

- 用 `------`（六个连字符）分隔：上半部分是 JSON 参数（可选），下半部分是 ABC 记谱内容。
- 不写分隔符时，整段都当作记谱内容。
