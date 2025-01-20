import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

let firebaseConfig = {};
let emailjsConfig = {};

// Fetch both configurations
async function fetchConfigs() {
    try {
        console.log("Fetching configurations...");
        
        // Fetch Firebase config
        const firebaseResponse = await fetch('/api/firebaseconfig');
        if (!firebaseResponse.ok) {
            throw new Error(`Failed to fetch Firebase config: ${firebaseResponse.status}`);
        }
        firebaseConfig = await firebaseResponse.json();
        
        // Fetch EmailJS config
        const emailjsResponse = await fetch('/api/emailjs-config');
        if (!emailjsResponse.ok) {
            throw new Error(`Failed to fetch EmailJS config: ${emailjsResponse.status}`);
        }
        emailjsConfig = await emailjsResponse.json();
        
        // Initialize services
        initializeServices();
    } catch (error) {
        console.error("Error fetching configurations:", error);
        alert("Failed to initialize services. Please try again later.");
    }
}

function initializeServices() {
    try {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        window.db = getFirestore(app);
        console.log("Firebase initialized successfully");
        
        // Initialize EmailJS
        const emailjsScript = document.createElement('script');
        emailjsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        emailjsScript.onload = () => {
            emailjs.init(emailjsConfig.userId);
            console.log("EmailJS initialized successfully");
        };
        document.head.appendChild(emailjsScript);
    } catch (error) {
        console.error("Error initializing services:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Fetch configurations when the document loads
    fetchConfigs();
    
    const form = document.getElementById('eventForm');
    const loadingIndicator = document.getElementById('loading');

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
            timestamp: new Date().toISOString()
        };

        try {
            // Add to Firestore
            await addDoc(collection(window.db, 'bookings'), formData);
            console.log("Data added to Firestore successfully");

            // Send emails
            await Promise.all([
                // Team notification
                emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateIdTeam, {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    location: formData.location,
                    date: formData.date,
                    event_type: formData.eventType,
                    reply_to: formData.email,
                }),
                // User confirmation
                emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateIdUser, {
                    user_name: formData.name,
                    user_email: formData.email,
                    phone: formData.phone,
                    location: formData.location,
                    date: formData.date,
                    event_type: formData.eventType,
                    reply_to: formData.email,
                })
            ]);

            alert('Booking submitted successfully! A confirmation email has been sent.');
            form.reset();
        } catch (error) {
            console.error("Error during form submission:", error);
            alert('Error submitting booking. Please try again.');
        } finally {
            loadingIndicator.style.display = 'none';
        }
    });
});