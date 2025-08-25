import React from 'react';

export default function TestComponent() {
  console.log('🟢 TestComponent rendered!');
  
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-8">✅ React App Works!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h2 className="text-xl font-semibold text-green-700 mb-4">✅ Frontend Status</h2>
            <ul className="space-y-2 text-green-600">
              <li>• React app loading successful</li>
              <li>• Router working</li>
              <li>• Tailwind CSS working</li>
              <li>• Components rendering</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">🔧 Debug Info</h2>
            <ul className="space-y-2 text-blue-600">
              <li>• Current time: {new Date().toLocaleTimeString()}</li>
              <li>• Environment: {import.meta.env.MODE}</li>
              <li>• API URL: {import.meta.env.VITE_API_URL || 'Not set'}</li>
              <li>• Port: {window.location.port}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">🧪 API Test</h3>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              console.log('Testing API...');
              fetch('http://localhost:8000/api/books/')
                .then(r => r.json())
                .then(d => {
                  console.log('✅ API Success:', d);
                  alert(`API hoạt động! Có ${d.results?.length || 0} sách`);
                })
                .catch(e => {
                  console.error('❌ API Error:', e);
                  alert(`API lỗi: ${e.message}`);
                });
            }}
          >
            Test API Connection
          </button>
        </div>
      </div>
    </div>
  );
}
