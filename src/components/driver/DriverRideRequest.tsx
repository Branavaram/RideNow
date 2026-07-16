import { useState, useEffect } from 'react';
import { MapPin, Star, Clock, DollarSign, Navigation } from 'lucide-react';
import { RideRequest } from '../DriverApp';

interface DriverRideRequestProps {
  request: RideRequest;
  onAccept: () => void;
  onDecline: () => void;
}

export function DriverRideRequest({ request, onAccept, onDecline }: DriverRideRequestProps) {
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onDecline();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onDecline]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        {/* Countdown Header */}
        <div className="bg-green-600 p-6 text-center relative">
          <div className="w-20 h-20 mx-auto mb-3 relative">
            <svg className="transform -rotate-90 w-20 h-20">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="white"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(countdown / 15) * 226} 226`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-2xl">{countdown}</span>
            </div>
          </div>
          <h2 className="text-white text-xl">New Ride Request</h2>
        </div>

        {/* Request Details */}
        <div className="p-6 space-y-4">
          {/* Passenger Info */}
          <div className="flex items-center gap-4 pb-4 border-b">
            <img
              src={request.passenger.photo}
              alt={request.passenger.name}
              className="w-16 h-16 rounded-full"
            />
            <div className="flex-1">
              <h3 className="text-gray-800 text-lg">{request.passenger.name}</h3>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-600">{request.passenger.rating}</span>
              </div>
            </div>
          </div>

          {/* Route Info */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5"></div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm">Pickup Location</p>
                <p className="text-gray-800">{request.pickupLocation}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5"></div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm">Drop-off Location</p>
                <p className="text-gray-800">{request.dropLocation}</p>
              </div>
            </div>
          </div>

          {/* Trip Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <Navigation className="w-5 h-5 text-gray-600 mx-auto mb-1" />
              <p className="text-gray-800">{request.distance} km</p>
              <p className="text-gray-500 text-xs">Distance</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <Clock className="w-5 h-5 text-gray-600 mx-auto mb-1" />
              <p className="text-gray-800">{request.estimatedDuration} min</p>
              <p className="text-gray-500 text-xs">Duration</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-green-600">${request.estimatedFare}</p>
              <p className="text-gray-500 text-xs">Earnings</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onDecline}
              className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={onAccept}
              className="flex-1 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              Accept Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
