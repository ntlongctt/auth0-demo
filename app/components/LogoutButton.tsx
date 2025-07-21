import { useAuth0 } from "@auth0/auth0-react";

export function LogoutButton() {
  const { logout, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <button
        disabled
        className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

  if (!isAuthenticated) {
    return null; // Don't show logout button if not authenticated
  }

  return (
    <button
      onClick={() =>
        logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        })
      }
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
    >
      Log Out
    </button>
  );
}
