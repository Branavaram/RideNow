import { useState } from 'react';
import { Menu, MapPin, Clock, User as UserIcon, History } from 'lucide-react';
import { User } from '../../App';
import { PassengerScreen } from '../PassengerApp';

interface PassengerHomeProps {
  user: User;
  onStartBooking: () => void;
  onNavigate: (screen: PassengerScreen) => void;
  onLogout: () => void;
}

export function PassengerHome({ user, onStartBooking, onNavigate, onLogout }: PassengerHomeProps) {
  const [showMenu, setShowMenu] = useState(false);

  // Simulate recent locations
  const recentLocations = [
    { id: '1', name: 'Home', address: '123 Main Street, Downtown' },
    { id: '2', name: 'Work', address: '456 Business Ave, Central' },
    { id: '3', name: 'Airport', address: 'International Airport Terminal 1' }
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Map Area */}
      <div className="flex-1 relative bg-gray-200">
        {/* Simulated Map */}
        <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-2" />
              <p className="text-gray-600">Map View</p>
              <p className="text-sm text-gray-500">Your current location</p>
            </div>
          </div>
          
          {/* User location marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
          </div>
        </div>

        {/* Menu Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="absolute top-4 left-4 bg-white p-3 rounded-full shadow-lg"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Side Menu */}
        {showMenu && (
          <>
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowMenu(false)}
            ></div>
            <div className="absolute top-0 left-0 bottom-0 w-80 bg-white shadow-2xl z-10">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-gray-800">{user.name}</h3>
                    <p className="text-gray-500 text-sm">{user.phone}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onNavigate('history');
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    <History className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Ride History</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onNavigate('profile');
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    <UserIcon className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Profile Settings</span>
                  </button>
                </nav>

                <button
                  onClick={onLogout}
                  className="w-full mt-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Card */}
      <div className="bg-white rounded-t-3xl shadow-2xl p-6">
        <h2 className="text-gray-800 text-xl mb-4">Where to?</h2>
        
        <button
          onClick={onStartBooking}
          className="w-full bg-gray-100 p-4 rounded-xl flex items-center gap-3 mb-4 hover:bg-gray-200 transition-colors"
        >
          <MapPin className="w-5 h-5 text-gray-600" />
          <span className="text-gray-600">Enter your destination</span>
        </button>

        <div className="space-y-2">
          <p className="text-gray-500 text-sm mb-2">Recent Locations</p>
          {recentLocations.map((location) => (
            <button
              key={location.id}
              onClick={onStartBooking}
              className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-gray-800">{location.name}</p>
                <p className="text-gray-500 text-sm">{location.address}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
