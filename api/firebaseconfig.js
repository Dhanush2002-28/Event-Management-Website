export default function handler(req, res) {
    res.status(200).json({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: "jkeventmanagement-a0ec7.firebaseapp.com",
        databaseURL: "https://jkeventmanagement-a0ec7-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "jkeventmanagement-a0ec7",
        storageBucket: "jkeventmanagement-a0ec7.firebasestorage.app",
        messagingSenderId: "462865247499",
        appId: "1:462865247499:web:f6e973862f21e88247460e",
        measurementId: "G-FNKPX3PSGV",
    });
}
