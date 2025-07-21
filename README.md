# Auth0 Demo with React Router v7

This project demonstrates a complete Auth0 integration with React Router v7, featuring authentication, protected routes, and user management.

## Features

- 🔐 **Authentication Flow**: Login/logout with Auth0
- 🛡️ **Protected Routes**: Routes that require authentication
- 👤 **User Profile**: Display authenticated user information
- 🎨 **Modern UI**: Beautiful interface with Tailwind CSS
- ⚡ **React Router v7**: Latest routing with SSR support
- 🔄 **Token Management**: Access token retrieval and refresh

## Auth0 Setup

### 1. Create an Auth0 Application

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Create a new "Single Page Application"
3. Note down your **Domain** and **Client ID**

### 2. Configure Application Settings

In your Auth0 application settings:

- **Allowed Callback URLs**: `http://localhost:5173`
- **Allowed Logout URLs**: `http://localhost:5173`
- **Allowed Web Origins**: `http://localhost:5173`

For production, replace `http://localhost:5173` with your production URL.

### 3. Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=your-auth0-api-audience
VITE_AUTH0_REDIRECT_URI=http://localhost:5173
```

Replace:

- `your-auth0-domain.auth0.com` with your Auth0 domain
- `your-auth0-client-id` with your Auth0 client ID
- `your-auth0-api-audience` with your API audience (optional)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd auth0-demo
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables as described above

4. Start the development server:

```bash
pnpm dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
app/
├── components/           # Reusable UI components
│   ├── LoginButton.tsx   # Auth0 login button
│   ├── LogoutButton.tsx  # Auth0 logout button
│   ├── Navigation.tsx    # Main navigation with auth state
│   ├── ProtectedRoute.tsx # HOC for protected routes
│   └── UserProfile.tsx   # User profile display component
├── lib/
│   └── auth0.ts         # Auth0 configuration
├── routes/
│   ├── home.tsx         # Home page with auth status
│   └── profile.tsx      # Protected user profile page
├── welcome/             # Welcome components
├── app.css             # Global styles
├── root.tsx            # Root app with Auth0Provider
└── routes.ts           # Route configuration
```

## Available Routes

- **`/`** - Home page (public, shows auth status)
- **`/profile`** - User profile page (protected, requires login)

## Key Components

### Auth0Provider Setup

The app is wrapped with `Auth0Provider` in `app/root.tsx`:

```tsx
<Auth0Provider {...auth0Config}>
  <Outlet />
</Auth0Provider>
```

### Protected Routes

Use the `ProtectedRoute` component to protect routes:

```tsx
<ProtectedRoute>
  <YourProtectedContent />
</ProtectedRoute>
```

### Authentication Hooks

The app uses Auth0's `useAuth0` hook:

```tsx
const { isAuthenticated, isLoading, user, loginWithRedirect, logout } =
  useAuth0();
```

## Features in Detail

### Authentication Flow

1. **Login**: Click "Log In" → redirects to Auth0 → returns to app authenticated
2. **Logout**: Click "Log Out" → clears session → redirects to home page
3. **Protected Routes**: Automatic redirect to login if not authenticated

### User Profile

The profile page (`/profile`) displays:

- User avatar and basic information
- Email verification status
- Authentication metadata
- Access token retrieval functionality
- Raw user object for debugging

### Navigation

The navigation component shows different states:

- **Not authenticated**: Shows "Log In" button
- **Authenticated**: Shows user profile info and "Log Out" button
- **Loading**: Shows loading state

## Customization

### Styling

The project uses Tailwind CSS. Customize styles by modifying the component classes or extending the Tailwind configuration.

### Auth0 Configuration

Modify `app/lib/auth0.ts` to adjust Auth0 settings:

- Add scopes
- Configure token caching
- Set up custom domains
- Add audience for API access

### Adding New Protected Routes

1. Create a new route file in `app/routes/`
2. Wrap content with `<ProtectedRoute>`
3. Add route to `app/routes.ts`
4. Run `pnpm typecheck` to generate types

## Deployment

### Environment Variables for Production

Set the following environment variables in your production environment:

- `VITE_AUTH0_DOMAIN`
- `VITE_AUTH0_CLIENT_ID`
- `VITE_AUTH0_AUDIENCE` (if using APIs)
- `VITE_AUTH0_REDIRECT_URI` (your production URL)

### Auth0 Production Configuration

Update your Auth0 application settings with production URLs:

- Allowed Callback URLs
- Allowed Logout URLs
- Allowed Web Origins

## Troubleshooting

### Common Issues

1. **Environment variables not loading**: Ensure `.env.local` is in project root and variables start with `VITE_`

2. **Redirect URL mismatch**: Check that Auth0 settings match your local/production URLs

3. **Token issues**: Verify your Auth0 audience is correctly configured

4. **CORS errors**: Ensure your domain is added to Auth0 "Allowed Web Origins"

### Debug Mode

Enable debug logging by adding to your Auth0 config:

```tsx
export const auth0Config = {
  // ... other config
  __debug: true, // Enable Auth0 debug logging
};
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm typecheck` - Generate types and run TypeScript check

## Learn More

- [Auth0 React SDK](https://auth0.com/docs/libraries/auth0-react)
- [React Router v7](https://reactrouter.com/dev)
- [Auth0 Dashboard](https://manage.auth0.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## License

This project is for demonstration purposes.
