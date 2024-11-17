// utils/tokenHelper.js
export function getToken(req) {
    // Server-side: Check if token is in cookies from req
    if (req?.cookies?.token) {
      return req.cookies.token;
    }
  
    // Client-side: Extract token from document.cookie if req is empty
    if (typeof window !== 'undefined') {
      const token = document.cookie
        .split(';')
        .find(cookie => cookie.trim().startsWith('token='))
        ?.split('=')[1];
      return token || null; // Return token or null if not found
    }
  
    return null; // Default return when no token is found
  }
  