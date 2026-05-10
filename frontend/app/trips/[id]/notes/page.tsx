'use client'

import { useState } from 'react'

export default function TripNotesPage() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Hotel Check-in Information',
      content: 'Hotel Paris Plaza - Check-in at 3 PM, Booking #HP2024-1234',
      date: '2024-06-10',
      stopId: 1
    },
    {
      id: 2,
      title: 'Emergency Contacts',
      content: 'Local Emergency: 112\nUS Embassy: +33 1 43 12 22 22',
      date: '2024-06-10',
      stopId: null
    },
    {
      id: 3,
      title: 'Restaurant Reservations',
      content: 'Le Jules Verne - June 16, 7:30 PM (Eiffel Tower)\nLa Pergola - June 21, 8:00 PM (Rome)',
      date: '2024-06-12',
      stopId: null
    }
  ])

  const [newNote, setNewNote] = useState({ title: '', content: '', stopId: null })
  const [isAddingNote, setIsAddingNote] = useState(false)

  const stops = [
    { id: 1, name: 'Paris, France', dates: 'June 15-18' },
    { id: 2, name: 'Rome, Italy', dates: 'June 19-24' },
    { id: 3, name: 'Barcelona, Spain', dates: 'June 25-30' }
  ]

  const addNote = () => {
    if (newNote.title && newNote.content) {
      const note = {
        id: Date.now(),
        ...newNote,
        date: new Date().toISOString().split('T')[0]
      }
      setNotes([note, ...notes])
      setNewNote({ title: '', content: '', stopId: null })
      setIsAddingNote(false)
    }
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const getStopName = (stopId: number | null) => {
    if (!stopId) return 'General Trip Notes'
    return stops.find(stop => stop.id === stopId)?.name || 'Unknown'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trip Notes</h1>
          <p className="mt-2 text-gray-600">European Adventure • June 15-30, 2024</p>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">All Notes</h2>
              <button
                onClick={() => setIsAddingNote(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Add Note
              </button>
            </div>

            {isAddingNote && (
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">New Note</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter note title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Related to (Optional)</label>
                    <select
                      value={newNote.stopId || ''}
                      onChange={(e) => setNewNote({ ...newNote, stopId: e.target.value ? parseInt(e.target.value) : null })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">General Trip Notes</option>
                      {stops.map(stop => (
                        <option key={stop.id} value={stop.id}>
                          {stop.name} ({stop.dates})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      rows={4}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your note content..."
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsAddingNote(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addNote}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {notes.map((note) => (
                <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
                      <p className="text-sm text-gray-600">{getStopName(note.stopId)} • {note.date}</p>
                    </div>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="text-gray-700 whitespace-pre-wrap">{note.content}</div>
                </div>
              ))}
            </div>

            {notes.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
                <p className="text-gray-600 mb-4">Start adding notes to keep track of important trip information</p>
                <button
                  onClick={() => setIsAddingNote(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Add Your First Note
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Tips</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-indigo-600 text-xs font-bold">1</span>
                </div>
                <p className="text-gray-700">Add hotel check-in details and confirmation numbers</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-indigo-600 text-xs font-bold">2</span>
                </div>
                <p className="text-gray-700">Save emergency contacts and local embassy information</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-indigo-600 text-xs font-bold">3</span>
                </div>
                <p className="text-gray-700">Keep track of restaurant reservations and booking confirmations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
