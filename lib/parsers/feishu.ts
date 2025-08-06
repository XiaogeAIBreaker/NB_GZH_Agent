/**
 * 飞书文档解析器
 * 用于将飞书富文本转换为 Markdown 格式
 */

import TurndownService from 'turndown'
import { tables } from 'turndown-plugin-gfm'

// 初始化 Turndown 服务（HTML to Markdown）
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
  strongDelimiter: '**',
  br: '\n',  // 处理换行
  fence: '```',  // 代码块围栏
})

// 添加表格支持
turndownService.use(tables)

// 飞书特定的转换规则
const addFeishuRules = () => {
  // 首先添加规则来处理所有的p标签
  turndownService.addRule('paragraph', {
    filter: 'p',
    replacement: function (content) {
      const trimmed = content.trim()
      if (!trimmed) return ''
      return trimmed + '\n\n'
    }
  })
  
  // 处理标题 - 包括带emoji的标题
  turndownService.addRule('heading', {
    filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    replacement: function (content, node) {
      const hLevel = Number(node.nodeName.charAt(1))
      const prefix = '#'.repeat(hLevel)
      return '\n\n' + prefix + ' ' + content.trim() + '\n\n'
    }
  })
  
  // 检测可能是标题的文本（基于内容特征）- 移除这个规则，避免误判
  // 标题应该由文档结构（如h1-h6标签或特定的class）来决定，而不是内容
  
  // 处理加粗文本
  turndownService.addRule('bold', {
    filter: ['strong', 'b'],
    replacement: function (content) {
      // 清理内容，避免嵌套的星号
      const cleaned = content.trim()
      if (!cleaned) return ''
      return '**' + cleaned + '**'
    }
  })
  
  // 处理斜体文本
  turndownService.addRule('italic', {
    filter: ['em', 'i'],
    replacement: function (content) {
      // 清理内容，避免嵌套的星号
      const cleaned = content.trim()
      if (!cleaned) return ''
      return '*' + cleaned + '*'
    }
  })
  
  // 处理段落（确保段落之间有换行）- 移除这个规则，已经有新的p标签规则了

  // 处理div作为段落（飞书常用div包裹内容）
  turndownService.addRule('divParagraph', {
    filter: (node) => {
      if (node instanceof HTMLElement) {
        // 排除特殊用途的div
        const isSpecialDiv = node.classList?.contains('code-block') ||
                           node.classList?.contains('heading-h1') ||
                           node.classList?.contains('heading-h2') ||
                           node.classList?.contains('heading-h3') ||
                           node.getAttribute('role') === 'list' ||
                           node.querySelector('ul, ol, table, pre') ||
                           node.querySelector('thead, tbody, tr, td, th')
        
        return node.nodeName === 'DIV' && !isSpecialDiv
      }
      return false
    },
    replacement: (content) => {
      const trimmed = content.trim()
      if (!trimmed) return ''
      
      // 不要自动将div转换为标题，保持为普通段落
      // 如果内容不是以特殊格式开头（如标题、列表等），添加换行
      if (!trimmed.match(/^(#|\*|-|\d+\.|>|\[|\!)/)) {
        return trimmed + '\n\n'
      }
      return trimmed + '\n'
    }
  })

  // 飞书标题样式
  turndownService.addRule('feishuHeading', {
    filter: (node) => {
      if (node instanceof HTMLElement) {
        // 检测飞书的标题类名
        const isHeading = node.classList?.contains('heading-h1') ||
                node.classList?.contains('heading-h2') ||
                         node.classList?.contains('heading-h3') ||
                         node.classList?.contains('heading')
        
        // 检测飞书文档中的标题元素（h1-h6）
        const isHTag = /^H[1-6]$/.test(node.nodeName)
        
        return (node.nodeName === 'DIV' && isHeading) || isHTag
      }
      return false
    },
    replacement: (content, node) => {
      if (node instanceof HTMLElement) {
        let level = 2 // 默认二级标题
        
        // 从类名中提取级别
        if (node.classList?.contains('heading-h1')) level = 1
        else if (node.classList?.contains('heading-h2')) level = 2
        else if (node.classList?.contains('heading-h3')) level = 3
        
        // 从标签名中提取级别
        else if (/^H([1-6])$/.test(node.nodeName)) {
          level = parseInt(node.nodeName.charAt(1))
        }
        
        return '\n\n' + '#'.repeat(level) + ' ' + content.trim() + '\n\n'
      }
      return content
    }
  })

  // 处理列表项（飞书可能使用div或span来表示列表）
  turndownService.addRule('feishuListItem', {
    filter: (node) => {
      if (node instanceof HTMLElement) {
        const text = node.textContent || ''
        // 检测是否是列表项模式（以数字、破折号、星号等开头）
        const isListItem = (node.nodeName === 'DIV' || node.nodeName === 'SPAN') && 
                          /^[\d]+[\.\、]|^[\-\*\+\•\◦\▪\▫]/.test(text)
        return isListItem
      }
      return false
    },
    replacement: (content) => {
      const trimmed = content.trim()
      // 转换为标准Markdown列表格式
      const converted = trimmed
        .replace(/^[\d]+[\.\、]\s*/, (match) => {
          const num = match.match(/\d+/)?.[0] || '1'
          return `${num}. `
        })
        .replace(/^[\-\*\+\•\◦\▪\▫]\s*/, '- ')
      
      return converted + '\n'
    }
  })

  // 飞书代码块
  turndownService.addRule('feishuCodeBlock', {
    filter: (node) => {
      if (node instanceof HTMLElement) {
        return (node.nodeName === 'PRE' && node.classList?.contains('code-block')) ||
               (node.nodeName === 'CODE' && node.parentElement?.nodeName === 'PRE')
      }
      return false
    },
    replacement: (content, node) => {
      if (node instanceof HTMLElement) {
        const lang = node.getAttribute('data-language') || 
                    node.getAttribute('class')?.match(/language-(\w+)/)?.[1] || ''
        return '\n```' + lang + '\n' + content.trim() + '\n```\n\n'
      }
      return content
    }
  })

  // 处理表格（增强表格识别）
  turndownService.addRule('enhancedTable', {
    filter: function (node) {
      if (node.nodeName === 'TABLE') return true
      
      // 检测看起来像表格的结构
      if (node instanceof HTMLElement) {
        const hasTableStructure = !!node.querySelector('tr, td, th, thead, tbody')
        return hasTableStructure
      }
      return false
    },
    replacement: function (content, node) {
      if (!(node instanceof HTMLElement)) return content
      
      const rows = node.querySelectorAll('tr')
      
      if (!rows.length) {
        // 如果没有标准表格结构，尝试其他处理方式
        return content
      }
      
      // 正常的表格处理逻辑
      let result = '\n\n'
      let maxCellCount = 0
      
      // 首先计算最大列数
      rows.forEach(row => {
        const cells = row.querySelectorAll('td, th')
        maxCellCount = Math.max(maxCellCount, cells.length)
      })
      
      let headerRowAdded = false
      
      rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td, th')
        if (cells.length) {
          const cellContents: string[] = []
          
          // 收集所有单元格内容
          cells.forEach((cell, cellIndex) => {
            let cellText = ''
            
            // 检查是否有复杂内容
            const hasLists = cell.querySelector('ul, ol, li')
            const hasParagraphs = cell.querySelectorAll('p').length > 1
            const hasBreaks = cell.querySelector('br')
            
            // 收集单元格的所有内容元素
            const contentParts: string[] = []
            
            // 获取单元格的直接文本节点和所有子元素
            const processNode = (node: Node) => {
              if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent?.trim()
                if (text) {
                  contentParts.push(text)
                }
              } else if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement
                
                // 处理各种元素类型
                if (element.tagName === 'UL' || element.tagName === 'OL') {
                  // 处理列表
                  const isOrdered = element.tagName === 'OL'
                  const listItems = Array.from(element.querySelectorAll(':scope > li'))  // 只获取直接子元素
                  listItems.forEach((li, idx) => {
                    // 递归处理列表项内容
                    let itemContent = ''
                    li.childNodes.forEach(child => {
                      if (child.nodeType === Node.TEXT_NODE) {
                        itemContent += child.textContent?.trim() || ''
                      } else if (child.nodeType === Node.ELEMENT_NODE) {
                        const childElement = child as HTMLElement
                        if (childElement.tagName === 'STRONG' || childElement.tagName === 'B') {
                          itemContent += `**${childElement.textContent?.trim() || ''}**`
                        } else if (childElement.tagName === 'EM' || childElement.tagName === 'I') {
                          itemContent += `*${childElement.textContent?.trim() || ''}*`
                        } else {
                          itemContent += childElement.textContent?.trim() || ''
                        }
                      }
                    })
                    
                    if (itemContent) {
                      if (isOrdered) {
                        contentParts.push(`${idx + 1}. ${itemContent}`)
                      } else {
                        contentParts.push(`${itemContent}`)
                      }
                    }
                  })
                } else if (element.tagName === 'P') {
                  // 处理段落
                  let paraHtml = element.innerHTML
                    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
                    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
                    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
                    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
                    .replace(/<[^>]+>/g, '')
                    .trim()
                  if (paraHtml) {
                    contentParts.push(paraHtml)
                  }
                } else if (element.tagName === 'STRONG' || element.tagName === 'B') {
                  const text = element.textContent?.trim()
                  if (text) {
                    contentParts.push(`**${text}**`)
                  }
                } else if (element.tagName === 'EM' || element.tagName === 'I') {
                  const text = element.textContent?.trim()
                  if (text) {
                    contentParts.push(`*${text}*`)
                  }
                } else if (element.tagName === 'BR') {
                  // BR标签暂时跳过，因为Markdown表格不支持换行
                  // contentParts.push(' ')
                } else if (element.tagName === 'LI') {
                  // 独立的列表项（不在ul/ol中）
                  const text = element.textContent?.trim()
                  if (text) {
                    contentParts.push(`• ${text}`)
                  }
                } else {
                  // 递归处理子节点
                  element.childNodes.forEach(child => processNode(child))
                }
              }
            }
            
            // 处理单元格的所有子节点
            cell.childNodes.forEach(node => processNode(node))
            
            // 使用HTML的<br>标签来实现单元格内换行
            // Markdown表格支持内嵌HTML
            cellText = contentParts
              .filter(part => part && part.trim())  // 过滤空内容
              .join('<br>')
            
            // 最终清理
            cellText = cellText
              .replace(/<br><br>/g, '<br>')  // 移除重复的换行
              .replace(/^<br>/g, '')  // 移除开头的换行
              .replace(/<br>$/g, '')  // 移除结尾的换行
              .replace(/\|/g, '\\|')  // 转义管道符
              .trim()
            
            // 如果没有内容，确保单元格不为空
            if (!cellText) {
              cellText = ' '
            }
            
            cellContents.push(cellText)
          })
          
          // 补齐空单元格
          while (cellContents.length < maxCellCount) {
            cellContents.push('')
          }
          
          // 生成表格行
          result += '| ' + cellContents.join(' | ') + ' |\n'
          
          // 只在第一行后添加一次分隔行
          if (!headerRowAdded && (index === 0 || row.querySelector('th'))) {
            const separators = Array(maxCellCount).fill('---')
            result += '| ' + separators.join(' | ') + ' |\n'
            headerRowAdded = true
          }
        }
      })
      result += '\n'
      
      return result
    }
  })
  
  // 飞书图片处理
  turndownService.addRule('feishuImage', {
    filter: 'img',
    replacement: (content, node) => {
      if (node instanceof HTMLElement) {
        const src = node.getAttribute('src')
        const alt = node.getAttribute('alt') || '图片'
        
        // 如果是飞书的图片URL，标记需要后续处理
        if (src?.includes('feishu') || src?.includes('lark')) {
          // TODO: 实现图片上传到 Supabase
          return `\n![${alt}](${src})\n\n`
        }
        
        // 如果没有src，返回占位符
        if (!src) {
          return `\n[${alt}]\n\n`
        }
        
        return `\n![${alt}](${src})\n\n`
      }
      return content
    }
  })

  // 处理换行标签
  turndownService.addRule('lineBreak', {
    filter: 'br',
    replacement: () => '  \n'  // Markdown换行需要两个空格
  })
}

