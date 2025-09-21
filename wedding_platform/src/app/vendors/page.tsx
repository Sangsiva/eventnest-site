import Link from 'next/link';

const sampleVendors = [
  {
    id: 1,
    name: 'Photovea Studio',
    category: 'Photographers',
    rating: 4.8,
    reviews: 1250,
    price: '₹50,000 - ₹2,00,000',
    location: 'Mumbai, Maharashtra',
    image: '📸',
    description: 'Professional wedding photography with 10+ years experience'
  },
  {
    id: 2,
    name: 'Moments Story',
    category: 'Photographers',
    rating: 4.9,
    reviews: 980,
    price: '₹45,000 - ₹1,80,000',
    location: 'Delhi, NCR',
    image: '📸',
    description: 'Candid and traditional wedding photography'
  },
  {
    id: 3,
    name: 'Cine Pixs Studiios',
    category: 'Videographers',
    rating: 4.7,
    reviews: 756,
    price: '₹60,000 - ₹2,50,000',
    location: 'Bangalore, Karnataka',
    image: '🎥',
    description: 'Cinematic wedding videography and editing'
  },
  {
    id: 4,
    name: 'Premier Studios',
    category: 'Photographers',
    rating: 4.6,
    reviews: 892,
    price: '₹40,000 - ₹1,50,000',
    location: 'Chennai, Tamil Nadu',
    image: '📸',
    description: 'Luxury wedding photography services'
  }
];

export default function VendorsPage() {
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
              <Link href="/blog" className="text-gray-700 hover:text-pink-600 font-medium">Blog</Link>
              <Link href="/vendor/dashboard" className="text-gray-700 hover:text-pink-600 font-medium">Dashboard</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search vendors by name, location, or service..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div className="flex gap-4">
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                <option>All Categories</option>
                <option>Photographers</option>
                <option>Makeup Artists</option>
                <option>Venues</option>
                <option>Decorators</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                <option>All Cities</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Chennai</option>
              </select>
              <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vendors Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Featured Vendors</h1>
            <span className="text-gray-600">{sampleVendors.length} vendors found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleVendors.map((vendor) => (
              <div key={vendor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-4xl mr-4">{vendor.image}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
                        <p className="text-sm text-gray-600">{vendor.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span className="font-semibold">{vendor.rating}</span>
                        <span className="text-gray-600 text-sm ml-1">({vendor.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{vendor.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600">
                      📍 {vendor.location}
                    </div>
                    <div className="text-sm font-semibold text-pink-600">
                      {vendor.price}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors">
                      Get Quote
                    </button>
                    <button className="flex-1 border border-pink-600 text-pink-600 py-2 px-4 rounded-lg hover:bg-pink-50 transition-colors">
                      View Portfolio
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Load More Vendors
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">EventNest</h3>
              <p className="text-gray-400">
                India's largest wedding and event planning platform connecting couples with the best vendors.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/vendor/photographers" className="hover:text-white">Photographers</Link></li>
                <li><Link href="/vendor/venues" className="hover:text-white">Venues</Link></li>
                <li><Link href="/vendor/makeup-artists" className="hover:text-white">Makeup Artists</Link></li>
                <li><Link href="/vendor/decorators" className="hover:text-white">Decorators</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Download App</h4>
              <p className="text-gray-400 mb-4">
                Get the EventNest app for better experience
              </p>
              <div className="flex gap-2">
                <div className="bg-gray-700 px-4 py-2 rounded text-sm">App Store</div>
                <div className="bg-gray-700 px-4 py-2 rounded text-sm">Google Play</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EventNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
