require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// Initialize Express App
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// 🔹 Test Firestore Connection
db.collection("legal_advice").get()
    .then(snapshot => {
        if (snapshot.empty) {
            console.log("⚠ No legal advice found in Firestore.");
        } else {
            console.log(`✅ Firestore connected: ${snapshot.size} documents found.`);
        }
    })
    .catch(error => console.error("❌ Firestore error:", error));

// 🔹 API Endpoint to Fetch Legal Advice by Category and Keyword
app.post("/getAdvice", async (req, res) => {
    const { category, keyword } = req.body;

    if (!category || !keyword) {
        return res.status(400).json({ error: "Category and keyword are required." });
    }

    try {
        console.log("🔍 Fetching legal advice for category:", category, "and keyword:", keyword);

        const snapshot = await db.collection("legal_advice")
            .where("category", "==", category)
            .get();

        if (snapshot.empty) {
            console.log("⚠ No advice found for category:", category);
            return res.status(404).json({ error: "No advice found for this category." });
        }

        let results = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.keywords.some(k => k.toLowerCase() === keyword.toLowerCase())) {
                results.push({ section: data.section, advice: data.advice });
            }
        });

        if (results.length === 0) {
            return res.status(404).json({ error: "No advice found for the given keyword in this category." });
        }

        console.log("✅ Advice found:", results);
        res.json({ category, keyword, advice: results });
    } catch (error) {
        console.error("❌ Firestore error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
});
