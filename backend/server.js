require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const serviceAccount = {
	type: process.env.FIREBASE_TYPE,
	project_id: process.env.FIREBASE_PROJECT_ID,
	private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
	private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
	client_email: process.env.FIREBASE_CLIENT_EMAIL,
	client_id: process.env.FIREBASE_CLIENT_ID,
};

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.post("/api/addWatched", async (req, res) => {
	const watchedTitles = req.body;

	if (!watchedTitles.title) {
		return res.status(400).json({ error: "You need a title" });
	}

	const docRef = await db.collection("watched").add(watchedTitles);

	res.status(201).json({
		message: "Title added",
		id: docRef.id,
		title: watchedTitles,
		watchedAt: admin.firestore.Timestamp.now(),
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
