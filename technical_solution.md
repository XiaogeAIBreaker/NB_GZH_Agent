# 公众号排版 Agent 技术方案

## 一、项目概述

### 1.1 项目背景
微信公众号编辑器原生的排版功能有限，内容创作者需要一个强大的工具来：
- 快速将 Markdown 格式文章转换为精美的公众号排版
- 通过 AI 智能优化文章内容和排版
- 一键发布到公众号平台

### 1.2 项目目标
开发一个智能化的公众号排版工具，集成 Markdown 编辑、实时预览、AI 优化、一键发布等功能。

## 二、整体架构设计

### 2.1 系统架构
```
┌─────────────────────────────────────────────────────────────┐
│                         前端应用层                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Markdown │  │  预览区   │  │ 样式选择 │  │ AI 助手  │   │
│  │  编辑器  │  │          │  │          │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                         服务层                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Markdown │  │  样式    │  │   AI     │  │  公众号  │   │
│  │  解析    │  │  渲染    │  │  服务    │  │   API    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                         数据层                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │ 用户数据 │  │ 样式模板 │  │ 历史记录 │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 技术栈选型

#### 全栈框架
- **核心框架**: Next.js 14 (App Router)
- **开发语言**: TypeScript
- **样式方案**: Tailwind CSS + shadcn/ui
- **状态管理**: Zustand + React Query (Tanstack Query)

#### 编辑器技术
- **Markdown 编辑器**: CodeMirror 6 / @uiw/react-md-editor
- **Markdown 解析**: markdown-it + 自定义插件
- **代码高亮**: Prism.js / Shiki

#### AI 集成
- **AI SDK**: Vercel AI SDK + @ai-sdk/deepseek
- **模型支持**: 
  - DeepSeek (优先支持)
  - OpenAI GPT-4/3.5
  - Claude 3
  - 通义千问
  - 文心一言
- **流式输出**: Server-Sent Events (SSE)

#### 数据存储
- **数据库**: Supabase (PostgreSQL)
  - 用户认证
  - 数据存储
  - 实时订阅
  - 向量数据库 (pgvector)
- **文件存储**: Supabase Storage
- **缓存**: Vercel KV (Redis)

#### 部署基础设施
- **部署平台**: Vercel
- **边缘函数**: Vercel Edge Functions
- **CDN**: Vercel Edge Network
- **监控**: Vercel Analytics + Sentry

## 三、核心功能模块

### 3.1 飞书文档导入模块

#### 功能特性
- **一键粘贴**: 支持从飞书复制内容直接粘贴
- **格式识别**: 自动识别飞书文档的富文本格式
- **智能转换**: 将飞书格式转换为 Markdown
- **图片处理**: 自动下载并托管飞书文档中的图片
- **表格支持**: 保留飞书表格格式

#### 技术实现
```typescript
// 飞书文档解析器
interface FeishuParser {
  // 解析剪贴板内容
  parseClipboard(clipboardData: ClipboardEvent): Promise<ParsedContent>
  
  // 转换为 Markdown
  toMarkdown(content: ParsedContent): string
  
  // 处理图片资源
  handleImages(images: ImageData[]): Promise<string[]>
}

// 剪贴板监听
async function handlePaste(event: ClipboardEvent) {
  const items = event.clipboardData?.items
  
  for (const item of items) {
    // 处理 HTML 格式（飞书复制的富文本）
    if (item.type === 'text/html') {
      const html = await item.getAsString()
      const markdown = convertFeishuToMarkdown(html)
      setEditorContent(markdown)
    }
    
    // 处理图片
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile()
      const url = await uploadImage(file)
      insertImageToEditor(url)
    }
  }
}

