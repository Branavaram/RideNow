import { useState } from 'react';
import { User } from '../App';
import { AdminAuth } from './admin/AdminAuth';
import { AdminOverview } from './admin/AdminOverview';
import { AdminDrivers } from './admin/AdminDrivers';
import { AdminPassengers } from './admin/AdminPassengers';
import { AdminRides } from './admin/AdminRides';
import { AdminPricing } from './admin/AdminPricing';

interface AdminDashboardProps {
  user: User | null;
  onLogout: () => void;
  onLogin: (user: User) => void;
}

export type AdminScreen = 'overview' | 'drivers' | 'passengers' | 'rides' | 'pricing';

export function AdminDashboard({ user, onLogout, onLogin }: AdminDashboardProps) {
  const [currentScreen, setCurrentScreen] = useState<AdminScreen>('overview');

  if (!user) {
    return <AdminAuth onLogin={onLogin} />;
  }

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-purple-700 text-white">
        <div className="p-6 border-b border-purple-600">
          <h1 className="text-2xl mb-1">RideNow</h1>
          <p className="text-purple-200 text-sm">Admin Dashboard</p>
        </div>

        <nav className="p-4">
          <button
            onClick={() => setCurrentScreen('overview')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 ${
              currentScreen === 'overview' ? 'bg-purple-600' : 'hover:bg-purple-600 hover:bg-opacity-50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Overview</span>
          </button>

          <button
            onClick={() => setCurrentScreen('drivers')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 ${
              currentScreen === 'drivers' ? 'bg-purple-600' : 'hover:bg-purple-600 hover:bg-opacity-50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Drivers</span>
          </button>

          <button
            onClick={() => setCurrentScreen('passengers')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 ${
              currentScreen === 'passengers' ? 'bg-purple-600' : 'hover:bg-purple-600 hover:bg-opacity-50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Passengers</span>
          </button>

          <button
            onClick={() => setCurrentScreen('rides')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 ${
              currentScreen === 'rides' ? 'bg-purple-600' : 'hover:bg-purple-600 hover:bg-opacity-50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span>Live Rides</span>
          </button>

          <button
            onClick={() => setCurrentScreen('pricing')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 ${
              currentScreen === 'pricing' ? 'bg-purple-600' : 'hover:bg-purple-600 hover:bg-opacity-50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Pricing</span>
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 md:w-64 p-4 border-t border-purple-600">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm truncate">{user.name}</p>
              <p className="text-purple-200 text-xs">Administrator</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {currentScreen === 'overview' && <AdminOverview />}
        {currentScreen === 'drivers' && <AdminDrivers />}
        {currentScreen === 'passengers' && <AdminPassengers />}
        {currentScreen === 'rides' && <AdminRides />}
        {currentScreen === 'pricing' && <AdminPricing />}
      </div>
    </div>
  );
}
