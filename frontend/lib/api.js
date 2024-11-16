function getBaseUrl(withinService=false) {
    const isLocal = process.env.NODE_ENV === "development";
    let appId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const region = process.env.NEXT_PUBLIC_REGION;
  
    if (isLocal) {
        return withinService ? `http://backend:5001/${appId}/${region}` : `http://localhost:5001/${appId}/${region}`;
    } else {
        return `https://${region}-${appId}.cloudfunctions.net`;
    }
}

function getFullUrl(endpoint, withinService) {
    const baseUrl = getBaseUrl(withinService);
    return `${baseUrl}/${endpoint}`;
}

/**
 * Fetches multiple drawings for a user by calling a Firebase Cloud Function.
 *
 * This function sends an HTTP GET request to the specified Cloud Function endpoint,
 * using the provided Firebase ID token for authentication.
 *
 * @async
 * @function getMultipleUserDrawings
 * @param {string} token - The Firebase ID token for authenticating the request.
 * @returns {Promise<Array>} - A promise that resolves to an array of drawing objects if successful, or an empty array if an error occurs.
 * @throws {Error} - Throws an error if the response from the server is not OK.
 *
 * @example
 * const token = await getIdToken(); // Fetch the Firebase ID token
 * const drawings = await getMultipleUserDrawings(token);
 * console.log(drawings);
 */
export async function getMultipleUserDrawings(token) {

    // http://localhost:5001/canvas-app-d8547/us-central1/getMultipleDrawings
    // https://us-central1-canvas-app-production.cloudfunctions.net/getMultipleDrawings
    
    try {

        const requestUrl = getFullUrl("getMultipleDrawings", true);
        console.log("request_url: ", requestUrl);
        console.log("checking_environment_variables: ", process.env.NODE_ENV)
        // Call the Cloud Function API with the Firebase ID token
        const res = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw ('Failed to fetch drawings');
        }

        const drawings = await res.json();

        return drawings;

    } catch (error) {
        // TODO::need to log this
        console.error(
            'Error fetching user drawings:', 
            error
        );

        throw (error);
    }
}

/**
 * Fetches a specific drawing for a user by calling a Firebase Cloud Function.
 *
 * This function sends an HTTP GET request to the specified Cloud Function endpoint,
 * using the provided Firebase ID token for authentication and a drawing ID as a query parameter.
 *
 * @async
 * @function getUserDrawing
 * @param {string} token - The Firebase ID token for authenticating the request.
 * @param {string} drawingId - The unique ID of the drawing to fetch.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the drawing data if successful, or an empty array if an error occurs.
 * @throws {Error} - Throws an error if the response from the server is not OK.
 *
 * @example
 * const token = await getIdToken(); // Fetch the Firebase ID token
 * const drawingId = "abc123";
 * const drawing = await getUserDrawing(token, drawingId);
 * console.log(drawing);
 */
export async function getUserDrawing(token, drawingId) {

    try {

        const requestUrl = getFullUrl("getUserDrawing", true);
        // Call the Cloud Function API with the Firebase ID token
        const res = await fetch(`${requestUrl}?drawingId=${drawingId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw ('Failed to fetch drawings');
        }

        const drawing = await res.json();

        return drawing;

    } catch (error) {
        // TODO::need to log this
        console.error(
            'Error fetching the drawing:', 
            error
        );
        
        throw (error);
    }
}

// save a particular user's drawing
export async function saveUserDrawing(token, drawingData, drawingId=null) {

    try {

        const requestUrl = getFullUrl("saveUserDrawing");
        // Call the Cloud Function API with the Firebase ID token
        const res = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'  // Specify JSON content
            },
            body: JSON.stringify({
                'drawingId': drawingId,
                'drawingData': drawingData
            })
        });

        if (!res.ok) {
            throw ('Failed to save drawing');
        }

    } catch (error) {
        // TODO::need to log this
        console.error(
            'Error fetching user drawings:', 
            error
        );

        throw ('Failed to save drawing');
    }
}

