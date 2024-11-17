// middleware.js
import { NextResponse } from 'next/server';

export async function middleware(req) {
  // Get the requested URL
  const url = req.nextUrl;

  // Retrieve the token from the cookies
  // Skip middleware for static assets and API routes
  if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  const token = req.cookies.get('token')?.value || req.headers.get('Authorization')?.split('Bearer ')[1];
  // console.log(token)
  // Skip authentication check for login and register pages, and redirect if token is found
  if (url.pathname === '/login' || url.pathname === '/register') {
    if (token) {
      console.log("Token found, redirecting to home page.");
      return NextResponse.redirect(new URL('/', url)); // Redirect to home page if token found
    }
    return NextResponse.next(); // Allow the request to continue if no token is found
  }

  // If no token is found, redirect to login page
  if (!token) {
    console.log("No token found, redirecting to login page.");
    return NextResponse.redirect(new URL('/login', url)); // Redirect to login if no token
  }

  // If token exists and not on login/register pages, allow the request to proceed
  return NextResponse.next();
}
