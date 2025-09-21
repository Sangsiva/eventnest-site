import Link from 'next/link';

const photographers = [
  {
    id: 1,
    name: 'Photovea Studio',
    rating: 4.8,
    reviews: 1250,
    priceRange: '₹50,000 - ₹2,00,000',
    location: 'Mumbai, Maharashtra',
    experience: '10+ years',
    description: 'Professional wedding photography with candid and traditional styles'
  },
  {
    id: 2,
    name: 'Moments Story',
    rating: 4.9,
    reviews: 980,
    priceRange: '₹45,000 - ₹1,80,000',
    location: 'Delhi, NCR',
    experience: '8+ years',
    description: 'Specialized in pre-wedding and wedding day photography'
  },
  {
    id: 3,
    name: 'Cine Pixs Studiios',
    rating: 4.7,
    reviews: 756,
    priceRange: '₹60,000 - ₹2,50,000',
    location: 'Bangalore, Karnataka',
    experience: '12+ years',
    description: 'Award-winning wedding photographers with international experience'
  },
  {
    id: 4,
    name: 'Premier Studios',
    rating: 4.6,
    reviews: 892,
    priceRange: '₹40,000 - ₹1,50,000',
    location: 'Chennai, Tamil Nadu',
    experience: '15+ years',
    description: 'Luxury wedding photography with drone and cinematic coverage'
  },
  {
    id: 5,
    name: 'Memory Scapes Photography',
    rating: 4.5,
    reviews: 654,
    priceRange: '₹35,000 - ₹1,20,000',
    location: 'Pune, Maharashtra',
    experience: '7+ years',
    description: 'Creative wedding photography with artistic compositions'
  },
  {
    id: 6,
    name: 'The WedPic Films',
    rating: 4.7,
    reviews: 823,
    priceRange: '₹55,000 - ₹2,20,000',
    location: 'Hyderabad, Telangana',
    experience: '9+ years',
    description: 'Wedding photography and videography combined services'
  }
];

export default function PhotographersPage() {
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Wedding Photographers
              </h1>
              <p className="text-xl mb-6 max-w-2xl">
                Find the best wedding photographers in India. See portfolios, compare prices, and book your perfect photographer.
              </p>
              <div className="flex items-center gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">22,029</div>
                  <div className="text-sm">Photographers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">4.7⭐</div>
                  <div className="text-sm">Average Rating</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">50K-2L</div>
                  <div className="text-sm">Price Range</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="text-8xl">📸</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Sort by:</span>
              <select className="border border-gray-300 rounded px-3 py-1">
                <option>Rating</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Experience</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Location:</span>
              <select className="border border-gray-300 rounded px-3 py-1">
                <option>All Cities</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Chennai</option>
                <option>Pune</option>
                <option>Hyderabad</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Price Range:</span>
              <select className="border border-gray-300 rounded px-3 py-1">
                <option>All Prices</option>
                <option>Under ₹50,000</option>
                <option>₹50,000 - ₹1,00,000</option>
                <option>₹1,00,000 - ₹2,00,000</option>
                <option>Above ₹2,00,000</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Photographers Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Wedding Photographers</h2>
            <span className="text-gray-600">{photographers.length} photographers found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photographers.map((photographer) => (
              <div key={photographer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-4xl mr-4">📸</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{photographer.name}</h3>
                        <p className="text-sm text-gray-600">{photographer.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-2">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span className="font-semibold">{photographer.rating}</span>
                        <span className="text-gray-600 text-sm ml-1">({photographer.reviews})</span>
                      </div>
                      <div className="text-xs text-gray-500">{photographer.experience}</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{photographer.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-semibold text-pink-600">
                      {photographer.priceRange}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors">
                      Get FREE Quote
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
            <button className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors">
              Load More Photographers
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
