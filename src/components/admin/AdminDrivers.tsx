import { useState } from 'react';
import { Search, Filter, Star, CheckCircle, XCircle, Ban } from 'lucide-react';

const drivers = [
  {
    id: '1',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '+1 234 567 8901',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 4.9,
    totalRides: 856,
    earnings: '$12,340',
    vehicle: 'Toyota Camry 2020',
    plate: 'ABC 1234',
    status: 'active',
    verified: true,
    joinedDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 234 567 8902',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 4.8,
    totalRides: 742,
    earnings: '$10,890',
    vehicle: 'Honda Accord 2019',
    plate: 'XYZ 5678',
    status: 'active',
    verified: true,
    joinedDate: '2024-02-10'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@email.com',
    phone: '+1 234 567 8903',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    rating: 4.7,
    totalRides: 634,
    earnings: '$9,560',
    vehicle: 'Nissan Altima 2021',
    plate: 'DEF 9012',
    status: 'offline',
    verified: true,
    joinedDate: '2024-03-05'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@email.com',
    phone: '+1 234 567 8904',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 4.6,
    totalRides: 521,
    earnings: '$7,820',
    vehicle: 'Ford Fusion 2020',
    plate: 'GHI 3456',
    status: 'active',
    verified: false,
    joinedDate: '2024-04-20'
  },
  {
    id: '5',
    name: 'David Martinez',
    email: 'david.m@email.com',
    phone: '+1 234 567 8905',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 4.5,
    totalRides: 412,
    earnings: '$6,180',
    vehicle: 'Chevrolet Malibu 2019',
    plate: 'JKL 7890',
    status: 'banned',
    verified: true,
    joinedDate: '2024-05-12'
  }
];

export function AdminDrivers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'offline' | 'banned'>('all');
  const [selectedDriver, setSelectedDriver] = useState<typeof drivers[0] | null>(null);

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         driver.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-800 text-3xl mb-2">Driver Management</h1>
        <p className="text-gray-600">Manage and monitor all drivers on the platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Total Drivers</p>
          <p className="text-gray-800 text-2xl">{drivers.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-gray-600 text-sm mb-1">Active Now</p>
          <p className="text-green-600 text-2xl">
            {drivers.filter(d => d.status === 'active').length}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-gray-600 text-sm mb-1">Verified</p>
          <p className="text-blue-600 text-2xl">
            {drivers.filter(d => d.verified).length}
          </p>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-gray-600 text-sm mb-1">Banned</p>
          <p className="text-red-600 text-2xl">
            {drivers.filter(d => d.status === 'banned').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drivers by name, email, or phone..."
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                statusFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                statusFilter === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter('offline')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                statusFilter === 'offline' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Offline
            </button>
            <button
              onClick={() => setStatusFilter('banned')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                statusFilter === 'banned' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Banned
            </button>
          </div>
        </div>
      </div>

      {/* Drivers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 text-gray-600 text-sm">Driver</th>
                <th className="text-left p-4 text-gray-600 text-sm">Contact</th>
                <th className="text-left p-4 text-gray-600 text-sm">Vehicle</th>
                <th className="text-left p-4 text-gray-600 text-sm">Rating</th>
                <th className="text-left p-4 text-gray-600 text-sm">Rides</th>
                <th className="text-left p-4 text-gray-600 text-sm">Earnings</th>
                <th className="text-left p-4 text-gray-600 text-sm">Status</th>
                <th className="text-left p-4 text-gray-600 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => (
                <tr key={driver.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={driver.photo}
                          alt={driver.name}
                          className="w-10 h-10 rounded-full"
                        />
                        {driver.verified && (
                          <CheckCircle className="absolute -bottom-1 -right-1 w-4 h-4 text-blue-600 bg-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <p className="text-gray-800">{driver.name}</p>
                        <p className="text-xs text-gray-500">ID: {driver.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-800 text-sm">{driver.email}</p>
                    <p className="text-gray-500 text-xs">{driver.phone}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-800 text-sm">{driver.vehicle}</p>
                    <p className="text-gray-500 text-xs">{driver.plate}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-800">{driver.rating}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-800">{driver.totalRides}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-green-600">{driver.earnings}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      driver.status === 'active' ? 'bg-green-100 text-green-700' :
                      driver.status === 'offline' ? 'bg-gray-100 text-gray-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedDriver(driver)}
                      className="text-purple-600 hover:text-purple-700 text-sm mr-2"
                    >
                      View
                    </button>
                    {driver.status !== 'banned' && (
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

      {/* Driver Details Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedDriver.photo}
                    alt={selectedDriver.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h2 className="text-gray-800 text-2xl">{selectedDriver.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-600">{selectedDriver.rating} rating</span>
                      {selectedDriver.verified && (
                        <span className="text-blue-600 text-sm flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDriver(null)}
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
                  <p className="text-gray-800">{selectedDriver.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Phone</p>
                  <p className="text-gray-800">{selectedDriver.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Total Rides</p>
                  <p className="text-gray-800">{selectedDriver.totalRides}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Total Earnings</p>
                  <p className="text-green-600">{selectedDriver.earnings}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Vehicle</p>
                  <p className="text-gray-800">{selectedDriver.vehicle}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">License Plate</p>
                  <p className="text-gray-800">{selectedDriver.plate}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Joined Date</p>
                  <p className="text-gray-800">{selectedDriver.joinedDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    selectedDriver.status === 'active' ? 'bg-green-100 text-green-700' :
                    selectedDriver.status === 'offline' ? 'bg-gray-100 text-gray-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedDriver.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                {!selectedDriver.verified && (
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Verify Driver
                  </button>
                )}
                {selectedDriver.status !== 'banned' ? (
                  <button className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                    <Ban className="w-5 h-5" />
                    Ban Driver
                  </button>
                ) : (
                  <button className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                    Unban Driver
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
