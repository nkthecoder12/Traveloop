import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Traveloop</h1>
              <span className="ml-2 text-sm text-gray-500">Your Travel Planning Companion</span>
            </div>
            <nav className="flex space-x-4">
              <Link href="/auth/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
              <Link href="/auth/signup" className="text-gray-600 hover:text-indigo-600">Sign Up</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Plan Your Perfect Trip
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create itineraries, manage budgets, and discover amazing destinations
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/auth/signup" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
            <Link 
              href="/trips" 
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              View Trips
            </Link>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Authentication */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
            <div className="space-y-2">
              <Link href="/auth/login" className="block text-indigo-600 hover:text-indigo-800">Login</Link>
              <Link href="/auth/signup" className="block text-indigo-600 hover:text-indigo-800">Sign Up</Link>
            </div>
          </div>

          {/* Dashboard */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboard</h3>
            <div className="space-y-2">
              <Link href="/dashboard" className="block text-indigo-600 hover:text-indigo-800">Home Dashboard</Link>
            </div>
          </div>

          {/* Trip Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Management</h3>
            <div className="space-y-2">
              <Link href="/trips" className="block text-indigo-600 hover:text-indigo-800">My Trips</Link>
              <Link href="/trips/create" className="block text-indigo-600 hover:text-indigo-800">Create Trip</Link>
            </div>
          </div>

          {/* Trip Features */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Features</h3>
            <div className="space-y-2">
              <Link href="/trips/[id]/itinerary" className="block text-indigo-600 hover:text-indigo-800">Itinerary</Link>
              <Link href="/trips/[id]/builder" className="block text-indigo-600 hover:text-indigo-800">Builder</Link>
              <Link href="/trips/[id]/budget" className="block text-indigo-600 hover:text-indigo-800">Budget</Link>
              <Link href="/trips/[id]/packing" className="block text-indigo-600 hover:text-indigo-800">Packing</Link>
              <Link href="/trips/[id]/notes" className="block text-indigo-600 hover:text-indigo-800">Notes</Link>
              <Link href="/trips/[id]/share" className="block text-indigo-600 hover:text-indigo-800">Share</Link>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Search & Discover</h3>
            <div className="space-y-2">
              <Link href="/search/cities" className="block text-indigo-600 hover:text-indigo-800">Search Cities</Link>
              <Link href="/search/activities" className="block text-indigo-600 hover:text-indigo-800">Search Activities</Link>
            </div>
          </div>

          {/* User & Admin */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User & Admin</h3>
            <div className="space-y-2">
              <Link href="/profile" className="block text-indigo-600 hover:text-indigo-800">Profile</Link>
              <Link href="/admin" className="block text-indigo-600 hover:text-indigo-800">Admin Dashboard</Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Traveloop Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Plan Trips</h4>
              <p className="text-gray-600 text-sm">Create detailed itineraries with multiple stops</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Manage Budget</h4>
              <p className="text-gray-600 text-sm">Track expenses and stay within budget</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Discover Places</h4>
              <p className="text-gray-600 text-sm">Find cities and activities for your trips</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-2">Packing Lists</h4>
              <p className="text-gray-600 text-sm">Never forget essentials with smart checklists</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">5</span>
              </div>
              <h4 className="font-semibold mb-2">Travel Notes</h4>
              <p className="text-gray-600 text-sm">Document memories and experiences</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">6</span>
              </div>
              <h4 className="font-semibold mb-2">Share Trips</h4>
              <p className="text-gray-600 text-sm">Share itineraries with friends and family</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 Traveloop. All rights reserved.</p>
            <p className="mt-2 text-sm">Built with Next.js, Tailwind CSS, and Supabase</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
