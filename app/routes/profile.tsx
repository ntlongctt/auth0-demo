import type { Route } from "./+types/profile";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigation } from "../components/Navigation";
import { ProtectedRoute } from "../components/ProtectedRoute";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Auth0 Demo - Profile" },
    { name: "description", content: "Your authenticated user profile" },
  ];
}

export default function Profile() {
  const { user, getAccessTokenSilently } = useAuth0();

  const handleGetToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log("Access Token:", token);
      alert("Access token logged to console!");
    } catch (error) {
      console.error("Error getting access token:", error);
      alert("Error getting access token. Check console for details.");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900">
                  User Profile
                </h1>
                <p className="text-gray-600">
                  Your authenticated user information
                </p>
              </div>

              <div className="p-6">
                {user?.picture && (
                  <div className="flex justify-center mb-6">
                    <img
                      src={user.picture}
                      alt="User profile"
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {user?.name || "Not provided"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {user?.email || "Not provided"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email Verified
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {user?.email_verified ? (
                          <span className="text-green-600">✓ Verified</span>
                        ) : (
                          <span className="text-red-600">✗ Not verified</span>
                        )}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nickname
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {user?.nickname || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        User ID
                      </label>
                      <p className="mt-1 text-sm text-gray-900 font-mono break-all">
                        {user?.sub}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Locale
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {user?.locale || "Not provided"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Updated
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {user?.updated_at
                          ? new Date(user.updated_at).toLocaleString()
                          : "Not provided"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Identity Provider
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {user?.sub?.split("|")[0] || "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Actions
                  </h3>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleGetToken}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                    >
                      Get Access Token
                    </button>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Raw User Object
                  </h4>
                  <pre className="text-xs text-gray-600 overflow-x-auto">
                    {JSON.stringify(user, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
