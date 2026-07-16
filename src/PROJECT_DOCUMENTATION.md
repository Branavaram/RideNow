# RideNow - Complete Ride-Hailing Application

## 🚗 Overview

RideNow is a complete ride-hailing web application similar to Uber/PickMe with three main interfaces:
1. **Passenger App** - Book rides, track drivers, view history
2. **Driver App** - Accept rides, navigate, earn money
3. **Admin Dashboard** - Manage platform, monitor rides, set pricing

## 🎨 Brand Identity

**Name:** RideNow  
**Tagline:** Your Ride, Your Way  
**Logo:** Blue car icon in circular badge  
**Color Scheme:**
- Passenger: Blue (#2563EB)
- Driver: Green (#059669)
- Admin: Purple (#7C3AED)

## 📁 Project Structure

```
/
├── App.tsx                          # Main app entry point
├── components/
│   ├── LandingPage.tsx             # Role selection screen
│   ├── PassengerApp.tsx            # Passenger app container
│   ├── DriverApp.tsx               # Driver app container
│   ├── AdminDashboard.tsx          # Admin dashboard container
│   ├── passenger/
│   │   ├── PassengerAuth.tsx       # Login/registration
│   │   ├── PassengerHome.tsx       # Home with map
│   │   ├── PassengerBooking.tsx    # Ride booking flow
│   │   ├── PassengerTracking.tsx   # Live ride tracking
│   │   ├── PassengerHistory.tsx    # Ride history
│   │   └── PassengerProfile.tsx    # Profile settings
│   ├── driver/
│   │   ├── DriverAuth.tsx          # Driver login/registration
│   │   ├── DriverHome.tsx          # Driver dashboard
│   │   ├── DriverRideRequest.tsx   # Incoming ride requests
│   │   ├── DriverActiveRide.tsx    # Active ride navigation
│   │   ├── DriverEarnings.tsx      # Earnings & history
│   │   └── DriverProfile.tsx       # Driver profile
│   └── admin/
│       ├── AdminAuth.tsx           # Admin login
│       ├── AdminOverview.tsx       # Dashboard overview
│       ├── AdminDrivers.tsx        # Driver management
│       ├── AdminPassengers.tsx     # Passenger management
│       ├── AdminRides.tsx          # Live ride monitoring
│       └── AdminPricing.tsx        # Pricing configuration
└── PROJECT_DOCUMENTATION.md        # This file
```

## ✨ Features

### Passenger App Features
- ✅ User registration and login with OTP verification
- ✅ Home screen with map showing current location
- ✅ Multiple vehicle types (Bike, Tuk Tuk, Car, Mini Van)
- ✅ Enter pickup and drop-off locations
- ✅ View estimated fare, distance, and duration
- ✅ Real-time driver searching and matching
- ✅ Live ride tracking with map
- ✅ In-app chat with driver
- ✅ Multiple payment options (Cash, Card, Wallet)
- ✅ Ride history with detailed information
- ✅ Rating system for drivers
- ✅ Profile management

### Driver App Features
- ✅ Driver registration with vehicle information
- ✅ Document upload for verification
- ✅ Online/Offline toggle
- ✅ Receive ride requests with countdown timer
- ✅ Accept or decline rides
- ✅ View passenger details and rating
- ✅ Navigation to pickup and drop-off
- ✅ In-app chat with passenger
- ✅ Earnings summary and breakdown
- ✅ Weekly earnings chart
- ✅ Ride history
- ✅ Withdrawal system
- ✅ Vehicle management

### Admin Dashboard Features
- ✅ Secure admin login
- ✅ Comprehensive dashboard with statistics
- ✅ Driver management (approve, ban, verify)
- ✅ Passenger management
- ✅ Live ride monitoring on map
- ✅ Recent activity feed
- ✅ Top drivers leaderboard
- ✅ Revenue tracking and analytics
- ✅ Pricing configuration for all vehicle types
- ✅ Surge pricing controls
- ✅ Commission rate settings
- ✅ Cancellation fee management
- ✅ Peak hour settings

## 🛠 Tech Stack

### Frontend (Current Implementation)
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Recommended Backend Stack
- **Node.js + Express** or **Python FastAPI**
- **Supabase** or **MongoDB** - Database
- **Socket.io** or **Firebase Realtime Database** - Real-time communication
- **Google Maps API** - Maps and navigation
- **Twilio** - SMS/OTP verification
- **Stripe** - Payment processing

## 🗄 Database Schema

### Users Table
```typescript
{
  id: string (UUID)
  name: string
  email: string
  phone: string
  role: 'passenger' | 'driver' | 'admin'
  avatar: string (URL)
  password_hash: string
  verified: boolean
  status: 'active' | 'suspended' | 'banned'
  created_at: timestamp
  updated_at: timestamp
}
```

### Drivers Table (extends Users)
```typescript
{
  user_id: string (FK to Users)
  license_number: string
  vehicle_type: 'bike' | 'tuk' | 'car' | 'minivan'
  vehicle_model: string
  vehicle_plate: string
  vehicle_color: string
  rating: number
  total_rides: number
  total_earnings: number
  acceptance_rate: number
  completion_rate: number
  documents: JSON
  is_online: boolean
  current_location: Point (lat, lng)
}
```

### Passengers Table (extends Users)
```typescript
{
  user_id: string (FK to Users)
  rating: number
  total_rides: number
  total_spent: number
  preferred_payment: string
  saved_locations: JSON
}
```

### Rides Table
```typescript
{
  id: string (UUID)
  passenger_id: string (FK)
  driver_id: string (FK)
  pickup_location: string
  pickup_coords: Point
  dropoff_location: string
  dropoff_coords: Point
  vehicle_type: string
  status: 'searching' | 'accepted' | 'arriving' | 'onboard' | 'completed' | 'cancelled'
  fare: decimal
  distance: decimal
  duration: integer (minutes)
  payment_method: 'cash' | 'card' | 'wallet'
  payment_status: 'pending' | 'completed'
  driver_rating: integer (1-5)
  passenger_rating: integer (1-5)
  created_at: timestamp
  started_at: timestamp
  completed_at: timestamp
}
```

### Pricing Table
```typescript
{
  id: string (UUID)
  vehicle_type: string
  base_fare: decimal
  per_km_rate: decimal
  per_minute_rate: decimal
  minimum_fare: decimal
  commission_rate: decimal
  surge_multiplier: decimal
  active: boolean
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/logout` - User logout

### Passenger Endpoints
- `GET /api/passenger/profile` - Get profile
- `PUT /api/passenger/profile` - Update profile
- `POST /api/rides/request` - Request a ride
- `GET /api/rides/:id` - Get ride details
- `PUT /api/rides/:id/cancel` - Cancel ride
- `GET /api/rides/history` - Get ride history
- `POST /api/rides/:id/rate` - Rate driver

### Driver Endpoints
- `GET /api/driver/profile` - Get profile
- `PUT /api/driver/profile` - Update profile
- `PUT /api/driver/status` - Toggle online/offline
- `GET /api/driver/ride-requests` - Get pending requests
- `POST /api/rides/:id/accept` - Accept ride
- `POST /api/rides/:id/decline` - Decline ride
- `PUT /api/rides/:id/status` - Update ride status
- `GET /api/driver/earnings` - Get earnings summary
- `POST /api/driver/withdraw` - Request withdrawal

### Admin Endpoints
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/drivers` - List all drivers
- `GET /api/admin/drivers/:id` - Get driver details
- `PUT /api/admin/drivers/:id/verify` - Verify driver
- `PUT /api/admin/drivers/:id/ban` - Ban/unban driver
- `GET /api/admin/passengers` - List all passengers
- `GET /api/admin/rides/active` - Get active rides
- `GET /api/admin/rides/history` - Get ride history
- `GET /api/admin/pricing` - Get pricing rules
- `PUT /api/admin/pricing` - Update pricing rules

## 🗺 Google Maps Integration

### Setup Steps:
1. **Get API Key**
   - Go to Google Cloud Console
   - Enable Maps JavaScript API
   - Enable Directions API
   - Enable Places API
   - Enable Geocoding API
   - Create API key and restrict it

2. **Install SDK**
   ```bash
   npm install @googlemaps/js-api-loader
   ```

3. **Initialize Map**
   ```typescript
   import { Loader } from '@googlemaps/js-api-loader';
   
   const loader = new Loader({
     apiKey: 'YOUR_API_KEY',
     version: 'weekly',
     libraries: ['places', 'geometry']
   });
   
   const map = await loader.load();
   ```

4. **Key Features to Implement**
   - Current location tracking
   - Route display and navigation
   - Estimated time and distance
   - Real-time driver location updates
   - Pickup/dropoff markers
   - Auto-complete for address search

## 🔄 Real-time Communication

### WebSocket Events (Socket.io)

**Client → Server:**
- `driver:online` - Driver goes online
- `driver:offline` - Driver goes offline
- `driver:location` - Update driver location
- `ride:accept` - Driver accepts ride
- `ride:decline` - Driver declines ride
- `ride:status` - Update ride status
- `chat:message` - Send chat message

**Server → Client:**
- `ride:request` - New ride request (to driver)
- `ride:matched` - Driver matched (to passenger)
- `ride:status` - Ride status update
- `driver:location` - Driver location update
- `chat:message` - New chat message

## 🚀 Deployment Instructions

### Frontend Deployment

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### Option 2: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

### Backend Deployment

#### Option 1: Railway
1. Create account at railway.app
2. Connect GitHub repository
3. Set environment variables
4. Deploy automatically

#### Option 2: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create ridenow-api

# Deploy
git push heroku main
```

#### Option 3: DigitalOcean App Platform
1. Create account at digitalocean.com
2. Click "Create App"
3. Connect GitHub repository
4. Configure environment variables
5. Deploy

### Database Setup

#### Supabase (Recommended)
1. Create account at supabase.com
2. Create new project
3. Run SQL schema (see schema above)
4. Get connection URL
5. Add to environment variables

#### MongoDB Atlas
1. Create account at mongodb.com
2. Create cluster
3. Create database user
4. Whitelist IP addresses
5. Get connection string

### Environment Variables
```env
# Backend
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_maps_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
STRIPE_SECRET_KEY=your_stripe_key
SOCKET_PORT=3001

# Frontend
VITE_API_URL=https://your-api-url.com
VITE_SOCKET_URL=wss://your-socket-url.com
VITE_GOOGLE_MAPS_KEY=your_maps_key
```

## 🔐 Security Considerations

1. **Authentication**
   - Use JWT tokens with expiration
   - Implement refresh tokens
   - Hash passwords with bcrypt
   - Rate limit OTP requests

2. **API Security**
   - CORS configuration
   - Rate limiting
   - Input validation
   - SQL injection prevention
   - XSS protection

3. **Payment Security**
   - Use Stripe for PCI compliance
   - Never store card details
   - Implement 3D Secure

4. **Location Privacy**
   - Only share approximate location
   - Clear location history
   - User consent for tracking

## 📱 Mobile Considerations

The current web app is responsive and works on mobile browsers. For native mobile apps:

### React Native Conversion
- Convert components to React Native
- Use React Native Maps
- Implement native navigation
- Add push notifications
- Use native device features

### Flutter Conversion
- Rebuild UI with Flutter widgets
- Use Google Maps Flutter plugin
- Implement platform channels
- Add Firebase for backend

## 🧪 Testing

### Unit Tests
```bash
npm install --save-dev @testing-library/react
npm test
```

### E2E Tests
```bash
npm install --save-dev cypress
npx cypress open
```

## 📈 Future Enhancements

1. **Features**
   - Schedule rides in advance
   - Ride sharing (split fare)
   - Favorite drivers
   - Promo codes and discounts
   - Driver tips
   - Ride receipts via email
   - Multi-language support

2. **Analytics**
   - User behavior tracking
   - Conversion funnels
   - Heatmaps
   - A/B testing

3. **Advanced Admin Features**
   - Automated fraud detection
   - Driver background checks integration
   - Automated support tickets
   - Financial reporting

## 📞 Support

For technical support or questions about this implementation, please refer to the documentation or contact the development team.

## 📄 License

This is a demo application created for educational purposes. For production use, ensure compliance with local regulations regarding ride-hailing services.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
