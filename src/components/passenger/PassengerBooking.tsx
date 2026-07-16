import { useState } from 'react';
import { ArrowLeft, MapPin, Navigation, Bike, Car as CarIcon, Bus, Truck, Clock, DollarSign } from 'lucide-react';
import { User } from '../../App';
import { Ride } from '../PassengerApp';

interface PassengerBookingProps {
  user: User;
  onBack: () => void;
  onRideRequested: (ride: Ride) => void;
}

type VehicleType = 'bike' | 'tuk' | 'car' | 'minivan';

interface VehicleOption {
  type: VehicleType;
  name: string;
  icon: React.ReactNode;
  capacity: string;
  baseFare: number;
  perKm: number;
  eta: string;
}

const vehicleOptions: VehicleOption[] = [
  {
    type: 'bike',
    name: 'Bike',
    icon: <Bike className="w-8 h-8" />,
    capacity: '1 passenger',
    baseFare: 2.5,
    perKm: 0.5,
    eta: '2 mins'
  },
  {
    type: 'tuk',
    name: 'Tuk Tuk',
    icon: <CarIcon className="w-8 h-8" />,
    capacity: '2 passengers',
    baseFare: 3.5,
    perKm: 0.75,
    eta: '3 mins'
  },
  {
    type: 'car',
    name: 'Car',
    icon: <CarIcon className="w-8 h-8" />,
    capacity: '4 passengers',
    baseFare: 5.0,
    perKm: 1.0,
    eta: '5 mins'
  },
  {
    type: 'minivan',
    name: 'Mini Van',
    icon: <Bus className="w-8 h-8" />,
    capacity: '6 passengers',
    baseFare: 8.0,
    perKm: 1.5,
    eta: '7 mins'
  }
];

export function PassengerBooking({ user, onBack, onRideRequested }: PassengerBookingProps) {
  const [step, setStep] = useState<'locations' | 'vehicle' | 'confirm'>('locations');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>('car');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'wallet'>('cash');

  // Simulated distance calculation
  const distance = 8.5; // km
  const duration = 15; // minutes

  const calculateFare = (vehicleType: VehicleType) => {
    const vehicle = vehicleOptions.find(v => v.type === vehicleType);
    if (!vehicle) return 0;
    return vehicle.baseFare + (distance * vehicle.perKm);
  };

  const handleConfirmBooking = () => {
    const ride: Ride = {
      id: Date.now().toString(),
      pickupLocation: pickup,
      dropLocation: dropoff,
      pickupCoords: { lat: 40.7128, lng: -74.0060 },
      dropCoords: { lat: 40.7580, lng: -73.9855 },
      vehicleType: selectedVehicle,
      fare: calculateFare(selectedVehicle),
      distance,
      duration,
      status: 'searching',
      createdAt: new Date(),
      paymentMethod
    };
    onRideRequested(ride);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center gap-4">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Book a Ride</h1>
      </div>

      {/* Map Preview */}
      <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Navigation className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Route Preview</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {step === 'locations' && (
          <div className="space-y-4">
            <h2 className="text-gray-800 text-xl mb-4">Where are you going?</h2>
            
            <div>
              <label className="block text-gray-700 mb-2">Pickup Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter pickup location"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Drop-off Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600 w-5 h-5" />
                <input
                  type="text"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter drop-off location"
                />
              </div>
            </div>

            <button
              onClick={() => setStep('vehicle')}
              disabled={!pickup || !dropoff}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'vehicle' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-800 text-xl">Choose Vehicle</h2>
              <div className="text-right">
                <p className="text-sm text-gray-500">Distance</p>
                <p className="text-gray-800">{distance} km</p>
              </div>
            </div>

            <div className="space-y-3">
              {vehicleOptions.map((vehicle) => (
                <button
                  key={vehicle.type}
                  onClick={() => setSelectedVehicle(vehicle.type)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    selectedVehicle === vehicle.type
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      selectedVehicle === vehicle.type ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {vehicle.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-gray-800">{vehicle.name}</h3>
                        <p className="text-gray-800">${calculateFare(vehicle.type).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{vehicle.capacity}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {vehicle.eta} away
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep('confirm')}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'confirm' && (
          <div className="space-y-6">
            <h2 className="text-gray-800 text-xl mb-4">Confirm Your Ride</h2>

            {/* Trip Summary */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-gray-500 text-sm">Pickup</p>
                  <p className="text-gray-800">{pickup}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-gray-500 text-sm">Drop-off</p>
                  <p className="text-gray-800">{dropoff}</p>
                </div>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-sm mb-2">Vehicle</p>
              <p className="text-gray-800">
                {vehicleOptions.find(v => v.type === selectedVehicle)?.name}
              </p>
            </div>

            {/* Fare Breakdown */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Fare</span>
                <span className="text-gray-800">
                  ${vehicleOptions.find(v => v.type === selectedVehicle)?.baseFare.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Distance ({distance} km)</span>
                <span className="text-gray-800">
                  ${(distance * (vehicleOptions.find(v => v.type === selectedVehicle)?.perKm || 0)).toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="text-gray-800">Total Fare</span>
                <span className="text-gray-800">${calculateFare(selectedVehicle).toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-gray-700 mb-3">Payment Method</label>
              <div className="space-y-2">
                {(['cash', 'card', 'wallet'] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                      paymentMethod === method
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 capitalize">{method}</span>
                      {paymentMethod === method && (
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleConfirmBooking}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request Ride
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
