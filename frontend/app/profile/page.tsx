'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { userService } from '@/services/userService'
import type { User, UserStats } from '@/types/api'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [profile, setProfile] = useState<User | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      setProfile(user)
      loadUserStats()
    }
  }, [user])

  const loadUserStats = async () => {
    try {
      const userStats = await userService.getStatistics()
      setStats(userStats)
    } catch (error) {
      console.error('Error loading user stats:', error)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file
      const validation = userService.validateProfilePhoto(file)
      if (!validation.valid) {
        setError(validation.error || 'Invalid file')
        return
      }

      setSelectedFile(file)
      setPreviewUrl(userService.createPhotoPreview(file))
      setError(null)
    }
  }

  const handlePhotoUpload = async () => {
    if (!selectedFile) return

    setIsLoading(true)
    try {
      const updatedUser = await userService.uploadProfilePhoto(selectedFile)
      setProfile(updatedUser)
      updateProfile(updatedUser)
      setSelectedFile(null)
      if (previewUrl) {
        userService.revokePhotoPreview(previewUrl)
        setPreviewUrl(null)
      }
    } catch (error: any) {
      setError(error.message || 'Failed to upload photo')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!profile) return

    setIsLoading(true)
    try {
      const updatedUser = await userService.updateProfile({
        name: profile.name,
        bio: profile.bio,
        language: profile.language,
        privacy: profile.privacy,
        notifications: profile.notifications
      })
      setProfile(updatedUser)
      updateProfile(updatedUser)
      setIsEditing(false)
    } catch (error: any) {
      setError(error.message || 'Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string | boolean) => {
    if (profile) {
      setProfile({ ...profile, [field]: value })
    }
  }

  const savedDestinations = [
    { id: 1, name: 'Paris', country: 'France', visits: 3 },
    { id: 2, name: 'Tokyo', country: 'Japan', visits: 2 },
    { id: 3, name: 'New York', country: 'USA', visits: 1 },
    { id: 4, name: 'Bali', country: 'Indonesia', visits: 1 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-indigo-600 hover:text-indigo-800 text-sm"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mr-4 overflow-hidden">
                    {profile?.avatar ? (
                      <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-2xl font-bold">
                          {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="text-indigo-600 hover:text-indigo-800 text-sm cursor-pointer">
                      Change Photo
                    </label>
                    {selectedFile && (
                      <div className="mt-2">
                        <button
                          onClick={handlePhotoUpload}
                          disabled={isLoading}
                          className="text-green-600 hover:text-green-800 text-sm mr-2"
                        >
                          {isLoading ? 'Uploading...' : 'Upload'}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedFile(null)
                            if (previewUrl) {
                              userService.revokePhotoPreview(previewUrl)
                              setPreviewUrl(null)
                            }
                          }}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile?.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full border border-gray-300 rounded-md px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profile?.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={true} // Email cannot be changed
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    value={profile?.bio || ''}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className={`w-full border border-gray-300 rounded-md px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    value={profile?.language || 'english'}
                    onChange={(e) => handleChange('language', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="italian">Italian</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Privacy Settings</label>
                  <select
                    value={profile?.privacy || 'public'}
                    onChange={(e) => handleChange('privacy', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={profile?.notifications || false}
                    onChange={(e) => handleChange('notifications', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900">
                    Email notifications for trip reminders
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistics</h2>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-indigo-600">12</p>
                  <p className="text-sm text-gray-600">Trips Created</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">28</p>
                  <p className="text-sm text-gray-600">Cities Visited</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">156</p>
                  <p className="text-sm text-gray-600">Days Traveled</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Destinations</h2>
              <div className="space-y-3">
                {savedDestinations.map((destination) => (
                  <div key={destination.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{destination.name}</p>
                      <p className="text-sm text-gray-600">{destination.country}</p>
                    </div>
                    <span className="text-sm text-gray-500">{destination.visits} visits</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-900 mb-2">Danger Zone</h2>
          <p className="text-red-700 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
