import { useAuth0 } from "@auth0/auth0-react";

export function PostLogout() {
return (
<html>
    {/* Your post-logout page (https://your-app.com/post-logout) */}
  {/*
  <body>
    <h3>Logging out...</h3>
    <!-- src="https://perf-iam.wesco.com/realms/wesco/protocol/openid-connect/logout?redirect_uri=https://dev-portal.proxy.simplifi.io/login" -->
    <iframe 
      src="https://perf-iam.wesco.com/realms/wesco/protocol/openid-connect/logout"
      style="display:none">
    </iframe>
    <script>
      setTimeout(() => window.location.href = "https://your-app.com/logged-out", 1000);
    </script>
  </body>
  */}
</html>
);
}