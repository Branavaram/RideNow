import { useState } from 'react';
import { Shield, Mail, Lock } from 'lucide-react';
import { User } from '../../App';

interface AdminAuthProps {
  onLogin: (user: User) => void;
}

export function AdminAuth({ onLogin }: AdminAuthProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate admin login
    const user: User = {
      id: 'admin1',
      name: 'Admin User',
      email: formData.email,
      phone: '+1 234 567 8900',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    };
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-purple-700 p-8 text-center">
          <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Shield className="w-10 h-10 text-purple-700" />
          </div>
          <h1 className="text-white text-3xl mb-1">RideNow</h1>
          <p className="text-purple-200">Admin Portal</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <h2 className="text-gray-800 text-2xl mb-6 text-center">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="admin@ridenow.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-purple-700 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              This is a secure admin portal. Unauthorized access is prohibited and will be logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
