import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, MoodEntry } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Calendar, TrendingUp } from 'lucide-react'

const moodOptions = [
  { value: 1, label: 'Very Low', emoji: '😢', color: 'bg-red-500' },
  { value: 2, label: 'Low', emoji: '🙁', color: 'bg-orange-500' },
  { value: 3, label: 'Okay', emoji: '😐', color: 'bg-yellow-500' },
  { value: 4, label: 'Good', emoji: '🙂', color: 'bg-green-500' },
  { value: 5, label: 'Great', emoji: '😄', color: 'bg-blue-500' },
]

const Mood = () => {
  const { user } = useAuth()
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [todayEntry, setTodayEntry] = useState<MoodEntry | null>(null)

  useEffect(() => {
    if (user) {
      fetchMoodEntries()
      checkTodayEntry()
    }
  }, [user])

  const fetchMoodEntries = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(7)

      if (error) throw error
      setMoodEntries(data || [])
    } catch (error) {
      console.error('Error fetching mood entries:', error)
    }
  }

  const checkTodayEntry = async () => {
    if (!user) return

    const today = new Date().toDateString()
    
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', new Date(today).toISOString())
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      setTodayEntry(data || null)
    } catch (error) {
      console.error('Error checking today entry:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMood || !user) return

    try {
      setLoading(true)
      const moodOption = moodOptions.find(m => m.value === selectedMood)!

      const { error } = await supabase
        .from('mood_entries')
        .insert([
          {
            user_id: user.id,
            mood_value: selectedMood,
            mood_label: moodOption.label,
            mood_emoji: moodOption.emoji,
            note: note.trim() || null,
            created_at: new Date().toISOString(),
          },
        ])

      if (error) throw error

      // Award points for mood logging
      await supabase
        .from('wellness_points')
        .insert([
          {
            user_id: user.id,
            points: 10,
            source: 'mood_tracking',
            description: 'Logged daily mood',
            created_at: new Date().toISOString(),
          },
        ])

      setSuccess('Mood logged successfully! +10 points')
      setSelectedMood(null)
      setNote('')
      fetchMoodEntries()
      checkTodayEntry()
    } catch (error: any) {
      console.error('Error logging mood:', error)
    } finally {
      setLoading(false)
    }
  }

  // Prepare chart data
  const chartData = moodEntries
    .reverse()
    .map(entry => ({
      date: new Date(entry.created_at).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      mood: entry.mood_value,
      emoji: entry.mood_emoji
    }))

  const averageMood = moodEntries.length > 0 
    ? (moodEntries.reduce((sum, entry) => sum + entry.mood_value, 0) / moodEntries.length).toFixed(1)
    : '0'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mood Tracker</h1>
        <p className="text-lg text-gray-600">
          Track your daily emotions and see your wellness journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Logging */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>How are you feeling today?</span>
            </CardTitle>
            <CardDescription>
              {todayEntry 
                ? 'You\'ve already logged your mood today! Come back tomorrow.'
                : 'Select your current mood and optionally add a note'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {todayEntry ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">{todayEntry.mood_emoji}</div>
                <h3 className="text-xl font-semibold mb-2">
                  You're feeling {todayEntry.mood_label.toLowerCase()}
                </h3>
                {todayEntry.note && (
                  <p className="text-gray-600 italic">"{todayEntry.note}"</p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {success && (
                  <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md">
                    {success}
                  </div>
                )}
                
                <div className="grid grid-cols-5 gap-2">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => setSelectedMood(mood.value)}
                      className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedMood === mood.value
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{mood.emoji}</div>
                      <span className="text-xs font-medium text-center">
                        {mood.label}
                      </span>
                    </button>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="note" className="text-sm font-medium">
                    Add a note (optional)
                  </label>
                  <Textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="How was your day? What's on your mind?"
                    className="resize-none"
                    rows={3}
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={!selectedMood || loading}
                  className="w-full"
                >
                  {loading ? 'Logging...' : 'Log Mood (+10 points)'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Mood Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Your Mood Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">7-Day Average</span>
                <span className="text-2xl font-bold text-primary">
                  {averageMood}/5
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Entries</span>
                <span className="text-lg font-semibold">{moodEntries.length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Entries */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {moodEntries.slice(0, 5).map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{entry.mood_emoji}</span>
                      <div>
                        <div className="font-medium">{entry.mood_label}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {moodEntries.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    No mood entries yet. Log your first mood above!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mood Chart */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Mood Trend (Last 7 Days)</CardTitle>
            <CardDescription>
              Track your emotional patterns over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[1, 5]} />
                  <Tooltip 
                    formatter={(value: any, name: any, props: any) => [
                      `${value}/5 ${props.payload.emoji}`,
                      'Mood'
                    ]}
                  />
                  <Bar dataKey="mood" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Mood