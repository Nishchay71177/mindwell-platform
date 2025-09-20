import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, WellnessPoint } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { 
  User, 
  Star, 
  Trophy, 
  Calendar,
  Edit3,
  Save,
  X,
  Award
} from 'lucide-react'

const Profile = () => {
  const { user, profile, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [wellnessPoints, setWellnessPoints] = useState<WellnessPoint[]>([])
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name)
    }
  }, [profile])

  useEffect(() => {
    if (user) {
      fetchWellnessPoints()
    }
  }, [user])

  const fetchWellnessPoints = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('wellness_points')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      setWellnessPoints(data || [])
      const total = data?.reduce((sum, point) => sum + point.points, 0) || 0
      setTotalPoints(total)
    } catch (error) {
      console.error('Error fetching wellness points:', error)
    }
  }

  const handleSave = async () => {
    if (!displayName.trim()) return

    try {
      setLoading(true)
      await updateProfile({ display_name: displayName.trim() })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setDisplayName(profile?.display_name || '')
    setIsEditing(false)
  }

  const getPointsBreakdown = () => {
    const breakdown = wellnessPoints.reduce((acc, point) => {
      acc[point.source] = (acc[point.source] || 0) + point.points
      return acc
    }, {} as Record<string, number>)

    return Object.entries(breakdown).map(([source, points]) => ({
      source,
      points,
      label: source === 'mood_tracking' ? 'Mood Tracking' : 
             source === 'chat_session' ? 'AI Chat Sessions' :
             source === 'resource_usage' ? 'Resource Usage' : 
             'Other Activities'
    }))
  }

  const getStreakInfo = () => {
    // This would be calculated based on mood entries or activity
    // For now, we'll use a placeholder
    return {
      current: 0,
      longest: 0
    }
  }

  const getLevel = () => {
    // Simple level calculation based on points
    if (totalPoints < 50) return { level: 1, name: 'Wellness Newcomer', nextLevel: 50 }
    if (totalPoints < 150) return { level: 2, name: 'Mindful Explorer', nextLevel: 150 }
    if (totalPoints < 300) return { level: 3, name: 'Wellness Warrior', nextLevel: 300 }
    if (totalPoints < 500) return { level: 4, name: 'Mindfulness Master', nextLevel: 500 }
    return { level: 5, name: 'Zen Champion', nextLevel: null }
  }

  const pointsBreakdown = getPointsBreakdown()
  const streakInfo = getStreakInfo()
  const levelInfo = getLevel()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-lg text-gray-600">
          Manage your account and track your wellness journey progress
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  {(profile?.display_name || user?.email || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {isEditing ? (
                      <>
                        <Input
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="max-w-xs"
                          placeholder="Enter display name"
                        />
                        <Button onClick={handleSave} disabled={loading} size="sm">
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button onClick={handleCancel} variant="outline" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <h2 className="text-2xl font-semibold">
                          {profile?.display_name || 'Set Display Name'}
                        </h2>
                        <Button onClick={() => setIsEditing(true)} variant="ghost" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                  <p className="text-gray-600">{user?.email}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(user?.created_at || '').toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wellness Points History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>
                Your latest wellness point earnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {wellnessPoints.slice(0, 10).map((point) => (
                  <div key={point.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-sm">{point.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(point.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-primary font-medium">+{point.points}</span>
                    </div>
                  </div>
                ))}
                
                {wellnessPoints.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No activities yet!</p>
                    <p className="text-sm">Start tracking your mood or chatting with the AI coach to earn points.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Level & Points */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Wellness Level</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <div className="text-3xl font-bold text-primary mb-2">
                  Level {levelInfo.level}
                </div>
                <div className="text-lg font-medium text-gray-700 mb-4">
                  {levelInfo.name}
                </div>
                <div className="text-2xl font-bold text-amber-600">
                  {totalPoints} points
                </div>
              </div>
              
              {levelInfo.nextLevel && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress to Level {levelInfo.level + 1}</span>
                    <span>{totalPoints}/{levelInfo.nextLevel}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min((totalPoints / levelInfo.nextLevel) * 100, 100)}%` 
                      }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Points Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Points Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pointsBreakdown.map((item) => (
                  <div key={item.source} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm text-primary font-semibold">{item.points}</span>
                  </div>
                ))}
                
                {pointsBreakdown.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No points earned yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Achievements coming soon!</p>
                <p className="text-xs">Keep using MindWell to unlock badges and rewards.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile