'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Code,
  Image,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Save,
  FileText,
} from 'lucide-react'

interface ToolbarProps {
  onAction: (action: string, value?: any) => void
  canUndo?: boolean
  canRedo?: boolean
}

export function Toolbar({ onAction, canUndo = false, canRedo = false }: ToolbarProps) {
  const tools = [
    { icon: Bold, action: 'bold', title: '加粗 (Ctrl+B)' },
    { icon: Italic, action: 'italic', title: '斜体 (Ctrl+I)' },
    { icon: Link, action: 'link', title: '链接 (Ctrl+K)' },
    { type: 'separator' },
    { icon: Heading1, action: 'h1', title: '一级标题' },
    { icon: Heading2, action: 'h2', title: '二级标题' },
    { icon: Heading3, action: 'h3', title: '三级标题' },
    { type: 'separator' },
    { icon: List, action: 'ul', title: '无序列表' },
    { icon: ListOrdered, action: 'ol', title: '有序列表' },
    { icon: Quote, action: 'quote', title: '引用' },
    { icon: Code, action: 'code', title: '代码块' },
    { type: 'separator' },
    { icon: Image, action: 'image', title: '插入图片' },
    { type: 'separator' },
    { icon: Undo, action: 'undo', title: '撤销', disabled: !canUndo },
    { icon: Redo, action: 'redo', title: '重做', disabled: !canRedo },
  ]
  
  return (
    <div className="flex items-center gap-1 p-2 border-b bg-background">
      {tools.map((tool, index) => {
        if (tool.type === 'separator') {
          return <div key={index} className="w-px h-6 bg-border mx-1" />
        }
        
        const Icon = tool.icon
        return (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => onAction(tool.action)}
            disabled={tool.disabled}
            title={tool.title}
            className="h-8 w-8 p-0"
          >
            <Icon className="h-4 w-4" />
          </Button>
        )
      })}
      
      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAction('save')}
          title="保存 (Ctrl+S)"
        >
          <Save className="h-4 w-4 mr-1" />
          保存
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAction('new')}
          title="新建文档"
        >
          <FileText className="h-4 w-4 mr-1" />
          新建
        </Button>
      </div>
    </div>
  )
}