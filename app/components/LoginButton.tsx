import { useAuth0 } from "@auth0/auth0-react";

export function LoginButton() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex gap-2">
        <button
          disabled
          className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed"
        >
          Loading...
        </button>
        <button
          disabled
          className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed"
        >
          Loading...
        </button>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Don't show login buttons if already authenticated
  }

  const handleWescoLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: "Wesco",
        screen_hint: "login",
      },
    });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => loginWithRedirect()}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
      >
        Log In
      </button>
      <button
        onClick={handleWescoLogin}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
      >
        Wesco Login
      </button>
    </div>
  );
}