// 飞书格式转换规则
const feishuConversionRules = {
  // 标题转换
  'h1.heading-h1': '# ',
  'h2.heading-h2': '## ',
  'h3.heading-h3': '### ',
  
  // 列表转换
  'ul > li': '- ',
  'ol > li': (index) => `${index + 1}. `,
  
  // 代码块转换
  'pre.code-block': '```\n{content}\n```',
  
  // 引用转换
  'blockquote': '> ',
  
  // 表格转换
  'table': convertTableToMarkdown
}
```

### 3.2 Markdown 编辑器模块

#### 功能特性
- **实时编辑**: 支持语法高亮、自动补全、快捷键操作
- **工具栏**: 常用格式按钮（加粗、斜体、标题、列表等）
- **文件管理**: 导入/导出 Markdown 文件
- **历史记录**: 支持撤销/重做操作
- **实时保存**: 自动保存草稿，防止数据丢失
- **飞书导入**: 支持粘贴飞书文档内容

#### 技术实现
```javascript
// 编辑器配置示例
const editorConfig = {
  language: 'markdown',
  theme: 'vs-dark',
  autoSave: true,
  autoSaveInterval: 3000,
  shortcuts: {
    'Ctrl+B': 'bold',
    'Ctrl+I': 'italic',
    'Ctrl+S': 'save'
  }
}
```

### 3.3 样式渲染引擎

#### 核心功能
- **Markdown 解析**: 将 Markdown 转换为 HTML
- **样式注入**: 应用预设样式主题
- **自定义扩展**: 支持自定义标签和样式

#### 样式系统设计
```yaml
样式分类:
  - 标题样式:
      - 极简黑
      - 暖阳橙
      - 清新绿
      - 典雅紫
  - 正文样式:
      - 标准样式
      - 紧凑样式
      - 舒适样式
  - 引用样式:
      - 左边框样式
      - 背景色样式
      - 图标样式
  - 代码样式:
      - 暗色主题
      - 亮色主题
      - 自定义主题
```

### 3.4 AI 智能助手

#### 功能设计
1. **内容优化**
   - 文章润色
   - 语法纠错
   - 段落重组
   - 标题优化

2. **排版建议**
   - 自动配色
   - 样式推荐
   - 布局优化
   - 图文混排建议

3. **智能生成**
   - 摘要生成
   - 标题生成
   - 配图建议
   - SEO 优化

#### 多模型支持架构
```typescript
// 使用 Vercel AI SDK 统一接口
import { createDeepSeek } from '@ai-sdk/deepseek'
import { createOpenAI } from '@ai-sdk/openai'
import { streamText, generateText } from 'ai'

// 模型配置
const models = {
  deepseek: {
    provider: createDeepSeek({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: 'https://api.deepseek.com/v1'
    }),
    models: ['deepseek-chat', 'deepseek-coder']
  },
  openai: {
    provider: createOpenAI({
      apiKey: process.env.OPENAI_API_KEY
    }),
    models: ['gpt-4-turbo', 'gpt-3.5-turbo']
  }
}

// 统一的 AI 服务接口
interface AIService {
  // 选择模型
  selectModel(provider: string, model: string): void
  
  // 文章优化（流式输出）
  async optimizeContent(content: string, options: OptimizeOptions): AsyncIterator<string>
  
  // 样式推荐
  recommendStyle(content: string, userPreference: StylePreference): Promise<StyleSet>
  
  // 智能对话（支持上下文）
  chat(message: string, context: Message[]): AsyncIterator<string>
}
```

#### API 路由设计 (Next.js App Router)
```typescript
// app/api/ai/optimize/route.ts
export async function POST(req: Request) {
  const { content, model = 'deepseek-chat', stream = true } = await req.json()
  
  if (stream) {
    const result = await streamText({
      model: models.deepseek.provider(model),
      prompt: `优化以下公众号文章：${content}`,
      temperature: 0.7,
      maxTokens: 2000
    })
    
    return new Response(result.toTextStreamResponse())
  }
  
  const result = await generateText({
    model: models.deepseek.provider(model),
    prompt: `优化以下公众号文章：${content}`
  })
  
  return Response.json({ text: result.text })
}
```

### 3.5 公众号对接模块

#### 功能实现
1. **账号授权**
   - OAuth 2.0 授权登录
   - Token 管理和刷新
   - 多账号管理

2. **内容发布**
   - 草稿箱管理
   - 定时发布
   - 群发功能

3. **素材管理**
   - 图片上传和管理
   - 图文消息编辑
   - 素材库同步

#### API 对接方案
```typescript
interface WeChatAPI {
  // 授权相关
  auth: {
    getAccessToken(): Promise<string>
    refreshToken(): Promise<string>
  }
  
