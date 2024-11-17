const admin = require("../utils/firebaseAdmin");

const saveUserDrawing = async (req, res) => {
  const userId = req.user.uid;
  const { drawingId, drawingData } = req.body;
  const shapes = { shapes: drawingData };

  if (!userId || !drawingData) {
    return res.status(400).send("Missing required parameters");
  }

  try {
    const db = admin.firestore();

    if (drawingId) {
      const drawingRef = db.collection("users").doc(userId).collection("drawings").doc(drawingId);
      const docSnapshot = await drawingRef.get();

      if (docSnapshot.exists) {
        await drawingRef.set(shapes, { merge: true });
      } else {
        await drawingRef.set(shapes);
      }
    } else {
      const drawingsRef = db.collection("users").doc(userId).collection("drawings");
      await drawingsRef.add(shapes);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving drawing:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = saveUserDrawing;
