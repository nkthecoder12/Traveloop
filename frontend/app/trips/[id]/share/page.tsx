export default function SharedItineraryPage() {
  const tripData = {
    name: "European Adventure",
    dates: "June 15-30, 2024",
    destinations: ["Paris, France", "Rome, Italy", "Barcelona, Spain"],
    totalDays: 16,
    budget: "$3,500",
    activities: [
      "Eiffel Tower Visit",
      "Louvre Museum Tour", 
      "Colosseum Tour",
      "Vatican City Visit",
      "Sagrada Familia",
      "Park Güell"
    ]
  }

  const shareUrl = "https://traveloop.com/share/european-adventure-2024"

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-64 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{tripData.name}</h1>
              <p className="text-xl text-gray-600">{tripData.dates}</p>
              <div className="flex justify-center items-center space-x-6 mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{tripData.destinations.length}</p>
                  <p className="text-sm text-gray-600">Destinations</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{tripData.totalDays}</p>
                  <p className="text-sm text-gray-600">Days</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{tripData.budget}</p>
                  <p className="text-sm text-gray-600">Budget</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Destinations</h2>
              <div className="space-y-4">
                {tripData.destinations.map((destination, index) => (
                  <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{destination}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Activities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tripData.activities.map((activity, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Share This Trip</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 border border-blue-300 rounded-md px-3 py-2 bg-white text-sm"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                    Copy Link
                  </button>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium">
                  Copy This Trip
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium">
                  Save to Favorites
                </button>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Created with Traveloop - Personalized Travel Planning Made Easy</p>
              <p className="mt-2">
                Want to create your own amazing trips?{' '}
                <a href="/auth/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Sign up for free
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
