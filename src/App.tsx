import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { PassengerApp } from './components/PassengerApp';
import { DriverApp } from './components/DriverApp';
import { AdminDashboard } from './components/AdminDashboard';

export type UserRole = 'passenger' | 'driver' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'passenger' | 'driver' | 'admin';
  avatar?: string;
}

function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setCurrentUser(null);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  if (!currentRole) {
    return <LandingPage onRoleSelect={handleRoleSelect} />;
  }

  if (currentRole === 'passenger') {
    return <PassengerApp user={currentUser} onLogout={handleLogout} onLogin={handleLogin} />;
  }

  if (currentRole === 'driver') {
    return <DriverApp user={currentUser} onLogout={handleLogout} onLogin={handleLogin} />;
  }

  if (currentRole === 'admin') {
    return <AdminDashboard user={currentUser} onLogout={handleLogout} onLogin={handleLogin} />;
  }

  return null;
}

export default App;
