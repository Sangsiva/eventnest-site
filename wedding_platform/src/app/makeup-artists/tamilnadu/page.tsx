'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface MakeupArtist {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  location: {
    city: string;
  };
  experience: string;
  services: Array<{
    name: string;
    price: string;
  }>;
  image: string;
  description: string;
  isVerified: boolean;
}

const makeupArtists = [
  {
    id: 'glamour-beauty-studio',
    name: 'Glamour Beauty Studio',
    rating: 4.8,
    reviewCount: 1250,
    location: {
      city: 'Chennai'
    },
    experience: '10 years',
    services: [
      {
        name: 'Bridal Makeup'
      },
      {
        name: 'Pre-wedding Makeup'
      },
      {
        name: 'Party Makeup'
      }
    ],
    image: '💄',
    description: 'Professional bridal makeup artists specializing in traditional and modern wedding looks',
    isVerified: true,
  },
  {
    id: 'beauty-boulevard',
    name: 'Beauty Boulevard',
    rating: 4.9,
    reviewCount: 980,
    location: {
      city: 'Coimbatore'
    },
    experience: '8 years',
    services: [
      {
        name: 'Bridal Makeup'
      },
      {
        name: 'Airbrush Makeup'
      },
      {
        name: 'Hair Styling'
      }
    ],
    image: '💄',
    description: 'Creative makeup artists capturing your beauty with artistic vision and precision',
    isVerified: true,
  },
  {
    id: 'diva-makeup-lounge',
    name: 'Diva Makeup Lounge',
    rating: 4.7,
    reviewCount: 756,
    location: {
      city: 'Madurai'
    },
    experience: '12 years',
    services: [
      {
        name: 'Bridal Makeup'
      },
      {
        name: 'HD Makeup'
      },
      {
        name: 'Special Effects'
      }
    ],
    image: '💄',
    description: 'Award-winning makeup artists with expertise in bridal and special occasion makeup',
    isVerified: true,
  },
  {
    id: 'glamour-queen-makeup',
    name: 'Glamour Queen Makeup',
    rating: 4.6,
    reviewCount: 654,
    location: {
      city: 'Tiruchirappalli'
    },
    experience: '7 years',
    services: [
      {
        name: 'Bridal Makeup'
      },
      {
        name: 'Traditional Makeup'
      },
      {
        name: 'Mehendi Day Makeup'
      }
    ],
    image: '💄',
    description: 'Specialized in traditional bridal makeup with focus on South Indian wedding styles',
    isVerified: true,
  }
];

