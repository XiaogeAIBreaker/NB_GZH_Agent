/**
 * 全局状态管理
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EditorState {
  // 编辑器内容
  markdown: string
  setMarkdown: (markdown: string) => void
  
  // 当前主题
  themeId: string
  setThemeId: (themeId: string) => void
  
  // 文章标题
  title: string
  setTitle: (title: string) => void
  
  // 历史记录
  history: string[]
  historyIndex: number
  pushHistory: (content: string) => void
  undo: () => void
  redo: () => void
  
  // AI 助手状态
  isAiOpen: boolean
  setIsAiOpen: (isOpen: boolean) => void
  
  // 重置状态
  reset: () => void
}

const MAX_HISTORY = 50

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      // 初始状态
      markdown: '',
      themeId: 'minimal-black',
      title: '',
      history: [],
      historyIndex: -1,
      isAiOpen: false,
      
      // Actions
      setMarkdown: (markdown) => {
        set({ markdown })
        // 自动保存到历史记录
        const state = get()
        if (state.history[state.historyIndex] !== markdown) {
          state.pushHistory(markdown)
        }
      },
      
      setThemeId: (themeId) => set({ themeId }),
      
      setTitle: (title) => set({ title }),
      
      pushHistory: (content) => {
        set((state) => {
          const newHistory = [
            ...state.history.slice(0, state.historyIndex + 1),
            content
          ].slice(-MAX_HISTORY)
          
          return {
            history: newHistory,
            historyIndex: newHistory.length - 1
          }
        })
      },
      
      undo: () => {
        const { history, historyIndex } = get()
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1
          set({
            historyIndex: newIndex,
            markdown: history[newIndex]
          })
        }
      },
      
      redo: () => {
        const { history, historyIndex } = get()
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1
          set({
            historyIndex: newIndex,
            markdown: history[newIndex]
          })
        }
      },
      
      setIsAiOpen: (isAiOpen) => set({ isAiOpen }),
      
      reset: () => set({
        markdown: '',
        themeId: 'minimal-black',
        title: '',
        history: [],
        historyIndex: -1,
        isAiOpen: false
      })
    }),
    {
      name: 'wechat-editor-storage',
      partialize: (state) => ({
        markdown: state.markdown,
        themeId: state.themeId,
        title: state.title
      })
    }
  )
)