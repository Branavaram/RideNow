import { ArrowLeft, User as UserIcon, Mail, Phone, Car, Star, Shield, HelpCircle, LogOut } from 'lucide-react';
import { User } from '../../App';

interface DriverProfileProps {
  user: User;
  onBack: () => void;
  onLogout: () => void;
}

export function DriverProfile({ user, onBack, onLogout }: DriverProfileProps) {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex items-center gap-4">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Profile</h1>
      </div>

      {/* Profile Info */}
      <div className="bg-white p-6 border-b">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full"
          />
          <div className="flex-1">
            <h2 className="text-gray-800 text-xl mb-1">{user.name}</h2>
            <div className="flex items-center gap-2 text-sm mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-gray-600">4.9 rating</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">247 trips</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-gray-600 text-sm mb-1">Acceptance Rate</p>
            <p className="text-green-600 text-2xl">98%</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-gray-600 text-sm mb-1">Completion Rate</p>
            <p className="text-blue-600 text-2xl">99%</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Vehicle Information */}
          <div>
            <h3 className="text-gray-500 text-sm mb-3 px-2">VEHICLE</h3>
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Car className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">Toyota Camry 2020</p>
                  <p className="text-gray-500 text-sm">ABC 1234 • Silver</p>
                </div>
              </div>
              <button className="w-full py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
                Update Vehicle Info
              </button>
            </div>
          </div>

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
              <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b">
                <Phone className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left text-gray-800">Phone Number</span>
                <span className="text-gray-500 text-sm">{user.phone}</span>
              </button>
              <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left text-gray-800">Documents & Verification</span>
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
