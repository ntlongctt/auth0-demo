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
    <div>
    <button
      onClick={() =>
        logout({
          logoutParams: {
            // returnTo: window.location.origin,
            //returnTo: `https://perf-iam.wesco.com/realms/wesco/protocol/openid-connect/logout`,
            returnTo: `https://perf-iam.wesco.com/realms/wesco/protocol/openid-connect/logout?client_id=Simplifi-Ent-Dev&post_logout_redirect_uri=${encodeURIComponent("https://dev-portal.proxy.simplifi.io/login")}`,
            //returnTo: "https://perf-iam.wesco.com/realms/wesco/protocol/openid-connect/logout?client_id=Simplifi-Ent-Dev&post_logout_redirect_uri=https%3A%2F%2Fdev-portal.proxy.simplifi.io%2Flogin",
            //federated: true
          },
        })
      }
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
    >
      Log Out
    </button>

      {/*
        <button
        className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed"
      >
        Iframe logout ...
      </button>
      <iframe 
      src="https://perf-iam.wesco.com/realms/wesco/protocol/openid-connect/logout">
    </iframe>
    */}
    </div>
  );
}
