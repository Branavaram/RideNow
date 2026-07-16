import { ArrowLeft, User as UserIcon, Mail, Phone, CreditCard, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { User } from '../../App';

interface PassengerProfileProps {
  user: User;
  onBack: () => void;
  onLogout: () => void;
}

export function PassengerProfile({ user, onBack, onLogout }: PassengerProfileProps) {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center gap-4">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Profile</h1>
      </div>

      {/* Profile Info */}
      <div className="bg-white p-6 border-b">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full"
          />
          <div className="flex-1">
            <h2 className="text-gray-800 text-xl mb-1">{user.name}</h2>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Phone className="w-4 h-4" />
              <span>{user.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Account Section */}
          <div>
            <h3 className="text-gray-500 text-sm mb-3 px-2">ACCOUNT</h3>
            <div className="bg-white rounded-xl overflow-hidden">
              <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b">
                <UserIcon className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left text-gray-800">Edit Profile</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left text-gray-800">Payment Methods</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Preferences Section */}
          <div>
            <h3 className="text-gray-500 text-sm mb-3 px-2">PREFERENCES</h3>
            <div className="bg-white rounded-xl overflow-hidden">
              <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left text-gray-800">Notifications</span>
                <div className="bg-blue-600 rounded-full w-12 h-6 flex items-center px-1">
                  <div className="bg-white w-4 h-4 rounded-full ml-auto"></div>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left text-gray-800">Privacy & Security</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-gray-500 text-sm mb-3 px-2">SUPPORT</h3>
            <div className="bg-white rounded-xl overflow-hidden">
              <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left text-gray-800">Help & Support</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full bg-white rounded-xl p-4 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>

          <p className="text-center text-gray-400 text-sm py-4">
            Version 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
