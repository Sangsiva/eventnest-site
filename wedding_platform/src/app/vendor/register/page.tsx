import Link from 'next/link';

export default function VendorRegistrationPage() {
  const registrationSteps = [
    {
      step: 1,
      title: "Basic Information",
      description: "Business name, contact details, location",
      icon: "📋"
    },
    {
      step: 2,
      title: "Service Details",
      description: "Service type, pricing, availability",
      icon: "💼"
    },
    {
      step: 3,
      title: "Portfolio & Verification",
      description: "Photos, documents, business verification",
      icon: "📸"
    },
    {
      step: 4,
      title: "Payment Setup",
      description: "Commission structure, payment methods",
      icon: "💳"
    }
  ];

  const vendorTypes = [
    { name: 'Photographers', count: '22,029', icon: '📸', description: 'Wedding & event photography' },
    { name: 'Makeup Artists', count: '24,579', icon: '💄', description: 'Bridal makeup & hair styling' },
    { name: 'Venues', count: '48,234', icon: '🏛️', description: 'Banquet halls & wedding venues' },
    { name: 'Decorators', count: '3,449', icon: '🎨', description: 'Wedding decoration services' },
    { name: 'Wedding Planners', count: '3,522', icon: '📝', description: 'Full wedding planning' },
    { name: 'Mehendi Artists', count: '3,191', icon: '🖐️', description: 'Traditional mehendi design' },
    { name: 'Caterers', count: '1,331', icon: '🍽️', description: 'Wedding catering services' },
    { name: 'DJ', count: '276', icon: '🎵', description: 'Music & entertainment' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <h1 className="text-2xl font-bold text-pink-600">EventNest</h1>
                <span className="ml-2 text-sm text-gray-600">Wedding and Event Planning Platform</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-pink-600 font-medium">Home</Link>
              <Link href="/vendors" className="text-gray-700 hover:text-pink-600 font-medium">Vendors</Link>
              <Link href="/vendor/dashboard" className="text-gray-700 hover:text-pink-600 font-medium">Dashboard</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Join Wedding Network
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Register your business and start getting more wedding bookings. Join thousands of verified vendors already earning on EventNest.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="#register-form"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Register as Vendor
            </Link>
            <Link
              href="#vendor-types"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              View All Categories
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">₹2,000 Cr+</div>
              <div className="text-sm">Vendor Earnings</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">15,000+</div>
              <div className="text-sm">Active Vendors</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">4.8⭐</div>
              <div className="text-sm">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Simple 4-Step Registration Process</h2>
          <p className="text-gray-600 text-center mb-12">Get verified and start receiving bookings in just 48 hours</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {registrationSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-pink-600">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Categories */}
      <section id="vendor-types" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Popular Vendor Categories</h2>
          <p className="text-gray-600 text-center mb-12">Choose your service category and join the network</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {vendorTypes.map((type) => (
              <div key={type.name} className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200 hover:border-pink-300">
                <div className="text-center">
                  <div className="text-4xl mb-3">{type.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{type.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                  <p className="text-sm text-pink-600 font-medium">{type.count} active vendors</p>
                  <button className="mt-4 w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors text-sm">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Placeholder */}
      <section id="register-form" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-100">
            <h2 className="text-3xl font-bold text-center mb-6">Start Your Registration</h2>
            <p className="text-gray-600 text-center mb-8">
              Fill out the form below or contact our vendor support team for assistance
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your business name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Category</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                  <option>Select category</option>
                  <option>Photographer</option>
                  <option>Makeup Artist</option>
                  <option>Venue</option>
                  <option>Decorator</option>
                  <option>Wedding Planner</option>
                  <option>Mehendi Artist</option>
                  <option>Caterer</option>
                  <option>DJ</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="text-center">
              <button className="bg-pink-600 text-white px-12 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                Submit Registration
              </button>
              <p className="text-sm text-gray-600 mt-4">
                Need help? Call us at <span className="font-semibold">1800-XXX-XXXX</span> or email <span className="font-semibold">vendors@weddingbazaar.com</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join EventNest?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-4">Targeted Customers</h3>
              <p className="text-gray-300">Connect with engaged couples actively looking for wedding and event services in your area</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-4">Higher Earnings</h3>
              <p className="text-gray-300">Access premium pricing and get more bookings through our verified platform</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-4">Digital Presence</h3>
              <p className="text-gray-300">Showcase your work professionally and build your brand online</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
