export default function CitySearchPage() {
  const cities = [
    { id: 1, name: 'Paris', country: 'France', costIndex: 'High', popularity: 95, image: 'paris' },
    { id: 2, name: 'Tokyo', country: 'Japan', costIndex: 'High', popularity: 92, image: 'tokyo' },
    { id: 3, name: 'New York', country: 'USA', costIndex: 'High', popularity: 90, image: 'newyork' },
    { id: 4, name: 'Bali', country: 'Indonesia', costIndex: 'Low', popularity: 88, image: 'bali' },
    { id: 5, name: 'Rome', country: 'Italy', costIndex: 'Medium', popularity: 87, image: 'rome' },
    { id: 6, name: 'Barcelona', country: 'Spain', costIndex: 'Medium', popularity: 85, image: 'barcelona' },
    { id: 7, name: 'London', country: 'UK', costIndex: 'High', popularity: 84, image: 'london' },
    { id: 8, name: 'Dubai', country: 'UAE', costIndex: 'High', popularity: 82, image: 'dubai' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Cities</h1>
          <p className="mt-2 text-gray-600">Discover and add destinations to your trip</p>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search cities..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">All Countries</option>
                <option value="france">France</option>
                <option value="japan">Japan</option>
                <option value="usa">USA</option>
                <option value="italy">Italy</option>
                <option value="spain">Spain</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">All Cost Levels</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cities.map((city) => (
            <div key={city.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-indigo-400 to-purple-500"></div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{city.name}</h3>
                    <p className="text-sm text-gray-600">{city.country}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    city.costIndex === 'Low' ? 'bg-green-100 text-green-800' :
                    city.costIndex === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {city.costIndex} Cost
                  </span>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm text-gray-600">{city.popularity}% Popular</span>
                  </div>
                </div>

                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-700">
                  Add to Trip
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Load More Cities
          </button>
        </div>
      </div>
    </div>
  )
}
