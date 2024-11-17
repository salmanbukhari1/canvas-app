const admin = require("../utils/firebaseAdmin");

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized. Token missing." });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach the decoded token to the request object
    next(); // Proceed to the next middleware or handler
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "Unauthorized. Invalid token." });
  }
};

module.exports = checkAuth;
