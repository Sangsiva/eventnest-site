import Link from 'next/link';

export default function VendorContactPage() {
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

      {/* Contact Form Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Vendor</h1>
              <p className="text-gray-600">Get in touch with Fehmax Makeup And Hair for your wedding makeup needs</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wedding Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Required *
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" required>
                      <option value="">Select service</option>
                      <option value="bridal-makeup">Bridal Makeup</option>
                      <option value="guest-makeup">Guest/Family Makeup</option>
                      <option value="airbrush">Bridal Airbrush</option>
                      <option value="hd-makeup">HD Makeup</option>
                      <option value="trial">Makeup Trial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of People
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                      <option value="">Select number</option>
                      <option value="1">1 (Bride only)</option>
                      <option value="2-5">2-5 people</option>
                      <option value="6-10">6-10 people</option>
                      <option value="10+">10+ people</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requirements
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      placeholder="Any specific requirements, traditional looks, or special requests..."
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the <Link href="/terms" className="text-pink-600 hover:underline">Terms & Conditions</Link> and <Link href="/privacy" className="text-pink-600 hover:underline">Privacy Policy</Link>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors font-semibold"
                  >
                    Send Inquiry
                  </button>
                </form>
              </div>

              {/* Vendor Info Sidebar */}
              <div className="space-y-6">
                {/* Vendor Card */}
                <div className="bg-pink-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">💄</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Fehmax Makeup And Hair</h3>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span className="text-sm">4.9 (1,250 reviews)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Professional bridal makeup artist with 12+ years of experience
                  </p>
                  <div className="text-2xl font-bold text-pink-600">₹8,000</div>
                </div>

                {/* Contact Methods */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-semibold mb-4">Contact Methods</h4>
                  <div className="space-y-3">
                    <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                      <span>📱</span>
                      WhatsApp: +91 98765 43210
                    </button>
                    <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <span>📞</span>
                      Call: +91 98765 43210
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                      <span>💬</span>
                      Send Message
                    </button>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-semibold mb-4">Response Time</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Usually responds within 2 hours</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Business Hours: 9 AM - 9 PM (All days)
                  </p>
                </div>

                {/* Booking Tips */}
                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <h4 className="text-lg font-semibold mb-4 text-yellow-800">Booking Tips</h4>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    <li>• Book 2-3 months in advance for wedding season</li>
                    <li>• Trial makeup recommended for best results</li>
                    <li>• 50% advance payment required for booking</li>
                    <li>• Travel charges may apply for outstation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Message (Hidden by default, shown after form submission) */}
      <div className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-semibold mb-2">Inquiry Sent Successfully!</h3>
          <p className="text-gray-600 mb-6">
            Fehmax Makeup And Hair will contact you within 2 hours. Check your WhatsApp for instant updates.
          </p>
          <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors">
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}
