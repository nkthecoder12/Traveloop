export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Traveler!</h1>
          <p className="mt-2 text-gray-600">Ready to plan your next adventure?</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upcoming Trips</h3>
            <p className="text-3xl font-bold text-indigo-600">3</p>
            <p className="text-sm text-gray-600">Trips planned</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Budget</h3>
            <p className="text-3xl font-bold text-green-600">$4,500</p>
            <p className="text-sm text-gray-600">Across all trips</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Destinations</h3>
            <p className="text-3xl font-bold text-purple-600">12</p>
            <p className="text-sm text-gray-600">Cities visited</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Trips</h2>
            <a href="/trips" className="text-indigo-600 hover:text-indigo-500">View All</a>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="font-medium text-gray-900">European Adventure</h3>
              <p className="text-sm text-gray-600">Paris, Rome, Barcelona • Jun 15-30, 2024</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium text-gray-900">Tokyo Getaway</h3>
              <p className="text-sm text-gray-600">Tokyo, Kyoto • Aug 10-20, 2024</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Popular Destinations</h2>
            <a href="/search/cities" className="text-indigo-600 hover:text-indigo-500">Explore</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-gray-900">Paris</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-gray-900">Tokyo</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-gray-900">New York</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-gray-900">Bali</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/trips/create"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Plan New Trip
          </a>
        </div>
      </div>
    </div>
  )
}
