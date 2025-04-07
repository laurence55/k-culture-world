import { auth } from '../firebase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003/api';

// Helper function to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
    return {
      error: 'Connection refused. Please make sure the backend server is running on port 3003.',
      details: 'The backend server at ' + API_URL + ' is not accessible. Please start the server with "npm run start" in the project-name directory.'
    };
  }
  
  // Check for CORS errors
  if (error.message && error.message.includes('CORS')) {
    return {
      error: 'CORS Error: The backend server is not configured to accept requests from your frontend origin.',
      details: 'The backend server is configured to accept requests from http://localhost:5173, but your frontend is running on a different origin. Please update the CORS configuration in the backend.'
    };
  }
  
  return {
    error: error.message || 'An unknown error occurred',
    details: error
  };
};

// Helper function to get auth token
const getAuthToken = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_URL}${endpoint}`;
    const token = await getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include' // Include credentials for CORS requests
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    throw handleApiError(error);
  }
};

// Helper function to make API requests without authentication
const apiRequestWithoutAuth = async (endpoint, options = {}) => {
  try {
    const url = `${API_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include' // Include credentials for CORS requests
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    throw handleApiError(error);
  }
};

// API methods
export const api = {
  // Health check
  health: async () => {
    try {
      return await apiRequest('/health');
    } catch (error) {
      console.warn('Health check failed:', error);
      throw error;
    }
  },
  
  // Get API info
  info: async () => {
    return apiRequest('/');
  },
  
  // Auth endpoints
  auth: {
    // Get user profile
    getProfile: async () => {
      return apiRequest('/auth/profile');
    },
    
    // Update user profile
    updateProfile: async (profile) => {
      return apiRequest('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(profile)
      });
    },
    
    // Create user
    createUser: async (userData) => {
      return apiRequestWithoutAuth('/auth/users', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
    },
    
    // Delete user
    deleteUser: async (uid) => {
      return apiRequest(`/auth/users/${uid}`, {
        method: 'DELETE'
      });
    }
  }
};

// Export a default instance for backward compatibility
export default api; 