// 应用规则
addFeishuRules()

/**
 * 预处理飞书HTML
 */
function preprocessFeishuHtml(html: string): string {
  // 预处理前HTML长度: html.length
  
  let processed = html
  
  // 1. 移除meta标签，它们会干扰解析
  processed = processed.replace(/<meta[^>]*>/gi, '')
  
  // 2. 处理飞书特有的ace-line类div - 这些是实际的段落内容
  // 飞书使用ace-line类来标记每一行内容，将它们转换为标准的p标签
  // 但要小心处理已经存在的strong标签
  processed = processed.replace(/<div[^>]*class="[^"]*ace-line[^"]*"[^>]*>/gi, '<p>')
  
  // 3. 处理其他div标签
  processed = processed
    .replace(/<div([^>]*(?:table|grid|row|cell)[^>]*)>/gi, '<div$1>')  // 保留表格相关的div属性
    .replace(/<div[^>]*>/gi, '<div>')
    .replace(/<\/div>/gi, '</div>')
  
  // 4. 识别并标准化加粗格式
  processed = processed
    .replace(/<span[^>]*style="[^"]*font-weight:\s*(?:bold|[6-9]00)[^"]*"[^>]*>([^<]+)<\/span>/gi, '<strong>$1</strong>')
    .replace(/<span[^>]*class="[^"]*bold[^"]*"[^>]*>([^<]+)<\/span>/gi, '<strong>$1</strong>')
    
  // 5. 清理飞书特定的属性
  const attributesToRemove = [
    'data-feishu-[^"]*',
    'contenteditable',
    'data-docx-[^"]*',
    'spellcheck',
    'data-lark-[^"]*',
    'data-record-[^"]*',
    'data-page-[^"]*',
    'data-type',
    'data-ace-[^"]*',
    'old-record-id-[^"]*',
    'class="[^"]*ace-line[^"]*"',
    'class="[^"]*old-record[^"]*"',
    'style="[^"]*text-align:\s*center[^"]*"'
  ]
  
  attributesToRemove.forEach(attr => {
    const regex = new RegExp(`\\s${attr}="[^"]*"`, 'gi')
    processed = processed.replace(regex, '')
  })
  
  // 6. 清理空标签
  processed = processed.replace(/<span[^>]*>\s*<\/span>/g, '')
  
  // 7. 处理段落分隔
  processed = processed.replace(/<\/p>\s*<p/g, '</p>\n\n<p')
  
  // 8. 处理特殊字符
  processed = processed.replace(/[\u200B-\u200D\uFEFF]/g, '') // 移除零宽字符
  
  // 预处理后保留的HTML标签数量: (processed.match(/<[^>]+>/g) || []).length
  // 预处理后的p标签数量: (processed.match(/<p[^>]*>/g) || []).length
    
  return processed
}