  // 内容相关
  content: {
    createDraft(article: Article): Promise<DraftId>
    publish(draftId: string): Promise<PublishResult>
    uploadImage(image: File): Promise<MediaId>
  }
}
```

## 四、Next.js 项目架构

### 4.1 项目目录结构
```
wechat-article-editor/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 认证相关页面
│   │   ├── login/
│   │   └── register/
│   ├── editor/                   # 编辑器页面
│   │   ├── [id]/                # 动态路由
│   │   └── page.tsx
│   ├── api/                      # API 路由
│   │   ├── ai/
│   │   │   ├── optimize/
│   │   │   ├── chat/
│   │   │   └── models/
│   │   ├── articles/
│   │   ├── styles/
│   │   └── wechat/
│   ├── layout.tsx               # 根布局
│   └── page.tsx                  # 首页
├── components/                    # React 组件
│   ├── editor/
│   │   ├── MarkdownEditor.tsx
│   │   ├── Preview.tsx
│   │   ├── Toolbar.tsx
│   │   └── StyleSelector.tsx
│   ├── ai/
│   │   ├── AIAssistant.tsx
│   │   ├── ModelSelector.tsx
│   │   └── ChatInterface.tsx
│   └── ui/                      # shadcn/ui 组件
├── lib/                          # 工具库
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── ai/
│   │   ├── deepseek.ts
│   │   └── providers.ts
│   ├── parsers/
│   │   ├── feishu.ts            # 飞书文档解析器
│   │   ├── notion.ts            # Notion解析器（后续扩展）
│   │   └── yuque.ts             # 语雀解析器（后续扩展）
│   └── utils/
├── hooks/                        # 自定义 Hooks
│   ├── useEditor.ts
│   ├── useAI.ts
│   └── useArticle.ts
├── styles/                       # 样式文件
│   ├── themes/                  # 公众号样式主题
│   └── globals.css
└── types/                        # TypeScript 类型定义
```

### 4.2 核心组件实现

#### 编辑器组件（支持飞书导入）
```typescript
// components/editor/MarkdownEditor.tsx
'use client'

import { useCallback, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { useDebounce } from '@/hooks/useDebounce'
import { convertFeishuToMarkdown } from '@/lib/parsers/feishu'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  onSave?: () => void
}

export function MarkdownEditor({ value, onChange, onSave }: MarkdownEditorProps) {
  const debouncedValue = useDebounce(value, 300)
  
  const handleChange = useCallback((val: string) => {
    onChange(val)
  }, [onChange])

  // 处理粘贴事件（支持飞书文档）
  const handlePaste = useCallback(async (e: ClipboardEvent) => {
    const html = e.clipboardData?.getData('text/html')
    
    if (html) {
      // 检测是否为飞书内容
      if (html.includes('data-feishu') || html.includes('docx-')) {
        e.preventDefault()
        const markdown = await convertFeishuToMarkdown(html)
        onChange(markdown)
        return
      }
    }
  }, [onChange])

  return (
    <CodeMirror
      value={value}
      height="100vh"
      theme={oneDark}
      extensions={[markdown()]}
      onChange={handleChange}
      onPaste={handlePaste}
      onKeyDown={(e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 's') {
          e.preventDefault()
          onSave?.()
        }
      }}
    />
  )
}
```

#### AI 助手集成
```typescript
// components/ai/AIAssistant.tsx
'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Card, Select, Button } from '@/components/ui'

export function AIAssistant({ articleContent }: { articleContent: string }) {
  const [model, setModel] = useState('deepseek-chat')
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/chat',
    body: {
      model,
      context: articleContent
    }
  })

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b">
        <Select value={model} onValueChange={setModel}>
          <Select.Option value="deepseek-chat">DeepSeek Chat</Select.Option>
          <Select.Option value="deepseek-coder">DeepSeek Coder</Select.Option>
          <Select.Option value="gpt-4-turbo">GPT-4 Turbo</Select.Option>
          <Select.Option value="claude-3-opus">Claude 3 Opus</Select.Option>
        </Select>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${
            message.role === 'user' ? 'text-right' : 'text-left'
          }`}>
            <div className={`inline-block p-3 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-800'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="询问 AI 助手..."
            className="flex-1 px-3 py-2 border rounded-lg"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            发送
          </Button>
        </div>
      </form>
    </Card>
  )
}
```

### 4.3 Supabase 集成

#### 客户端配置
```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

