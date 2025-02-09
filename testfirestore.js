const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

db.collection("legal_advice").get()
    .then(snapshot => {
        if (snapshot.empty) {
            console.log("No legal advice found.");
        } else {
            snapshot.forEach(doc => {
                console.log(doc.id, "=>", doc.data());
            });
        }
    })
    .catch(error => console.error("Firestore error:", error));