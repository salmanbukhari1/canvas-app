// utils/urlHelper.js
export function getBaseUrl(withinService = false) {
    const isLocal = process.env.NODE_ENV === 'development';
    const appId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const region = process.env.NEXT_PUBLIC_REGION;
  
    if (isLocal) {
      return withinService
        ? `http://backend:5001/${appId}/${region}`
        : `http://localhost:5001/${appId}/${region}`;
    }
    return `https://${region}-${appId}.cloudfunctions.net`;
  }
  
  export function getFullUrl(endpoint, withinService = false) {
    const baseUrl = getBaseUrl(withinService);
    return `${baseUrl}/${endpoint}`;
  }
  