export default function MakeupArtistsPage() {
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [makeupArtists, setMakeupArtists] = useState<MakeupArtist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMakeupArtists = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/vendors/category/makeup-artists/location/tamilnadu');
        if (!response.ok) {
          throw new Error('Failed to fetch makeup artists');
        }
        const data = await response.json();
        setMakeupArtists(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMakeupArtists();
  }, []);

  const filteredMakeupArtists = makeupArtists.filter(artist =>
    selectedLocation === 'All Locations' || artist.location.city === selectedLocation
  );
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
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-sm text-gray-600">
            <Link href="/" className="hover:text-pink-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/vendors" className="hover:text-pink-600">Vendors</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Makeup Artists</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Tamilnadu</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Makeup Artists in Tamilnadu
              </h1>
              <p className="text-lg mb-6 max-w-2xl">
                Find professional makeup artists. Compare portfolios, packages, and reviews.
              </p>
              <div className="flex items-center gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">{filteredMakeupArtists.length}</div>
                  <div className="text-sm">Makeup Artists</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">4.7⭐</div>
                  <div className="text-sm">Average Rating</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">10K-18K</div>
                  <div className="text-sm">Price Range</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="text-8xl">💄</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Sort by:</span>
                <select className="border border-gray-300 rounded px-3 py-2">
                  <option>Rating</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Experience</option>
                  <option>Most Reviews</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Style:</span>
                <select className="border border-gray-300 rounded px-3 py-2">
                  <option>All Styles</option>
                  <option>Bridal</option>
                  <option>Traditional</option>
                  <option>Modern</option>
                  <option>HD</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Package:</span>
                <select className="border border-gray-300 rounded px-3 py-2">
                  <option>All Packages</option>
                  <option>Basic (₹8K-12K)</option>
                  <option>Premium (₹12K-16K)</option>
                  <option>Luxury (₹16K+)</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Location:</span>
                <select 
                  className="border border-gray-300 rounded px-3 py-2"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option>All Locations</option>
                  <option>Chennai</option>
                  <option>Coimbatore</option>
                  <option>Madurai</option>
                  <option>Tiruchirappalli</option>
                  <option>Tirupur</option>
                  <option>Erode</option>
                  <option>Karur</option>
                  <option>Salem</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search makeup artists..."
                className="border border-gray-300 rounded px-4 py-2 w-64"
              />
              <button className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Makeup Artists Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Makeup Artists</h2>
            <span className="text-gray-600">{filteredMakeupArtists.length} makeup artists found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMakeupArtists.map((makeupArtist) => (
              <div key={makeupArtist.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  {/* Featured Badge */}
                  {/* Featured badges will be shown for top-rated artists */}
                  {makeupArtist.rating >= 4.8 && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Featured
                    </div>
                  )}

                  {/* Verified Badge */}
                  {makeupArtist.isVerified && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      ✓ Verified
                    </div>
                  )}

                  {/* Makeup Artist Image/Avatar */}
                  <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">{makeupArtist.image}</div>
                      <p className="text-sm text-gray-600">Professional Makeup Artist</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <Link
                        href={`/makeup-artists/tamilnadu/${makeupArtist.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-pink-600 transition-colors"
                      >
                        {makeupArtist.name}
                      </Link>
                      <p className="text-sm text-gray-600">{makeupArtist.location.city}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span className="font-semibold">{makeupArtist.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">({makeupArtist.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm">{makeupArtist.description}</p>

                  {/* Services Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {makeupArtist.services.slice(0, 2).map((service, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                        {service.name}
                      </span>
                    ))}
                    {makeupArtist.services.length > 2 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        +{makeupArtist.services.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500">{makeupArtist.experience} experience</p>
                      <p className="text-lg font-bold text-pink-600">{makeupArtist.services[0]?.price || 'Contact for pricing'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 text-sm">
                        Get Quote
                      </button>
                      <button className="border border-pink-600 text-pink-600 px-4 py-2 rounded hover:bg-pink-50 text-sm">
                        View Portfolio
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors">
              Load More Makeup Artists
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EventNest Makeup Artists?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">💄</div>
              <h3 className="text-xl font-semibold mb-4">Professional Portfolio</h3>
              <p className="text-gray-300">Browse extensive portfolios and previous bridal looks</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-4">Multiple Styles</h3>
              <p className="text-gray-300">From traditional to modern, find makeup artists that match your style</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-4">Flexible Packages</h3>
              <p className="text-gray-300">Choose from various packages based on your budget and requirements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Explore Other Wedding Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/photographers/tamilnadu" className="bg-white p-6 rounded-lg hover:shadow-md transition-shadow text-center">
              <div className="text-4xl mb-3">📸</div>
              <h3 className="font-semibold">Photographers</h3>
              <p className="text-sm text-gray-600">24,579 vendors</p>
            </Link>
            <Link href="/vendor/venues" className="bg-white p-6 rounded-lg hover:shadow-md transition-shadow text-center">
              <div className="text-4xl mb-3">🏛️</div>
              <h3 className="font-semibold">Venues</h3>
              <p className="text-sm text-gray-600">48,234 vendors</p>
            </Link>
            <Link href="/vendor/decorators" className="bg-white p-6 rounded-lg hover:shadow-md transition-shadow text-center">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="font-semibold">Decorators</h3>
              <p className="text-sm text-gray-600">3,449 vendors</p>
            </Link>
            <Link href="/vendor/wedding-planners" className="bg-white p-6 rounded-lg hover:shadow-md transition-shadow text-center">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="font-semibold">Wedding Planners</h3>
              <p className="text-sm text-gray-600">3,522 vendors</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
