const admin = require("../utils/firebaseAdmin");

const getMultipleDrawings= async (req, res) => {
  const userId = req.user.uid;

  try {
    const db = admin.firestore();
    const drawingsRef = db.collection("users").doc(userId).collection("drawings");
    const snapshot = await drawingsRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No drawings found for this user." });
    }

    const drawings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(drawings);
  } catch (error) {
    console.error("Error fetching drawings:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getMultipleDrawings;
