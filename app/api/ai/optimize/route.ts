import { createDeepSeek } from '@ai-sdk/deepseek'
import { generateText } from 'ai'

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY || '',
  baseURL: 'https://api.deepseek.com/v1'
})

export async function POST(req: Request) {
  try {
    const { content, type = 'improve', model = 'deepseek-chat' } = await req.json()
    
    // 根据优化类型选择提示词
    let prompt = ''
    switch (type) {
      case 'improve':
        prompt = `请优化以下公众号文章，要求：
1. 改善语言表达，使其更加流畅自然
2. 优化段落结构，增强逻辑性
3. 适当添加过渡句，使文章更连贯
4. 保持原文的核心内容和风格
5. 修正语法错误和错别字

原文：
${content}

请直接返回优化后的文章内容。`
        break
        
      case 'title':
        prompt = `请为以下公众号文章生成5个吸引人的标题，要求：
1. 简洁有力，不超过20字
2. 符合公众号标题风格
3. 能吸引读者点击
4. 与文章内容高度相关

文章内容：
${content}

请返回5个标题，每行一个。`
        break
        
      case 'summary':
        prompt = `请为以下公众号文章生成100字左右的摘要，要求：
1. 概括文章核心内容
2. 语言简洁明了
3. 能吸引读者继续阅读

文章内容：
${content}

请直接返回摘要内容。`
        break
        
      case 'polish':
        prompt = `请润色以下公众号文章，要求：
1. 提升文采，使语言更优美
2. 增加适当的修辞手法
3. 优化句式，增强节奏感
4. 保持专业性和可读性的平衡

原文：
${content}

请直接返回润色后的文章内容。`
        break
        
      default:
        prompt = content
    }
    
    // 生成优化内容
    const result = await generateText({
      model: deepseek(model),
      prompt,
      temperature: 0.7,
      maxTokens: 3000,
    })
    
    return Response.json({
      success: true,
      data: result.text,
      type
    })
  } catch (error) {
    console.error('AI optimize error:', error)
    return Response.json(
      { success: false, error: 'AI 服务暂时不可用' },
      { status: 500 }
    )
  }
}