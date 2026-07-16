import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import { User } from '../../App';

interface DriverEarningsProps {
  user: User;
  onBack: () => void;
}

// Mock earnings data
const earningsData = {
  today: 156.50,
  week: 842.30,
  month: 3256.80,
  totalRides: 247,
  weeklyRides: [
    { day: 'Mon', rides: 8, earnings: 98.50 },
    { day: 'Tue', rides: 12, earnings: 156.20 },
    { day: 'Wed', rides: 10, earnings: 128.40 },
    { day: 'Thu', rides: 15, earnings: 189.60 },
    { day: 'Fri', rides: 14, earnings: 175.30 },
    { day: 'Sat', rides: 6, earnings: 72.80 },
    { day: 'Sun', rides: 4, earnings: 21.50 }
  ]
};

const recentEarnings = [
  {
    id: '1',
    date: '2024-11-24',
    time: '09:30 AM',
    passenger: 'John Doe',
    route: 'Downtown → Central',
    distance: 8.5,
    fare: 12.50,
    earnings: 10.00
  },
  {
    id: '2',
    date: '2024-11-24',
    time: '11:15 AM',
    passenger: 'Sarah Smith',
    route: 'Airport → Downtown',
    distance: 15.2,
    fare: 24.80,
    earnings: 19.84
  },
  {
    id: '3',
    date: '2024-11-24',
    time: '02:45 PM',
    passenger: 'Mike Johnson',
    route: 'Mall → Westside',
    distance: 6.8,
    fare: 9.20,
    earnings: 7.36
  },
  {
    id: '4',
    date: '2024-11-23',
    time: '08:20 AM',
    passenger: 'Emily Davis',
    route: 'Home → Office',
    distance: 12.3,
    fare: 18.50,
    earnings: 14.80
  },
  {
    id: '5',
    date: '2024-11-23',
    time: '06:30 PM',
    passenger: 'David Lee',
    route: 'Shopping Center → Home',
    distance: 10.5,
    fare: 15.75,
    earnings: 12.60
  }
];

export function DriverEarnings({ user, onBack }: DriverEarningsProps) {
  const maxEarnings = Math.max(...earningsData.weeklyRides.map(d => d.earnings));

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Earnings</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
            <p className="text-green-100 text-xs mb-1">Today</p>
            <p className="text-xl">${earningsData.today}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
            <p className="text-green-100 text-xs mb-1">This Week</p>
            <p className="text-xl">${earningsData.week}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
            <p className="text-green-100 text-xs mb-1">This Month</p>
            <p className="text-xl">${earningsData.month.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Weekly Chart */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-800">Weekly Overview</h2>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>

          <div className="flex items-end justify-between gap-2 h-40 mb-3">
            {earningsData.weeklyRides.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-green-100 rounded-t relative group cursor-pointer hover:bg-green-200 transition-colors"
                  style={{ height: `${(day.earnings / maxEarnings) * 100}%`, minHeight: '20px' }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${day.earnings}
                  </div>
                </div>
                <p className="text-xs text-gray-600">{day.day}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Withdrawal Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 mb-4 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-100 text-sm mb-1">Available Balance</p>
              <p className="text-3xl">${earningsData.week.toFixed(2)}</p>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <DollarSign className="w-8 h-8" />
            </div>
          </div>
          <button className="w-full bg-white text-green-600 py-3 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            <span>Withdraw to Bank</span>
          </button>
        </div>

        {/* Recent Trips */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-gray-800 mb-4">Recent Trips</h2>
          <div className="space-y-3">
            {recentEarnings.map((trip) => (
              <div key={trip.id} className="border-b last:border-b-0 pb-3 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-gray-800">{trip.passenger}</p>
                    <p className="text-gray-500 text-sm">{trip.route}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600">${trip.earnings.toFixed(2)}</p>
                    <p className="text-gray-400 text-xs">80% of ${trip.fare}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {trip.date}
                  </span>
                  <span>•</span>
                  <span>{trip.time}</span>
                  <span>•</span>
                  <span>{trip.distance} km</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-4"></div>
      </div>
    </div>
  );
}
