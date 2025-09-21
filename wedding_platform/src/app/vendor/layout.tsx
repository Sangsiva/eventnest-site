'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname.includes(path) ? 'bg-gray-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-50';
  };

  const isPhotographerPage = pathname.includes('/photographers');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      {isPhotographerPage ? null : (
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white" data-testid="desktop-sidebar">
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 
                  className="text-xl font-bold text-indigo-600"
                  data-testid="vendor-dashboard-title"
                >
                  Vendor Dashboard
                </h1>
              </div>
              <div className="flex flex-col flex-grow mt-5">
                <nav className="flex-1 px-2 space-y-1" data-testid="desktop-nav">
                  <Link 
                    href="/vendor/dashboard" 
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/dashboard')}`}
                    data-testid="nav-dashboard"
                  >
                    <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </Link>
                  <Link 
                    href="/vendor/services" 
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/services')}`}
                    data-testid="nav-services"
                  >
                    <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M12 18h.01" />
                    </svg>
                    Services
                  </Link>
                  <Link 
                    href="/vendor/bookings" 
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/bookings')}`}
                    data-testid="nav-bookings"
                  >
                    <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Bookings
                  </Link>
                  <Link 
                    href="/vendor/portfolio" 
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/portfolio')}`}
                    data-testid="nav-portfolio"
                  >
                    <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Portfolio
                  </Link>
                  <Link 
                    href="/vendor/reviews" 
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/reviews')}`}
                    data-testid="nav-reviews"
                  >
                    <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    Reviews
                  </Link>
                  <Link 
                    href="/vendor/analytics" 
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/analytics')}`}
                    data-testid="nav-analytics"
                  >
                    <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Analytics
                  </Link>
                  <Link 
                    href="/vendor/payments" 
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/payments')}`}
                    data-testid="nav-payments"
                  >
                    <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Payments
                  </Link>
                  <Link 
                    href="/vendor/settings" 
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/settings')}`}
                    data-testid="nav-settings"
                  >
                    <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      <div className="md:hidden" data-testid="mobile-header">
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
          <div>
            <h1 
              className="text-lg font-bold text-indigo-600"
              data-testid="mobile-header-title"
            >
              Vendor Dashboard
            </h1>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            data-testid="mobile-menu-button"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex flex-col flex-1 ${isPhotographerPage ? '' : 'md:pl-64'}`}>
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
