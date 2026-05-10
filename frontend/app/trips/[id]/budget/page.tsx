export default function BudgetPage() {
  const budgetData = {
    total: 3500,
    breakdown: {
      transport: 1200,
      accommodation: 1400,
      activities: 500,
      meals: 400
    },
    dailyAverage: 219,
    days: 16
  }

  const dailyBudgets = [
    { day: 1, date: 'June 15', city: 'Paris', budget: 250, actual: 225, status: 'under' },
    { day: 2, date: 'June 16', city: 'Paris', budget: 200, actual: 280, status: 'over' },
    { day: 3, date: 'June 17', city: 'Paris', budget: 225, actual: 225, status: 'exact' },
    { day: 4, date: 'June 18', city: 'Paris', budget: 200, actual: 180, status: 'under' },
    { day: 5, date: 'June 19', city: 'Rome', budget: 220, actual: 220, status: 'exact' },
    { day: 6, date: 'June 20', city: 'Rome', budget: 200, actual: 190, status: 'under' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trip Budget</h1>
          <p className="mt-2 text-gray-600">European Adventure • June 15-30, 2024</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Budget</h3>
            <p className="text-2xl font-bold text-gray-900">${budgetData.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Daily Average</h3>
            <p className="text-2xl font-bold text-green-600">${budgetData.dailyAverage}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Trip Duration</h3>
            <p className="text-2xl font-bold text-blue-600">{budgetData.days} days</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Remaining</h3>
            <p className="text-2xl font-bold text-purple-600">$1,320</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Budget Breakdown</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Transport</span>
                  <span className="text-sm font-bold text-gray-900">${budgetData.breakdown.transport}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '34%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Accommodation</span>
                  <span className="text-sm font-bold text-gray-900">${budgetData.breakdown.accommodation}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '40%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Activities</span>
                  <span className="text-sm font-bold text-gray-900">${budgetData.breakdown.activities}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '14%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Meals</span>
                  <span className="text-sm font-bold text-gray-900">${budgetData.breakdown.meals}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{width: '12%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Budget Chart</h2>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                <p>Budget visualization chart</p>
                <p className="text-sm">Pie chart showing expense distribution</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Budget Tracking</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dailyBudgets.map((day) => (
                    <tr key={day.day}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day.day}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.city}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${day.budget}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${day.actual}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          day.status === 'under' ? 'bg-green-100 text-green-800' :
                          day.status === 'over' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {day.status === 'under' ? 'Under Budget' :
                           day.status === 'over' ? 'Over Budget' : 'On Budget'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <a
            href="/trips/1/itinerary"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Back to Itinerary
          </a>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Export Budget Report
          </button>
        </div>
      </div>
    </div>
  )
}
