import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

document.getElementById("eventForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phno").value,
        email: document.getElementById("email").value,
        location: document.getElementById("location").value,
        eventType: document.getElementById("event-type").value
    };

    try {
        // Add form data to Firestore
        await addDoc(collection(db, "eventBookings"), formData);
        alert("Booking details submitted successfully!");
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});
