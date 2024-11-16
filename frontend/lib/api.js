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
    try {
        // Call the Cloud Function API with the Firebase ID token
        const res = await fetch('http://backend:5001/canvas-app-d8547/us-central1/getMultipleDrawings', {
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
        // Call the Cloud Function API with the Firebase ID token
        const res = await fetch('http://backend:5001/canvas-app-d8547/us-central1/getUserDrawing?drawingId='+drawingId, {
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
        // Call the Cloud Function API with the Firebase ID token
        const res = await fetch('https://us-central1-canvas-app-production.cloudfunctions.net/saveUserDrawing', {
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

