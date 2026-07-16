import { useState } from 'react';
import { Search, Star, XCircle } from 'lucide-react';

const passengers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 234 567 8911',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 4.8,
    totalRides: 124,
    totalSpent: '$1,856',
    joinedDate: '2024-02-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah.smith@email.com',
    phone: '+1 234 567 8912',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 4.9,
    totalRides: 98,
    totalSpent: '$1,547',
    joinedDate: '2024-03-20',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.j@email.com',
    phone: '+1 234 567 8913',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    rating: 4.7,
    totalRides: 76,
    totalSpent: '$1,234',
    joinedDate: '2024-04-10',
    status: 'active'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 234 567 8914',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 4.6,
    totalRides: 54,
    totalSpent: '$890',
    joinedDate: '2024-05-15',
    status: 'active'
  },
  {
    id: '5',
    name: 'David Lee',
    email: 'david.lee@email.com',
    phone: '+1 234 567 8915',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 4.5,
    totalRides: 42,
    totalSpent: '$678',
    joinedDate: '2024-06-01',
    status: 'banned'
  }
];

export function AdminPassengers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPassenger, setSelectedPassenger] = useState<typeof passengers[0] | null>(null);

  const filteredPassengers = passengers.filter(passenger => {
    return passenger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           passenger.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
           passenger.phone.includes(searchQuery);
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-800 text-3xl mb-2">Passenger Management</h1>
        <p className="text-gray-600">Manage and monitor all passengers on the platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Total Passengers</p>
          <p className="text-gray-800 text-2xl">{passengers.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-gray-600 text-sm mb-1">Active</p>
          <p className="text-green-600 text-2xl">
            {passengers.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-gray-600 text-sm mb-1">Avg Rating</p>
          <p className="text-blue-600 text-2xl">
            {(passengers.reduce((sum, p) => sum + p.rating, 0) / passengers.length).toFixed(1)}
          </p>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-gray-600 text-sm mb-1">Banned</p>
          <p className="text-red-600 text-2xl">
            {passengers.filter(p => p.status === 'banned').length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search passengers by name, email, or phone..."
            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </div>

      {/* Passengers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 text-gray-600 text-sm">Passenger</th>
                <th className="text-left p-4 text-gray-600 text-sm">Contact</th>
                <th className="text-left p-4 text-gray-600 text-sm">Rating</th>
                <th className="text-left p-4 text-gray-600 text-sm">Total Rides</th>
                <th className="text-left p-4 text-gray-600 text-sm">Total Spent</th>
                <th className="text-left p-4 text-gray-600 text-sm">Joined</th>
                <th className="text-left p-4 text-gray-600 text-sm">Status</th>
                <th className="text-left p-4 text-gray-600 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPassengers.map((passenger) => (
                <tr key={passenger.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={passenger.photo}
                        alt={passenger.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-gray-800">{passenger.name}</p>
                        <p className="text-xs text-gray-500">ID: {passenger.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-800 text-sm">{passenger.email}</p>
                    <p className="text-gray-500 text-xs">{passenger.phone}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-800">{passenger.rating}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-800">{passenger.totalRides}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-green-600">{passenger.totalSpent}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-600 text-sm">{passenger.joinedDate}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      passenger.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {passenger.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedPassenger(passenger)}
                      className="text-purple-600 hover:text-purple-700 text-sm mr-2"
                    >
                      View
                    </button>
                    {passenger.status !== 'banned' && (
                      <button className="text-red-600 hover:text-red-700 text-sm">
                        Ban
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Passenger Details Modal */}
      {selectedPassenger && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedPassenger.photo}
                    alt={selectedPassenger.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h2 className="text-gray-800 text-2xl">{selectedPassenger.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-600">{selectedPassenger.rating} rating</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPassenger(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Email</p>
                  <p className="text-gray-800">{selectedPassenger.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Phone</p>
                  <p className="text-gray-800">{selectedPassenger.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Total Rides</p>
                  <p className="text-gray-800">{selectedPassenger.totalRides}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Total Spent</p>
                  <p className="text-green-600">{selectedPassenger.totalSpent}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Joined Date</p>
                  <p className="text-gray-800">{selectedPassenger.joinedDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    selectedPassenger.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedPassenger.status}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-gray-800 mb-3">Recent Activity</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Last ride: 2 hours ago</p>
                  <p>• Average ride frequency: 3-4 rides per week</p>
                  <p>• Preferred payment: Credit Card</p>
                  <p>• Most common destination: Downtown Area</p>
                </div>
              </div>

              <div className="flex gap-3">
                {selectedPassenger.status !== 'banned' ? (
                  <button className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors">
                    Ban Passenger
                  </button>
                ) : (
                  <button className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                    Unban Passenger
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
