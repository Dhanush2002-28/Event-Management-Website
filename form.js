// Import required Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_cgvQzdk_YxgN7gEEr9Hn4Csk3JOT_wU",
    authDomain: "jkeventmanagement-a0ec7.firebaseapp.com",
    databaseURL: "https://jkeventmanagement-a0ec7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jkeventmanagement-a0ec7",
    storageBucket: "jkeventmanagement-a0ec7.firebasestorage.app",
    messagingSenderId: "462865247499",
    appId: "1:462865247499:web:f6e973862f21e88247460e",
    measurementId: "G-FNKPX3PSGV"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('eventForm');
    const loadingIndicator = document.getElementById('loading');

    // Explicitly load EmailJS script
    const emailjsScript = document.createElement('script');
    emailjsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    emailjsScript.onload = () => {
        // Initialize EmailJS after script is loaded
        emailjs.init('5eT0ObIOCTMyvpRvq');
    };
    document.head.appendChild(emailjsScript);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading indicator
        loadingIndicator.style.display = 'block';
        
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phno').value,
            email: document.getElementById('email').value,
            location: document.getElementById('location').value,
            eventType: document.getElementById('event-type').value,
        };
        
        try {
            // Submit data to Firestore
            await addDoc(collection(db, 'bookings'), formData);
            
            // Send email to team
            const teamResult = await emailjs.send(
                'service_4ahkiql',      // Service ID
                'template_b2h48yb',     // Team Template ID
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    location: formData.location,
                    event_type: formData.eventType,
                    reply_to: formData.email
                }
            );

            // Send confirmation email to user
            const userResult = await emailjs.send(
                'service_4ahkiql',      // Service ID
                'template_4o322bs',     // User Template ID
                {
                    user_name: formData.name,
                    user_email: formData.email,
                    phone: formData.phone,
                    location: formData.location,
                    event_type: formData.eventType,
                    reply_to: formData.email
                }
            );
            
            console.log('Team email sent:', teamResult.text);
            console.log('User confirmation email sent:', userResult.text);
            
            alert('Booking submitted successfully! A confirmation email has been sent.');
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('Error submitting booking. Please try again.');
        } finally {
            // Hide loading indicator
            loadingIndicator.style.display = 'none';
        }
    });
});