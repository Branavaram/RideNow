import { useState } from 'react';
import { MapPin, Navigation, Clock, DollarSign } from 'lucide-react';

const activeRides = [
  {
    id: 'R1001',
    passenger: {
      name: 'John Doe',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    driver: {
      name: 'James Wilson',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    pickup: '123 Main Street, Downtown',
    dropoff: '456 Business Ave, Central',
    status: 'onboard',
    fare: 12.50,
    distance: 8.5,
    startTime: '10:30 AM',
    vehicleType: 'Car'
  },
  {
    id: 'R1002',
    passenger: {
      name: 'Sarah Smith',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    driver: {
      name: 'Michael Brown',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
    },
    pickup: 'Airport Terminal 1',
    dropoff: '789 Park Lane, Westside',
    status: 'arriving',
    fare: 24.80,
    distance: 15.2,
    startTime: '10:45 AM',
    vehicleType: 'Mini Van'
  },
  {
    id: 'R1003',
    passenger: {
      name: 'Mike Johnson',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
    },
    driver: {
      name: 'Emily Davis',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    },
    pickup: 'Shopping Mall, North',
    dropoff: 'Office Complex, South',
    status: 'searching',
    fare: 9.20,
    distance: 6.8,
    startTime: '11:00 AM',
    vehicleType: 'Tuk Tuk'
  }
];

const recentRides = [
  {
    id: 'R0998',
    passenger: 'Emily Davis',
    driver: 'David Martinez',
    route: 'Home → Office',
    fare: 15.75,
    distance: 10.5,
    duration: '18 mins',
    completedAt: '9:45 AM',
    rating: 5
  },
  {
    id: 'R0999',
    passenger: 'Alex Brown',
    driver: 'Sarah Johnson',
    route: 'Mall → Airport',
    fare: 28.50,
    distance: 18.3,
    duration: '25 mins',
    completedAt: '10:15 AM',
    rating: 4
  },
  {
    id: 'R1000',
    passenger: 'Jessica White',
    driver: 'James Wilson',
    route: 'Downtown → Beach',
    fare: 22.30,
    distance: 14.7,
    duration: '22 mins',
    completedAt: '10:28 AM',
    rating: 5
  }
];

export function AdminRides() {
  const [selectedRide, setSelectedRide] = useState<typeof activeRides[0] | null>(null);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-800 text-3xl mb-2">Live Ride Monitoring</h1>
        <p className="text-gray-600">Monitor all active and recent rides in real-time</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-gray-600 text-sm mb-1">Active Rides</p>
          <p className="text-blue-600 text-2xl">{activeRides.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-gray-600 text-sm mb-1">Completed Today</p>
          <p className="text-green-600 text-2xl">247</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-gray-600 text-sm mb-1">Avg Duration</p>
          <p className="text-purple-600 text-2xl">16 min</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <p className="text-gray-600 text-sm mb-1">Revenue Today</p>
          <p className="text-yellow-600 text-2xl">$5.2K</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Rides */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-gray-800 text-xl flex items-center gap-2">
              Active Rides
              <span className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded-full">
                {activeRides.length}
              </span>
            </h2>
          </div>
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {activeRides.map((ride) => (
              <div key={ride.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={ride.passenger.photo}
                      alt={ride.passenger.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-gray-800">{ride.passenger.name}</p>
                      <p className="text-xs text-gray-500">Ride #{ride.id}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    ride.status === 'onboard' ? 'bg-green-100 text-green-700' :
                    ride.status === 'arriving' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {ride.status}
                  </span>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                    <p className="text-gray-600 flex-1">{ride.pickup}</p>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                    <p className="text-gray-600 flex-1">{ride.dropoff}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      {ride.distance} km
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {ride.fare}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedRide(ride)}
                    className="text-purple-600 hover:text-purple-700 text-sm"
                  >
                    View Map
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map View */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-gray-800 text-xl">Live Map</h2>
          </div>
          <div className="h-[600px] bg-gradient-to-br from-green-100 to-blue-100 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-purple-600 mx-auto mb-2" />
                <p className="text-gray-600">Live Ride Tracking</p>
                <p className="text-sm text-gray-500">All active rides on map</p>
              </div>
            </div>

            {/* Simulated ride markers */}
            <div className="absolute top-1/4 left-1/3">
              <div className="bg-white rounded-full p-2 shadow-lg animate-pulse">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                  🚗
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 right-1/3">
              <div className="bg-white rounded-full p-2 shadow-lg animate-pulse">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">
                  🚗
                </div>
              </div>
            </div>
            <div className="absolute bottom-1/3 left-1/2">
              <div className="bg-white rounded-full p-2 shadow-lg animate-pulse">
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white text-xs">
                  🚗
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Rides */}
      <div className="mt-6 bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-gray-800 text-xl">Recently Completed Rides</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 text-gray-600 text-sm">Ride ID</th>
                <th className="text-left p-4 text-gray-600 text-sm">Passenger</th>
                <th className="text-left p-4 text-gray-600 text-sm">Driver</th>
                <th className="text-left p-4 text-gray-600 text-sm">Route</th>
                <th className="text-left p-4 text-gray-600 text-sm">Distance</th>
                <th className="text-left p-4 text-gray-600 text-sm">Duration</th>
                <th className="text-left p-4 text-gray-600 text-sm">Fare</th>
                <th className="text-left p-4 text-gray-600 text-sm">Rating</th>
                <th className="text-left p-4 text-gray-600 text-sm">Completed</th>
              </tr>
            </thead>
            <tbody>
              {recentRides.map((ride) => (
                <tr key={ride.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-800">{ride.id}</td>
                  <td className="p-4 text-gray-800">{ride.passenger}</td>
                  <td className="p-4 text-gray-800">{ride.driver}</td>
                  <td className="p-4 text-gray-600 text-sm">{ride.route}</td>
                  <td className="p-4 text-gray-600">{ride.distance} km</td>
                  <td className="p-4 text-gray-600">{ride.duration}</td>
                  <td className="p-4 text-green-600">${ride.fare}</td>
                  <td className="p-4">
                    <span className="text-yellow-500">{'⭐'.repeat(ride.rating)}</span>
                  </td>
                  <td className="p-4 text-gray-600 text-sm">{ride.completedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
