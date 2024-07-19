// Get form elements
const giftForm = document.getElementById('gift-form');
const giftList = document.getElementById('gifts');

// Function to save gifts to local storage
const saveGiftsToLocalStorage = (gifts) => {
  localStorage.setItem('gifts', JSON.stringify(gifts));
};

// Function to get gifts from local storage
const getGiftsFromLocalStorage = () => {
  const gifts = localStorage.getItem('gifts');
  return gifts ? JSON.parse(gifts) : [];
};

// Convert image file to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Add gift to local storage
giftForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('gift-name').value;
  const description = document.getElementById('gift-description').value;
  const photoInput = document.getElementById('gift-photo');
  
  let photo = '';
  if (photoInput.files[0]) {
    photo = await fileToBase64(photoInput.files[0]);
  }

  const gifts = getGiftsFromLocalStorage();
  const newGift = { id: Date.now().toString(), name, description, photo };
  gifts.push(newGift);
  saveGiftsToLocalStorage(gifts);
  
  console.log("Gift added with ID: ", newGift.id);
  displayGifts();
  giftForm.reset();
});

// Display gifts from local storage
const displayGifts = () => {
  giftList.innerHTML = '';
  const gifts = getGiftsFromLocalStorage();
  gifts.forEach((gift) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <h3>${gift.name}</h3>
      <p>${gift.description}</p>
      <img src="${gift.photo}" alt="${gift.name}" width="100" />
      <button onclick="deleteGift('${gift.id}')">Delete</button>
    `;
    giftList.appendChild(li);
  });
};

// Delete gift from local storage
window.deleteGift = (id) => {
  let gifts = getGiftsFromLocalStorage();
  gifts = gifts.filter(gift => gift.id !== id);
  saveGiftsToLocalStorage(gifts);
  displayGifts();
};

// Initial display of gifts
displayGifts();
