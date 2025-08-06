# 公众号排版 Agent - 快速开始指南

## 环境要求

- Node.js 18.17 或更高版本
- npm / pnpm / yarn 包管理器
- Git

## 一、创建项目

```bash
# 使用 create-next-app 创建项目
npx create-next-app@latest wechat-article-editor \
  --typescript \
  --tailwind \
  --app \
  --src-dir=false \
  --import-alias="@/*"

# 进入项目目录
cd wechat-article-editor
```

## 二、安装核心依赖

### 2.1 安装 Next.js 相关依赖
```bash
npm install next@latest react@latest react-dom@latest
```

### 2.2 安装 UI 组件库
```bash
# 安装 shadcn/ui
npx shadcn-ui@latest init

# 安装常用组件
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
```

### 2.3 安装编辑器相关
```bash
# CodeMirror 编辑器
npm install @uiw/react-codemirror @codemirror/lang-markdown @codemirror/theme-one-dark

# 或者使用其他 Markdown 编辑器
npm install @uiw/react-md-editor

# Markdown 解析
npm install markdown-it @types/markdown-it
npm install github-markdown-css

# HTML 解析（用于飞书文档导入）
npm install jsdom @types/jsdom
npm install turndown  # HTML to Markdown 转换
npm install html-to-text
```

### 2.4 安装 AI SDK
```bash
# Vercel AI SDK
npm install ai

# DeepSeek SDK
npm install @ai-sdk/deepseek

# 其他 AI 模型 SDK（可选）
npm install @ai-sdk/openai
npm install @ai-sdk/anthropic
```

### 2.5 安装 Supabase
```bash
# Supabase 客户端
npm install @supabase/supabase-js
npm install @supabase/ssr
npm install @supabase/auth-helpers-nextjs
```

### 2.6 安装状态管理和工具库
```bash
# 状态管理
npm install zustand

# 数据请求
npm install @tanstack/react-query

# 工具库
npm install clsx tailwind-merge
npm install date-fns
npm install lodash-es @types/lodash-es
```

### 2.7 开发依赖
```bash
npm install -D @types/node
npm install -D eslint eslint-config-next
npm install -D prettier prettier-plugin-tailwindcss
```

## 三、配置环境变量

创建 `.env.local` 文件：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# AI 模型 API Keys
DEEPSEEK_API_KEY=your_deepseek_api_key
OPENAI_API_KEY=your_openai_api_key  # 可选
ANTHROPIC_API_KEY=your_anthropic_api_key  # 可选

# 其他配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 四、Supabase 项目设置

### 4.1 创建 Supabase 项目
1. 访问 [Supabase Dashboard](https://app.supabase.com)
2. 创建新项目
3. 获取项目 URL 和 API Keys

### 4.2 初始化数据库
在 Supabase SQL 编辑器中执行：

```sql
-- 创建用户表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 创建文章表
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

-- 启用 RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- 创建 RLS 策略
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own articles" ON articles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own articles" ON articles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own articles" ON articles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own articles" ON articles
  FOR DELETE USING (auth.uid() = user_id);
```

## 五、Vercel 部署配置

### 5.1 连接 GitHub
```bash
# 初始化 Git 仓库
git init
git add .
git commit -m "Initial commit"

# 推送到 GitHub
git remote add origin https://github.com/your-username/wechat-article-editor.git
git push -u origin main
```

### 5.2 部署到 Vercel
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 导入 GitHub 项目
3. 配置环境变量（与 `.env.local` 相同）
4. 点击 Deploy

### 5.3 配置 vercel.json
```json
{
  "functions": {
    "app/api/ai/*.ts": {
      "maxDuration": 60
    }
  }
}
```

## 六、开发命令

```bash
# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 格式化代码
npm run format
```

## 七、项目结构说明

```
wechat-article-editor/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   ├── editor/            # 编辑器页面
│   └── layout.tsx         # 根布局
├── components/            # React 组件
├── lib/                   # 工具库和配置
│   ├── supabase/         # Supabase 客户端
│   └── ai/               # AI 服务配置
├── hooks/                # 自定义 Hooks
├── styles/               # 样式文件
└── public/              # 静态资源
```

## 八、常见问题

### Q: 如何使用飞书文档导入功能？
A: 直接从飞书文档复制内容，在编辑器中粘贴即可。系统会自动识别并转换为 Markdown 格式，包括：
- 标题、列表、引用等格式
- 表格结构
- 图片自动上传和托管
- 代码块保留语法高亮

### Q: DeepSeek API 如何获取？
A: 访问 [DeepSeek 官网](https://www.deepseek.com/) 注册账号并申请 API Key。

### Q: Supabase 免费额度够用吗？
A: Supabase 免费版提供：
- 500MB 数据库空间
- 1GB 文件存储
- 50,000 月活用户
- 对于 MVP 和小型项目完全够用

### Q: 如何添加新的 AI 模型？
A: 在 `lib/ai/providers.ts` 中添加新的模型配置，使用 Vercel AI SDK 的统一接口。

### Q: 如何自定义公众号样式？
A: 在 `styles/themes/` 目录下创建新的样式文件，使用内联样式确保兼容性。

### Q: 飞书图片无法显示怎么办？
A: 系统会自动将飞书文档中的图片上传到 Supabase Storage，确保：
1. Supabase Storage 配置正确
2. 图片 bucket 设置为公开访问
3. 检查网络连接是否正常

## 九、下一步

1. **完善编辑器功能**
   - 添加更多 Markdown 扩展
   - 实现自动保存
   - 添加历史记录

2. **优化 AI 功能**
   - 添加更多 Prompt 模板
   - 实现上下文记忆
   - 优化响应速度

3. **扩展样式库**
   - 创建更多预设样式
   - 支持自定义样式
   - 添加样式预览

4. **集成微信 API**
   - 实现 OAuth 授权
   - 一键发布功能
   - 素材管理

---

🎉 恭喜！您已经完成了项目的初始设置，可以开始开发了！