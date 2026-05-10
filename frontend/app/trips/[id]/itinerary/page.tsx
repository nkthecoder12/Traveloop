export default function ItineraryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">European Adventure</h1>
          <p className="mt-2 text-gray-600">June 15-30, 2024 • 3 Destinations</p>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button className="py-4 px-1 border-b-2 border-indigo-500 font-medium text-sm text-indigo-600">
                Timeline View
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Calendar View
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                List View
              </button>
            </nav>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Paris, France</h3>
                <p className="text-gray-600">June 15-18, 2024 • 4 days</p>
              </div>
            </div>
            
            <div className="space-y-4 ml-16">
              <div className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">Eiffel Tower Visit</h4>
                    <p className="text-sm text-gray-600">9:00 AM - 11:00 AM</p>
                    <p className="text-sm text-gray-500 mt-1">Iconic landmark with city views</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">$25</span>
                </div>
              </div>
              
              <div className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">Louvre Museum</h4>
                    <p className="text-sm text-gray-600">2:00 PM - 5:00 PM</p>
                    <p className="text-sm text-gray-500 mt-1">World's largest art museum</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">$30</span>
                </div>
              </div>
              
              <div className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">Seine River Cruise</h4>
                    <p className="text-sm text-gray-600">7:00 PM - 9:00 PM</p>
                    <p className="text-sm text-gray-500 mt-1">Evening dinner cruise</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">$75</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Rome, Italy</h3>
                <p className="text-gray-600">June 19-24, 2024 • 6 days</p>
              </div>
            </div>
            
            <div className="space-y-4 ml-16">
              <div className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">Colosseum Tour</h4>
                    <p className="text-sm text-gray-600">10:00 AM - 12:00 PM</p>
                    <p className="text-sm text-gray-500 mt-1">Ancient amphitheatre visit</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">$40</span>
                </div>
              </div>
              
              <div className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">Vatican City</h4>
                    <p className="text-sm text-gray-600">2:00 PM - 6:00 PM</p>
                    <p className="text-sm text-gray-500 mt-1">St. Peter's Basilica & Museums</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">$50</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Barcelona, Spain</h3>
                <p className="text-gray-600">June 25-30, 2024 • 6 days</p>
              </div>
            </div>
            
            <div className="space-y-4 ml-16">
              <div className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">Sagrada Familia</h4>
                    <p className="text-sm text-gray-600">9:00 AM - 11:00 AM</p>
                    <p className="text-sm text-gray-500 mt-1">Gaudi's masterpiece</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">$35</span>
                </div>
              </div>
              
              <div className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">Park Güell</h4>
                    <p className="text-sm text-gray-600">3:00 PM - 5:00 PM</p>
                    <p className="text-sm text-gray-500 mt-1">Colorful mosaic park</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">$20</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <a
            href={`/trips/1/budget`}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            View Budget
          </a>
          <a
            href={`/trips/1/builder`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Edit Itinerary
          </a>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Share Trip
          </button>
        </div>
      </div>
    </div>
  )
}
