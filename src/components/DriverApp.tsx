import { useState } from 'react';
import { User } from '../App';
import { DriverAuth } from './driver/DriverAuth';
import { DriverHome } from './driver/DriverHome';
import { DriverRideRequest } from './driver/DriverRideRequest';
import { DriverActiveRide } from './driver/DriverActiveRide';
import { DriverEarnings } from './driver/DriverEarnings';
import { DriverProfile } from './driver/DriverProfile';

interface DriverAppProps {
  user: User | null;
  onLogout: () => void;
  onLogin: (user: User) => void;
}

export type DriverScreen = 'home' | 'earnings' | 'profile';

export interface RideRequest {
  id: string;
  passenger: {
    name: string;
    photo: string;
    rating: number;
    phone: string;
  };
  pickupLocation: string;
  dropLocation: string;
  pickupCoords: { lat: number; lng: number };
  dropCoords: { lat: number; lng: number };
  distance: number;
  estimatedFare: number;
  estimatedDuration: number;
}

export interface ActiveRide extends RideRequest {
  status: 'accepted' | 'arriving' | 'onboard' | 'completed';
  actualFare?: number;
  startTime: Date;
  endTime?: Date;
}

export function DriverApp({ user, onLogout, onLogin }: DriverAppProps) {
  const [currentScreen, setCurrentScreen] = useState<DriverScreen>('home');
  const [isOnline, setIsOnline] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<RideRequest | null>(null);
  const [activeRide, setActiveRide] = useState<ActiveRide | null>(null);
  const [showRequest, setShowRequest] = useState(false);

  if (!user) {
    return <DriverAuth onLogin={onLogin} />;
  }

  const handleAcceptRide = () => {
    if (currentRequest) {
      setActiveRide({
        ...currentRequest,
        status: 'accepted',
        startTime: new Date()
      });
      setShowRequest(false);
      setCurrentRequest(null);
    }
  };

  const handleDeclineRide = () => {
    setShowRequest(false);
    setCurrentRequest(null);
  };

  const handleRideComplete = () => {
    setActiveRide(null);
    setCurrentScreen('home');
  };

  const handleOnlineToggle = (online: boolean) => {
    setIsOnline(online);
    
    // Simulate receiving ride request when going online
    if (online) {
      setTimeout(() => {
        const mockRequest: RideRequest = {
          id: Date.now().toString(),
          passenger: {
            name: 'John Doe',
            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
            rating: 4.8,
            phone: '+1 234 567 8900'
          },
          pickupLocation: '123 Main Street, Downtown',
          dropLocation: '456 Business Ave, Central',
          pickupCoords: { lat: 40.7128, lng: -74.0060 },
          dropCoords: { lat: 40.7580, lng: -73.9855 },
          distance: 8.5,
          estimatedFare: 12.50,
          estimatedDuration: 15
        };
        setCurrentRequest(mockRequest);
        setShowRequest(true);
      }, 3000);
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      {activeRide ? (
        <DriverActiveRide
          ride={activeRide}
          onRideComplete={handleRideComplete}
        />
      ) : (
        <>
          {currentScreen === 'home' && (
            <DriverHome
              user={user}
              isOnline={isOnline}
              onOnlineToggle={handleOnlineToggle}
              onNavigate={setCurrentScreen}
              onLogout={onLogout}
            />
          )}
          {currentScreen === 'earnings' && (
            <DriverEarnings
              user={user}
              onBack={() => setCurrentScreen('home')}
            />
          )}
          {currentScreen === 'profile' && (
            <DriverProfile
              user={user}
              onBack={() => setCurrentScreen('home')}
              onLogout={onLogout}
            />
          )}
        </>
      )}

      {/* Ride Request Modal */}
      {showRequest && currentRequest && (
        <DriverRideRequest
          request={currentRequest}
          onAccept={handleAcceptRide}
          onDecline={handleDeclineRide}
        />
      )}
    </div>
  );
}