/**
 * 后处理Markdown
 */
function postprocessMarkdown(markdown: string): string {
  // 首先保护表格（用占位符替换）
  const tables: string[] = []
  let tableIndex = 0
  let processed = markdown.replace(/(\n\|[^\n]+\|(?:\n\|[^\n]+\|)*)/g, (match) => {
    tables.push(match)
    return `\n__TABLE_PLACEHOLDER_${tableIndex++}__`
  })
  
  // 处理emoji和特殊字符（确保正确显示）
  processed = processed
    // 使用更安全的emoji匹配模式
    .replace(/([\uD83C-\uD83E][\uDC00-\uDFFF])/g, '$1 ')  // emoji后添加空格
    
  // 处理列表格式 - 但要避免影响加粗语法
  processed = processed
    .replace(/^(\s*)[-+]\s+/gm, '$1- ')  // 统一使用 - 作为无序列表标记，但不处理单独的星号
    .replace(/^(\s*)(\d+)[.、]\s+/gm, '$1$2. ')  // 统一有序列表格式，确保后面有空格
    
  // 确保列表项之间的格式正确
  processed = processed
    .replace(/^([-+]|\d+[.、])\s*(.+)$/gm, '$1 $2')  // 确保列表标记后有空格，但不处理星号
    
  // 修复段落分隔 - 但不要破坏表格
  processed = processed
    .replace(/([^>\n])\n([^#\-*\d>\[\n|])/g, '$1\n\n$2')  // 段落之间添加空行，但排除表格行（以|开头）
    .replace(/\n{3,}/g, '\n\n')  // 清理多余的空行
  
  // 确保标题前后有空行（但不破坏表格）
  processed = processed
    .replace(/([^\n|])\n(#{1,6}\s)/g, '$1\n\n$2')
    .replace(/(#{1,6}\s[^\n]+)\n([^\n#|])/g, '$1\n\n$2')
  
  // 确保代码块前后有空行
  processed = processed
    .replace(/([^\n])\n(```)/g, '$1\n\n$2')
    .replace(/(```[^\n]*\n[^`]*```)\n([^\n])/g, '$1\n\n$2')
    
  // 确保引用块前后有空行
  processed = processed
    .replace(/([^\n])\n(>)/g, '$1\n\n$2')
    .replace(/(>[^\n]+)\n([^>\n])/g, '$1\n\n$2')
  
  // 清理行首行尾空格
  processed = processed
    .split('\n')
    .map(line => line.trim())
    .join('\n')
  
  // 最终清理：移除文档开头和结尾的空行
  processed = processed.trim()
  
  // 确保文档结构清晰
  processed = processed.replace(/\n{3,}/g, '\n\n')
  
  // 恢复表格
  tables.forEach((table, index) => {
    processed = processed.replace(`__TABLE_PLACEHOLDER_${index}__`, table)
  })
  
  return processed
}

/**
 * 主转换函数：将飞书HTML转换为Markdown
 */
export async function convertFeishuToMarkdown(html: string): Promise<string> {
  // 预处理HTML
  const processedHtml = preprocessFeishuHtml(html)
  
  // 创建一个临时的div来解析HTML
  const tempDiv = typeof document !== 'undefined' ? document.createElement('div') : null
  
  let markdown = ''
  
  try {
    // 如果在浏览器环境，使用DOM解析来帮助提取内容
    if (tempDiv) {
      tempDiv.innerHTML = processedHtml
      
      // 移除script和style标签
      tempDiv.querySelectorAll('script, style, noscript').forEach(el => el.remove())
      
      // 获取清理后的HTML
      const cleanedHtml = tempDiv.innerHTML
      // 清理后的HTML长度: cleanedHtml.length
      
      // 统计内容元素
      const pCount = tempDiv.querySelectorAll('p').length
      const h2Count = tempDiv.querySelectorAll('h2').length
      const tableCount = tempDiv.querySelectorAll('table').length
      // 内容统计 - p标签: ${pCount}, h2标签: ${h2Count}, table标签: ${tableCount}
      
      // 如果p标签很多但转换结果很短，可能是Turndown的问题
      if (pCount > 5) {
        // 手动提取所有p标签内容作为备选
        const paragraphs = Array.from(tempDiv.querySelectorAll('p'))
        const headings = Array.from(tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        
        let manualMarkdown = ''
        
        // 先添加所有标题
        headings.forEach(h => {
          const level = parseInt(h.tagName.charAt(1))
          const text = h.textContent?.trim() || ''
          if (text) {
            manualMarkdown += '#'.repeat(level) + ' ' + text + '\n\n'
          }
        })
        
        // 再添加所有段落
        paragraphs.forEach(p => {
          // 保留内部的HTML结构进行转换
          let text = p.innerHTML
          
          // 处理strong标签
          text = text.replace(/<strong>([^<]*)<\/strong>/gi, '**$1**')
          
          // 处理em标签
          text = text.replace(/<em>([^<]*)<\/em>/gi, '*$1*')
          
          // 移除其他HTML标签
          text = text.replace(/<[^>]+>/g, '').trim()
          
          if (text) {
            manualMarkdown += text + '\n\n'
          }
        })
        
        // 处理表格
        const tables = Array.from(tempDiv.querySelectorAll('table'))
        tables.forEach(table => {
          const tableMarkdown = turndownService.turndown(table.outerHTML)
          if (tableMarkdown) {
            manualMarkdown += '\n\n' + tableMarkdown + '\n\n'
          }
        })
        
        // 尝试Turndown转换
        const turndownResult = turndownService.turndown(cleanedHtml)
        
        // 如果手动提取的内容更长，使用手动提取的
        if (manualMarkdown.length > turndownResult.length * 2) {
          // 使用手动提取的内容，因为Turndown结果太短
          markdown = manualMarkdown
        } else {
          markdown = turndownResult
        }
      } else {
  // 转换为Markdown
        markdown = turndownService.turndown(cleanedHtml)
      }
    } else {
      // 服务端环境，直接转换
      markdown = turndownService.turndown(processedHtml)
    }
    
    // 转换后Markdown长度: markdown.length
  // 转换后Markdown前500字符: markdown.substring(0, 500)
  
  // 后处理
  markdown = postprocessMarkdown(markdown)
  // 后处理完成，最终Markdown长度: markdown.length
  
  // 如果转换结果太短，可能是转换失败
    if (markdown.length < html.length * 0.01 && html.length > 1000) {
      // 转换结果异常短（少于原始内容的1%），可能转换失败
      // 尝试提取纯文本...
      
      // 尝试提取纯文本作为备选方案
      if (tempDiv) {
        const textContent = tempDiv.textContent || tempDiv.innerText || ''
        if (textContent.length > markdown.length) {
          markdown = textContent
            .split('\n')
            .filter(line => line.trim())
            .join('\n\n')
        }
      }
    }
  } catch (error) {
    console.error('转换过程出错:', error)
    // 如果出错，尝试基础转换
    markdown = turndownService.turndown(html)
  }
  
  return markdown
}

/**
 * 检测是否为飞书内容
 */
export function isFeishuContent(html: string): boolean {
  const feishuIdentifiers = [
    'data-feishu',
    'docx-',
    'heading-h1',
    'heading-h2',
    'heading-h3',
    'lark-record-clipboard',
    'feishu.cn',
    'larksuite.com',
    'data-docx-',
    'ace-line',
    'data-record-type',
    'data-lark-',
    'docx_',
    'suite-',
    'editor-card'
  ]
  
  // 更宽松的检测：只要包含任意一个标识符就认为是飞书内容
  const hasFeishuIdentifier = feishuIdentifiers.some(identifier => 
    html.toLowerCase().includes(identifier.toLowerCase())
  )
  
  // 额外检查：如果HTML结构看起来像文档（有多个段落或标题）
  const looksLikeDocument = (html.match(/<div/gi)?.length || 0) > 3 ||
                           (html.match(/<p/gi)?.length || 0) > 2 ||
                           (html.match(/<h[1-6]/gi)?.length || 0) > 0
  
  // 飞书内容检测: {
  //   hasFeishuIdentifier,
  //   looksLikeDocument,
  //   htmlPreview: html.substring(0, 200)
  // }
  
  return hasFeishuIdentifier || looksLikeDocument
}

/**
 * 从剪贴板事件中提取飞书内容
 */
export async function extractFeishuFromClipboard(
  event: ClipboardEvent
): Promise<string | null> {
  const items = event.clipboardData?.items
  
  if (!items) return null
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.type === 'text/html') {
      return new Promise((resolve) => {
        item.getAsString((html) => {
          if (isFeishuContent(html)) {
            resolve(html)
          } else {
            resolve(null)
          }
        })
      })
    }
  }
  
  return null
}