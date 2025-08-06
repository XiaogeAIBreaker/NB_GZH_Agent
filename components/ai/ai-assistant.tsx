'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, 
  X, 
  Wand2,
  FileText,
  Type,
  Hash
} from 'lucide-react'
import { useEditorStore } from '@/lib/store'
import { AIChat } from './ai-chat'

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
}

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const { markdown, setMarkdown } = useEditorStore()
  const [selectedModel, setSelectedModel] = useState('deepseek-chat')
  const [isOptimizing, setIsOptimizing] = useState(false)
  
  // 快捷操作
  const quickActions = [
    { 
      icon: Wand2, 
      label: '优化文章', 
      type: 'improve',
      description: '改善语言表达和结构'
    },
    { 
      icon: Type, 
      label: '润色文采', 
      type: 'polish',
      description: '提升文章文采'
    },
    { 
      icon: Hash, 
      label: '生成标题', 
      type: 'title',
      description: '生成吸引人的标题'
    },
    { 
      icon: FileText, 
      label: '生成摘要', 
      type: 'summary',
      description: '生成文章摘要'
    },
  ]
  
  // 执行快捷操作
  const handleQuickAction = async (type: string) => {
    if (!markdown) {
      alert('请先输入文章内容')
      return
    }
    
    setIsOptimizing(true)
    try {
      const response = await fetch('/api/ai/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: markdown,
          type,
          model: selectedModel
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        if (type === 'improve' || type === 'polish') {
          // 直接替换文章内容
          if (confirm('是否用优化后的内容替换当前文章？')) {
            setMarkdown(data.data)
          }
        } else {
          // 显示结果在聊天中
          alert(data.data)
        }
      }
    } catch (error) {
      console.error('Optimize error:', error)
    } finally {
      setIsOptimizing(false)
    }
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed bottom-20 right-6 w-96 bg-background border rounded-lg shadow-xl z-50">
      {/* 标题栏 */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">AI 助手</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* 快捷操作 */}
      <div className="p-4 border-b">
        <p className="text-sm text-muted-foreground mb-3">快捷操作</p>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.type}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.type)}
                disabled={isOptimizing || !markdown}
                className="justify-start"
                title={action.description}
              >
                <Icon className="w-4 h-4 mr-1" />
                {action.label}
              </Button>
            )
          })}
        </div>
      </div>
      
      {/* 模型选择 */}
      <div className="p-4 border-b">
        <label className="text-sm text-muted-foreground">选择模型</label>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
        >
          <option value="deepseek-chat">DeepSeek Chat</option>
          <option value="deepseek-coder">DeepSeek Coder</option>
          {process.env.NEXT_PUBLIC_OPENAI_API_KEY && (
            <>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            </>
          )}
        </select>
      </div>
      
      {/* 聊天界面 */}
      <div className="h-96">
        <AIChat selectedModel={selectedModel} />
      </div>
    </div>
  )
}