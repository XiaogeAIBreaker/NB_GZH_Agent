/**
 * 公众号文章样式主题
 */

export interface Theme {
  id: string
  name: string
  description: string
  styles: string
  preview?: string
}

export const themes: Theme[] = [
  {
    id: 'minimal-black',
    name: '极简黑',
    description: '简洁大方的黑白配色，适合技术文章',
    styles: `
      /* 极简黑主题 */
      .wechat-article {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 16px;
        line-height: 1.8;
        color: #333;
        word-break: break-word;
      }
      
      .wechat-article h1 {
        font-size: 24px;
        font-weight: bold;
        margin: 30px 0 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #000;
        color: #000;
      }
      
      .wechat-article h2 {
        font-size: 20px;
        font-weight: bold;
        margin: 25px 0 15px;
        padding-left: 10px;
        border-left: 4px solid #000;
        color: #000;
      }
      
      .wechat-article h3 {
        font-size: 18px;
        font-weight: bold;
        margin: 20px 0 10px;
        color: #000;
      }
      
      .wechat-article p {
        margin: 15px 0;
        text-align: justify;
      }
      
      .wechat-article blockquote {
        margin: 20px 0;
        padding: 15px 20px;
        background: #f5f5f5;
        border-left: 4px solid #333;
        color: #666;
      }
      
      .wechat-article code {
        padding: 2px 4px;
        background: #f0f0f0;
        border-radius: 3px;
        font-family: "Courier New", Courier, monospace;
        font-size: 14px;
        color: #d63384;
      }
      
      .wechat-article pre {
        margin: 20px 0;
        padding: 15px;
        background: #1e1e1e;
        border-radius: 5px;
        overflow-x: auto;
      }
      
      .wechat-article pre code {
        background: none;
        color: #f8f8f2;
        padding: 0;
      }
      
      .wechat-article ul, .wechat-article ol {
        margin: 15px 0;
        padding-left: 30px;
      }
      
      .wechat-article li {
        margin: 8px 0;
      }
      
      .wechat-article a {
        color: #000;
        text-decoration: underline;
      }
      
      .wechat-article img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 20px auto;
        border-radius: 5px;
      }
      
      .wechat-article table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      
      .wechat-article th, .wechat-article td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
      }
      
      .wechat-article th {
        background: #f5f5f5;
        font-weight: bold;
      }
      
      .wechat-article hr {
        border: none;
        border-top: 1px solid #ddd;
        margin: 30px 0;
      }
    `
  },
  {
    id: 'warm-orange',
    name: '暖阳橙',
    description: '温暖活泼的橙色调，适合生活类文章',
    styles: `
      /* 暖阳橙主题 */
      .wechat-article {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 16px;
        line-height: 1.8;
        color: #333;
        word-break: break-word;
      }
      
      .wechat-article h1 {
        font-size: 24px;
        font-weight: bold;
        margin: 30px 0 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #ff6b35;
        color: #ff6b35;
      }
      
      .wechat-article h2 {
        font-size: 20px;
        font-weight: bold;
        margin: 25px 0 15px;
        padding-left: 10px;
        border-left: 4px solid #ff6b35;
        color: #ff6b35;
      }
      
      .wechat-article h3 {
        font-size: 18px;
        font-weight: bold;
        margin: 20px 0 10px;
        color: #ff8c61;
      }
      
      .wechat-article p {
        margin: 15px 0;
        text-align: justify;
      }
      
      .wechat-article blockquote {
        margin: 20px 0;
        padding: 15px 20px;
        background: #fff5f0;
        border-left: 4px solid #ff6b35;
        color: #666;
        font-style: italic;
      }
      
      .wechat-article code {
        padding: 2px 4px;
        background: #fff5f0;
        border-radius: 3px;
        font-family: "Courier New", Courier, monospace;
        font-size: 14px;
        color: #ff6b35;
      }
      
      .wechat-article pre {
        margin: 20px 0;
        padding: 15px;
        background: #2d2d2d;
        border-radius: 5px;
        overflow-x: auto;
      }
      
      .wechat-article pre code {
        background: none;
        color: #f8f8f2;
        padding: 0;
      }
      
      .wechat-article ul, .wechat-article ol {
        margin: 15px 0;
        padding-left: 30px;
      }
      
      .wechat-article li {
        margin: 8px 0;
      }
      
      .wechat-article li::marker {
        color: #ff6b35;
      }
      
      .wechat-article a {
        color: #ff6b35;
        text-decoration: none;
        border-bottom: 1px solid #ff6b35;
      }
      
      .wechat-article img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 20px auto;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      
      .wechat-article table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      
      .wechat-article th, .wechat-article td {
        border: 1px solid #ffddcc;
        padding: 10px;
        text-align: left;
      }
      
      .wechat-article th {
        background: #fff5f0;
        font-weight: bold;
        color: #ff6b35;
      }
      
      .wechat-article hr {
        border: none;
        border-top: 1px solid #ffddcc;
        margin: 30px 0;
      }
    `
  },
  {
    id: 'fresh-green',
    name: '清新绿',
    description: '清新自然的绿色调，适合健康环保类文章',
    styles: `
      /* 清新绿主题 */
      .wechat-article {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 16px;
        line-height: 1.8;
        color: #333;
        word-break: break-word;
      }
      
      .wechat-article h1 {
        font-size: 24px;
        font-weight: bold;
        margin: 30px 0 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #52c41a;
        color: #52c41a;
      }
      
      .wechat-article h2 {
        font-size: 20px;
        font-weight: bold;
        margin: 25px 0 15px;
        padding-left: 10px;
        border-left: 4px solid #52c41a;
        color: #52c41a;
      }
      
      .wechat-article h3 {
        font-size: 18px;
        font-weight: bold;
        margin: 20px 0 10px;
        color: #73d13d;
      }
      
      .wechat-article p {
        margin: 15px 0;
        text-align: justify;
      }
      
      .wechat-article blockquote {
        margin: 20px 0;
        padding: 15px 20px;
        background: #f6ffed;
        border-left: 4px solid #52c41a;
        color: #666;
      }
      
      .wechat-article code {
        padding: 2px 4px;
        background: #f6ffed;
        border-radius: 3px;
        font-family: "Courier New", Courier, monospace;
        font-size: 14px;
        color: #52c41a;
      }
      
      .wechat-article pre {
        margin: 20px 0;
        padding: 15px;
        background: #2d2d2d;
        border-radius: 5px;
        overflow-x: auto;
      }
      
      .wechat-article pre code {
        background: none;
        color: #f8f8f2;
        padding: 0;
      }
      
      .wechat-article ul, .wechat-article ol {
        margin: 15px 0;
        padding-left: 30px;
      }
      
      .wechat-article li {
        margin: 8px 0;
      }
      
      .wechat-article li::marker {
        color: #52c41a;
      }
      
      .wechat-article a {
        color: #52c41a;
        text-decoration: none;
        border-bottom: 1px solid #52c41a;
      }
      
      .wechat-article img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 20px auto;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      
      .wechat-article table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      
      .wechat-article th, .wechat-article td {
        border: 1px solid #d9f7be;
        padding: 10px;
        text-align: left;
      }
      
      .wechat-article th {
        background: #f6ffed;
        font-weight: bold;
        color: #52c41a;
      }
      
      .wechat-article hr {
        border: none;
        border-top: 1px solid #d9f7be;
        margin: 30px 0;
      }
    `
  },
  {
    id: 'elegant-purple',
    name: '典雅紫',
    description: '优雅神秘的紫色调，适合文艺类文章',
    styles: `
      /* 典雅紫主题 */
      .wechat-article {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 16px;
        line-height: 1.8;
        color: #333;
        word-break: break-word;
      }
      
      .wechat-article h1 {
        font-size: 24px;
        font-weight: bold;
        margin: 30px 0 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #722ed1;
        color: #722ed1;
      }
      
      .wechat-article h2 {
        font-size: 20px;
        font-weight: bold;
        margin: 25px 0 15px;
        padding-left: 10px;
        border-left: 4px solid #722ed1;
        color: #722ed1;
      }
      
      .wechat-article h3 {
        font-size: 18px;
        font-weight: bold;
        margin: 20px 0 10px;
        color: #9254de;
      }
      
      .wechat-article p {
        margin: 15px 0;
        text-align: justify;
      }
      
      .wechat-article blockquote {
        margin: 20px 0;
        padding: 15px 20px;
        background: #f9f0ff;
        border-left: 4px solid #722ed1;
        color: #666;
        font-style: italic;
      }
      
      .wechat-article code {
        padding: 2px 4px;
        background: #f9f0ff;
        border-radius: 3px;
        font-family: "Courier New", Courier, monospace;
        font-size: 14px;
        color: #722ed1;
      }
      
      .wechat-article pre {
        margin: 20px 0;
        padding: 15px;
        background: #2d2d2d;
        border-radius: 5px;
        overflow-x: auto;
      }
      
      .wechat-article pre code {
        background: none;
        color: #f8f8f2;
        padding: 0;
      }
      
      .wechat-article ul, .wechat-article ol {
        margin: 15px 0;
        padding-left: 30px;
      }
      
      .wechat-article li {
        margin: 8px 0;
      }
      
      .wechat-article li::marker {
        color: #722ed1;
      }
      
      .wechat-article a {
        color: #722ed1;
        text-decoration: none;
        border-bottom: 1px solid #722ed1;
      }
      
      .wechat-article img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 20px auto;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      
      .wechat-article table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      
      .wechat-article th, .wechat-article td {
        border: 1px solid #efdbff;
        padding: 10px;
        text-align: left;
      }
      
      .wechat-article th {
        background: #f9f0ff;
        font-weight: bold;
        color: #722ed1;
      }
      
      .wechat-article hr {
        border: none;
        border-top: 1px solid #efdbff;
        margin: 30px 0;
      }
    `
  },
  {
    id: 'tech-blue',
    name: '科技蓝',
    description: '专业冷静的蓝色调，适合技术和商务文章',
    styles: `
      /* 科技蓝主题 */
      .wechat-article {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 16px;
        line-height: 1.8;
        color: #333;
        word-break: break-word;
      }
      
      .wechat-article h1 {
        font-size: 24px;
        font-weight: bold;
        margin: 30px 0 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #1890ff;
        color: #1890ff;
      }
      
      .wechat-article h2 {
        font-size: 20px;
        font-weight: bold;
        margin: 25px 0 15px;
        padding-left: 10px;
        border-left: 4px solid #1890ff;
        color: #1890ff;
      }
      
      .wechat-article h3 {
        font-size: 18px;
        font-weight: bold;
        margin: 20px 0 10px;
        color: #40a9ff;
      }
      
      .wechat-article p {
        margin: 15px 0;
        text-align: justify;
      }
      
      .wechat-article blockquote {
        margin: 20px 0;
        padding: 15px 20px;
        background: #e6f7ff;
        border-left: 4px solid #1890ff;
        color: #666;
      }
      
      .wechat-article code {
        padding: 2px 4px;
        background: #e6f7ff;
        border-radius: 3px;
        font-family: "Courier New", Courier, monospace;
        font-size: 14px;
        color: #1890ff;
      }
      
      .wechat-article pre {
        margin: 20px 0;
        padding: 15px;
        background: #001529;
        border-radius: 5px;
        overflow-x: auto;
      }
      
      .wechat-article pre code {
        background: none;
        color: #f8f8f2;
        padding: 0;
      }
      
      .wechat-article ul, .wechat-article ol {
        margin: 15px 0;
        padding-left: 30px;
      }
      
      .wechat-article li {
        margin: 8px 0;
      }
      
      .wechat-article li::marker {
        color: #1890ff;
      }
      
      .wechat-article a {
        color: #1890ff;
        text-decoration: none;
        border-bottom: 1px solid #1890ff;
      }
      
      .wechat-article img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 20px auto;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      
      .wechat-article table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      
      .wechat-article th, .wechat-article td {
        border: 1px solid #bae7ff;
        padding: 10px;
        text-align: left;
      }
      
      .wechat-article th {
        background: #e6f7ff;
        font-weight: bold;
        color: #1890ff;
      }
      
      .wechat-article hr {
        border: none;
        border-top: 1px solid #bae7ff;
        margin: 30px 0;
      }
    `
  }
]

export function getThemeById(id: string): Theme | undefined {
  return themes.find(theme => theme.id === id)
}

export function applyTheme(html: string, themeId: string): string {
  const theme = getThemeById(themeId)
  if (!theme) return html
  
  return `
    <style>${theme.styles}</style>
    <div class="wechat-article">
      ${html}
    </div>
  `
}