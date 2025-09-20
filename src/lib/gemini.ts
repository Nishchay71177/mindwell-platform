import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

if (!apiKey) {
  throw new Error('Missing Gemini API key')
}

const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig: {
    temperature: 0.7,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  },
})

const WELLNESS_SYSTEM_PROMPT = `You are a compassionate AI wellness coach for students. Your role is to:

1. Provide empathetic, supportive responses
2. Offer practical coping strategies for stress, anxiety, and other mental health challenges
3. Encourage healthy habits and self-care
4. Help students develop emotional awareness and resilience
5. Suggest relaxation techniques, mindfulness practices, and stress management tools
6. Always encourage professional help for serious mental health concerns

Guidelines:
- Be warm, understanding, and non-judgmental
- Keep responses concise but meaningful (2-3 paragraphs max)
- Focus on actionable advice and coping strategies
- Validate feelings while encouraging positive steps forward
- Use encouraging, hopeful language
- If someone mentions self-harm or crisis, always recommend immediate professional help

Remember: You're here to support, not replace professional mental health care.`

export class GeminiService {
  async generateResponse(message: string, conversationHistory: Array<{role: string, content: string}> = []): Promise<string> {
    try {
      // Build conversation context
      let prompt = WELLNESS_SYSTEM_PROMPT + "\n\n"
      
      if (conversationHistory.length > 0) {
        prompt += "Previous conversation:\n"
        conversationHistory.forEach(msg => {
          prompt += `${msg.role}: ${msg.content}\n`
        })
        prompt += "\n"
      }
      
      prompt += `User: ${message}\n\nAssistant:`

      const result = await model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Error generating response:', error)
      throw new Error('Failed to generate response')
    }
  }

  async generateConversationTitle(messages: Array<{role: string, content: string}>): Promise<string> {
    try {
      const firstUserMessage = messages.find(msg => msg.role === 'user')?.content || 'New conversation'
      const prompt = `Generate a short, meaningful title (3-5 words) for a wellness conversation that starts with: "${firstUserMessage.substring(0, 100)}..."`
      
      const result = await model.generateContent(prompt)
      const response = await result.response
      return response.text().replace(/['"]/g, '').trim()
    } catch (error) {
      console.error('Error generating title:', error)
      return 'Wellness Conversation'
    }
  }
}

export const geminiService = new GeminiService()