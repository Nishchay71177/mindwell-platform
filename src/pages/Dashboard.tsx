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
  Calendar,
  Activity,
  Users,
  Target
} from 'lucide-react'

const Dashboard = () => {
  const { profile } = useAuth()
  const currentHour = new Date().getHours()
  
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning'
    if (currentHour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  // Demo data for preview
  const stats = {
    totalPoints: 245,
    weeklyMoodAvg: 4.2,
    chatSessions: 8,
    streak: 5
  }

  const recentActivities = [
    { type: 'mood', description: 'Logged mood: Great 😄', time: '2 hours ago', points: 10 },
    { type: 'chat', description: 'AI Coach session completed', time: '1 day ago', points: 5 },
    { type: 'resource', description: 'Read "Managing Academic Stress"', time: '2 days ago', points: 5 },
    { type: 'mood', description: 'Logged mood: Good 🙂', time: '2 days ago', points: 10 },
  ]

  const quickActions = [
    {
      title: 'Chat with AI Coach',
      description: 'Get personalized wellness support',
      icon: MessageSquare,
      href: '/chat',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Log Your Mood',
      description: 'Track how you\'re feeling today',
      icon: BarChart3,
      href: '/mood',
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Explore Resources',
      description: 'Browse wellness articles and exercises',
      icon: BookOpen,
      href: '/resources',
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600'
    }
  ]

  const weeklyGoals = [
    { title: 'Daily Mood Check-ins', current: 5, target: 7, icon: BarChart3 },
    { title: 'AI Coach Sessions', current: 2, target: 3, icon: MessageSquare },
    { title: 'Wellness Resources', current: 3, target: 5, icon: BookOpen },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          {getGreeting()}, {profile?.display_name || 'there'}! 👋
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Welcome to your wellness dashboard. You're doing great!
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Activity className="h-4 w-4" />
            <span>{stats.streak} day streak</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4" />
            <span>Level {Math.floor(stats.totalPoints / 100) + 1}</span>
          </div>
        </div>
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
              +15 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Mood</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.weeklyMoodAvg.toFixed(1)}/5
            </div>
            <p className="text-xs text-muted-foreground">
              Above your monthly average
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
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

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.streak}</div>
            <p className="text-xs text-muted-foreground">
              Keep it up! 🔥
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
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
                <Link to={action.href}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`bg-gradient-to-r ${action.gradient} p-3 rounded-xl shadow-lg`}>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Weekly Goals</span>
            </CardTitle>
            <CardDescription>Track your wellness activities this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyGoals.map((goal, index) => {
              const Icon = goal.icon
              const progress = (goal.current / goal.target) * 100
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">{goal.title}</span>
                    </div>
                    <span className="text-sm text-gray-500">{goal.current}/{goal.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your wellness journey highlights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <div className="text-primary font-medium text-sm">+{activity.points}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Wellness Tip */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-primary" />
            <span>Today's Wellness Tip</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            🌱 <strong>Mindful Moment:</strong> Take 5 minutes today to practice the 4-7-8 breathing technique. 
            Inhale for 4 counts, hold for 7, exhale for 8. This simple exercise can help reduce stress 
            and improve focus throughout your day.
          </p>
          <div className="flex space-x-3 mt-4">
            <Button variant="outline" asChild>
              <Link to="/resources">
                Try Now
              </Link>
            </Button>
            <Button variant="ghost" asChild>
            <Link to="/resources">
              More Tips
            </Link>
          </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard