'use client'

import React, { useMemo, useRef } from 'react'
import { convertMarkdownToWechat } from '@/lib/markdown'
import { getThemeById } from '@/lib/themes'
import { Button } from '@/components/ui/button'
import { Copy, Download, RefreshCw } from 'lucide-react'

interface PreviewProps {
  markdown: string
  themeId: string
  onCopy?: () => void
  onExport?: () => void
}

export function Preview({ markdown, themeId, onCopy, onExport }: PreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)
  
  // 生成预览 HTML
  const previewHtml = useMemo(() => {
    const html = convertMarkdownToWechat(markdown)
    const theme = getThemeById(themeId)
    
    if (!theme) return html
    
    // 应用主题样式
    return `
      <style>${theme.styles}</style>
      <div class="wechat-article">
        ${html}
      </div>
    `
  }, [markdown, themeId])
  
  // 复制到剪贴板
  const handleCopy = async () => {
    if (!previewRef.current) return
    
    try {
      // 获取预览区域的 HTML
      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(previewRef.current)
      selection?.removeAllRanges()
      selection?.addRange(range)
      
      // 执行复制
      document.execCommand('copy')
      
      // 清除选择
      selection?.removeAllRanges()
      
      onCopy?.()
      
      // 显示成功提示
      console.log('复制成功！可以粘贴到公众号编辑器了')
    } catch (error) {
      console.error('复制失败：', error)
    }
  }
  
  // 导出 HTML
  const handleExport = () => {
    const blob = new Blob([previewHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wechat-article-${Date.now()}.html`
    a.click()
    URL.revokeObjectURL(url)
    
    onExport?.()
  }
  
  return (
    <div className="h-full flex flex-col">
      {/* 工具栏 */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-sm font-medium text-muted-foreground">预览</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            title="复制到剪贴板"
          >
            <Copy className="w-4 h-4 mr-1" />
            复制
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            title="导出 HTML 文件"
          >
            <Download className="w-4 h-4 mr-1" />
            导出
          </Button>
        </div>
      </div>
      
      {/* 预览区域 */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-[677px] mx-auto p-6">
          <div
            ref={previewRef}
            dangerouslySetInnerHTML={{ __html: previewHtml }}
            className="wechat-article-container"
          />
        </div>
      </div>
    </div>
  )
}