import { useState } from 'react';
import { User } from '../App';
import { PassengerAuth } from './passenger/PassengerAuth';
import { PassengerHome } from './passenger/PassengerHome';
import { PassengerBooking } from './passenger/PassengerBooking';
import { PassengerTracking } from './passenger/PassengerTracking';
import { PassengerHistory } from './passenger/PassengerHistory';
import { PassengerProfile } from './passenger/PassengerProfile';

interface PassengerAppProps {
  user: User | null;
  onLogout: () => void;
  onLogin: (user: User) => void;
}

export type PassengerScreen = 'home' | 'booking' | 'tracking' | 'history' | 'profile';

export interface Ride {
  id: string;
  pickupLocation: string;
  dropLocation: string;
  pickupCoords: { lat: number; lng: number };
  dropCoords: { lat: number; lng: number };
  vehicleType: 'tuk' | 'car' | 'minivan' | 'bike';
  fare: number;
  distance: number;
  duration: number;
  status: 'searching' | 'accepted' | 'arriving' | 'onboard' | 'completed' | 'cancelled';
  driver?: {
    id: string;
    name: string;
    photo: string;
    rating: number;
    phone: string;
    vehicle: {
      model: string;
      plate: string;
      color: string;
    };
  };
  createdAt: Date;
  completedAt?: Date;
  paymentMethod: 'cash' | 'card' | 'wallet';
}

export function PassengerApp({ user, onLogout, onLogin }: PassengerAppProps) {
  const [currentScreen, setCurrentScreen] = useState<PassengerScreen>('home');
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);

  if (!user) {
    return <PassengerAuth onLogin={onLogin} />;
  }

  const handleBookingStart = () => {
    setCurrentScreen('booking');
  };

  const handleRideRequested = (ride: Ride) => {
    setCurrentRide(ride);
    setCurrentScreen('tracking');
  };

  const handleRideComplete = () => {
    setCurrentRide(null);
    setCurrentScreen('home');
  };

  return (
    <div className="h-screen overflow-hidden">
      {currentScreen === 'home' && (
        <PassengerHome
          user={user}
          onStartBooking={handleBookingStart}
          onNavigate={setCurrentScreen}
          onLogout={onLogout}
        />
      )}
      {currentScreen === 'booking' && (
        <PassengerBooking
          user={user}
          onBack={() => setCurrentScreen('home')}
          onRideRequested={handleRideRequested}
        />
      )}
      {currentScreen === 'tracking' && currentRide && (
        <PassengerTracking
          ride={currentRide}
          onRideComplete={handleRideComplete}
          onBack={() => setCurrentScreen('home')}
        />
      )}
      {currentScreen === 'history' && (
        <PassengerHistory
          user={user}
          onBack={() => setCurrentScreen('home')}
        />
      )}
      {currentScreen === 'profile' && (
        <PassengerProfile
          user={user}
          onBack={() => setCurrentScreen('home')}
          onLogout={onLogout}
        />
      )}
    </div>
  );
}
