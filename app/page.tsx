'use client'

import React, { useState, useEffect } from 'react'
import { MarkdownEditor } from '@/components/editor/markdown-editor'
import { Preview } from '@/components/editor/preview'
import { ThemeSelector } from '@/components/editor/theme-selector'
import { Toolbar } from '@/components/editor/toolbar'
import { useEditorStore } from '@/lib/store'
import { Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AIAssistant } from '@/components/ai/ai-assistant'

export default function HomePage() {
  const {
    markdown,
    setMarkdown,
    themeId,
    setThemeId,
    history,
    historyIndex,
    undo,
    redo,
    isAiOpen,
    setIsAiOpen,
  } = useEditorStore()
  
  const [showToast, setShowToast] = useState<string | null>(null)
  
  // 显示提示信息
  const toast = (message: string) => {
    setShowToast(message)
    setTimeout(() => setShowToast(null), 3000)
  }
  
  // 处理工具栏操作
  const handleToolbarAction = (action: string) => {
    const selection = window.getSelection()
    const selectedText = selection?.toString() || ''
    
    let newText = ''
    switch (action) {
      case 'bold':
        newText = `**${selectedText || '加粗文本'}**`
        break
      case 'italic':
        newText = `*${selectedText || '斜体文本'}*`
        break
      case 'link':
        newText = `[${selectedText || '链接文本'}](url)`
        break
      case 'h1':
        newText = `# ${selectedText || '一级标题'}`
        break
      case 'h2':
        newText = `## ${selectedText || '二级标题'}`
        break
      case 'h3':
        newText = `### ${selectedText || '三级标题'}`
        break
      case 'ul':
        newText = `- ${selectedText || '列表项'}`
        break
      case 'ol':
        newText = `1. ${selectedText || '列表项'}`
        break
      case 'quote':
        newText = `> ${selectedText || '引用文本'}`
        break
      case 'code':
        newText = `\`\`\`\n${selectedText || '代码'}\n\`\`\``
        break
      case 'image':
        newText = `![图片描述](图片URL)`
        break
      case 'undo':
        undo()
        return
      case 'redo':
        redo()
        return
      case 'save':
        toast('文档已自动保存')
        return
      case 'new':
        if (confirm('确定要新建文档吗？当前内容将被清空。')) {
          setMarkdown('')
        }
        return
    }
    
    // 插入文本（这里简化处理，实际应该在光标位置插入）
    if (newText) {
      setMarkdown(markdown + '\n' + newText)
    }
  }
  
  // 处理飞书文档粘贴
  const handlePasteFeishu = (markdown: string) => {
    toast('飞书文档导入成功！')
  }
  
  // 处理复制
  const handleCopy = () => {
    toast('已复制到剪贴板，可以粘贴到公众号了！')
  }
  
  // 处理导出
  const handleExport = () => {
    toast('文档已导出！')
  }
  
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* 顶部栏 */}
      <header className="h-14 border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">公众号排版工具</h1>
          <span className="text-sm text-muted-foreground">智能 Markdown 编辑器</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            支持直接粘贴飞书文档
          </span>
        </div>
      </header>
      
      {/* 主体区域 */}
      <div className="flex-1 flex">
        {/* 左侧编辑器 */}
        <div className="w-1/2 border-r flex flex-col">
          <Toolbar
            onAction={handleToolbarAction}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
          />
          <div className="flex-1 overflow-hidden">
            <MarkdownEditor
              value={markdown}
              onChange={setMarkdown}
              onPasteFeishu={handlePasteFeishu}
            />
          </div>
        </div>
        
        {/* 右侧预览 */}
        <div className="w-1/2 flex flex-col">
          <ThemeSelector value={themeId} onChange={setThemeId} />
          <div className="flex-1 overflow-hidden">
            <Preview
              markdown={markdown}
              themeId={themeId}
              onCopy={handleCopy}
              onExport={handleExport}
            />
          </div>
        </div>
      </div>
      
      {/* AI 助手按钮 */}
      <Button
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg"
        onClick={() => setIsAiOpen(!isAiOpen)}
        title="AI 助手"
      >
        <Bot className="h-6 w-6" />
      </Button>
      
      {/* AI 助手面板 */}
      <AIAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      
      {/* Toast 提示 */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-4 py-2 rounded-md shadow-lg z-50">
          {showToast}
        </div>
      )}
    </div>
  )
}