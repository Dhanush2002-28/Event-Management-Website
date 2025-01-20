import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

let firebaseConfig = {}; // Placeholder for Firebase config
let emailjsConfig = {};  // Placeholder for EmailJS config

// Fetch configuration from the serverless function
(async function fetchConfig() {
    try {
        console.log("Fetching configuration...");
        const response = await fetch('/api/emailjs-config');
        if (!response.ok) {
            throw new Error(`Failed to fetch config: ${response.status} ${response.statusText}`);
        }
        const config = await response.json();
        console.log("Configuration fetched successfully:", config);

        // Extract Firebase and EmailJS config
        firebaseConfig = {
            apiKey: config.firebaseApiKey,
            authDomain: config.firebaseAuthDomain,
            databaseURL: config.firebaseDatabaseURL,
            projectId: config.firebaseProjectId,
            storageBucket: config.firebaseStorageBucket,
            messagingSenderId: config.firebaseMessagingSenderId,
            appId: config.firebaseAppId,
            measurementId: config.firebaseMeasurementId,
        };

        emailjsConfig = {
            userId: config.userId,
            serviceId: config.serviceId,
            templateIdTeam: config.templateIdTeam,
            templateIdUser: config.templateIdUser,
        };

        // Initialize Firebase with fetched config
        initializeFirebase();
    } catch (error) {
        console.error("Error fetching configuration:", error);
        alert("Failed to fetch configuration. Please try again later.");
    }
})();

function initializeFirebase() {
    try {
        console.log("Initializing Firebase...");
        const app = initializeApp(firebaseConfig);
        console.log("Firebase initialized successfully");
        window.db = getFirestore(app);
    } catch (error) {
        console.error("Error initializing Firebase:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('eventForm');
    const loadingIndicator = document.getElementById('loading');

    const emailjsScript = document.createElement('script');
    emailjsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    emailjsScript.onload = () => {
        try {
            console.log("EmailJS script loaded successfully");
            emailjs.init(emailjsConfig.userId);
        } catch (error) {
            console.error("Error initializing EmailJS:", error);
        }
    };
    emailjsScript.onerror = () => {
        console.error("Error loading EmailJS script");
    };
    document.head.appendChild(emailjsScript);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        loadingIndicator.style.display = 'block';

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phno').value,
            email: document.getElementById('email').value,
            location: document.getElementById('location').value,
            date: document.getElementById('date').value,
            eventType: document.getElementById('event-type').value,
        };

        try {
            console.log("Submitting form data to Firestore:", formData);
            await addDoc(collection(window.db, 'bookings'), formData);
            console.log("Data added to Firestore successfully");

            // Send emails
            console.log("Sending emails via EmailJS...");
            const teamResult = await emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateIdTeam, {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                location: formData.location,
                date: formData.date,
                event_type: formData.eventType,
                reply_to: formData.email,
            });

            const userResult = await emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateIdUser, {
                user_name: formData.name,
                user_email: formData.email,
                phone: formData.phone,
                location: formData.location,
                date: formData.date,
                event_type: formData.eventType,
                reply_to: formData.email,
            });

            console.log("Team email sent:", teamResult.text);
            console.log("User confirmation email sent:", userResult.text);

            alert('Booking submitted successfully! A confirmation email has been sent.');
        } catch (error) {
            console.error("Error during form submission:", error);
            alert('Error submitting booking. Please try again.');
        } finally {
            loadingIndicator.style.display = 'none';
        }
    });
});
