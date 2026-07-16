import { useState } from 'react';
import { Car, Mail, Phone, User as UserIcon, Lock, FileText, Upload } from 'lucide-react';
import { User } from '../../App';

interface DriverAuthProps {
  onLogin: (user: User) => void;
}

export function DriverAuth({ onLogin }: DriverAuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    otp: '',
    vehicleType: 'car',
    vehicleModel: '',
    vehiclePlate: '',
    licenseNumber: ''
  });
  const [step, setStep] = useState<'credentials' | 'vehicle' | 'otp'>('credentials');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'credentials') {
      if (isLogin) {
        setStep('otp');
      } else {
        setStep('vehicle');
      }
    } else if (step === 'vehicle') {
      setStep('otp');
    } else {
      // Simulate login success
      const user: User = {
        id: '1',
        name: formData.name || 'Driver Smith',
        email: formData.email,
        phone: formData.phone,
        role: 'driver',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
      };
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 p-8 text-center">
          <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Car className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-white text-3xl mb-1">RideNow</h1>
          <p className="text-green-100">Driver App</p>
        </div>

        {/* Form */}
        <div className="p-8">
          {step === 'credentials' && (
            <>
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    isLogin ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    !isLogin ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Register
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="+1 234 567 8900"
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
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Continue
                </button>
              </form>
            </>
          )}

          {step === 'vehicle' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-gray-800 text-xl mb-4">Vehicle Information</h2>

              <div>
                <label className="block text-gray-700 mb-2">Vehicle Type</label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="bike">Bike</option>
                  <option value="tuk">Tuk Tuk</option>
                  <option value="car">Car</option>
                  <option value="minivan">Mini Van</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Vehicle Model</label>
                <input
                  type="text"
                  value={formData.vehicleModel}
                  onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Toyota Camry 2020"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">License Plate</label>
                <input
                  type="text"
                  value={formData.vehiclePlate}
                  onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="ABC 1234"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Driver's License Number</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter license number"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Upload Documents</label>
                <button
                  type="button"
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-green-500 transition-colors"
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">Upload License & Vehicle Documents</p>
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Continue to Verification
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-gray-800 text-xl mb-2">Verify Your Phone</h2>
              <p className="text-sm text-gray-500 mb-4">
                We've sent a code to {formData.phone}
              </p>
              <input
                type="text"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-2xl tracking-widest"
                placeholder="------"
                maxLength={6}
                required
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Verify & Continue
              </button>

              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="w-full text-green-600 py-2"
              >
                Change Phone Number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
