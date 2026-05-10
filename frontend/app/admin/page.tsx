export default function AdminDashboardPage() {
  const stats = {
    totalUsers: 1247,
    totalTrips: 3842,
    activeUsers: 892,
    topCities: [
      { name: 'Paris', trips: 456 },
      { name: 'Tokyo', trips: 398 },
      { name: 'New York', trips: 367 },
      { name: 'Rome', trips: 312 },
      { name: 'Barcelona', trips: 289 }
    ]
  }

  const recentTrips = [
    { id: 1, user: 'John Doe', trip: 'European Adventure', date: '2024-06-10', status: 'active' },
    { id: 2, user: 'Jane Smith', trip: 'Asian Explorer', date: '2024-06-09', status: 'active' },
    { id: 3, user: 'Mike Johnson', trip: 'Weekend Getaway', date: '2024-06-08', status: 'completed' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Monitor platform usage and user activity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Users</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">+12% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Trips</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.totalTrips.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">+18% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Active Users</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
            <p className="text-sm text-blue-600 mt-1">71.5% of total</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Avg. Trip Duration</h3>
            <p className="text-2xl font-bold text-gray-900">8.5 days</p>
            <p className="text-sm text-gray-600 mt-1">Per trip</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Destinations</h2>
            <div className="space-y-3">
              {stats.topCities.map((city, index) => (
                <div key={city.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold text-sm">{index + 1}</span>
                    </span>
                    <span className="font-medium text-gray-900">{city.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-900 font-bold">{city.trips}</span>
                    <span className="text-gray-600 text-sm ml-1">trips</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Engagement</h2>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p>User engagement chart</p>
                <p className="text-sm">Daily active users over time</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Trips</h2>
              <button className="text-indigo-600 hover:text-indigo-800 text-sm">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trip Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTrips.map((trip) => (
                    <tr key={trip.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trip.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trip.trip}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trip.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          trip.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {trip.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">View</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Management</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">All Users</span>
                  <span className="text-gray-500">{stats.totalUsers}</span>
                </div>
              </button>
              <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Active Users</span>
                  <span className="text-gray-500">{stats.activeUsers}</span>
                </div>
              </button>
              <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Inactive Users</span>
                  <span className="text-gray-500">{stats.totalUsers - stats.activeUsers}</span>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">System Health</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">API Response Time</span>
                <span className="text-green-600 font-medium">124ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Database Status</span>
                <span className="text-green-600 font-medium">Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Server Uptime</span>
                <span className="text-green-600 font-medium">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Storage Used</span>
                <span className="text-yellow-600 font-medium">68%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
