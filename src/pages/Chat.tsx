import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, ChatConversation, ChatMessage } from '@/lib/supabase'
import { geminiService } from '@/lib/gemini'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquare, Send, Plus, Bot, User, Loader2 } from 'lucide-react'

const Chat = () => {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<ChatConversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<ChatConversation | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingConversations, setLoadingConversations] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user) {
      loadConversations()
    }
  }, [user])

  useEffect(() => {
    if (currentConversation) {
      loadMessages(currentConversation.id)
    }
  }, [currentConversation])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadConversations = async () => {
    if (!user) return

    try {
      setLoadingConversations(true)
      const { data, error } = await supabase
        .from('chat_conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (error) throw error
      
      setConversations(data || [])
      
      // Load the most recent conversation if available
      if (data && data.length > 0 && !currentConversation) {
        setCurrentConversation(data[0])
      }
    } catch (error) {
      console.error('Error loading conversations:', error)
    } finally {
      setLoadingConversations(false)
    }
  }

  const loadMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const createNewConversation = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert([
          {
            user_id: user.id,
            title: 'New Conversation',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) throw error

      setCurrentConversation(data)
      setMessages([])
      await loadConversations()
    } catch (error) {
      console.error('Error creating conversation:', error)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || !user || loading) return

    const messageContent = inputMessage.trim()
    setInputMessage('')
    setLoading(true)

    try {
      let conversationId = currentConversation?.id

      // Create new conversation if none exists
      if (!conversationId) {
        const { data, error } = await supabase
          .from('chat_conversations')
          .insert([
            {
              user_id: user.id,
              title: 'New Conversation',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          .select()
          .single()

        if (error) throw error
        conversationId = data.id
        setCurrentConversation(data)
      }

      // Add user message
      const { error: userMessageError } = await supabase
        .from('chat_messages')
        .insert([
          {
            conversation_id: conversationId,
            role: 'user',
            content: messageContent,
            created_at: new Date().toISOString(),
          },
        ])

      if (userMessageError) throw userMessageError

      // Reload messages to show user message
      if (conversationId) {
        await loadMessages(conversationId)
      }

      // Get conversation history for context
      const { data: historyData } = await supabase
        .from('chat_messages')
        .select('role, content')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      const conversationHistory = historyData?.slice(-10) || [] // Last 10 messages for context

      // Generate AI response
      const aiResponse = await geminiService.generateResponse(
        messageContent,
        conversationHistory.slice(0, -1) // Exclude the current message
      )

      // Add AI response
      const { error: aiMessageError } = await supabase
        .from('chat_messages')
        .insert([
          {
            conversation_id: conversationId,
            role: 'assistant',
            content: aiResponse,
            created_at: new Date().toISOString(),
          },
        ])

      if (aiMessageError) throw aiMessageError

      // Update conversation title if it's a new conversation
      if (messages.length === 0) {
        const title = await geminiService.generateConversationTitle([
          { role: 'user', content: messageContent },
          { role: 'assistant', content: aiResponse }
        ])

        await supabase
          .from('chat_conversations')
          .update({ 
            title: title.substring(0, 50), // Limit title length
            updated_at: new Date().toISOString() 
          })
          .eq('id', conversationId)
      }

      // Award points for chat session
      await supabase
        .from('wellness_points')
        .insert([
          {
            user_id: user.id,
            points: 5,
            source: 'chat_session',
            description: 'Wellness chat session',
            created_at: new Date().toISOString(),
          },
        ])

      // Reload everything
      if (conversationId) {
        await loadMessages(conversationId)
      }
      await loadConversations()

    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loadingConversations) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Wellness Coach</h1>
        <p className="text-lg text-gray-600">
          Get personalized support and guidance for your mental wellness journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-250px)]">
        {/* Conversations Sidebar */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <Button onClick={createNewConversation} size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setCurrentConversation(conversation)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentConversation?.id === conversation.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-sm truncate">
                      {conversation.title}
                    </div>
                    <div className="text-xs opacity-75 mt-1">
                      {new Date(conversation.updated_at).toLocaleDateString()}
                    </div>
                  </button>
                ))}
                
                {conversations.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">No conversations yet.</p>
                    <p className="text-xs">Start a new chat!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>
                  {currentConversation?.title || 'AI Wellness Coach'}
                </span>
              </CardTitle>
            </CardHeader>
            
            {/* Messages */}
            <CardContent className="flex-1 flex flex-col p-4">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 py-12">
                    <Bot className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">
                      Welcome to your AI Wellness Coach
                    </h3>
                    <p className="text-sm max-w-md mx-auto mb-4">
                      I'm here to support you on your mental wellness journey. 
                      Feel free to share what's on your mind, ask for coping strategies, 
                      or just have a chat about how you're feeling.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto">
                      <button
                        onClick={() => setInputMessage("I'm feeling stressed about my exams")}
                        className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg transition-colors"
                      >
                        💭 "I'm feeling stressed about exams"
                      </button>
                      <button
                        onClick={() => setInputMessage("I'm having trouble sleeping")}
                        className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-lg transition-colors"
                      >
                        😴 "I'm having trouble sleeping"
                      </button>
                      <button
                        onClick={() => setInputMessage("I've been feeling anxious lately")}
                        className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-2 rounded-lg transition-colors"
                      >
                        😰 "I've been feeling anxious"
                      </button>
                      <button
                        onClick={() => setInputMessage("Can you help me with study tips?")}
                        className="text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 px-3 py-2 rounded-lg transition-colors"
                      >
                        📚 "Help with study tips"
                      </button>
                    </div>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    
                    <div className={`flex-1 ${
                      message.role === 'user' ? 'text-right' : ''
                    }`}>
                      <div className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      <div className={`text-xs text-gray-500 mt-1 ${
                        message.role === 'user' ? 'text-right' : ''
                      }`}>
                        {new Date(message.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={sendMessage} className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  disabled={loading}
                  className="flex-1"
                />
                <Button type="submit" disabled={loading || !inputMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Chat