#### 服务端配置
```typescript
// lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        }
      }
    }
  )
}
```

## 五、关键技术实现

### 5.1 实时预览同步

#### 技术方案
- 使用 WebSocket 或 postMessage 实现编辑器与预览区通信
- 防抖处理，避免频繁渲染
- 虚拟滚动，优化长文章性能

```javascript
// 实时同步实现
class RealtimeSync {
  constructor() {
    this.debounceTimer = null
    this.syncDelay = 300
  }
  
  sync(content) {
    clearTimeout(this.debounceTimer)
    this.debounceTimer = setTimeout(() => {
      this.render(content)
    }, this.syncDelay)
  }
  
  render(content) {
    const html = markdownToHtml(content)
    const styledHtml = applyStyles(html, currentTheme)
    updatePreview(styledHtml)
  }
}
```

### 5.2 样式隔离方案

#### Shadow DOM 方案
```javascript
// 使用 Shadow DOM 隔离样式
class PreviewComponent {
  constructor(container) {
    this.shadow = container.attachShadow({ mode: 'open' })
  }
  
  render(html, styles) {
    this.shadow.innerHTML = `
      <style>${styles}</style>
      <div class="preview-content">${html}</div>
    `
  }
}
```

### 5.3 一键复制功能

#### 实现方案
1. **富文本复制**: 保留样式的 HTML 复制
2. **兼容性处理**: 处理不同浏览器的复制 API
3. **格式优化**: 针对公众号编辑器优化 HTML 结构

```javascript
async function copyToClipboard(html) {
  // 创建临时元素
  const temp = document.createElement('div')
  temp.innerHTML = html
  
  // 优化样式
  optimizeForWeChat(temp)
  
  // 执行复制
  const blob = new Blob([temp.innerHTML], { type: 'text/html' })
  const data = [new ClipboardItem({ 'text/html': blob })]
  
  await navigator.clipboard.write(data)
}
```

## 五、性能优化策略

### 5.1 前端优化
- **代码分割**: 按需加载模块
- **懒加载**: 图片和组件懒加载
- **缓存策略**: 使用 Service Worker 缓存静态资源
- **虚拟列表**: 优化长列表渲染

### 5.2 后端优化
- **接口缓存**: Redis 缓存常用数据
- **CDN 加速**: 静态资源 CDN 分发
- **数据库优化**: 索引优化、查询优化
- **异步处理**: 使用消息队列处理耗时操作

## 六、安全考虑

### 6.1 内容安全
- **XSS 防护**: 严格的 HTML 净化
- **CSP 策略**: 内容安全策略配置
- **输入验证**: 严格的输入验证和过滤

### 6.2 数据安全
- **加密传输**: HTTPS 全站加密
- **敏感数据加密**: 数据库敏感字段加密
- **访问控制**: 基于角色的权限控制

## 七、部署方案

### 7.1 Vercel 部署配置

#### 项目配置
```json
// vercel.json
{
  "functions": {
    "app/api/ai/*.ts": {
      "maxDuration": 60
    }
  },
  "env": {
    "DEEPSEEK_API_KEY": "@deepseek-api-key",
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_KEY": "@supabase-service-key"
  }
}
```

#### 环境变量管理
```bash
# .env.local
DEEPSEEK_API_KEY=your_deepseek_key
OPENAI_API_KEY=your_openai_key  # 可选
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
```

### 7.2 Supabase 数据库设计

