'use client'

import { useState } from 'react'

export default function ItineraryBuilderPage() {
  const [stops, setStops] = useState([
    { id: 1, city: 'Paris, France', startDate: '2024-06-15', endDate: '2024-06-18', activities: [] },
    { id: 2, city: 'Rome, Italy', startDate: '2024-06-19', endDate: '2024-06-24', activities: [] },
    { id: 3, city: 'Barcelona, Spain', startDate: '2024-06-25', endDate: '2024-06-30', activities: [] }
  ])

  const addStop = () => {
    const newStop = {
      id: stops.length + 1,
      city: '',
      startDate: '',
      endDate: '',
      activities: []
    }
    setStops([...stops, newStop])
  }

  const removeStop = (id: number) => {
    setStops(stops.filter(stop => stop.id !== id))
  }

  const updateStop = (id: number, field: string, value: string) => {
    setStops(stops.map(stop => 
      stop.id === id ? { ...stop, [field]: value } : stop
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Build Your Itinerary</h1>
          <p className="mt-2 text-gray-600">Add cities, dates, and activities for your trip</p>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Trip Stops</h2>
              <button
                onClick={addStop}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Add Stop
              </button>
            </div>

            <div className="space-y-6">
              {stops.map((stop, index) => (
                <div key={stop.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-indigo-600 font-bold text-sm">{index + 1}</span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">Stop {index + 1}</h3>
                    </div>
                    {stops.length > 1 && (
                      <button
                        onClick={() => removeStop(stop.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={stop.city}
                        onChange={(e) => updateStop(stop.id, 'city', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={stop.startDate}
                        onChange={(e) => updateStop(stop.id, 'startDate', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={stop.endDate}
                        onChange={(e) => updateStop(stop.id, 'endDate', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Activities
                      </label>
                      <button
                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                      >
                        Add Activity
                      </button>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <p className="text-gray-500 text-sm">No activities added yet</p>
                      <button className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm">
                        Browse Activities
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">{stops.length}</p>
              <p className="text-sm text-gray-600">Destinations</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">16</p>
              <p className="text-sm text-gray-600">Total Days</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">$3,500</p>
              <p className="text-sm text-gray-600">Est. Budget</p>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Save Draft
            </button>
            <a
              href="/trips/1/itinerary"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View Itinerary
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
