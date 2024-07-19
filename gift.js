import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC39tQYFJvbwq7PUCDakDMmb8mome9JdmQ",
    authDomain: "tanikawebsite.firebaseapp.com",
    projectId: "tanikawebsite",
    storageBucket: "tanikawebsite.appspot.com",
    messagingSenderId: "970212156782",
    appId: "1:970212156782:web:ab6ab9ef81fb2465298d7f",
    measurementId: "G-09LXER9N1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Get form elements
const giftForm = document.getElementById('gift-form');
const giftList = document.getElementById('gifts');

// Convert image file to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Add gift to Firebase
giftForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('gift-name').value;
  const description = document.getElementById('gift-description').value;
  const photoInput = document.getElementById('gift-photo');
  
  let photo = '';
  if (photoInput.files[0]) {
    photo = await fileToBase64(photoInput.files[0]);
  }

  const newGiftRef = push(ref(database, 'gifts'));
  const newGift = { id: newGiftRef.key, name, description, photo };
  await set(newGiftRef, newGift);
  
  console.log("Gift added with ID: ", newGift.id);
  displayGifts();
  giftForm.reset();
});

// Display gifts from Firebase
const displayGifts = () => {
  const giftsRef = ref(database, 'gifts');
  onValue(giftsRef, (snapshot) => {
    giftList.innerHTML = '';
    const gifts = snapshot.val();
    if (gifts) {
      Object.values(gifts).forEach((gift) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <h3>${gift.name}</h3>
          <p>${gift.description}</p>
          <img src="${gift.photo}" alt="${gift.name}" width="100" />
          <button onclick="deleteGift('${gift.id}')">Delete</button>
        `;
        giftList.appendChild(li);
      });
    }
  });
};

// Delete gift from Firebase
window.deleteGift = (id) => {
  const giftRef = ref(database, `gifts/${id}`);
  remove(giftRef).then(() => {
    console.log("Gift deleted with ID: ", id);
    displayGifts();
  }).catch((error) => {
    console.error("Error deleting gift: ", error);
  });
};

// Initial display of gifts
displayGifts();