#### 数据表结构
```sql
-- 用户表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 文章表
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT,
  markdown TEXT,
  styled_html TEXT,
  style_theme TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 样式模板表
CREATE TABLE style_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,
  css_rules TEXT,
  preview_image TEXT,
  is_premium BOOLEAN DEFAULT false,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- AI 对话历史
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  model TEXT,
  messages JSONB,
  tokens_used INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 发布记录
CREATE TABLE publish_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  platform TEXT DEFAULT 'wechat',
  publish_status TEXT,
  publish_url TEXT,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Row Level Security (RLS)
```sql
-- 启用 RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

-- 用户只能访问自己的数据
CREATE POLICY "Users can view own articles" ON articles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own articles" ON articles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own articles" ON articles
  FOR UPDATE USING (auth.uid() = user_id);
```

### 7.3 CI/CD 流程
1. **代码提交** → GitHub
2. **自动预览** → Vercel Preview Deployments
3. **自动测试** → GitHub Actions
   ```yaml
   # .github/workflows/test.yml
   name: Test
   on: [push, pull_request]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
         - run: npm ci
         - run: npm test
         - run: npm run lint
   ```
4. **自动部署** → Vercel Production
5. **监控告警** → Vercel Analytics + Sentry

## 八、开发计划

### 第一阶段：MVP 版本（2-3周）
- [x] 支持一键拷贝飞书文档生成公众号排版预览
- [x] 支持内置多主题（5-8套预设样式）
- [x] 支持编辑 Markdown 并生成公众号排版预览
- [x] 支持一键复制公众号预览到公众号编辑器
- [x] 支持智能助手对文章和排版进行优化

### 第二阶段：功能完善（3-4周）
- [ ] 用户系统（注册/登录/个人中心）
- [ ] 文章历史版本管理
- [ ] 自定义样式编辑器
- [ ] 更多文档格式支持（Notion、语雀等）
- [ ] 样式收藏和分享功能

### 第三阶段：高级功能（4-5周）
- [ ] 公众号 API 对接
- [ ] 一键发布功能
- [ ] 团队协作
- [ ] 数据分析

## 九、技术难点与解决方案

### 9.1 富文本复制兼容性
**问题**: 不同浏览器和公众号编辑器的兼容性问题
**解决方案**: 
- 使用 Clipboard API 新标准
- 降级方案：document.execCommand
- 针对公众号编辑器定制 HTML 结构

### 9.2 样式还原度
**问题**: 公众号编辑器对 CSS 支持有限
**解决方案**:
- 使用内联样式
- 避免使用不支持的 CSS 属性
- 预设样式严格测试

### 9.3 AI 响应速度
**问题**: AI 处理可能耗时较长
**解决方案**:
- 流式输出
- 异步处理 + 进度提示
- 结果缓存

## 十、总结

本技术方案设计了一个功能完善的公众号排版 Agent，采用现代化的 **Next.js + Vercel + Supabase + DeepSeek** 技术栈，具有以下核心优势：

### 技术栈优势
1. **Next.js 全栈框架**
   - 统一的前后端开发体验
   - Server Components 优化性能
   - App Router 提供更好的路由管理
   - 内置 API Routes 简化后端开发

2. **Vercel 部署平台**
   - 零配置部署，开箱即用
   - 全球 CDN 加速
   - 自动 HTTPS 和域名管理
   - Preview Deployments 便于测试

3. **Supabase 后端服务**
   - 完整的 PostgreSQL 数据库
   - 内置用户认证系统
   - 实时数据订阅
   - Row Level Security 保障数据安全

4. **AI 模型灵活性**
   - 支持多种大语言模型
   - DeepSeek 成本优势明显
   - Vercel AI SDK 统一接口
   - 流式输出提升用户体验

### 项目特色
1. **智能化**: AI 深度集成，支持内容优化、排版建议、智能对话
2. **易用性**: 简洁的界面设计，实时预览，一键复制发布
3. **扩展性**: 模块化架构，易于添加新功能和模型
4. **成本优化**: 使用 DeepSeek 等国产模型，大幅降低 AI 成本
5. **开发效率**: 现代化工具链，快速迭代和部署

通过分阶段开发，可以快速推出 MVP 版本验证市场，后续根据用户反馈持续迭代优化。整体方案在保证功能完整性的同时，兼顾了开发效率、运维成本和用户体验。