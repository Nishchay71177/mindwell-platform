import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  MessageSquare, 
  BarChart3, 
  BookOpen, 
  Star, 
  TrendingUp,
  Heart,
  Calendar
} from 'lucide-react'

const Dashboard = () => {
  const { profile } = useAuth()
  const currentHour = new Date().getHours()
  
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning'
    if (currentHour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  // Mock data - we'll replace this with real data later
  const stats = {
    totalPoints: 0,
    weeklyMoodAvg: 0,
    chatSessions: 0,
    streak: 0
  }

  const quickActions = [
    {
      title: 'Chat with AI Coach',
      description: 'Get personalized wellness support',
      icon: MessageSquare,
      href: '/chat',
      color: 'bg-blue-500'
    },
    {
      title: 'Log Your Mood',
      description: 'Track how you\'re feeling today',
      icon: BarChart3,
      href: '/mood',
      color: 'bg-green-500'
    },
    {
      title: 'Explore Resources',
      description: 'Browse wellness articles and exercises',
      icon: BookOpen,
      href: '/resources',
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getGreeting()}, {profile?.display_name || 'there'}! 👋
        </h1>
        <p className="text-lg text-gray-600">
          Welcome to your wellness dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wellness Points</CardTitle>
            <Star className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPoints}</div>
            <p className="text-xs text-muted-foreground">
              Earn points by staying active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Mood</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.weeklyMoodAvg > 0 ? `${stats.weeklyMoodAvg.toFixed(1)}/5` : '-'}
            </div>
            <p className="text-xs text-muted-foreground">
              Average this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chat Sessions</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.chatSessions}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.streak}</div>
            <p className="text-xs text-muted-foreground">
              Days in a row
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link to={action.href}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`${action.color} p-2 rounded-lg`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{action.title}</CardTitle>
                        <CardDescription>{action.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Link>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Today's Wellness Tip */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-primary" />
            <span>Today's Wellness Tip</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Take 5 minutes today to practice deep breathing. Inhale for 4 counts, 
            hold for 4, exhale for 4. This simple exercise can help reduce stress 
            and improve focus throughout your day.
          </p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/resources">
              Explore More Tips
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity - Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your wellness journey highlights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>Start tracking your mood or chat with the AI coach to see your activity here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard