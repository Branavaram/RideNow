import { TrendingUp, Users, Car, DollarSign, Activity } from 'lucide-react';

const stats = {
  totalRides: 15234,
  activeRides: 48,
  totalDrivers: 1256,
  activeDrivers: 342,
  totalPassengers: 8942,
  activePassengers: 521,
  todayRevenue: 24567.80,
  monthRevenue: 582340.50
};

const recentActivity = [
  { id: '1', type: 'ride', message: 'New ride completed', user: 'John Doe → Sarah Smith', time: '2 mins ago', amount: '$12.50' },
  { id: '2', type: 'driver', message: 'New driver registered', user: 'Michael Johnson', time: '5 mins ago' },
  { id: '3', type: 'ride', message: 'Ride cancelled', user: 'Emily Davis', time: '8 mins ago' },
  { id: '4', type: 'passenger', message: 'New passenger registered', user: 'David Lee', time: '12 mins ago' },
  { id: '5', type: 'ride', message: 'New ride completed', user: 'Alex Brown → Jessica White', time: '15 mins ago', amount: '$18.75' }
];

const topDrivers = [
  { id: '1', name: 'James Wilson', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', rating: 4.9, rides: 156, earnings: '$2,340' },
  { id: '2', name: 'Sarah Johnson', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', rating: 4.8, rides: 142, earnings: '$2,130' },
  { id: '3', name: 'Michael Brown', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', rating: 4.7, rides: 138, earnings: '$2,070' }
];

export function AdminOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-800 text-3xl mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-600">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-600 text-sm">+12%</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Rides</p>
          <p className="text-gray-800 text-3xl">{stats.totalRides.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">{stats.activeRides} active now</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-600">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Car className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 text-sm">+8%</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Drivers</p>
          <p className="text-gray-800 text-3xl">{stats.totalDrivers.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">{stats.activeDrivers} online now</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-600">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-green-600 text-sm">+15%</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Passengers</p>
          <p className="text-gray-800 text-3xl">{stats.totalPassengers.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">{stats.activePassengers} active now</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-yellow-600">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-green-600 text-sm">+22%</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Today's Revenue</p>
          <p className="text-gray-800 text-3xl">${(stats.todayRevenue / 1000).toFixed(1)}K</p>
          <p className="text-sm text-gray-500 mt-1">${(stats.monthRevenue / 1000).toFixed(0)}K this month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-800 text-xl">Revenue Overview</h2>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          
          <div className="space-y-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const revenue = 2000 + Math.random() * 3000;
              const percentage = (revenue / 5000) * 100;
              return (
                <div key={day}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">{day}</span>
                    <span className="text-sm text-gray-800">${revenue.toFixed(0)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Drivers */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-gray-800 text-xl mb-6">Top Drivers This Week</h2>
          <div className="space-y-4">
            {topDrivers.map((driver, index) => (
              <div key={driver.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="relative">
                  <img
                    src={driver.photo}
                    alt={driver.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="absolute -top-1 -left-1 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-800">{driver.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>⭐ {driver.rating}</span>
                    <span>•</span>
                    <span>{driver.rides} rides</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-600">{driver.earnings}</p>
                  <p className="text-xs text-gray-500">earned</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-gray-800 text-xl mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
              <div className={`p-2 rounded-lg ${
                activity.type === 'ride' ? 'bg-blue-100' :
                activity.type === 'driver' ? 'bg-green-100' :
                'bg-purple-100'
              }`}>
                {activity.type === 'ride' && <Activity className="w-5 h-5 text-blue-600" />}
                {activity.type === 'driver' && <Car className="w-5 h-5 text-green-600" />}
                {activity.type === 'passenger' && <Users className="w-5 h-5 text-purple-600" />}
              </div>
              <div className="flex-1">
                <p className="text-gray-800">{activity.message}</p>
                <p className="text-sm text-gray-600">{activity.user}</p>
              </div>
              <div className="text-right">
                {activity.amount && <p className="text-green-600">{activity.amount}</p>}
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
