import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import theme from './theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Booking from './pages/Booking';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './pages/Profile';
import About from './pages/About';
import ProtectedRoute from './components/ProtectedRoute';
import ApiStatus from './components/ApiStatus';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <ApiStatus />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/booking" element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              } />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
