import { useAuth } from '../utils/AuthProvider';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.email?.[0].toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user?.email}</h2>
              <p className="text-gray-600">Member since {new Date(user?.createdAt || '').toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Account Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Account Type</p>
                  <p className="font-medium">Standard</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Statistics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-500">0</p>
                  <p className="text-gray-600">Books</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-500">0</p>
                  <p className="text-gray-600">Movies</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-500">0</p>
                  <p className="text-gray-600">Songs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 