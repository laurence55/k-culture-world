import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase';
import { api } from '../services/api';
import { userService } from '../services/firestore';

// Create the context
const AuthContext = createContext(null);

// Create the provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState(false);
  
  // Compute isAuthenticated based on currentUser
  const isAuthenticated = !!currentUser;

  // Check if Firebase is properly initialized
  useEffect(() => {
    if (auth) {
      setFirebaseInitialized(true);
    } else {
      setError('Firebase is not properly initialized. Please check your configuration.');
      setLoading(false);
    }
  }, []);

  // Check if backend is available
  useEffect(() => {
    const checkBackend = async () => {
      try {
        await api.health();
        setBackendAvailable(true);
        console.log('Backend is available');
      } catch (error) {
        setBackendAvailable(false);
        console.warn('Backend is not available:', error.message);
      }
    };
    
    checkBackend();
  }, []);

  async function signup(email, password, displayName) {
    if (!firebaseInitialized) {
      throw new Error('Firebase is not properly initialized');
    }

    try {
      setError(null);
      
      // Validate email and password
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      console.log('Creating user with email:', email);
      
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('User created successfully:', user.uid);
      
      // Update profile in Firebase Auth
      if (displayName) {
        await updateProfile(user, { displayName });
        console.log('User profile updated with display name');
      }

      // Create user profile in Firestore
      try {
        console.log('Creating new user profile in Firestore during signup');
        const userProfile = {
          uid: user.uid,
          email,
          displayName: displayName || email.split('@')[0],
          photoURL: user.photoURL || null,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        await userService.createUser(userProfile);
        console.log('User profile created in Firestore successfully');
      } catch (error) {
        console.error('Failed to create user profile in Firestore:', error);
        // Continue even if Firestore creation fails
      }

      // Create user profile in our backend if available
      if (backendAvailable) {
        try {
          console.log('Creating user profile in backend');
          const userData = {
            email,
            displayName: displayName || email.split('@')[0],
            uid: user.uid
          };
          console.log('Sending user data to backend:', userData);
          await api.auth.createUser(userData);
          console.log('User profile created in backend successfully');
        } catch (error) {
          console.error('Failed to create user profile in backend:', error);
          // Continue even if backend creation fails
          // The user is already created in Firebase, so we can continue
        }
      } else {
        console.warn('Backend is not available. Skipping user profile creation.');
      }

      return userCredential;
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle specific Firebase error codes
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please try logging in instead.');
      } else if (error.code === 'auth/invalid-email') {
        setError('The email address is invalid.');
      } else if (error.code === 'auth/operation-not-allowed') {
        setError('Email/password accounts are not enabled. Please contact support.');
      } else if (error.code === 'auth/weak-password') {
        setError('The password is too weak. Please use a stronger password.');
      } else {
        setError(error.message || 'Failed to create an account');
      }
      
      throw error;
    }
  }

  async function login(email, password) {
    if (!firebaseInitialized) {
      throw new Error('Firebase is not properly initialized');
    }

    try {
      setError(null);
      
      // Validate email and password
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      
      if (!password) {
        throw new Error('Please enter your password');
      }
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Fetch user profile from Firestore
      try {
        const profile = await userService.getUserById(user.uid);
        if (profile) {
          setCurrentUser({ ...user, ...profile });
        } else {
          // If no profile exists in Firestore, create one
          console.log('Creating new user profile in Firestore during login');
          const newProfile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email.split('@')[0],
            photoURL: user.photoURL || null,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          await userService.createUser(newProfile);
          setCurrentUser({ ...user, ...newProfile });
        }
      } catch (error) {
        console.error('Failed to fetch user profile from Firestore:', error);
        // Continue with Firebase user data if Firestore fetch fails
        setCurrentUser(user);
      }
      
      // Fetch user profile from backend if available
      if (backendAvailable) {
        try {
          const profile = await api.auth.getProfile();
          setCurrentUser(prev => ({ ...prev, ...profile }));
        } catch (error) {
          console.error('Failed to fetch user profile from backend:', error);
          // Continue with Firebase user data if backend fetch fails
        }
      } else {
        console.warn('Backend is not available. Using Firebase user data only.');
      }
      
      return userCredential;
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific Firebase error codes
      if (error.code === 'auth/invalid-email') {
        setError('The email address is invalid.');
      } else if (error.code === 'auth/user-disabled') {
        setError('This account has been disabled. Please contact support.');
      } else if (error.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError(error.message || 'Failed to log in');
      }
      
      throw error;
    }
  }

  async function logout() {
    if (!firebaseInitialized) {
      throw new Error('Firebase is not properly initialized');
    }

    try {
      setError(null);
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message || 'Failed to log out');
      throw error;
    }
  }

  async function updateUserProfile(profile) {
    if (!firebaseInitialized) {
      throw new Error('Firebase is not properly initialized');
    }

    try {
      setError('');
      if (currentUser) {
        // Update profile in Firebase Auth
        await updateProfile(currentUser, {
          displayName: profile.displayName,
          photoURL: profile.photoURL
        });

        // Update profile in Firestore
        try {
          const updatedProfile = await userService.updateUser(currentUser.uid, {
            ...profile,
            updatedAt: new Date()
          });
          setCurrentUser(prev => ({ ...prev, ...updatedProfile }));
        } catch (error) {
          console.error('Failed to update profile in Firestore:', error);
          // Continue with Firebase update even if Firestore update fails
          setCurrentUser(prev => ({ ...prev, ...profile }));
        }

        // Update profile in our backend if available
        if (backendAvailable) {
          try {
            const updatedProfile = await api.auth.updateProfile(profile);
            setCurrentUser(prev => ({ ...prev, ...updatedProfile }));
          } catch (error) {
            console.error('Failed to update profile in backend:', error);
            // Continue with Firebase update even if backend update fails
          }
        } else {
          console.warn('Backend is not available. Updating Firebase profile only.');
        }
      }
    } catch (error) {
      console.error('Update profile error:', error);
      setError(error.message || 'Failed to update profile');
      throw error;
    }
  }

  useEffect(() => {
    if (!firebaseInitialized) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user profile from Firestore
          try {
            const profile = await userService.getUserById(user.uid);
            if (profile) {
              setCurrentUser({ ...user, ...profile });
            } else {
              // If no profile exists in Firestore, create one
              console.log('Creating new user profile in Firestore');
              const newProfile = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || user.email.split('@')[0],
                photoURL: user.photoURL || null,
                createdAt: new Date(),
                updatedAt: new Date()
              };
              await userService.createUser(newProfile);
              setCurrentUser({ ...user, ...newProfile });
            }
          } catch (error) {
            console.error('Failed to fetch user profile from Firestore:', error);
            // Use Firebase user data if Firestore fetch fails
            setCurrentUser(user);
          }
          
          // Fetch user profile from backend if available
          if (backendAvailable) {
            try {
              const profile = await api.auth.getProfile();
              setCurrentUser(prev => ({ ...prev, ...profile }));
            } catch (error) {
              console.error('Failed to fetch user profile from backend:', error);
              // Use Firebase user data if backend fetch fails
            }
          } else {
            console.warn('Backend is not available. Using Firebase user data only.');
          }
        } catch (error) {
          console.error('Error in auth state change:', error);
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [firebaseInitialized, backendAvailable]);

  const value = {
    currentUser,
    loading,
    error,
    firebaseInitialized,
    backendAvailable,
    isAuthenticated,
    signup,
    login,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 