const functions = require("firebase-functions");
const cors = require("cors");

// Import configurations, middleware, and handlers
const corsOptions = require("./config/corsOptions");
const checkAuth = require("./middlewares/checkAuth");
const getMultipleDrawings = require("./handlers/getMultipleDrawings");
const getUserDrawing = require("./handlers/getUserDrawing");
const saveUserDrawing = require("./handlers/saveUserDrawing");

// Cloud Function: Save User Drawing
exports.saveUserDrawing = functions.https.onRequest((req, res) => {
  cors(corsOptions)(req, res, () => {
    if (req.method === "OPTIONS") {
      return res.status(204).send(""); // Handle preflight request
    }
    checkAuth(req, res, () => saveUserDrawing(req, res));
  });
});

// Cloud Function: Get Multiple Drawings
exports.getMultipleDrawings = functions.https.onRequest((req, res) => {
  checkAuth(req, res, () => getMultipleDrawings(req, res));
});

// Cloud Function: Get a Single Drawing
exports.getUserDrawing = functions.https.onRequest((req, res) => {
  checkAuth(req, res, () => getUserDrawing(req, res));
});
