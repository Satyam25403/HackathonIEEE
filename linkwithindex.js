import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';
import { getDatabase, ref, push, set } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCUx_2tWON_8Vh-0yL_iZH9GDsijDF8ZIM",
    authDomain: "hackathon-fa5f8.firebaseapp.com",
    databaseURL: "https://hackathon-fa5f8-default-rtdb.firebaseio.com",
    projectId: "hackathon-fa5f8",
    storageBucket: "hackathon-fa5f8.firebasestorage.app",
    messagingSenderId: "685121211120",
    appId: "1:685121211120:web:79ef4ab7a48890feff1035"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Realtime Database
const rtdb = getDatabase(app);

// Realtime Database references
const rootRef = ref(rtdb); // Root reference
const usersRef = ref(rtdb, 'users'); // Reference to 'users' path

// Event listener for form submission
document.getElementById("signupForm").addEventListener("submit", submitForm);

// Fetch Firestore Users 
async function fetchUsers() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => `, doc.data());
        });
    } catch (error) {
        console.error("Error fetching Firestore users:", error);
    }
}

// Form submission handler
async function submitForm(e) {
    e.preventDefault();
    const name = getElementVal('Name'); // ID from input field
    const country = getElementVal('Country');
    const dob = getElementVal('dob');
    const email = getElementVal('email');
    const profession = getElementVal('Profession');
    const phone = getElementVal('Phone');


    // Add data to Firestore
    try {
        await addDoc(collection(db, "users"), {
            Name : name,
            Country : country,
            dob : dob,
            email : email,
            Profession : profession,
            Phone : phone
        });
        alert("Data successfully added to Firestore!");
    } catch (error) {
        console.error("Error adding to Firestore:", error);
    }

    // Add data to Realtime Database
    try {
        const newMessageRef = push(usersRef);
        await set(newMessageRef, {
            Name : name,
            Country : country,
            dob : dob,
            email : email,
            Profession : profession,
            Phone : phone
        });
        console.log("Data successfully added to Realtime Database!");
    } catch (error) {
        console.error("Error adding to Realtime Database:", error);
    }
}

// Helper function to get element values by ID
const getElementVal = (id) => {
    return document.getElementById(id).value;
};
