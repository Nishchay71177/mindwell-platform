import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Music, 
  Wind, 
  Phone, 
  ExternalLink,
  Heart,
  Brain,
  Zap,
  Sun,
  Moon
} from 'lucide-react'

const Resources = () => {
  const articles = [
    {
      title: "Managing Academic Stress",
      description: "Learn effective strategies for dealing with study pressure and exam anxiety.",
      category: "Stress Management",
      readTime: "5 min read",
      icon: Brain
    },
    {
      title: "Building Healthy Sleep Habits",
      description: "Tips for improving sleep quality and establishing a consistent sleep routine.",
      category: "Sleep Hygiene", 
      readTime: "7 min read",
      icon: Moon
    },
    {
      title: "Mindful Study Techniques",
      description: "Incorporate mindfulness into your learning process for better focus and retention.",
      category: "Mindfulness",
      readTime: "6 min read",
      icon: Brain
    },
    {
      title: "Social Anxiety in College",
      description: "Understanding and overcoming social challenges in university settings.",
      category: "Social Skills",
      readTime: "8 min read",
      icon: Heart
    }
  ]

  const meditations = [
    {
      title: "5-Minute Stress Relief",
      description: "A quick meditation to reset during busy days",
      duration: "5 min",
      type: "Guided Meditation"
    },
    {
      title: "Body Scan for Sleep",
      description: "Progressive relaxation to prepare for rest",
      duration: "15 min", 
      type: "Sleep Meditation"
    },
    {
      title: "Focus & Concentration",
      description: "Enhance mental clarity for studying",
      duration: "10 min",
      type: "Focus Meditation"
    },
    {
      title: "Anxiety Relief",
      description: "Calm your mind during stressful moments",
      duration: "8 min",
      type: "Anxiety Relief"
    }
  ]

  const breathingExercises = [
    {
      name: "4-7-8 Breathing",
      description: "Inhale for 4, hold for 7, exhale for 8. Great for reducing anxiety.",
      duration: "3-5 minutes",
      difficulty: "Beginner"
    },
    {
      name: "Box Breathing", 
      description: "Equal counts for inhale, hold, exhale, hold. Used by professionals for focus.",
      duration: "5-10 minutes",
      difficulty: "Intermediate"
    },
    {
      name: "Belly Breathing",
      description: "Deep diaphragmatic breathing to activate relaxation response.",
      duration: "5-15 minutes", 
      difficulty: "Beginner"
    },
    {
      name: "Coherent Breathing",
      description: "5-second inhale, 5-second exhale for heart rate variability.",
      duration: "10-20 minutes",
      difficulty: "Advanced"
    }
  ]

  const emergencyResources = [
    {
      name: "National Suicide Prevention Lifeline",
      phone: "988",
      description: "24/7, free and confidential support for people in distress",
      available: "24/7"
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "Free, 24/7 support via text message",
      available: "24/7"
    },
    {
      name: "SAMHSA National Helpline",
      phone: "1-800-662-4357", 
      description: "Treatment referral and information service",
      available: "24/7"
    },
    {
      name: "Campus Counseling Center",
      phone: "Contact your university",
      description: "On-campus mental health support and counseling services",
      available: "Business hours"
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wellness Hub</h1>
        <p className="text-lg text-gray-600">
          Explore resources, exercises, and tools to support your mental wellness journey
        </p>
      </div>

      {/* Wellness Articles */}
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold text-gray-900">Wellness Articles</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => {
            const Icon = article.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                          <span>{article.category}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{article.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Guided Meditations */}
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <Music className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold text-gray-900">Guided Meditations</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meditations.map((meditation, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{meditation.title}</h3>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {meditation.duration}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{meditation.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{meditation.type}</span>
                  <Button size="sm" variant="outline">
                    Play
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Breathing Exercises */}
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <Wind className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold text-gray-900">Breathing Exercises</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {breathingExercises.map((exercise, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{exercise.name}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {exercise.difficulty}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{exercise.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{exercise.duration}</span>
                  <Button size="sm" variant="outline">
                    Start
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency Resources */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-800">
            <Phone className="h-6 w-6" />
            <span>Emergency Resources</span>
          </CardTitle>
          <CardDescription className="text-red-700">
            If you're in crisis or need immediate help, please reach out to these resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyResources.map((resource, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{resource.name}</h4>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    {resource.available}
                  </span>
                </div>
                <p className="text-red-800 font-mono text-lg mb-2">{resource.phone}</p>
                <p className="text-gray-600 text-sm">{resource.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Wellness Tips */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sun className="h-6 w-6 text-primary" />
            <span>Daily Wellness Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Stay Hydrated</h4>
              <p className="text-sm text-gray-600">Drink water regularly throughout the day for optimal brain function</p>
            </div>
            <div className="text-center p-4">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Move Your Body</h4>
              <p className="text-sm text-gray-600">Even a 10-minute walk can boost your mood and energy levels</p>
            </div>
            <div className="text-center p-4">
              <Sun className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Practice Gratitude</h4>
              <p className="text-sm text-gray-600">Take a moment to appreciate something positive in your day</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Resources