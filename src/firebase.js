import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Log the configuration for debugging (remove in production)
console.log('Firebase Config:', {
  apiKey: firebaseConfig.apiKey ? 'API Key is set' : 'API Key is missing',
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  appId: firebaseConfig.appId
});

// Initialize Firebase
let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  if (error.code === 'auth/api-key-not-valid') {
    console.error('The Firebase API key is not valid. Please check your Firebase Console and update the API key.');
    console.error('Current API key:', firebaseConfig.apiKey);
    console.error('Error details:', error.message);
  } else {
    console.error('Please check your Firebase configuration');
    console.error('Error details:', error.message);
  }
}

export { auth, db };
export default app; 