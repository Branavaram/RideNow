import { useState, useEffect } from 'react';
import { ArrowLeft, Phone, MessageCircle, Navigation, Star, MapPin } from 'lucide-react';
import { Ride } from '../PassengerApp';

interface PassengerTrackingProps {
  ride: Ride;
  onRideComplete: () => void;
  onBack: () => void;
}

export function PassengerTracking({ ride, onRideComplete, onBack }: PassengerTrackingProps) {
  const [currentStatus, setCurrentStatus] = useState(ride.status);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: 'passenger' | 'driver'; time: string }>>([]);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  // Simulate ride progress
  useEffect(() => {
    const statusFlow: Ride['status'][] = ['searching', 'accepted', 'arriving', 'onboard', 'completed'];
    let currentIndex = statusFlow.indexOf(currentStatus);

    const interval = setInterval(() => {
      if (currentIndex < statusFlow.length - 1) {
        currentIndex++;
        setCurrentStatus(statusFlow[currentIndex]);
      } else {
        clearInterval(interval);
        setShowRating(true);
      }
    }, 5000); // Progress every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Mock driver data
  const driver = {
    id: 'driver1',
    name: 'James Wilson',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    rating: 4.8,
    phone: '+1 234 567 8901',
    vehicle: {
      model: 'Toyota Camry',
      plate: 'ABC 1234',
      color: 'Silver'
    }
  };

  const getStatusMessage = () => {
    switch (currentStatus) {
      case 'searching':
        return 'Searching for a driver...';
      case 'accepted':
        return 'Driver accepted your ride!';
      case 'arriving':
        return 'Driver is on the way';
      case 'onboard':
        return 'Enjoy your ride';
      case 'completed':
        return 'You have arrived!';
      default:
        return '';
    }
  };

  const getETA = () => {
    switch (currentStatus) {
      case 'searching':
        return 'Searching...';
      case 'accepted':
      case 'arriving':
        return '3 mins';
      case 'onboard':
        return `${ride.duration} mins`;
      case 'completed':
        return 'Arrived';
      default:
        return '';
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'passenger' as const,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate driver response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: 'Got it, thanks!',
        sender: 'driver',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
  };

  const handleRatingSubmit = () => {
    // Handle rating submission
    onRideComplete();
  };

  if (showRating) {
    return (
      <div className="h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-gray-800 text-2xl mb-2">Ride Completed!</h2>
          <p className="text-gray-600 mb-8">How was your experience with {driver.name}?</p>

          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-12 h-12 ${
                    star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Total Fare</span>
              <span className="text-gray-800">${ride.fare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Distance</span>
              <span className="text-gray-800">{ride.distance} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="text-gray-800 capitalize">{ride.paymentMethod}</span>
            </div>
          </div>

          <button
            onClick={handleRatingSubmit}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Rating
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl">{getStatusMessage()}</h1>
            <p className="text-blue-100 text-sm">ETA: {getETA()}</p>
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-gradient-to-br from-green-100 to-blue-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Navigation className="w-16 h-16 text-blue-600 mx-auto mb-2 animate-pulse" />
            <p className="text-gray-600">Live Tracking</p>
          </div>
        </div>

        {/* Route markers */}
        <div className="absolute top-1/4 left-1/4">
          <div className="flex flex-col items-center">
            <MapPin className="w-8 h-8 text-green-600" />
            <p className="text-xs bg-white px-2 py-1 rounded shadow mt-1">Pickup</p>
          </div>
        </div>
        <div className="absolute bottom-1/4 right-1/4">
          <div className="flex flex-col items-center">
            <MapPin className="w-8 h-8 text-red-600" />
            <p className="text-xs bg-white px-2 py-1 rounded shadow mt-1">Drop-off</p>
          </div>
        </div>

        {/* Driver marker (only show after accepted) */}
        {currentStatus !== 'searching' && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                🚗
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Driver Info Card */}
      {currentStatus !== 'searching' && (
        <div className="bg-white rounded-t-3xl shadow-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={driver.photo}
              alt={driver.name}
              className="w-16 h-16 rounded-full"
            />
            <div className="flex-1">
              <h3 className="text-gray-800 text-lg">{driver.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{driver.rating}</span>
              </div>
              <p className="text-gray-600 text-sm">
                {driver.vehicle.color} {driver.vehicle.model} • {driver.vehicle.plate}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowChat(!showChat)}
                className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <MessageCircle className="w-6 h-6 text-gray-700" />
              </button>
              <button className="p-3 bg-green-100 rounded-full hover:bg-green-200 transition-colors">
                <Phone className="w-6 h-6 text-green-700" />
              </button>
            </div>
          </div>

          {/* Trip Details */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm">Pickup</p>
                <p className="text-gray-800 text-sm">{ride.pickupLocation}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm">Drop-off</p>
                <p className="text-gray-800 text-sm">{ride.dropLocation}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Overlay */}
      {showChat && (
        <div className="absolute inset-0 bg-white z-20 flex flex-col">
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setShowChat(false)} className="p-2">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <img src={driver.photo} alt={driver.name} className="w-10 h-10 rounded-full" />
                <h2>{driver.name}</h2>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No messages yet</p>
                <p className="text-sm">Start a conversation with your driver</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'passenger' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-2xl px-4 py-2 ${
                      msg.sender === 'passenger'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'passenger' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
