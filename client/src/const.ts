export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "Tech Horizon Academy";

export const APP_LOGO = "/images/logo-new.png";

export const BOOKING_URL = "https://klipy.ai/huxleyp";

// Generate login URL at runtime so redirect URI reflects the current origin.
// Optionally accepts a return URL to redirect to after login
export const getLoginUrl = (returnTo?: string) => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  
  // Encode both the callback URI and the return URL in state
  const stateData = {
    redirectUri,
    returnTo: returnTo || window.location.pathname + window.location.search
  };
  const state = btoa(JSON.stringify(stateData));

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
