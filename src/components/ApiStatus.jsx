import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function ApiStatus() {
  const [status, setStatus] = useState('checking');
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkApi = async () => {
      try {
        // Check API health
        const healthResponse = await api.health();
        setStatus('online');
        
        // Get API info
        const infoResponse = await api.info();
        setInfo(infoResponse);
      } catch (error) {
        console.error('API Error:', error);
        setStatus('offline');
        setError(error.error || 'Failed to connect to the API');
      }
    };

    checkApi();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-md z-50">
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full mr-2 ${status === 'online' ? 'bg-green-500' : status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
        <span className="font-medium">
          API Status: {status === 'checking' ? 'Checking...' : status === 'online' ? 'Online' : 'Offline'}
        </span>
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
      
      {info && (
        <div className="mt-2 text-sm text-gray-600">
          <div>API Version: {info.version}</div>
          <div>Environment: {info.environment}</div>
        </div>
      )}
    </div>
  );
} 