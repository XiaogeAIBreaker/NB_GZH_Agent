'use client'

import React from 'react'
import { themes } from '@/lib/themes'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ThemeSelectorProps {
  value: string
  onChange: (themeId: string) => void
}

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  // 分组主题
  const wechatThemes = themes.filter(t => 
    ['wechat-classic', 'wechat-modern', 'wechat-colorful'].includes(t.id)
  )
  const classicThemes = themes.filter(t => 
    ['minimal-black', 'warm-orange', 'fresh-green', 'elegant-purple', 'tech-blue'].includes(t.id)
  )
  const coolThemes = themes.filter(t => 
    ['gradient-rainbow', 'cyberpunk', 'summer-heat', 'crystal-dream', 'streaming-light', 'luxury-gold'].includes(t.id)
  )

  return (
    <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-700">选择主题样式 ✨</h3>
        
        <Tabs value={value} onValueChange={onChange}>
          <div className="space-y-3">
            {/* 公众号专用主题 */}
            <div>
              <p className="text-xs text-green-600 mb-2 font-semibold">📱 公众号专用 (完美兼容)</p>
              <TabsList className="w-full h-auto p-1 bg-gradient-to-r from-green-100 to-blue-100">
                <div className="grid grid-cols-3 gap-2 w-full">
                  {wechatThemes.map((theme) => (
                    <TabsTrigger
                      key={theme.id}
                      value={theme.id}
                      className="w-full py-3 px-3 text-xs font-semibold
                        data-[state=active]:bg-gradient-to-r 
                        data-[state=active]:from-green-500 
                        data-[state=active]:to-blue-500 
                        data-[state=active]:text-white
                        data-[state=active]:shadow-lg
                        hover:bg-white/70
                        transition-all duration-200
                        border border-green-200"
                      title={theme.description}
                    >
                      <span className="block truncate">{theme.name}</span>
                    </TabsTrigger>
                  ))}
                </div>
              </TabsList>
            </div>

            {/* 炫酷主题 */}
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">🔥 炫酷主题 (预览效果)</p>
              <TabsList className="w-full h-auto p-1 bg-gradient-to-r from-purple-100 to-pink-100">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 w-full">
                  {coolThemes.map((theme) => (
                    <TabsTrigger
                      key={theme.id}
                      value={theme.id}
                      className="w-full py-2.5 px-3 text-xs font-medium
                        data-[state=active]:bg-gradient-to-r 
                        data-[state=active]:from-purple-500 
                        data-[state=active]:to-pink-500 
                        data-[state=active]:text-white
                        data-[state=active]:shadow-lg
                        hover:bg-white/50
                        transition-all duration-200"
                      title={theme.description}
                    >
                      <span className="block truncate">{theme.name}</span>
                    </TabsTrigger>
                  ))}
                </div>
              </TabsList>
            </div>

            {/* 经典主题 */}
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">📚 经典主题</p>
              <TabsList className="w-full h-auto p-1 bg-gray-100">
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 w-full">
                  {classicThemes.map((theme) => (
                    <TabsTrigger
                      key={theme.id}
                      value={theme.id}
                      className="w-full py-2 px-3 text-xs font-medium
                        data-[state=active]:bg-gray-800
                        data-[state=active]:text-white
                        data-[state=active]:shadow-md
                        hover:bg-gray-200
                        transition-all duration-200"
                      title={theme.description}
                    >
                      <span className="block truncate">{theme.name}</span>
                    </TabsTrigger>
                  ))}
                </div>
              </TabsList>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}