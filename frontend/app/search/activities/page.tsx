export default function ActivitySearchPage() {
  const activities = [
    { id: 1, name: 'Eiffel Tower Visit', city: 'Paris', type: 'Sightseeing', duration: '2 hours', cost: 25, rating: 4.8 },
    { id: 2, name: 'Louvre Museum Tour', city: 'Paris', type: 'Museum', duration: '3 hours', cost: 30, rating: 4.7 },
    { id: 3, name: 'Seine River Cruise', city: 'Paris', type: 'Cruise', duration: '2 hours', cost: 75, rating: 4.9 },
    { id: 4, name: 'Colosseum Tour', city: 'Rome', type: 'Historical', duration: '2 hours', cost: 40, rating: 4.8 },
    { id: 5, name: 'Vatican City Visit', city: 'Rome', type: 'Religious', duration: '4 hours', cost: 50, rating: 4.9 },
    { id: 6, name: 'Sagrada Familia', city: 'Barcelona', type: 'Architecture', duration: '2 hours', cost: 35, rating: 4.7 },
    { id: 7, name: 'Park Güell', city: 'Barcelona', type: 'Park', duration: '1.5 hours', cost: 20, rating: 4.6 },
    { id: 8, name: 'Food Tour', city: 'Rome', type: 'Food', duration: '3 hours', cost: 60, rating: 4.8 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Activities</h1>
          <p className="mt-2 text-gray-600">Find things to do in your destination cities</p>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Search activities..."
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">All Cities</option>
                <option value="paris">Paris</option>
                <option value="rome">Rome</option>
                <option value="barcelona">Barcelona</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">All Types</option>
                <option value="sightseeing">Sightseeing</option>
                <option value="museum">Museum</option>
                <option value="food">Food</option>
                <option value="historical">Historical</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">All Costs</option>
                <option value="free">Free</option>
                <option value="low">Under $25</option>
                <option value="medium">$25-50</option>
                <option value="high">Over $50</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500"></div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{activity.name}</h3>
                    <p className="text-sm text-gray-600">{activity.city}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                    {activity.type}
                  </span>
                </div>
                
                <div className="flex items-center mb-2">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm text-gray-600">{activity.rating}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{activity.duration}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">${activity.cost}</span>
                  <button className="bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-700">
                    Add to Trip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Load More Activities
          </button>
        </div>
      </div>
    </div>
  )
}
