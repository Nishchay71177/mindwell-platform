import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

// Demo responses for preview when API key is not available
const demoResponses = [
  "I understand you're going through a challenging time. It's completely normal to feel overwhelmed sometimes, especially as a student. Remember that seeking support is a sign of strength, not weakness. Have you tried any breathing exercises or mindfulness techniques recently?",
  
  "Thank you for sharing that with me. It sounds like you're dealing with a lot right now. One technique that many students find helpful is the 5-4-3-2-1 grounding exercise: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This can help when feeling anxious or overwhelmed.",
  
  "I hear you, and your feelings are completely valid. Academic pressure can be really intense. Have you considered breaking down your tasks into smaller, more manageable chunks? Sometimes when everything feels overwhelming, focusing on just the next small step can make a big difference.",
  
  "It's great that you're taking time to check in with yourself. Self-awareness is such an important part of mental wellness. How has your sleep been lately? Getting quality rest can have a huge impact on how we feel and cope with stress.",
  
  "I'm glad you're reaching out. Remember that it's okay to not be okay sometimes. What's one small thing you could do today to take care of yourself? It could be as simple as taking a short walk, listening to your favorite song, or reaching out to a friend.",
]

let genAI: GoogleGenerativeAI | null = null
let model: any = null

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey)
  model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig: {
      temperature: 0.7,
      topK: 1,
      topP: 1,
      maxOutputTokens: 1000,
    },
  })
}

// Function to get a demo response
const getDemoResponse = (message: string): string => {
  // Simple keyword-based responses for better demo experience
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelm')) {
    return "I understand you're feeling stressed. It's completely normal, especially as a student. Try the 4-7-8 breathing technique: inhale for 4 counts, hold for 7, exhale for 8. This can help activate your body's relaxation response. Remember, you're stronger than you think! 💙"
  }
  
  if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
    return "Anxiety can feel overwhelming, but you're not alone in this. Try the 5-4-3-2-1 grounding technique: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This helps bring you back to the present moment. How are you feeling right now?"
  }
  
  if (lowerMessage.includes('sleep') || lowerMessage.includes('tired')) {
    return "Sleep is so important for mental health! Try creating a bedtime routine: dim the lights 1 hour before bed, avoid screens, and try some gentle stretching or reading. Your mind and body will thank you. What's your current sleep schedule like?"
  }
  
  if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depressed')) {
    return "I hear you, and I want you to know that your feelings are valid. It's okay to feel sad sometimes. Have you been able to connect with friends or family recently? Sometimes talking to someone we trust can help. Also, gentle movement like a short walk can boost mood naturally. 🌱"
  }
  
  if (lowerMessage.includes('exam') || lowerMessage.includes('study') || lowerMessage.includes('academic')) {
    return "Academic pressure is real! Try breaking your study sessions into 25-minute focused blocks with 5-minute breaks (the Pomodoro Technique). Remember to celebrate small wins along the way. You've got this! What subject are you working on?"
  }
  
  // Default supportive response
  return demoResponses[Math.floor(Math.random() * demoResponses.length)]
}

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
    // If no API key is available, return demo response
    if (!apiKey || !model) {
      // Simulate API delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
      return getDemoResponse(message)
    }
    
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
      // Fallback to demo response if API fails
      return getDemoResponse(message)
    }
  }

  async generateConversationTitle(messages: Array<{role: string, content: string}>): Promise<string> {
    if (!apiKey || !model) {
      const firstUserMessage = messages.find(msg => msg.role === 'user')?.content || ''
      const keywords = firstUserMessage.toLowerCase()
      
      if (keywords.includes('stress')) return 'Managing Stress'
      if (keywords.includes('anxiety')) return 'Anxiety Support'
      if (keywords.includes('sleep')) return 'Sleep Help'
      if (keywords.includes('study') || keywords.includes('exam')) return 'Academic Support'
      if (keywords.includes('sad') || keywords.includes('down')) return 'Emotional Support'
      
      return 'Wellness Chat'
    }
    
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