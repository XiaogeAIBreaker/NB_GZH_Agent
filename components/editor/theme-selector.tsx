'use client'

import React from 'react'
import { themes } from '@/lib/themes'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ThemeSelectorProps {
  value: string
  onChange: (themeId: string) => void
}

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <div className="p-4 border-b">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">选择主题</h3>
        <Tabs value={value} onValueChange={onChange}>
          <TabsList className="grid grid-cols-3 lg:grid-cols-5 gap-2 h-auto">
            {themes.map((theme) => (
              <TabsTrigger
                key={theme.id}
                value={theme.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                title={theme.description}
              >
                {theme.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}