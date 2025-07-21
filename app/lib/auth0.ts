// Auth0 Configuration
// Updated with specific configuration for dev-simplifi environment

export const auth0Config = {
  domain: "dev-simplifi.us.auth0.com",
  clientId: "nh0TWfLIdvSa3XTjVzmDpmffeBwIJjKr",
  useRefreshTokens: true,
  cacheLocation: "localstorage" as const,
};

// Authorization parameters for different login scenarios
export const authParams = {
  default: {
    redirect_uri:
      "https://dev-oauth.proxy.simplifi.io/api/v2/oauth/oidc/callback",
    audience: "simplifi-web",
  },
  wesco: {
    redirect_uri:
      "https://dev-oauth.proxy.simplifi.io/api/v2/oauth/oidc/callback",
    audience: "simplifi-web",
    connection: "Wesco",
  },
};

// Additional configuration constants
export const appConfig = {
  appOrigin: "http://localhost:3000",
  apiOrigin: "http://localhost:3001",
};
