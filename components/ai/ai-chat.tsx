'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Send, Loader2 } from 'lucide-react'
import { useEditorStore } from '@/lib/store'
import { markdownToHtml } from '@/lib/markdown'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface AIChatProps {
  selectedModel: string
}

export function AIChat({ selectedModel }: AIChatProps) {
  const { markdown } = useEditorStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim() || isLoading) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: ''
    }
    
    setMessages(prev => [...prev, assistantMessage])
    
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          model: selectedModel,
          context: markdown.slice(0, 1000)
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to get response')
      }
      
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      
      if (!reader) {
        throw new Error('No reader available')
      }
      
      let accumulatedContent = ''
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value, { stream: true })
        accumulatedContent += chunk
        
        setMessages(prev => {
          const newMessages = [...prev]
          const lastMessage = newMessages[newMessages.length - 1]
          if (lastMessage && lastMessage.role === 'assistant') {
            lastMessage.content = accumulatedContent
          }
          return newMessages
        })
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => {
        const newMessages = [...prev]
        const lastMessage = newMessages[newMessages.length - 1]
        if (lastMessage && lastMessage.role === 'assistant') {
          lastMessage.content = '抱歉，AI 服务暂时不可用，请稍后再试。'
        }
        return newMessages
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* 聊天记录 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm">
            <p className="mb-2">我是您的 AI 写作助手</p>
            <p>可以帮您：</p>
            <ul className="mt-2 space-y-1 text-left inline-block">
              <li>• 优化文章内容和结构</li>
              <li>• 提供排版建议</li>
              <li>• 生成标题和摘要</li>
              <li>• 回答写作相关问题</li>
            </ul>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.content ? (
                  message.role === 'assistant' ? (
                    <div 
                      className="prose prose-sm max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ 
                        __html: markdownToHtml(message.content) 
                      }}
                    />
                  ) : (
                    message.content
                  )
                ) : (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* 输入区域 */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入您的问题..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 border rounded-md text-sm"
          />
          <Button
            type="submit"
            size="sm"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}