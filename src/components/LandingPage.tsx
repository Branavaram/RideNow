import { Car, Users, Shield } from 'lucide-react';
import { UserRole } from '../App';

interface LandingPageProps {
  onRoleSelect: (role: UserRole) => void;
}

export function LandingPage({ onRoleSelect }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
      <div className="container mx-auto px-4 py-8">
        {/* Logo and Brand */}
        <div className="text-center mb-12 pt-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white rounded-full p-4 shadow-2xl">
              <Car className="w-16 h-16 text-blue-600" />
            </div>
          </div>
          <h1 className="text-white text-6xl mb-2">RideNow</h1>
          <p className="text-blue-100 text-xl">Your Ride, Your Way</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Passenger Card */}
          <button
            onClick={() => onRoleSelect('passenger')}
            className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="bg-blue-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Users className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-gray-800 text-2xl mb-3">Passenger</h2>
            <p className="text-gray-600 mb-6">Book rides, track drivers, and reach your destination safely</p>
            <div className="bg-blue-600 text-white py-3 px-6 rounded-lg">
              Get Started
            </div>
          </button>

          {/* Driver Card */}
          <button
            onClick={() => onRoleSelect('driver')}
            className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Car className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-gray-800 text-2xl mb-3">Driver</h2>
            <p className="text-gray-600 mb-6">Earn money on your schedule by driving passengers</p>
            <div className="bg-green-600 text-white py-3 px-6 rounded-lg">
              Start Driving
            </div>
          </button>

          {/* Admin Card */}
          <button
            onClick={() => onRoleSelect('admin')}
            className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="bg-purple-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Shield className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-gray-800 text-2xl mb-3">Admin</h2>
            <p className="text-gray-600 mb-6">Manage platform, monitor rides, and oversee operations</p>
            <div className="bg-purple-600 text-white py-3 px-6 rounded-lg">
              Admin Access
            </div>
          </button>
        </div>

        {/* Features */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-white">
            <div>
              <div className="text-4xl mb-2">🚗</div>
              <p>Multiple Vehicle Types</p>
            </div>
            <div>
              <div className="text-4xl mb-2">📍</div>
              <p>Real-time Tracking</p>
            </div>
            <div>
              <div className="text-4xl mb-2">💳</div>
              <p>Multiple Payment Options</p>
            </div>
            <div>
              <div className="text-4xl mb-2">⚡</div>
              <p>Fast & Reliable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
