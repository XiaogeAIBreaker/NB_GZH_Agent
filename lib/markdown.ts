/**
 * Markdown 处理工具
 */

import MarkdownIt from 'markdown-it'

// 初始化 markdown-it
const md = new MarkdownIt({
  html: true,        // 允许 HTML 标签
  xhtmlOut: true,    // 使用 XHTML 格式输出
  breaks: true,      // 转换换行符为 <br>
  linkify: true,     // 自动转换 URL 为链接
  typographer: false, // 关闭智能引号，避免影响星号处理
  highlight: function (str: string, lang: string) {
    // 代码高亮处理（可以集成 Prism.js 或其他高亮库）
    return `<pre class="language-${lang}"><code>${escapeHtml(str)}</code></pre>`
  }
})

// HTML 转义函数
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * 将 Markdown 转换为 HTML
 */
export function markdownToHtml(markdown: string): string {
  const html = md.render(markdown)
  return html
}

/**
 * 预处理 Markdown（处理特殊格式）
 */
export function preprocessMarkdown(markdown: string): string {
  // 处理居中文本（公众号常用）
  markdown = markdown.replace(
    /:::\s*center\s*\n([\s\S]*?)\n:::/g,
    '<div style="text-align: center;">$1</div>'
  )
  
  // 处理文字颜色
  markdown = markdown.replace(
    /\{color:(#[0-9a-fA-F]{3,6}|[a-z]+)\}(.*?)\{\/color\}/g,
    '<span style="color: $1;">$2</span>'
  )
  
  // 处理文字大小
  markdown = markdown.replace(
    /\{size:(\d+(?:px|em|rem)?)\}(.*?)\{\/size\}/g,
    '<span style="font-size: $1;">$2</span>'
  )
  
  return markdown
}

/**
 * 后处理 HTML（优化公众号显示）
 */
export function postprocessHtml(html: string): string {
  // 为图片添加样式
  html = html.replace(
    /<img([^>]*)>/g,
    '<img$1 style="max-width: 100%; height: auto; display: block; margin: 20px auto; border-radius: 8px;">'
  )
  
  // 为表格添加样式
  html = html.replace(
    /<table([^>]*)>/g,
    '<table$1 style="width: 100%; border-collapse: collapse; margin: 20px 0;">'
  )
  
  html = html.replace(
    /<th([^>]*)>/g,
    '<th$1 style="border: 1px solid #ddd; padding: 10px; text-align: left; background: #f5f5f5; font-weight: bold; vertical-align: top;">'
  )
  
  html = html.replace(
    /<td([^>]*)>/g,
    '<td$1 style="border: 1px solid #ddd; padding: 10px; text-align: left; vertical-align: top;">'
  )
  
  // 为代码块添加样式
  html = html.replace(
    /<pre([^>]*)>/g,
    '<pre$1 style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 5px; overflow-x: auto;">'
  )
  
  html = html.replace(
    /<code([^>]*)>/g,
    '<code$1 style="font-family: \'Courier New\', Courier, monospace; font-size: 14px;">'
  )
  
  // 处理行内代码
  html = html.replace(
    /<code([^>]*?)>([^<]*?)<\/code>(?![^<]*<\/pre>)/g,
    '<code$1 style="padding: 2px 4px; background: #f0f0f0; border-radius: 3px; color: #d63384;">$2</code>'
  )
  
  return html
}

/**
 * 完整的转换流程
 */
export function convertMarkdownToWechat(markdown: string): string {
  // 1. 预处理 Markdown
  const processedMarkdown = preprocessMarkdown(markdown)
  
  // 2. 转换为 HTML
  let html = markdownToHtml(processedMarkdown)
  
  // 3. 后处理 HTML
  html = postprocessHtml(html)
  
  return html
}

/**
 * 提取文章摘要
 */
export function extractSummary(markdown: string, length: number = 100): string {
  // 移除 Markdown 语法
  const plainText = markdown
    .replace(/#{1,6}\s+/g, '') // 移除标题
    .replace(/\*\*([^*]+)\*\*/g, '$1') // 移除加粗
    .replace(/\*([^*]+)\*/g, '$1') // 移除斜体
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // 移除图片
    .replace(/`([^`]+)`/g, '$1') // 移除行内代码
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/>\s+/g, '') // 移除引用
    .replace(/[-*+]\s+/g, '') // 移除列表标记
    .replace(/\n{2,}/g, ' ') // 将多个换行替换为空格
    .trim()
  
  // 截取指定长度
  if (plainText.length <= length) {
    return plainText
  }
  
  return plainText.substring(0, length) + '...'
}

/**
 * 统计字数
 */
export function countWords(markdown: string): number {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/`[^`]+`/g, '') // 移除行内代码
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // 移除图片
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 保留链接文本
  
  // 统计中文字符
  const chineseChars = plainText.match(/[\u4e00-\u9fa5]/g) || []
  
  // 统计英文单词
  const englishWords = plainText
    .replace(/[\u4e00-\u9fa5]/g, ' ') // 移除中文字符
    .split(/\s+/)
    .filter(word => word.length > 0)
  
  return chineseChars.length + englishWords.length
}