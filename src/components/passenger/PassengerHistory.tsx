import { ArrowLeft, MapPin, Calendar, DollarSign } from 'lucide-react';
import { User } from '../../App';

interface PassengerHistoryProps {
  user: User;
  onBack: () => void;
}

// Mock ride history data
const rideHistory = [
  {
    id: '1',
    date: '2024-11-24',
    time: '09:30 AM',
    pickup: '123 Main Street, Downtown',
    dropoff: '456 Business Ave, Central',
    vehicleType: 'Car',
    fare: 12.50,
    distance: 8.5,
    status: 'completed',
    driver: {
      name: 'James Wilson',
      rating: 4.8
    }
  },
  {
    id: '2',
    date: '2024-11-23',
    time: '06:15 PM',
    pickup: '456 Business Ave, Central',
    dropoff: '123 Main Street, Downtown',
    vehicleType: 'Tuk Tuk',
    fare: 9.25,
    distance: 6.2,
    status: 'completed',
    driver: {
      name: 'Sarah Johnson',
      rating: 4.9
    }
  },
  {
    id: '3',
    date: '2024-11-22',
    time: '02:45 PM',
    pickup: '789 Park Lane, Westside',
    dropoff: 'International Airport Terminal 1',
    vehicleType: 'Mini Van',
    fare: 28.75,
    distance: 18.3,
    status: 'completed',
    driver: {
      name: 'Michael Brown',
      rating: 4.7
    }
  },
  {
    id: '4',
    date: '2024-11-21',
    time: '11:20 AM',
    pickup: 'Shopping Mall, North District',
    dropoff: '123 Main Street, Downtown',
    vehicleType: 'Car',
    fare: 15.00,
    distance: 10.2,
    status: 'completed',
    driver: {
      name: 'Emily Davis',
      rating: 5.0
    }
  },
  {
    id: '5',
    date: '2024-11-20',
    time: '08:00 AM',
    pickup: '123 Main Street, Downtown',
    dropoff: 'Tech Park, Silicon Valley',
    vehicleType: 'Car',
    fare: 18.50,
    distance: 12.7,
    status: 'completed',
    driver: {
      name: 'David Martinez',
      rating: 4.6
    }
  }
];

export function PassengerHistory({ user, onBack }: PassengerHistoryProps) {
  const totalRides = rideHistory.length;
  const totalSpent = rideHistory.reduce((sum, ride) => sum + ride.fare, 0);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Ride History</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-blue-100 text-sm">Total Rides</p>
            <p className="text-2xl">{totalRides}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-blue-100 text-sm">Total Spent</p>
            <p className="text-2xl">${totalSpent.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Ride List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {rideHistory.map((ride) => (
            <div key={ride.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{ride.date}</span>
                  <span className="text-sm">• {ride.time}</span>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-lg">{ride.fare.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs">Pickup</p>
                    <p className="text-gray-800 text-sm">{ride.pickup}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs">Drop-off</p>
                    <p className="text-gray-800 text-sm">{ride.dropoff}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{ride.vehicleType}</span>
                  <span>•</span>
                  <span>{ride.distance} km</span>
                </div>
                <div className="text-sm text-gray-600">
                  {ride.driver.name} • ⭐ {ride.driver.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
