import Link from 'next/link';

const venues = [
  {
    id: 1,
    name: 'Grand Palace Banquet',
    rating: 4.8,
    reviews: 3200,
    priceRange: '₹2,00,000 - ₹10,00,000',
    location: 'Mumbai, Maharashtra',
    capacity: '500-2000 guests',
    description: 'Luxury banquet hall with modern amenities and elegant decor'
  },
  {
    id: 2,
    name: 'Royal Garden Resort',
    rating: 4.9,
    reviews: 2850,
    priceRange: '₹3,00,000 - ₹15,00,000',
    location: 'Delhi, NCR',
    capacity: '300-1500 guests',
    description: 'Scenic outdoor venue with lush gardens and premium facilities'
  },
  {
    id: 3,
    name: 'Heritage Palace',
    rating: 4.7,
    reviews: 2650,
    priceRange: '₹1,50,000 - ₹8,00,000',
    location: 'Jaipur, Rajasthan',
    capacity: '200-1000 guests',
    description: 'Historical palace with royal architecture and traditional charm'
  },
  {
    id: 4,
    name: 'Beachside Resort',
    rating: 4.6,
    reviews: 1980,
    priceRange: '₹2,50,000 - ₹12,00,000',
    location: 'Goa',
    capacity: '100-800 guests',
    description: 'Beachfront venue with stunning ocean views and tropical ambiance'
  }
];

export default function VenuesPage() {
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
                Wedding Venues
              </h1>
              <p className="text-xl mb-6 max-w-2xl">
                Find the perfect venue for your dream wedding. From luxury hotels to heritage palaces.
              </p>
              <div className="flex items-center gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">48,234</div>
                  <div className="text-sm">Venues Listed</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">4.7⭐</div>
                  <div className="text-sm">Average Rating</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">1.5L-15L</div>
                  <div className="text-sm">Price Range</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="text-8xl">🏛️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Venues Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Wedding Venues</h2>
            <span className="text-gray-600">{venues.length} venues found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {venues.map((venue) => (
              <div key={venue.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-4xl mr-4">🏛️</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{venue.name}</h3>
                        <p className="text-sm text-gray-600">{venue.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-2">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span className="font-semibold">{venue.rating}</span>
                        <span className="text-gray-600 text-sm ml-1">({venue.reviews})</span>
                      </div>
                      <div className="text-xs text-gray-500">{venue.capacity}</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{venue.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-semibold text-pink-600">
                      {venue.priceRange}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors">
                      Get FREE Quote
                    </button>
                    <button className="flex-1 border border-pink-600 text-pink-600 py-2 px-4 rounded-lg hover:bg-pink-50 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors">
              Load More Venues
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
