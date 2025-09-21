import Link from 'next/link';

export default function Home() {
  const vendorCategories = [
    { name: 'Photographers', count: '4', icon: '📸', path: '/photographers/tamilnadu' },
    { name: 'Makeup Artists', count: '4', icon: '💄', path: '/makeup-artists/tamilnadu' },
    { name: 'Venues', count: '0', icon: '🏛️', path: '/vendor/venues' },
    { name: 'Decorators', count: '0', icon: '🎨', path: '/vendor/decorators' },
    { name: 'Wedding Planners', count: '0', icon: '📝', path: '/vendor/wedding-planners' },
    { name: 'Mehendi Artists', count: '0', icon: '🖐️', path: '/vendor/mehendi' },
    { name: 'Caterers', count: '0', icon: '🍽️', path: '/vendor/caterers' },
    { name: 'DJ', count: '0', icon: '🎵', path: '/vendor/dj' },
    { name: 'Wedding Wear', count: '0', icon: '👗', path: '/vendor/wedding-wear' },
    { name: 'Jewellery', count: '0', icon: '💍', path: '/vendor/jewellery' },
    { name: 'Car Rental', count: '0', icon: '🚗', path: '/vendor/cars' },
    { name: 'Pandit', count: '0', icon: '🙏', path: '/vendor/pandit' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-pink-600">EventNest</h1>
              <span className="ml-2 text-sm text-gray-600">Wedding and Event Planning Platform</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-pink-600 font-medium">Home</Link>
              <Link href="/vendors" className="text-gray-700 hover:text-pink-600 font-medium">Vendors</Link>
              <Link href="/blog" className="text-gray-700 hover:text-pink-600 font-medium">Blog</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
             style={{
               backgroundImage: `url('/wedding-couple.jpg')`,
               backgroundPosition: 'center right'
             }}>
        </div>

        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/80 to-purple-600/80"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Kalyana, Vizha & More
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto lg:mx-0">
                Find & Book wedding and event services online - Photographers, Makeup Artists, Venues, Decorators & more
              </p>

              {/* Stats Cards */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[120px]">
                  <div className="text-2xl md:text-3xl font-bold">8</div>
                  <div className="text-sm">Total Vendors</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[120px]">
                  <div className="text-2xl md:text-3xl font-bold">4.8⭐</div>
                  <div className="text-sm">Average Rating</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[120px]">
                  <div className="text-2xl md:text-3xl font-bold">50+</div>
                  <div className="text-sm">Happy Customers</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/vendors"
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Browse Vendors
                </Link>
                <Link
                  href="/vendors"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Right Content - Image Placeholder */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Featured Wedding Couple Image */}
                <div className="w-full h-96 bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-white/20">
                  <img 
                    src="/pregpho.jpeg" 
                    alt="Tamil Wedding Couple in Traditional Attire"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <div className="text-2xl">💍</div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <div className="text-2xl">🌸</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Vendor Categories</h2>
          <p className="text-gray-600 text-center mb-12">Find the perfect vendors for your special day</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {vendorCategories.map((category) => (
              <Link
                key={category.name}
                href={category.path}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-pink-300 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-pink-600 font-medium">{category.count} vendors</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Planning a Wedding Made Easy</h2>
          <p className="text-xl mb-8">
            Get quotes from multiple vendors, compare prices, and book your perfect wedding and event services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vendors"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/vendors"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Browse Vendors
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
