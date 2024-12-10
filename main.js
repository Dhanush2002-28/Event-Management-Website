// main.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseConfig } from './firebase-config'; // Make sure the path matches your project

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function submitForm(event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phno').value;
  const email = document.getElementById('email').value;
  const location = document.getElementById('location').value;
  const eventType = document.getElementById('event-type').value;

  try {
    const docRef = await addDoc(collection(db, 'formEntries'), {
      name,
      phone,
      email,
      location,
      eventType,
      timestamp: new Date()
    });
    console.log('Document written with ID: ', docRef.id);
    alert('Form submitted successfully!');
  } catch (e) {
    console.error('Error adding document: ', e);
    alert('Error submitting form');
  }
}

document.getElementById('submit-button').addEventListener('click', submitForm);
