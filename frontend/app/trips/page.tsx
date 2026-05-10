export default function TripsPage() {
  const trips = [
    {
      id: 1,
      name: "European Adventure",
      startDate: "2024-06-15",
      endDate: "2024-06-30",
      destinations: 3,
      status: "upcoming",
      budget: "$3,500"
    },
    {
      id: 2,
      name: "Tokyo Getaway",
      startDate: "2024-08-10",
      endDate: "2024-08-20",
      destinations: 2,
      status: "upcoming", 
      budget: "$2,800"
    },
    {
      id: 3,
      name: "Weekend in NYC",
      startDate: "2024-03-15",
      endDate: "2024-03-17",
      destinations: 1,
      status: "completed",
      budget: "$800"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
            <p className="mt-2 text-gray-600">Manage and view all your travel plans</p>
          </div>
          <a
            href="/trips/create"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create New Trip
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{trip.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    trip.status === 'upcoming' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {trip.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {trip.startDate} - {trip.endDate}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>{trip.destinations} destinations</span>
                  <span className="font-medium text-gray-900">{trip.budget}</span>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={`/trips/${trip.id}/itinerary`}
                    className="flex-1 text-center bg-indigo-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    View
                  </a>
                  <a
                    href={`/trips/${trip.id}/edit`}
                    className="flex-1 text-center bg-gray-200 text-gray-800 py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-300"
                  >
                    Edit
                  </a>
                  <button
                    className="bg-red-100 text-red-800 py-2 px-3 rounded-md text-sm font-medium hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {trips.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No trips yet</h3>
            <p className="text-gray-600 mb-4">Start planning your first adventure!</p>
            <a
              href="/trips/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Create Your First Trip
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
