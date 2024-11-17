const admin = require("../utils/firebaseAdmin");

const getUserDrawing = async (req, res) => {
  const userId = req.user.uid;
  const drawingId = req.query.drawingId;

  try {
    const db = admin.firestore();
    const drawingRef = db.collection("users").doc(userId).collection("drawings").doc(drawingId);
    const snapshot = await drawingRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: "Drawing not found." });
    }

    return res.status(200).json({ id: snapshot.id, ...snapshot.data() });
  } catch (error) {
    console.error("Error fetching drawing:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getUserDrawing;
