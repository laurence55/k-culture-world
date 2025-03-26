import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);

  const signIn = (userData) => {
    setIsAuthenticated(true);
    setUserInfo({
      ...userData,
      username: userData.email.split('@')[0], // Create username from email
    });
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
  };

  const updateUserInfo = (updatedInfo) => {
    setUserInfo({
      ...updatedInfo,
      username: updatedInfo.email.split('@')[0], // Update username based on new email
    });
  };

  const addBooking = (bookingData) => {
    setBookingHistory(prev => [...prev, {
      ...bookingData,
      id: Date.now(), // Generate a unique ID for the booking
      status: 'Confirmed',
      bookingDate: new Date().toISOString(),
    }]);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userInfo, 
      signIn, 
      signOut, 
      updateUserInfo,
      bookingHistory,
      addBooking 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 