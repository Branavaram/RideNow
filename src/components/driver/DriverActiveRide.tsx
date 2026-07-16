import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Navigation, MapPin, Star } from 'lucide-react';
import { ActiveRide } from '../DriverApp';

interface DriverActiveRideProps {
  ride: ActiveRide;
  onRideComplete: () => void;
}

export function DriverActiveRide({ ride, onRideComplete }: DriverActiveRideProps) {
  const [currentStatus, setCurrentStatus] = useState(ride.status);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: 'driver' | 'passenger'; time: string }>>([]);

  // Simulate ride progress
  useEffect(() => {
    const statusFlow: ActiveRide['status'][] = ['accepted', 'arriving', 'onboard', 'completed'];
    let currentIndex = statusFlow.indexOf(currentStatus);

    const interval = setInterval(() => {
      if (currentIndex < statusFlow.length - 1) {
        currentIndex++;
        setCurrentStatus(statusFlow[currentIndex]);
      } else {
        clearInterval(interval);
      }
    }, 6000); // Progress every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusMessage = () => {
    switch (currentStatus) {
      case 'accepted':
        return 'Navigate to Pickup';
      case 'arriving':
        return 'Arriving at Pickup';
      case 'onboard':
        return 'Navigate to Drop-off';
      case 'completed':
        return 'Trip Completed';
      default:
        return '';
    }
  };

  const handleStatusAction = () => {
    switch (currentStatus) {
      case 'accepted':
        setCurrentStatus('arriving');
        break;
      case 'arriving':
        setCurrentStatus('onboard');
        break;
      case 'onboard':
        setCurrentStatus('completed');
        break;
      case 'completed':
        onRideComplete();
        break;
    }
  };

  const getActionButtonText = () => {
    switch (currentStatus) {
      case 'accepted':
        return 'Start Navigation';
      case 'arriving':
        return 'Passenger On Board';
      case 'onboard':
        return 'Complete Trip';
      case 'completed':
        return 'Finish';
      default:
        return '';
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'driver' as const,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  if (currentStatus === 'completed') {
    return (
      <div className="h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-gray-800 text-2xl mb-2">Trip Completed!</h2>
          <p className="text-gray-600 mb-8">Great job on completing this ride</p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Fare</span>
              <span className="text-gray-800 text-xl">${ride.estimatedFare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Your Earnings (80%)</span>
              <span className="text-green-600 text-2xl">${(ride.estimatedFare * 0.8).toFixed(2)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-sm">
              <span className="text-gray-600">Distance</span>
              <span className="text-gray-800">{ride.distance} km</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Duration</span>
              <span className="text-gray-800">{ride.estimatedDuration} mins</span>
            </div>
          </div>

          <button
            onClick={onRideComplete}
            className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-4">
        <h1 className="text-xl mb-1">{getStatusMessage()}</h1>
        <p className="text-green-100 text-sm">
          {currentStatus === 'onboard' ? 'Passenger on board' : 'Heading to pickup'}
        </p>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-gradient-to-br from-green-100 to-blue-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Navigation className="w-16 h-16 text-green-600 mx-auto mb-2 animate-pulse" />
            <p className="text-gray-600">Navigation Active</p>
          </div>
        </div>

        {/* Route markers */}
        <div className="absolute top-1/4 left-1/4">
          <div className="flex flex-col items-center">
            <MapPin className="w-8 h-8 text-green-600" />
            <p className="text-xs bg-white px-2 py-1 rounded shadow mt-1">
              {currentStatus === 'onboard' ? 'Drop-off' : 'Pickup'}
            </p>
          </div>
        </div>

        {/* Driver location */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
              🚗
            </div>
          </div>
        </div>
      </div>

      {/* Passenger Info Card */}
      <div className="bg-white rounded-t-3xl shadow-2xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={ride.passenger.photo}
            alt={ride.passenger.name}
            className="w-16 h-16 rounded-full"
          />
          <div className="flex-1">
            <h3 className="text-gray-800 text-lg">{ride.passenger.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{ride.passenger.rating}</span>
            </div>
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
        <div className="bg-gray-50 rounded-xl p-4 space-y-2 mb-4">
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

        {/* Trip Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 text-sm">Distance</p>
            <p className="text-gray-800 text-lg">{ride.distance} km</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-gray-500 text-sm">Earnings</p>
            <p className="text-green-600 text-lg">${(ride.estimatedFare * 0.8).toFixed(2)}</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStatusAction}
          className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors"
        >
          {getActionButtonText()}
        </button>
      </div>

      {/* Chat Overlay */}
      {showChat && (
        <div className="absolute inset-0 bg-white z-20 flex flex-col">
          <div className="bg-green-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setShowChat(false)} className="p-2">
                ←
              </button>
              <div className="flex items-center gap-3">
                <img src={ride.passenger.photo} alt={ride.passenger.name} className="w-10 h-10 rounded-full" />
                <h2>{ride.passenger.name}</h2>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No messages yet</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'driver' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-2xl px-4 py-2 ${
                      msg.sender === 'driver'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'driver' ? 'text-green-100' : 'text-gray-500'
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
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
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
