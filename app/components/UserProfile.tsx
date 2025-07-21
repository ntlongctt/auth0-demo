import { useAuth0 } from "@auth0/auth0-react";

export function UserProfile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-3">
      {user.picture && (
        <img
          src={user.picture}
          alt={user.name || "User profile"}
          className="w-8 h-8 rounded-full"
        />
      )}
      <div className="text-sm">
        <p className="font-medium text-gray-900">{user.name || user.email}</p>
        {user.email && user.name && (
          <p className="text-gray-500">{user.email}</p>
        )}
      </div>
    </div>
  );
}
