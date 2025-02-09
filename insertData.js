const admin = require("firebase-admin");

// Initialize Firebase
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const legalAdvices = [
    // 🏛 General Laws
    {
        category: "general",
        section: "Right to Information Act, 2005",
        advice: "Citizens have the right to request information from government authorities.",
        keywords: ["information", "RTI", "government data"]
    },
    {
        category: "general",
        section: "Consumer Protection Act, 2019",
        advice: "Consumers can file complaints against unfair trade practices.",
        keywords: ["consumer", "fraud", "scam", "purchase"]
    },
    {
        category: "general",
        section: "Article 21 - Indian Constitution",
        advice: "Right to life and personal liberty is a fundamental right.",
        keywords: ["life", "liberty", "fundamental rights"]
    },
    {
        category: "general",
        section: "Indian Penal Code - Section 499",
        advice: "Defamation can lead to imprisonment or fines.",
        keywords: ["defamation", "reputation", "slander", "libel"]
    },

    // ⚖ Criminal Laws
    {
        category: "criminal",
        section: "IPC - Section 302",
        advice: "Murder is punishable with life imprisonment or the death penalty.",
        keywords: ["murder", "homicide", "killing", "death"]
    },
    {
        category: "criminal",
        section: "IPC - Section 420",
        advice: "Cheating and fraud are punishable offenses.",
        keywords: ["fraud", "cheating", "dishonesty", "scam"]
    },
    {
        category: "criminal",
        section: "IPC - Section 376",
        advice: "Rape is a serious offense with strict punishment.",
        keywords: ["rape", "sexual assault", "abuse", "women safety"]
    },
    {
        category: "criminal",
        section: "NDPS Act, 1985",
        advice: "Drug trafficking is a punishable offense.",
        keywords: ["drugs", "narcotics", "trafficking", "illegal substances"]
    },

    // 👨‍👩‍👧 Family Laws
    {
        category: "family",
        section: "Hindu Marriage Act, 1955 - Section 13",
        advice: "Divorce can be filed based on cruelty, desertion, or adultery.",
        keywords: ["marriage", "divorce", "relationship", "separation"]
    },
    {
        category: "family",
        section: "Hindu Succession Act, 1956",
        advice: "Daughters have equal inheritance rights.",
        keywords: ["inheritance", "property rights", "daughter", "legal heir"]
    },
    {
        category: "family",
        section: "Special Marriage Act, 1954",
        advice: "Inter-religious marriages require legal registration.",
        keywords: ["marriage", "inter-religious", "court marriage"]
    },
    {
        category: "family",
        section: "Domestic Violence Act, 2005",
        advice: "Protection for women against abuse is ensured.",
        keywords: ["domestic violence", "abuse", "women safety"]
    },

    // 🏢 Business Laws
    {
        category: "business",
        section: "Companies Act, 2013",
        advice: "CSR spending is mandatory for eligible companies.",
        keywords: ["company", "corporate", "CSR", "business law"]
    },
    {
        category: "business",
        section: "Indian Contract Act, 1872",
        advice: "All agreements are contracts if made with free consent.",
        keywords: ["contract", "agreement", "business deal"]
    },
    {
        category: "business",
        section: "GST Act, 2017",
        advice: "Businesses must comply with GST rules.",
        keywords: ["tax", "GST", "business tax"]
    },
    {
        category: "business",
        section: "Trademark Act, 1999",
        advice: "Trademark infringement can lead to penalties.",
        keywords: ["trademark", "brand", "copyright"]
    },

    // 🌍 Environmental Laws
    {
        category: "environment",
        section: "Environment Protection Act, 1986",
        advice: "Pollution control is mandatory for industries.",
        keywords: ["pollution", "environment", "climate change"]
    },
    {
        category: "environment",
        section: "Wildlife Protection Act, 1972",
        advice: "Hunting endangered species is a criminal offense.",
        keywords: ["wildlife", "hunting", "illegal poaching"]
    },
    {
        category: "environment",
        section: "Water (Prevention & Control of Pollution) Act, 1974",
        advice: "Waste disposal into water bodies is strictly regulated.",
        keywords: ["water pollution", "environment", "waste management"]
    },
    {
        category: "environment",
        section: "Air (Prevention & Control of Pollution) Act, 1981",
        advice: "Industries must comply with air pollution control measures.",
        keywords: ["air pollution", "smoke", "industrial waste"]
    }
];

// Insert data into Firestore
async function insertData() {
    try {
        const legalAdviceRef = db.collection("legal_advice");

        for (let advice of legalAdvices) {
            await legalAdviceRef.add(advice);
        }

        console.log("✅ 20 Legal Advice Entries Inserted Successfully!");
    } catch (error) {
        console.error("❌ Error inserting data:", error);
    }
}

insertData();
