import { useState } from 'react';
import { Menu, MapPin, DollarSign, User as UserIcon, TrendingUp } from 'lucide-react';
import { User } from '../../App';
import { DriverScreen } from '../DriverApp';

interface DriverHomeProps {
  user: User;
  isOnline: boolean;
  onOnlineToggle: (online: boolean) => void;
  onNavigate: (screen: DriverScreen) => void;
  onLogout: () => void;
}

export function DriverHome({ user, isOnline, onOnlineToggle, onNavigate, onLogout }: DriverHomeProps) {
  const [showMenu, setShowMenu] = useState(false);

  // Mock daily stats
  const todayStats = {
    rides: 12,
    earnings: 156.50,
    hours: 6.5
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Map Area */}
      <div className="flex-1 relative bg-gray-200">
        {/* Simulated Map */}
        <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-green-600 mx-auto mb-2" />
              <p className="text-gray-600">Map View</p>
              <p className="text-sm text-gray-500">
                {isOnline ? 'You are online' : 'You are offline'}
              </p>
            </div>
          </div>
          
          {/* User location marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className={`w-4 h-4 rounded-full border-4 border-white shadow-lg ${
              isOnline ? 'bg-green-600' : 'bg-gray-400'
            }`}></div>
          </div>

          {/* Searching indicator */}
          {isOnline && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 border-4 border-green-600 border-opacity-30 rounded-full animate-ping"></div>
            </div>
          )}
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
              className="absolute inset-0 bg-black bg-opacity-50 z-10"
              onClick={() => setShowMenu(false)}
            ></div>
            <div className="absolute top-0 left-0 bottom-0 w-80 bg-white shadow-2xl z-20">
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
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm text-gray-600">4.9 rating</span>
                    </div>
                  </div>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onNavigate('earnings');
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    <TrendingUp className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Earnings</span>
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
        {/* Online Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-800 text-xl mb-1">
              {isOnline ? "You're Online" : "You're Offline"}
            </h2>
            <p className="text-gray-500 text-sm">
              {isOnline ? 'Accepting ride requests' : 'Go online to start earning'}
            </p>
          </div>
          <button
            onClick={() => onOnlineToggle(!isOnline)}
            className={`relative w-16 h-8 rounded-full transition-colors ${
              isOnline ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                isOnline ? 'translate-x-9' : 'translate-x-1'
              }`}
            ></div>
          </button>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-green-600 text-2xl mb-1">{todayStats.rides}</p>
            <p className="text-gray-600 text-sm">Rides</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-blue-600 text-2xl mb-1">${todayStats.earnings}</p>
            <p className="text-gray-600 text-sm">Earned</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-purple-600 text-2xl mb-1">{todayStats.hours}h</p>
            <p className="text-gray-600 text-sm">Online</p>
          </div>
        </div>

        {isOnline && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              <p>Searching for nearby passengers...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
