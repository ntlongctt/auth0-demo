import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Auth0Provider } from "@auth0/auth0-react";

import type { Route } from "./+types/root";
import "./app.css";
import { getConfig } from "./modules/auth0/config";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const onRedirectCallback = (appState?: { returnTo?: string }) => {
  // Use window.location for navigation since we're in browser context
  const returnTo =
    appState?.returnTo ||
    (typeof window !== "undefined" ? window.location.pathname : "/");
  if (typeof window !== "undefined") {
    window.location.href = returnTo;
  }
};

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  // Configure session management for persistent authentication
  cacheLocation: "localstorage", // Use localStorage to persist tokens across page refreshes
  useRefreshTokens: true, // Enable refresh tokens for secure session management
  useRefreshTokensFallback: true, // Allow fallback to localStorage if needed

  authorizationParams: {
    redirect_uri:
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000",
    ...(config.audience ? { audience: config.audience } : null),
  },
  // Additional configuration for better session handling
  skipRedirectCallback:
    typeof window !== "undefined"
      ? window.location.pathname === "/oidc-callback"
      : false,
} as any;

export default function App() {
  return (
    <Auth0Provider {...providerConfig}>
      <Outlet />
    </Auth0Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
