import { createDeepSeek } from '@ai-sdk/deepseek'
import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'

// 初始化模型提供者
const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY || '',
  baseURL: 'https://api.deepseek.com/v1'
})

const openai = process.env.OPENAI_API_KEY ? createOpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null

export async function POST(req: Request) {
  try {
    // 检查 API Key
    if (!process.env.DEEPSEEK_API_KEY) {
      console.error('DEEPSEEK_API_KEY is not configured')
      return new Response('AI 服务未配置', { status: 503 })
    }
    
    const { messages, model = 'deepseek-chat', context } = await req.json()
    
    // 构建系统提示词
    const systemPrompt = `你是一个专业的公众号文章排版助手。你的任务是：
1. 帮助用户优化文章内容，使其更适合在微信公众号发布
2. 提供排版建议，让文章更美观易读
3. 协助用户改进文章结构和语言表达
4. 提供标题优化建议
5. 帮助生成文章摘要

当前文章内容：
${context || '暂无内容'}

请根据用户的问题提供专业建议。`
    
    // 选择模型
    let selectedModel
    if (model.startsWith('deepseek')) {
      selectedModel = deepseek(model)
    } else if (model.startsWith('gpt') && openai) {
      selectedModel = openai(model)
    } else {
      selectedModel = deepseek('deepseek-chat')
    }
    
    // 流式响应
    const result = await streamText({
      model: selectedModel,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      maxTokens: 2000,
    })
    
    // 返回标准的文本流响应
    return result.toTextStreamResponse()
  } catch (error) {
    console.error('AI chat error:', error)
    return new Response('AI 服务暂时不可用', { status: 500 })
  }
}