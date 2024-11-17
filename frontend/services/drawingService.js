// services/drawingService.js
import { getFullUrl } from '../utils/urlHelper';
import { getToken } from '../utils/tokenHelper';
import { fetchRequest } from '../utils/fetchHelper';

/**
 * Fetches multiple drawings for a user by calling a Firebase Cloud Function.
 */
export async function getMultipleUserDrawings(req) {
    console.log("coming")
  const token = getToken(req);
  const requestUrl = getFullUrl('getMultipleDrawings', true);
  
  console.log('request_url: ', requestUrl);
  console.log('checking_environment_variables: ', process.env.NODE_ENV);

  return fetchRequest(requestUrl, 'GET', token);
}

/**
 * Fetches a specific drawing for a user by calling a Firebase Cloud Function.
 */
export async function getUserDrawing(req, drawingId) {
  const token = getToken(req);
  const requestUrl = getFullUrl('getUserDrawing', true);

  return fetchRequest(`${requestUrl}?drawingId=${drawingId}`, 'GET', token);
}

/**
 * Saves a particular user's drawing to the server.
 */
export async function saveUserDrawing(drawingData, drawingId = null) {
  const token = getToken();
  const requestUrl = getFullUrl('saveUserDrawing');

  await fetchRequest(requestUrl, 'POST', token, { drawingId, drawingData });
}
