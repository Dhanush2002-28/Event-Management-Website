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
    const loadingIndicator = document.getElementById('loading'); // Add a loading element in your HTML

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
            await addDoc(collection(db, 'bookings'), formData);
            alert('Booking submitted successfully!');
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('Error submitting booking.');
        } finally {
            // Hide loading indicator
            loadingIndicator.style.display = 'none';
        }
    });
});
