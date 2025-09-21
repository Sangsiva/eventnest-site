'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function VendorProfilePage({ params }: { params: { vendorSlug: string } }) {
  const { vendorSlug } = params;
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showTestMessage, setShowTestMessage] = useState(false);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await fetch(`/api/vendor/${vendorSlug}`);
        if (!response.ok) {
          throw new Error('Vendor not found');
        }
        const data = await response.json();
        setVendor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVendor();
  }, [vendorSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vendor Not Found</h1>
          <p className="text-gray-600 mb-6">The vendor you're looking for doesn't exist.</p>
          <Link href="/makeup-artists/tamilnadu" className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700">
            Browse Makeup Artists
          </Link>
        </div>
      </div>
    );
  }

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
              <Link href="/makeup-artists/tamilnadu" className="text-gray-700 hover:text-pink-600 font-medium">Makeup Artists</Link>
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
            <Link href="/makeup-artists/tamilnadu" className="hover:text-pink-600">Makeup Artists</Link>
            <span className="mx-2">/</span>
            <Link href="/makeup-artists/tamilnadu" className="hover:text-pink-600">Tamilnadu</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{vendor.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Vendor Info */}
            <div className="flex-1">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-5xl">{vendor.image}</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2">{vendor.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <span className="text-yellow-300 mr-1">⭐</span>
                      <span className="font-semibold">{vendor.rating}</span>
                      <span className="text-white/80 ml-1">({vendor.reviewCount} reviews)</span>
                    </div>
                    <span className="text-white/60">•</span>
                    <span className="text-white/90">{vendor.location.city}, {vendor.location.state}, {vendor.location.country}</span>
                  </div>
                  <p className="text-white/90 mb-6 max-w-2xl">{vendor.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                      {vendor.experience} experience
                    </span>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                      {vendor.services.length} services
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-80 bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Get Connected</h3>
              <p className="text-white/90 text-sm mb-4">Share your details and our team will connect you with {vendor.name}</p>
              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const name = formData.get('name') as string;
                const phone = formData.get('phone') as string;

                console.log('Submitting form with:', { name, phone, vendorSlug });

                try {
                  console.log('Submitting to API...');
                  const response = await fetch('/api/contact-inquiries', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name,
                      phone,
                      vendorSlug,
                    }),
                  });

                  console.log('API Response:', response.status, response.ok);

                  if (response.ok) {
                    console.log('Success! Showing success message...');
                    console.log('Setting showSuccessMessage to true');
                    setShowSuccessMessage(true);
                    console.log('showSuccessMessage set to true');
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                      console.log('Hiding success message');
                      setShowSuccessMessage(false);
                    }, 5000);
                  } else {
                    const error = await response.json();
                    console.error('API Error:', error);
                    alert(`Error: ${error.error}`);
                  }
                } catch (error) {
                  console.error('Network/Form Error:', error);
                  alert('Failed to submit form. Please try again.');
                }
              }}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Name</label>
                  <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-gray-900" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">Phone Number</label>
                  <input type="tel" id="phone" name="phone" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-gray-900" minLength={10} maxLength={15} pattern="[0-9]{10,15}" title="Please enter a valid phone number with at least 10 digits" required />
                </div>
                <button type="submit" className="w-full bg-white text-purple-600 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                  Submit Details
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Test Message */}
      {showTestMessage && (
        <div className="fixed top-4 left-4 bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🧪</div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Test Button Works!</h4>
              <p className="text-sm">This confirms that button clicks are functioning properly.</p>
            </div>
            <button
              onClick={() => setShowTestMessage(false)}
              className="text-white hover:text-blue-200 text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md">
          <div className="flex items-start gap-3">
            <div className="text-2xl">✅</div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Success!</h4>
              <p className="text-sm">Your details have been saved successfully! Someone from our team will contact you shortly to assist with your booking.</p>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="text-white hover:text-green-200 text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Services & Packages */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Services & Packages</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {vendor.services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">💄</div>
                <h3 className="text-lg font-semibold mb-2">{service.name || service}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendor.packages && vendor.packages.map((pkg, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">{pkg.name}</h3>
                <div className="text-3xl font-bold text-pink-600 mb-4">{pkg.price}</div>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors">
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vendor.portfolio.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {(vendor.reviews as any[]).map((review: any) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book {vendor.name}?</h2>
          <p className="text-xl mb-8">Get in touch today to discuss your makeup needs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                console.log('Call Now clicked, opening modal...');
                setIsModalOpen(true);
                console.log('Modal state set to:', true);
              }}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              📞 Call Now
            </button>
            <button
              onClick={() => {
                console.log('Send Message clicked, opening modal...');
                setIsModalOpen(true);
                console.log('Modal state set to:', true);
              }}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              💬 Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-2xl">
            <button
              onClick={() => {
                console.log('Modal close clicked');
                setIsModalOpen(false);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Get Connected</h3>
            <p className="text-gray-600 text-sm mb-4">Share your details and our team will connect you with {vendor.name}</p>
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const name = formData.get('name') as string;
                const phone = formData.get('phone') as string;

                try {
                  const response = await fetch('/api/contact-inquiries', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name,
                      phone,
                      vendorSlug,
                    }),
                  });

                  if (response.ok) {
                    console.log('Success! Showing success message...');
                    setShowSuccessMessage(true);
                    setIsModalOpen(false);
                    // Hide success message after 5 seconds
                    setTimeout(() => setShowSuccessMessage(false), 5000);
                  } else {
                    const error = await response.json();
                    console.error('API Error:', error);
                    alert(`Error: ${error.error}`);
                  }
                } catch (error) {
                  console.error('Error submitting form:', error);
                  alert('Failed to submit form. Please try again.');
                }
              }}
            >
              <div>
                <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="modal-name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900"
                  required
                />
              </div>
              <div>
                <label htmlFor="modal-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="modal-phone"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900"
                  minLength={10}
                  maxLength={15}
                  pattern="[0-9]{10,15}"
                  title="Please enter a valid phone number with at least 10 digits"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors font-semibold"
              >
                Submit Details
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
