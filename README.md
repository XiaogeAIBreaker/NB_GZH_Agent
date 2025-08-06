# 公众号排版工具 - 智能 Markdown 编辑器

一个强大的微信公众号文章排版工具，支持飞书文档导入、Markdown 编辑、多主题样式、AI 智能优化等功能。

## ✨ 功能特性

### 🚀 MVP 核心功能
1. **飞书文档导入** - 一键粘贴飞书文档，自动转换为 Markdown
2. **Markdown 编辑** - 实时预览，所见即所得
3. **多种主题样式** - 内置 5 套精美主题（极简黑、暖阳橙、清新绿、典雅紫、科技蓝）
4. **一键复制** - 完美兼容公众号编辑器，保留所有样式
5. **AI 智能助手** - 文章优化、润色、生成标题和摘要

### 🎯 其他特性
- 实时预览
- 历史记录（撤销/重做）
- 导出 HTML 文件
- 自动保存
- 响应式设计

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **开发语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **编辑器**: CodeMirror 6
- **AI**: Vercel AI SDK + DeepSeek
- **状态管理**: Zustand
- **部署**: Vercel

## 📦 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/your-username/wechat-article-editor.git
cd wechat-article-editor
```

### 2. 安装依赖
```bash
npm install
# 或
pnpm install
# 或
yarn install
```

### 3. 配置环境变量
复制 `env.example` 文件为 `.env.local`：
```bash
cp env.example .env.local
```

编辑 `.env.local` 文件，填入您的配置：
```env
# AI 模型配置（必需）
DEEPSEEK_API_KEY=your_deepseek_api_key

# 可选配置
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. 启动开发服务器
```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📖 使用指南

### 方式一：粘贴飞书文档
1. 从飞书文档复制内容
2. 在左侧编辑器中直接粘贴
3. 系统自动识别并转换为 Markdown 格式

### 方式二：编辑 Markdown
在左侧编辑器中直接编写 Markdown 格式的文章

### 方式三：AI 辅助写作
1. 点击右下角的 AI 助手按钮
2. 使用快捷操作优化文章
3. 通过对话获取写作建议

### 复制到公众号
1. 选择合适的主题样式
2. 点击预览区右上角的"复制"按钮
3. 粘贴到微信公众号编辑器

## 🎨 内置主题

- **极简黑** - 简洁大方，适合技术文章
- **暖阳橙** - 温暖活泼，适合生活类文章
- **清新绿** - 自然清新，适合健康环保类文章
- **典雅紫** - 优雅神秘，适合文艺类文章
- **科技蓝** - 专业冷静，适合商务技术文章

## 🤖 AI 功能

### 快捷操作
- **优化文章** - 改善语言表达和文章结构
- **润色文采** - 提升文章的文学性
- **生成标题** - 生成吸引人的标题选项
- **生成摘要** - 自动提取文章要点

### 支持的 AI 模型
- DeepSeek Chat（默认）
- DeepSeek Coder
- GPT-4 Turbo（需配置 OpenAI API Key）
- GPT-3.5 Turbo（需配置 OpenAI API Key）

## 🚀 部署

### Vercel 部署（推荐）
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/wechat-article-editor)

1. 点击上方按钮
2. 导入 GitHub 仓库
3. 配置环境变量
4. 部署

### 本地构建
```bash
# 构建
npm run build

# 启动生产服务器
npm run start
```

## 📝 开发计划

- [x] MVP 版本
  - [x] 飞书文档导入
  - [x] Markdown 编辑器
  - [x] 多主题支持
  - [x] 一键复制
  - [x] AI 助手
- [ ] 功能增强
  - [ ] 用户系统
  - [ ] 文章云端保存
  - [ ] 更多文档格式支持（Notion、语雀）
  - [ ] 自定义样式编辑器
  - [ ] 图片上传和管理
- [ ] 高级功能
  - [ ] 公众号 API 对接
  - [ ] 一键发布
  - [ ] 数据分析
  - [ ] 团队协作

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [DeepSeek](https://www.deepseek.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [CodeMirror](https://codemirror.net/)

---

如有问题或建议，欢迎提交 [Issue](https://github.com/your-username/wechat-article-editor/issues)