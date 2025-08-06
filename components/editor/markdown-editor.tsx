'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'
import { convertFeishuToMarkdown, isFeishuContent } from '@/lib/parsers/feishu'
import { useEditorStore } from '@/lib/store'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  onPasteFeishu?: (markdown: string) => void
}

export function MarkdownEditor({ value, onChange, onPasteFeishu }: MarkdownEditorProps) {
  const editorRef = useRef<any>(null)
  
  const handleChange = useCallback((val: string) => {
    onChange(val)
  }, [onChange])

  // 创建粘贴处理扩展
  const pasteHandler = EditorView.domEventHandlers({
    paste: (event, view) => {
      const html = event.clipboardData?.getData('text/html')
      const text = event.clipboardData?.getData('text/plain')
      
      // CodeMirror粘贴事件: { 
      //   hasHtml: !!html, 
      //   htmlLength: html?.length,
      //   hasText: !!text,
      //   textLength: text?.length 
      // }
      
      // 如果有HTML内容，尝试转换
      if (html) {
        const isFeishu = isFeishuContent(html)
        // 检测到HTML内容，是否为飞书: isFeishu
        
        // 如果是飞书或包含富文本格式，进行转换
        if (isFeishu || html.includes('<div') || html.includes('<p') || html.includes('<span')) {
          event.preventDefault()
          
          // 异步处理转换
          convertFeishuToMarkdown(html).then(markdown => {
            // 转换成功，Markdown长度: markdown.length
            // 转换后的Markdown前500字符: markdown.substring(0, 500)
            
            // 获取当前光标位置
            const { from, to } = view.state.selection.main
            
            // 插入转换后的内容
            view.dispatch({
              changes: { from, to, insert: markdown },
              selection: { anchor: from + markdown.length }
            })
            
            // 更新外部状态 - 需要在dispatch之后获取新的文档内容
            setTimeout(() => {
              const newContent = view.state.doc.toString()
              onChange(newContent)
              onPasteFeishu?.(markdown)
            }, 0)
          }).catch(error => {
            console.error('转换失败:', error)
            // 如果转换失败，插入纯文本
            if (text) {
              const { from, to } = view.state.selection.main
              view.dispatch({
                changes: { from, to, insert: text },
                selection: { anchor: from + text.length }
              })
              setTimeout(() => {
                onChange(view.state.doc.toString())
              }, 0)
            }
          })
          
          return true // 阻止默认行为
        }
      }
      
      return false // 使用默认粘贴行为
    }
  })

  // 编辑器扩展配置
  const extensions = [
    markdown(),
    EditorView.theme({
      '&': {
        fontSize: '14px',
      },
      '.cm-content': {
        padding: '16px',
      },
      '.cm-focused .cm-cursor': {
        borderLeftColor: '#1890ff',
      },
      '.cm-line': {
        lineHeight: '1.6',
      },
    }),
    EditorView.lineWrapping,
    pasteHandler, // 添加粘贴处理扩展
  ]

  return (
    <div className="h-full w-full">
      <CodeMirror
        ref={editorRef}
        value={value}
        height="100%"
        theme={oneDark}
        extensions={extensions}
        onChange={handleChange}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: false,
          highlightSelectionMatches: false,
          searchKeymap: true,
        }}
      />
    </div>
  )
}