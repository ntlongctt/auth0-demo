import type { Route } from "./+types/home";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigation } from "../components/Navigation";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Auth0 Demo - Home" },
    { name: "description", content: "Welcome to React Router with Auth0!" },
  ];
}

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuth0();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : isAuthenticated ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome back, {user?.name || user?.email}! 👋
              </h1>
              <p className="text-gray-600 mb-6">
                You are successfully authenticated with Auth0. You now have
                access to protected areas of the application.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <h3 className="text-sm font-medium text-green-800 mb-2">
                  Authentication Status: ✅ Authenticated
                </h3>
                <div className="text-sm text-green-700">
                  <p>
                    <strong>User ID:</strong> {user?.sub}
                  </p>
                  <p>
                    <strong>Email:</strong> {user?.email}
                  </p>
                  <p>
                    <strong>Email Verified:</strong>{" "}
                    {user?.email_verified ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Last Updated:</strong> {user?.updated_at}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Auth0 Demo! 🔐
              </h1>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2">
                  Authentication Status: ❌ Not Authenticated
                </h3>
                <p className="text-sm text-blue-700">
                  Click the "Log In" button in the navigation to authenticate
                  with Auth0.
                </p>
              </div>
            </div>

            <Welcome />
          </div>
        )}
      </main>
    </div>
  );
}
