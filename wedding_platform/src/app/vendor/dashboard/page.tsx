import Link from 'next/link';

export default function VendorDashboard() {
  const stats = [
    { name: 'Total Earnings', value: '$12,450', change: '+12%', changeType: 'increase' },
    { name: 'Upcoming Bookings', value: '8', change: '+2', changeType: 'increase' },
    { name: 'New Messages', value: '5', change: '+3', changeType: 'increase' },
    { name: 'Pending Reviews', value: '3', change: '0%', changeType: 'neutral' },
  ];

  const recentBookings = [
    { id: 1, name: 'Alex Johnson', service: 'Wedding Photography', date: '2023-11-15', amount: '$1,250', status: 'Confirmed' },
    { id: 2, name: 'Sarah Williams', service: 'Engagement Shoot', date: '2023-11-12', amount: '$450', status: 'Completed' },
    { id: 3, name: 'Michael Brown', service: 'Family Portraits', date: '2023-11-10', amount: '$650', status: 'Pending' },
  ];

  return (
    <div className="space-y-6" data-testid="vendor-dashboard">
      <div className="pb-5 border-b border-gray-200">
        <h1 
          className="text-2xl font-semibold text-gray-900"
          data-testid="dashboard-heading"
        >
          Dashboard
        </h1>
        <p 
          className="mt-1 text-sm text-gray-600"
          data-testid="dashboard-subtitle"
        >
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats */}
      <div 
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        data-testid="stats-container"
      >
        {stats.map((stat, index) => {
          const statId = stat.name.toLowerCase().replace(/\s+/g, '-');
          return (
            <div 
              key={stat.name} 
              className="px-4 py-5 bg-white rounded-lg shadow overflow-hidden sm:p-6"
              data-testid={`stat-card-${statId}`}
            >
              <dt className="text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </dt>
              <dd className="mt-1 flex items-baseline">
                <div 
                  className="text-2xl font-semibold text-gray-900"
                  data-testid={`${statId}-value`}
                >
                  {stat.value}
                </div>
                <div
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === 'increase' ? 'text-green-600' : stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
                  }`}
                  data-testid={`${statId}-change`}
                >
                  {stat.change}
                </div>
              </dd>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Bookings */}
        <div 
          className="bg-white shadow overflow-hidden sm:rounded-lg"
          data-testid="recent-bookings-section"
        >
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 
              className="text-lg font-medium leading-6 text-gray-900"
              data-testid="recent-bookings-heading"
            >
              Recent Bookings
            </h3>
            <p 
              className="mt-1 max-w-2xl text-sm text-gray-500"
              data-testid="recent-bookings-description"
            >
              Your most recent bookings and appointments.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <li 
                    key={booking.id} 
                    className="px-4 py-4 sm:px-6"
                    data-testid={`booking-${booking.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p 
                          className="text-sm font-medium text-indigo-600 truncate"
                          data-testid={`booking-${booking.id}-name`}
                        >
                          {booking.name}
                        </p>
                        <p 
                          className="flex items-center mt-1 text-sm text-gray-500"
                          data-testid={`booking-${booking.id}-details`}
                        >
                          <span data-testid={`booking-${booking.id}-service`}>
                            {booking.service}
                          </span>
                          <span className="mx-1">•</span>
                          <span data-testid={`booking-${booking.id}-date`}>
                            {booking.date}
                          </span>
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <p 
                          className="text-sm font-medium text-gray-900"
                          data-testid={`booking-${booking.id}-amount`}
                        >
                          {booking.amount}
                        </p>
                        <span 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          data-testid={`booking-${booking.id}-status`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div 
                  className="px-4 py-4 text-center text-gray-500"
                  data-testid="no-bookings-message"
                >
                  No recent bookings found.
                </div>
              )}
            </ul>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <Link href="/vendor/bookings" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all bookings<span className="sr-only">, all bookings</span>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div 
          className="bg-white shadow overflow-hidden sm:rounded-lg"
          data-testid="quick-actions-section"
        >
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 
              className="text-lg font-medium leading-6 text-gray-900"
              data-testid="quick-actions-heading"
            >
              Quick Actions
            </h3>
            <p 
              className="mt-1 max-w-2xl text-sm text-gray-500"
              data-testid="quick-actions-description"
            >
              Frequently used actions.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                href="/vendor/bookings/new"
                className="inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                data-testid="quick-action-new-booking"
              >
                New Booking
              </Link>
              <Link
                href="/vendor/services"
                className="inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                data-testid="quick-action-manage-services"
              >
                Manage Services
              </Link>
              <Link
                href="/vendor/payments/request"
                className="inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                data-testid="quick-action-request-payout"
              >
                Request Payout
              </Link>

              <Link
                href="/vendor/portfolio/new"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                data-testid="quick-action-add-portfolio"
              >
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Add to Portfolio</p>
                  <p className="text-sm text-gray-500 truncate">Upload new work samples</p>
                </div>
              </Link>

              <Link
                href="/vendor/analytics"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                data-testid="quick-action-view-analytics"
              >
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">View Analytics</p>
                  <p className="text-sm text-gray-500 truncate">See your business insights</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
