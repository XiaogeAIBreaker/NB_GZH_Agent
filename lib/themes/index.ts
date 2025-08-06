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
  },
  {
    id: 'gradient-rainbow',
    name: '🌈 渐变彩虹',
    description: '炫彩渐变效果，充满活力与创意',
    styles: `
      /* 渐变彩虹主题 */
      .wechat-article {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 16px;
        line-height: 1.9;
        color: #2c3e50;
        word-break: break-word;
        background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,192,203,0.05) 50%, rgba(255,255,255,0) 100%);
      }
      
      .wechat-article h1 {
        font-size: 28px;
        font-weight: bold;
        margin: 35px 0 25px;
        padding: 15px 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-align: center;
        position: relative;
      }
      
      .wechat-article h1::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
        border-radius: 2px;
      }
      
      .wechat-article h2 {
        font-size: 22px;
        font-weight: bold;
        margin: 30px 0 18px;
        padding: 12px 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
      }
      
      .wechat-article h3 {
        font-size: 19px;
        font-weight: bold;
        margin: 25px 0 12px;
        padding-left: 15px;
        border-left: 5px solid;
        border-image: linear-gradient(180deg, #667eea, #764ba2) 1;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .wechat-article p {
        margin: 18px 0;
        text-align: justify;
        line-height: 1.9;
      }
      
      .wechat-article blockquote {
        margin: 25px 0;
        padding: 20px 25px;
        background: linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%);
        border-left: 5px solid;
        border-image: linear-gradient(180deg, #667eea, #764ba2) 1;
        color: #555;
        font-style: italic;
        border-radius: 8px;
        position: relative;
      }
      
      .wechat-article blockquote::before {
        content: '"';
        position: absolute;
        top: -10px;
        left: 15px;
        font-size: 50px;
        color: rgba(102,126,234,0.3);
      }
      
      .wechat-article code {
        padding: 3px 8px;
        background: linear-gradient(135deg, rgba(102,126,234,0.15) 0%, rgba(118,75,162,0.15) 100%);
        border-radius: 5px;
        font-family: "Courier New", Courier, monospace;
        font-size: 14px;
        color: #764ba2;
      }
      
      .wechat-article pre {
        margin: 25px 0;
        padding: 20px;
        background: linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%);
        border-radius: 10px;
        overflow-x: auto;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        border: 1px solid rgba(102,126,234,0.3);
      }
      
      .wechat-article pre code {
        background: none;
        color: #f8f8f2;
        padding: 0;
      }
      
      .wechat-article ul, .wechat-article ol {
        margin: 18px 0;
        padding-left: 35px;
      }
      
      .wechat-article li {
        margin: 10px 0;
        position: relative;
      }
      
      .wechat-article li::marker {
        color: #667eea;
        font-weight: bold;
      }
      
      .wechat-article a {
        color: #667eea;
        text-decoration: none;
        position: relative;
        font-weight: 500;
        transition: all 0.3s ease;
      }
      
      .wechat-article a::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        transition: width 0.3s ease;
      }
      
      .wechat-article a:hover::after {
        width: 100%;
      }
      
      .wechat-article img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 25px auto;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(102,126,234,0.2);
      }
      
      .wechat-article table {
        width: 100%;
        border-collapse: collapse;
        margin: 25px 0;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      }
      
      .wechat-article th {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 12px;
        text-align: left;
        font-weight: bold;
      }
      
      .wechat-article td {
        border: 1px solid rgba(102,126,234,0.2);
        padding: 12px;
        text-align: left;
      }
      
      .wechat-article tr:nth-child(even) {
        background: rgba(102,126,234,0.05);
      }
      
      .wechat-article hr {
        border: none;
        height: 2px;
        background: linear-gradient(90deg, transparent, #667eea, #764ba2, transparent);
        margin: 35px 0;
      }
    `
  },
  {
    id: 'cyberpunk',
    name: '🤖 赛博朋克',
    description: '赛博朋克风格，霓虹紫粉配色（公众号兼容版）',
    styles: `
      /* 赛博朋克主题 - 公众号兼容版 */
      .wechat-article {
        font-family: 'Courier New', Courier, monospace;
        font-size: 16px;
        line-height: 1.8;
        color: #333;
        word-break: break-word;
      }
      
      .wechat-article h1 {
        font-size: 28px;
        font-weight: bold;
        margin: 30px 0 20px;
        padding: 15px 20px;
        color: #ff1493;
        text-transform: uppercase;
        letter-spacing: 2px;
        text-align: center;
        border: 3px solid #ff1493;
        border-radius: 8px;
      }
      
      .wechat-article h2 {
        font-size: 22px;
        font-weight: bold;
        margin: 25px 0 15px;
        padding: 12px 15px;
        color: #00bfff;
        border: 2px solid #00bfff;
        border-radius: 6px;
        background: #f0f8ff;
      }
      
      .wechat-article h3 {
        font-size: 19px;
        font-weight: bold;
        margin: 20px 0 12px;
        padding-left: 15px;
        color: #9932cc;
        border-left: 4px solid #9932cc;
      }
      
      .wechat-article h3::before {
        content: '▶ ';
        color: #00bfff;
        font-weight: bold;
      }
      
      .wechat-article p {
        margin: 15px 0;
        text-align: justify;
        color: #333;
      }
      
      .wechat-article blockquote {
        margin: 25px 0;
        padding: 15px 20px;
        background: #f5f0ff;
        border-left: 4px solid #9932cc;
        border-right: 2px solid #00bfff;
        color: #555;
        font-style: italic;
      }
      
      .wechat-article blockquote::before {
        content: '// ';
        font-size: 16px;
        color: #9932cc;
        font-weight: bold;
      }
      
      .wechat-article code {
        padding: 2px 6px;
        background: #e0f7ff;
        border: 1px solid #00bfff;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        color: #0066cc;
      }
      
      .wechat-article pre {
        margin: 30px 0;
        padding: 20px;
        background: #000;
        border: 2px solid #ff00ff;
        border-radius: 0;
        overflow-x: auto;
        box-shadow: 0 0 30px rgba(255, 0, 255, 0.5);
      }
      
      .wechat-article pre code {
        background: none;
        color: #00ffff;
        border: none;
        text-shadow: 0 0 5px #00ffff;
        padding: 0;
      }
      
      .wechat-article ul, .wechat-article ol {
        margin: 20px 0;
        padding-left: 40px;
      }
      
      .wechat-article li {
        margin: 12px 0;
        color: #c0c0c0;
      }
      
      .wechat-article li::marker {
        color: #ff00ff;
      }
      
      .wechat-article a {
        color: #00ffff;
        text-decoration: none;
        border-bottom: 2px solid #00ffff;
        transition: all 0.3s;
        position: relative;
      }
      
      .wechat-article a:hover {
        text-shadow: 0 0 10px #00ffff;
        border-bottom-color: #ff00ff;
      }
      
      .wechat-article img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 30px auto;
        border: 2px solid #ff00ff;
        box-shadow: 0 0 30px rgba(255, 0, 255, 0.5);
        filter: contrast(1.1) saturate(1.2);
      }
      
      .wechat-article table {
        width: 100%;
        border-collapse: collapse;
        margin: 30px 0;
        border: 2px solid #00ffff;
      }
      
      .wechat-article th {
        background: rgba(255, 0, 255, 0.3);
        color: #00ffff;
        padding: 12px;
        text-align: left;
        font-weight: bold;
        border: 1px solid #00ffff;
        text-shadow: 0 0 5px #00ffff;
      }
      
      .wechat-article td {
        border: 1px solid rgba(0, 255, 255, 0.3);
        padding: 12px;
        text-align: left;
        color: #c0c0c0;
      }
      
      .wechat-article tr:hover {
        background: rgba(0, 255, 255, 0.1);
      }
      
      .wechat-article hr {
        border: none;
        height: 2px;
        background: linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff);
        margin: 40px 0;
        animation: slide 3s linear infinite;
      }
      
      @keyframes slide {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }
    `
  },
  {
    id: 'summer-heat',
    name: '🌞 夏日炎炎',
    description: '夏日阳光风格，温暖活力（白色背景适配）',
    styles: `
      /* 夏日炎炎主题 */
      .wechat-article {
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        font-size: 16px;
        line-height: 1.8;
        color: #333;
        word-break: break-word;
      }
      
      .wechat-article h1 {
        font-size: 28px;
        font-weight: bold;
        margin: 35px 0 25px;
        padding: 25px;
        color: #fff;
        text-align: center;
        background: linear-gradient(135deg, #ff9a56 0%, #ff6b35 50%, #f7931e 100%);
        border-radius: 20px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        position: relative;
        overflow: hidden;
      }
      
      .wechat-article h1::before {
        content: '☀️';
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 24px;
        opacity: 0.8;
      }
      
      .wechat-article h2 {
        font-size: 22px;
        font-weight: bold;
        margin: 30px 0 18px;
        padding: 15px 20px;
        color: #fff;
        background: linear-gradient(135deg, #ffb347 0%, #ff8c42 100%);
        border-radius: 15px;
        box-shadow: 0 4px 15px rgba(255,140,66,0.3);
      }
      
      .wechat-article h3 {
        font-size: 19px;
        font-weight: bold;
        margin: 25px 0 15px;
        padding: 12px 18px;
        color: #fff;
        background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%);
        border-radius: 12px;
        box-shadow: 0 3px 10px rgba(255,179,71,0.25);
      }
      
      .wechat-article p {
        margin: 18px 0;
        text-align: justify;
        color: #444;
        line-height: 1.8;
      }
      
      .wechat-article blockquote {
        margin: 25px 0;
        padding: 20px 25px;
        background: linear-gradient(135deg, #fff5e6 0%, #ffe4b3 100%);
        border-left: 5px solid #ff9a56;
        border-radius: 10px;
        color: #b8860b;
        font-style: italic;
        box-shadow: 0 3px 15px rgba(255,154,86,0.15);
      }
      
      .wechat-article blockquote::before {
        content: '🌻 ';
        font-size: 18px;
        margin-right: 5px;
      }
      
      .wechat-article code {
        padding: 3px 8px;
        background: #fff3cd;
        border: 2px solid #ffc107;
        border-radius: 6px;
        font-family: "Courier New", monospace;
        font-size: 14px;
        color: #856404;
        font-weight: 500;
      }
      
      .wechat-article pre {
        margin: 25px 0;
        padding: 20px;
        background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
        border-radius: 12px;
        overflow-x: auto;
        border: 3px solid #ffc107;
      }
      
      .wechat-article pre code {
        background: none;
        color: #ffd700;
        border: none;
        padding: 0;
        text-shadow: 0 0 10px rgba(255,215,0,0.5);
      }
      
      .wechat-article ul, .wechat-article ol {
        margin: 18px 0;
        padding-left: 35px;
      }
      
      .wechat-article li {
        margin: 10px 0;
        color: #444;
      }
      
      .wechat-article li::marker {
        color: #ff6b35;
        font-weight: bold;
        font-size: 18px;
      }
      
      .wechat-article a {
        color: #ff6b35;
        text-decoration: none;
        font-weight: 600;
        border-bottom: 2px solid #ff6b35;
        transition: all 0.3s ease;
      }
      
      .wechat-article img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 25px auto;
        border-radius: 20px;
        border: 4px solid #ffb347;
        box-shadow: 0 8px 25px rgba(255,107,53,0.3);
      }
      
      .wechat-article table {
        width: 100%;
        border-collapse: collapse;
        margin: 25px 0;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 5px 20px rgba(255,154,86,0.2);
      }
      
      .wechat-article th {
        background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
        color: #fff;
        padding: 15px;
        text-align: left;
        font-weight: bold;
        text-shadow: 0 1px 2px rgba(0,0,0,0.2);
      }
      
      .wechat-article td {
        border: 1px solid #ffe4b3;
        padding: 12px 15px;
        text-align: left;
        color: #444;
      }
      
      .wechat-article tr:nth-child(even) {
        background: linear-gradient(135deg, #fff8f0 0%, #ffefdc 100%);
      }
      
      .wechat-article hr {
        border: none;
        height: 4px;
        background: linear-gradient(135deg, #ff9a56 0%, #ff6b35 50%, #f7931e 100%);
        margin: 35px 0;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(255,107,53,0.3);
      }
    `
  },
  {
    id: 'crystal-dream',
    name: '💎 梦幻水晶',
    description: '水晶质感，梦幻唯美（白色背景适配）',
    styles: `
      /* 梦幻水晶主题 */
      .wechat-article {
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        font-size: 16px;
        line-height: 1.8;
        color: #333;
        word-break: break-word;
      }
      
      .wechat-article h1 {
        font-size: 28px;
        font-weight: bold;
        margin: 35px 0 25px;
        padding: 25px;
        color: #fff;
        text-align: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #9b59b6 100%);
        border-radius: 25px;
        box-shadow: 0 8px 32px rgba(102,126,234,0.3);
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        border: 2px solid rgba(255,255,255,0.3);
        position: relative;
      }
      
      .wechat-article h1::before {
        content: '💎';
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 24px;
        opacity: 0.9;
      }
      
      .wechat-article h2 {
        font-size: 22px;
        font-weight: bold;
        margin: 30px 0 18px;
        padding: 18px 22px;
        color: #fff;
        background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
        border-radius: 18px;
        box-shadow: 0 6px 20px rgba(108,92,231,0.25);
        border: 2px solid rgba(255,255,255,0.2);
      }
      
      .wechat-article h3 {
        font-size: 19px;
        font-weight: bold;
        margin: 25px 0 15px;
        padding: 15px 20px;
        color: #fff;
        background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(232,67,147,0.25);
        border: 2px solid rgba(255,255,255,0.2);
      }
      
      .wechat-article p {
        margin: 18px 0;
        text-align: justify;
        color: #444;
        line-height: 1.8;
      }
      
      .wechat-article blockquote {
        margin: 25px 0;
        padding: 20px 25px;
        background: linear-gradient(135deg, #f8f7ff 0%, #e8e4ff 100%);
        border-left: 5px solid #a29bfe;
        border-radius: 15px;
        color: #6c5ce7;
        font-style: italic;
        box-shadow: 0 5px 20px rgba(162,155,254,0.15);
        border: 1px solid rgba(162,155,254,0.3);
      }
      
      .wechat-article blockquote::before {
        content: '✨ ';
        font-size: 18px;
        margin-right: 5px;
      }
      
      .wechat-article code {
        padding: 4px 10px;
        background: linear-gradient(135deg, #f1f0ff 0%, #e8e4ff 100%);
        border: 2px solid #a29bfe;
        border-radius: 8px;
        font-family: "Courier New", monospace;
        font-size: 14px;
        color: #6c5ce7;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(162,155,254,0.2);
      }
      
      .wechat-article pre {
        margin: 25px 0;
        padding: 20px;
        background: linear-gradient(135deg, #2d3748 0%, #4c51bf 100%);
        border-radius: 15px;
        overflow-x: auto;
        border: 3px solid #a29bfe;
        box-shadow: 0 8px 25px rgba(162,155,254,0.3);
      }
      
      .wechat-article pre code {
        background: none;
        color: #e2e8f0;
        border: none;
        padding: 0;
        box-shadow: none;
        text-shadow: 0 0 10px rgba(226,232,240,0.5);
      }
      
      .wechat-article ul, .wechat-article ol {
        margin: 18px 0;
        padding-left: 35px;
      }
      
      .wechat-article li {
        margin: 10px 0;
        color: #444;
      }
      
      .wechat-article li::marker {
        color: #a29bfe;
        font-weight: bold;
        font-size: 18px;
      }
      
      .wechat-article a {
        color: #6c5ce7;
        text-decoration: none;
        font-weight: 600;
        border-bottom: 2px solid #a29bfe;
        transition: all 0.3s ease;
      }
      
      .wechat-article img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 25px auto;
        border-radius: 20px;
        border: 4px solid #a29bfe;
        box-shadow: 0 10px 30px rgba(162,155,254,0.3);
      }
      
      .wechat-article table {
        width: 100%;
        border-collapse: collapse;
        margin: 25px 0;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 8px 25px rgba(162,155,254,0.2);
        border: 2px solid #a29bfe;
      }
      
      .wechat-article th {
        background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
        color: #fff;
        padding: 15px;
        text-align: left;
        font-weight: bold;
        text-shadow: 0 1px 2px rgba(0,0,0,0.2);
      }
      
      .wechat-article td {
        border: 1px solid #e8e4ff;
        padding: 12px 15px;
        text-align: left;
        color: #444;
      }
      
      .wechat-article tr:nth-child(even) {
        background: linear-gradient(135deg, #f8f7ff 0%, #f1f0ff 100%);
      }
      
      .wechat-article hr {
        border: none;
        height: 4px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #a29bfe 100%);
        margin: 35px 0;
        border-radius: 2px;
        box-shadow: 0 3px 10px rgba(102,126,234,0.3);
      }
    `
  },
  {
    id: 'streaming-light',
    name: '✨ 流光',
    description: '流光效果，动感时尚（白色背景适配）',
    styles: `
      /* 流光主题 */
      .wechat-article {
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        font-size: 16px;
        line-height: 1.8;
        color: #333;
        word-break: break-word;
      }
      
      .wechat-article h1 {
        font-size: 28px;
        font-weight: bold;
        margin: 35px 0 25px;
        padding: 25px;
        color: #fff;
        text-align: center;
        background: linear-gradient(45deg, #ff6ec7, #ff9a56, #ffd93d, #6bcf7f, #4d9fff, #9c88ff);
        border-radius: 20px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        position: relative;
        overflow: hidden;
      }
      
      .wechat-article h1::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transition: left 0.5s;
      }
      
      .wechat-article h2 {
        font-size: 22px;
        font-weight: bold;
        margin: 30px 0 18px;
        padding: 18px 22px;
        color: #fff;
        background: linear-gradient(135deg, #ff9a56 0%, #6bcf7f 100%);
        border-radius: 15px;
        box-shadow: 0 6px 20px rgba(255,154,86,0.3);
        position: relative;
        overflow: hidden;
      }
      
      .wechat-article h3 {
        font-size: 19px;
        font-weight: bold;
        margin: 25px 0 15px;
        padding: 15px 20px;
        color: #fff;
        background: linear-gradient(135deg, #4d9fff 0%, #9c88ff 100%);
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(77,159,255,0.3);
        position: relative;
        overflow: hidden;
      }
      
      .wechat-article p {
        margin: 18px 0;
        text-align: justify;
        color: #444;
        line-height: 1.8;
        position: relative;
      }
      
      .wechat-article blockquote {
        margin: 25px 0;
        padding: 20px 25px;
        background: linear-gradient(135deg, #fff5f5 0%, #f0f9ff 100%);
        border-left: 5px solid #ff6ec7;
        border-radius: 12px;
        color: #666;
        font-style: italic;
        box-shadow: 0 4px 15px rgba(255,110,199,0.15);
        position: relative;
        overflow: hidden;
      }
      
      .wechat-article blockquote::before {
        content: '⚡ ';
        font-size: 18px;
        margin-right: 5px;
      }
      
      .wechat-article blockquote::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, #ff6ec7, #ff9a56, #ffd93d, #6bcf7f, #4d9fff, #9c88ff);
      }
      
      .wechat-article code {
        padding: 4px 10px;
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        border: 2px solid #4d9fff;
        border-radius: 8px;
        font-family: "Courier New", monospace;
        font-size: 14px;
        color: #1e40af;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(77,159,255,0.2);
      }
      
      .wechat-article pre {
        margin: 25px 0;
        padding: 20px;
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        border-radius: 15px;
        overflow-x: auto;
        border: 3px solid transparent;
        background-clip: padding-box;
        position: relative;
      }
      
      .wechat-article pre::before {
        content: '';
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        background: linear-gradient(45deg, #ff6ec7, #ff9a56, #ffd93d, #6bcf7f, #4d9fff, #9c88ff);
        border-radius: 15px;
        z-index: -1;
      }
      
      .wechat-article pre code {
        background: none;
        color: #e2e8f0;
        border: none;
        padding: 0;
        box-shadow: none;
        text-shadow: 0 0 10px rgba(226,232,240,0.5);
      }
      
      .wechat-article ul, .wechat-article ol {
        margin: 18px 0;
        padding-left: 35px;
      }
      
      .wechat-article li {
        margin: 10px 0;
        color: #444;
        position: relative;
      }
      
      .wechat-article li::marker {
        color: #ff6ec7;
        font-weight: bold;
        font-size: 18px;
      }
      
      .wechat-article a {
        color: #4d9fff;
        text-decoration: none;
        font-weight: 600;
        border-bottom: 2px solid transparent;
        background: linear-gradient(90deg, #4d9fff, #9c88ff) bottom / 100% 2px no-repeat;
        transition: all 0.3s ease;
      }
      
      .wechat-article img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 25px auto;
        border-radius: 20px;
        border: 4px solid transparent;
        background: linear-gradient(white, white) padding-box,
                    linear-gradient(45deg, #ff6ec7, #ff9a56, #ffd93d, #6bcf7f, #4d9fff, #9c88ff) border-box;
        box-shadow: 0 10px 30px rgba(255,110,199,0.3);
      }
      
      .wechat-article table {
        width: 100%;
        border-collapse: collapse;
        margin: 25px 0;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 8px 25px rgba(77,159,255,0.2);
        border: 3px solid transparent;
        background: linear-gradient(white, white) padding-box,
                    linear-gradient(45deg, #ff6ec7, #ff9a56, #ffd93d, #6bcf7f, #4d9fff, #9c88ff) border-box;
      }
      
      .wechat-article th {
        background: linear-gradient(135deg, #4d9fff 0%, #9c88ff 100%);
        color: #fff;
        padding: 15px;
        text-align: left;
        font-weight: bold;
        text-shadow: 0 1px 2px rgba(0,0,0,0.2);
      }
      
      .wechat-article td {
        border: 1px solid #e0f2fe;
        padding: 12px 15px;
        text-align: left;
        color: #444;
      }
      
      .wechat-article tr:nth-child(even) {
        background: linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%);
      }
      
      .wechat-article hr {
        border: none;
        height: 4px;
        background: linear-gradient(90deg, #ff6ec7, #ff9a56, #ffd93d, #6bcf7f, #4d9fff, #9c88ff);
        margin: 35px 0;
        border-radius: 2px;
        box-shadow: 0 3px 10px rgba(255,110,199,0.3);
      }
    `
  },
  {
    id: 'luxury-gold',
    name: '💰 尊贵土豪',
    description: '土豪金主题，奢华尊贵（白色背景适配）',
    styles: `
      /* 尊贵土豪主题 */
      .wechat-article {
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        font-size: 16px;
        line-height: 1.8;
        color: #333;
        word-break: break-word;
      }
      
      .wechat-article h1 {
        font-size: 28px;
        font-weight: bold;
        margin: 35px 0 25px;
        padding: 25px;
        color: #fff;
        text-align: center;
        background: linear-gradient(135deg, #ffd700 0%, #ffb347 30%, #daa520 70%, #b8860b 100%);
        border-radius: 20px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        position: relative;
        overflow: visible;
        border: 3px solid #ffd700;
        box-shadow: 0 8px 25px rgba(255,215,0,0.4);
      }
      
      .wechat-article h1::before {
        content: '👑';
        position: absolute;
        bottom: -8px;
        left: -8px;
        font-size: 32px;
        opacity: 0.9;
        transform: rotate(-15deg);
        text-shadow: 2px 2px 8px rgba(255,215,0,0.5);
        z-index: 1;
      }
      
      .wechat-article h1::after {
        content: '💰';
        position: absolute;
        top: -8px;
        right: -8px;
        font-size: 32px;
        opacity: 0.9;
        transform: rotate(15deg);
        text-shadow: 2px 2px 8px rgba(255,215,0,0.5);
        z-index: 1;
      }
      
      .wechat-article h2 {
        font-size: 22px;
        font-weight: bold;
        margin: 30px 0 18px;
        padding: 18px 22px;
        color: #fff;
        background: linear-gradient(135deg, #daa520 0%, #b8860b 100%);
        border-radius: 15px;
        box-shadow: 0 6px 20px rgba(218,165,32,0.3);
        border: 2px solid #ffd700;
        position: relative;
        overflow: visible;
      }
      
      .wechat-article h2::before {
        content: '💎';
        position: absolute;
        bottom: -6px;
        left: -6px;
        font-size: 24px;
        opacity: 0.9;
        transform: rotate(-12deg);
        text-shadow: 1px 1px 6px rgba(255,215,0,0.4);
        z-index: 1;
      }
      
      .wechat-article h2::after {
        content: '💰';
        position: absolute;
        top: -6px;
        right: -6px;
        font-size: 32px;
        opacity: 0.9;
        transform: rotate(12deg);
        text-shadow: 1px 1px 6px rgba(255,215,0,0.4);
        z-index: 1;
      }
      
      .wechat-article h3 {
        font-size: 19px;
        font-weight: bold;
        margin: 25px 0 15px;
        padding: 15px 20px;
        color: #fff;
        background: linear-gradient(135deg, #ffb347 0%, #daa520 100%);
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(255,179,71,0.3);
        border: 2px solid #ffd700;
        position: relative;
        overflow: visible;
      }
      
      .wechat-article h3::before {
        content: '🏆';
        position: absolute;
        bottom: -4px;
        left: -4px;
        font-size: 20px;
        opacity: 0.9;
        transform: rotate(-10deg);
        text-shadow: 1px 1px 4px rgba(255,215,0,0.3);
        z-index: 1;
      }
      
      .wechat-article h3::after {
        content: '💰';
        position: absolute;
        top: -4px;
        right: -4px;
        font-size: 18px;
        opacity: 0.8;
        transform: rotate(10deg);
        text-shadow: 1px 1px 4px rgba(255,215,0,0.3);
        z-index: 1;
      }
      
      .wechat-article p {
        margin: 18px 0;
        text-align: justify;
        color: #444;
        line-height: 1.8;
      }
      
      .wechat-article blockquote {
        margin: 25px 0;
        padding: 20px 25px;
        background: linear-gradient(135deg, #fffaf0 0%, #fff8dc 100%);
        border-left: 5px solid #daa520;
        border-radius: 12px;
        color: #8b4513;
        font-style: italic;
        box-shadow: 0 5px 20px rgba(218,165,32,0.15);
        border: 2px solid #ffd700;
        position: relative;
      }
      
      .wechat-article blockquote::before {
        content: '💸 ';
        font-size: 18px;
        margin-right: 5px;
        color: #daa520;
      }
      
      .wechat-article blockquote::after {
        content: '✨';
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 20px;
        color: #ffd700;
      }
      
      .wechat-article code {
        padding: 4px 10px;
        background: linear-gradient(135deg, #fff8dc 0%, #f0e68c 100%);
        border: 2px solid #daa520;
        border-radius: 8px;
        font-family: "Courier New", monospace;
        font-size: 14px;
        color: #8b4513;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(218,165,32,0.2);
      }
      
      .wechat-article pre {
        margin: 25px 0;
        padding: 20px;
        background: linear-gradient(135deg, #2f1b14 0%, #4a2c17 100%);
        border-radius: 15px;
        overflow-x: auto;
        border: 3px solid #daa520;
        box-shadow: 0 8px 25px rgba(218,165,32,0.3);
        position: relative;
      }
      
      .wechat-article pre::before {
        content: '';
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        background: linear-gradient(45deg, #ffd700, #ffb347, #daa520, #b8860b);
        border-radius: 15px;
        z-index: -1;
      }
      
      .wechat-article pre code {
        background: none;
        color: #ffd700;
        border: none;
        padding: 0;
        box-shadow: none;
        text-shadow: 0 0 10px rgba(255,215,0,0.5);
      }
      
      .wechat-article ul, .wechat-article ol {
        margin: 18px 0;
        padding-left: 35px;
      }
      
      .wechat-article li {
        margin: 10px 0;
        color: #444;
        position: relative;
      }
      
      .wechat-article li::marker {
        color: #daa520;
        font-weight: bold;
        font-size: 18px;
      }
      
      .wechat-article li::before {
        content: '💰';
        position: absolute;
        left: -25px;
        font-size: 14px;
        opacity: 0.7;
      }
      
      .wechat-article a {
        color: #b8860b;
        text-decoration: none;
        font-weight: 600;
        border-bottom: 2px solid #daa520;
        transition: all 0.3s ease;
        position: relative;
      }
      
      .wechat-article a::after {
        content: '💎';
        margin-left: 3px;
        font-size: 12px;
        opacity: 0.8;
      }
      
      .wechat-article img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 25px auto;
        border-radius: 20px;
        border: 4px solid transparent;
        background: linear-gradient(white, white) padding-box,
                    linear-gradient(45deg, #ffd700, #ffb347, #daa520, #b8860b) border-box;
        box-shadow: 0 10px 30px rgba(255,215,0,0.3);
      }
      
      .wechat-article table {
        width: 100%;
        border-collapse: collapse;
        margin: 25px 0;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 8px 25px rgba(218,165,32,0.2);
        border: 3px solid transparent;
        background: linear-gradient(white, white) padding-box,
                    linear-gradient(45deg, #ffd700, #ffb347, #daa520, #b8860b) border-box;
      }
      
      .wechat-article th {
        background: linear-gradient(135deg, #daa520 0%, #b8860b 100%);
        color: #fff;
        padding: 15px;
        text-align: left;
        font-weight: bold;
        text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        position: relative;
      }
      
      .wechat-article th::before {
        content: '👑';
        margin-right: 8px;
        font-size: 16px;
      }
      
      .wechat-article td {
        border: 1px solid #fff8dc;
        padding: 12px 15px;
        text-align: left;
        color: #444;
        position: relative;
      }
      
      .wechat-article tr:nth-child(even) {
        background: linear-gradient(135deg, #fffaf0 0%, #fff8dc 100%);
      }
      
      .wechat-article tr:nth-child(even) td::after {
        content: '✨';
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 10px;
        opacity: 0.3;
        color: #daa520;
      }
      
      .wechat-article hr {
        border: none;
        height: 4px;
        background: linear-gradient(90deg, #ffd700, #ffb347, #daa520, #b8860b, #daa520, #ffb347, #ffd700);
        margin: 35px 0;
        border-radius: 2px;
        box-shadow: 0 3px 10px rgba(255,215,0,0.3);
        position: relative;
      }
      
      .wechat-article hr::before {
        content: '💰💎👑💎💰';
        position: absolute;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 0 10px;
        font-size: 12px;
        opacity: 0.8;
      }
    `
  },
  {
    id: 'wechat-classic',
    name: '📱 公众号经典',
    description: '专为公众号优化的经典样式',
    styles: `
      /* 公众号经典主题 */
      .wechat-article {
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
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
        color: #2c3e50;
        text-align: center;
        border-bottom: 2px solid #3498db;
      }
      
      .wechat-article h2 {
        font-size: 20px;
        font-weight: bold;
        margin: 25px 0 15px;
        padding: 8px 15px;
        color: #fff;
        background: #3498db;
        border-radius: 4px;
      }
      
      .wechat-article h3 {
        font-size: 18px;
        font-weight: bold;
        margin: 20px 0 10px;
        padding-left: 12px;
        color: #2c3e50;
        border-left: 4px solid #3498db;
      }
      
      .wechat-article p {
        margin: 15px 0;
        text-align: justify;
      }
      
      .wechat-article blockquote {
        margin: 20px 0;
        padding: 15px 20px;
        background: #ecf0f1;
        border-left: 4px solid #3498db;
        color: #555;
        font-style: italic;
      }
      
      .wechat-article code {
        padding: 2px 4px;
        background: #f8f8f8;
        border: 1px solid #ddd;
        border-radius: 3px;
        font-family: "Courier New", Courier, monospace;
        font-size: 14px;
        color: #e74c3c;
      }
      
      .wechat-article pre {
        margin: 20px 0;
        padding: 15px;
        background: #2c3e50;
        border-radius: 5px;
        overflow-x: auto;
      }
      
      .wechat-article pre code {
        background: none;
        color: #ecf0f1;
        border: none;
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
        color: #3498db;
      }
      
      .wechat-article a {
        color: #3498db;
        text-decoration: none;
        border-bottom: 1px solid #3498db;
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
        background: #3498db;
        color: #fff;
        font-weight: bold;
      }
      
      .wechat-article hr {
        border: none;
        border-top: 2px solid #3498db;
        margin: 30px 0;
      }
    `
  },
  {
    id: 'wechat-modern',
    name: '✨ 现代简约',
    description: '现代简约风格，公众号完美兼容',
    styles: `
      /* 现代简约主题 */
      .wechat-article {
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        font-size: 16px;
        line-height: 1.8;
        color: #333;
        word-break: break-word;
      }
      
      .wechat-article h1 {
        font-size: 26px;
        font-weight: 700;
        margin: 35px 0 25px;
        padding: 20px;
        color: #1a1a1a;
        text-align: center;
        border: 3px solid #6c5ce7;
        border-radius: 12px;
      }
      
      .wechat-article h2 {
        font-size: 22px;
        font-weight: 600;
        margin: 30px 0 18px;
        padding: 12px 20px;
        color: #fff;
        background: #6c5ce7;
        border-radius: 8px;
      }
      
      .wechat-article h3 {
        font-size: 19px;
        font-weight: 600;
        margin: 25px 0 15px;
        padding-left: 15px;
        color: #6c5ce7;
        border-left: 5px solid #6c5ce7;
      }
      
      .wechat-article p {
        margin: 18px 0;
        text-align: justify;
        line-height: 1.8;
      }
      
      .wechat-article blockquote {
        margin: 25px 0;
        padding: 20px;
        background: #f8f7ff;
        border-left: 5px solid #6c5ce7;
        color: #555;
        font-style: italic;
        border-radius: 8px;
      }
      
      .wechat-article code {
        padding: 3px 8px;
        background: #f1f0ff;
        border: 1px solid #6c5ce7;
        border-radius: 4px;
        font-family: "SF Mono", "Monaco", "Inconsolata", monospace;
        font-size: 14px;
        color: #6c5ce7;
      }
      
      .wechat-article pre {
        margin: 25px 0;
        padding: 20px;
        background: #2d3748;
        border-radius: 10px;
        overflow-x: auto;
      }
      
      .wechat-article pre code {
        background: none;
        color: #e2e8f0;
        border: none;
        padding: 0;
      }
      
      .wechat-article ul, .wechat-article ol {
        margin: 18px 0;
        padding-left: 35px;
      }
      
      .wechat-article li {
        margin: 10px 0;
      }
      
      .wechat-article li::marker {
        color: #6c5ce7;
        font-weight: 600;
      }
      
      .wechat-article a {
        color: #6c5ce7;
        text-decoration: none;
        font-weight: 500;
        border-bottom: 2px solid #6c5ce7;
      }
      
      .wechat-article img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 25px auto;
        border-radius: 10px;
        border: 2px solid #e2e8f0;
      }
      
      .wechat-article table {
        width: 100%;
        border-collapse: collapse;
        margin: 25px 0;
        border-radius: 8px;
        overflow: hidden;
      }
      
      .wechat-article th {
        background: #6c5ce7;
        color: #fff;
        padding: 12px;
        text-align: left;
        font-weight: 600;
      }
      
      .wechat-article td {
        border: 1px solid #e2e8f0;
        padding: 12px;
        text-align: left;
      }
      
      .wechat-article tr:nth-child(even) {
        background: #f8f7ff;
      }
      
      .wechat-article hr {
        border: none;
        border-top: 3px solid #6c5ce7;
        margin: 35px 0;
        border-radius: 2px;
      }
    `
  },
  {
    id: 'wechat-colorful',
    name: '🎨 多彩活力',
    description: '多彩搭配，活力四射，公众号兼容',
    styles: `
      /* 多彩活力主题 */
      .wechat-article {
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        font-size: 16px;
        line-height: 1.8;
        color: #333;
        word-break: break-word;
      }
      
      .wechat-article h1 {
        font-size: 28px;
        font-weight: bold;
        margin: 35px 0 25px;
        padding: 20px;
        color: #fff;
        text-align: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 15px;
      }
      
      .wechat-article h2 {
        font-size: 22px;
        font-weight: bold;
        margin: 30px 0 18px;
        padding: 15px 20px;
        color: #fff;
        background: #ff6b6b;
        border-radius: 10px;
      }
      
      .wechat-article h3 {
        font-size: 19px;
        font-weight: bold;
        margin: 25px 0 15px;
        padding: 10px 15px;
        color: #fff;
        background: #4ecdc4;
        border-radius: 8px;
      }
      
      .wechat-article p {
        margin: 18px 0;
        text-align: justify;
        line-height: 1.8;
      }
      
      .wechat-article blockquote {
        margin: 25px 0;
        padding: 20px;
        background: #fff5b4;
        border-left: 5px solid #feca57;
        color: #333;
        font-style: italic;
        border-radius: 8px;
      }
      
      .wechat-article blockquote::before {
        content: '💡 ';
        font-size: 18px;
      }
      
      .wechat-article code {
        padding: 3px 8px;
        background: #e8f5e8;
        border: 1px solid #48bb78;
        border-radius: 4px;
        font-family: "Courier New", monospace;
        font-size: 14px;
        color: #2d5016;
      }
      
      .wechat-article pre {
        margin: 25px 0;
        padding: 20px;
        background: #2d3748;
        border-radius: 10px;
        overflow-x: auto;
        border-left: 5px solid #4299e1;
      }
      
      .wechat-article pre code {
        background: none;
        color: #e2e8f0;
        border: none;
        padding: 0;
      }
      
      .wechat-article ul, .wechat-article ol {
        margin: 18px 0;
        padding-left: 35px;
      }
      
      .wechat-article li {
        margin: 10px 0;
      }
      
      .wechat-article li::marker {
        color: #ed64a6;
        font-weight: bold;
      }
      
      .wechat-article a {
        color: #667eea;
        text-decoration: none;
        font-weight: 500;
        border-bottom: 2px solid #667eea;
      }
      
      .wechat-article img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 25px auto;
        border-radius: 12px;
        border: 3px solid #feca57;
      }
      
      .wechat-article table {
        width: 100%;
        border-collapse: collapse;
        margin: 25px 0;
        border-radius: 10px;
        overflow: hidden;
      }
      
      .wechat-article th {
        background: #ed64a6;
        color: #fff;
        padding: 12px;
        text-align: left;
        font-weight: bold;
      }
      
      .wechat-article td {
        border: 1px solid #fbb6ce;
        padding: 12px;
        text-align: left;
      }
      
      .wechat-article tr:nth-child(even) {
        background: #fef5e7;
      }
      
      .wechat-article hr {
        border: none;
        border-top: 4px solid #4ecdc4;
        margin: 35px 0;
        border-radius: 2px;
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