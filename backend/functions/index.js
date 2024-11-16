// backend/functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();


const checkAuth = async (req, res, next) => {
  try {
    // Get the Firebase ID token from the request's Authorization header
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized. Token missing.' });
    }

    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach the decoded token to the request object
    next(); // Proceed to the next middleware or function
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
  }
};

// Cloud Function to get user drawings
const getMultipleDrawings = async (req, res) => {
  const userId = req.user.uid; // The user ID is now available from the decoded token

  try {
    // Access Firestore to fetch drawings
    const db = admin.firestore();
    const drawingsRef = db.collection('users')
                          .doc(userId)
                          .collection('drawings');

    const snapshot = await drawingsRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No drawings found for this user.' });
    }

    const drawings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(drawings);
  } catch (error) {
    console.error('Error fetching drawings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Cloud Function to get user drawings
const getUserDrawing = async (req, res) => {
  const userId = req.user.uid; // The user ID is now available from the decoded token
  const drawingId = req.query.drawingId

  try {
    // Access Firestore to fetch drawings
    const db = admin.firestore();
    const drawingsRef = db.collection('users')
                          .doc(userId)
                          .collection('drawings')
                          .doc(drawingId);

    const snapshot = await drawingsRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'Drawing not found' });
    }

    const response = {
      id: snapshot.id,      // Document ID
      ...snapshot.data()    // Document data
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching drawings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// save a users drawing
const saveUserDrawing = async (req, res) => {
  const userId = req.user.uid; // The user ID is now available from the decoded token
  // const drawingId = req.query.drawingId
  const { drawingId, drawingData } = req.body;
  const shapes = { shapes: drawingData }; // Store all shapes in an array

  // Check if all required data is provided
  if (!userId || !drawingData) {
    return res.status(400).send('Missing required parameters');
  }

  try {

    if (drawingId) {
      // If drawingId is provided, refer to the specific document
      const drawingDocRef = admin.firestore().doc(`users/${userId}/drawings/${drawingId}`);
      
      const docSnapshot = await drawingDocRef.get()

      if (docSnapshot.exists) {
        // If the document exists, update it
        await drawingDocRef.set(shapes, { merge: true });
        console.log("Drawing updated with ID:", drawingId);
      } else {
        // If document does not exist, create a new one
        await drawingDocRef.set(shapes);
        console.log("New drawing created with specified ID:", drawingId);
      }
    } else {
      // If drawingId is not provided, create a new document
      const drawingsCollectionRef = admin.firestore().collection(`users/${userId}/drawings`);
      const newDocRef = await drawingsCollectionRef.add(shapes);
      console.log("New drawing added with generated ID:", newDocRef.id);
    }

    return res.status(200).json({'success': true});

  } catch (error) {
    console.error("Error saving drawing:", error);
    return res.status(500).json({ error: error });
  }
};

// Cloud Function to handle the request with middleware
exports.saveUserDrawing = functions.https.onRequest((req, res) => {
  // Apply the authentication middleware
  checkAuth(req, res, () => {
    // Proceed to get the user drawings once authenticated
    saveUserDrawing(req, res);
  });
});

// Cloud Function to handle the request with middleware
exports.getUserDrawing = functions.https.onRequest((req, res) => {
  // Apply the authentication middleware
  checkAuth(req, res, () => {
    // Proceed to get the user drawings once authenticated
    getUserDrawing(req, res);
  });
});

// Cloud Function to handle the request with middleware
exports.getMultipleDrawings = functions.https.onRequest((req, res) => {
  // Apply the authentication middleware
  checkAuth(req, res, () => {
    // Proceed to get the user drawings once authenticated
    getMultipleDrawings(req, res);
  });
});