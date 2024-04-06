// Set the target dates for each countdown
const targets = [
  new Date('2024-12-20T00:00:00'),
  new Date('2025-02-24T00:00:00'),
  new Date('2024-10-20T00:00:00')
];

// Function to update countdown timer
function updateCountdown() {
  const now = new Date().getTime();

  targets.forEach((target, index) => {
      const distance = target - now;

      const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      document.querySelectorAll('.countdown')[index].innerHTML = `
          <h2>${document.querySelectorAll('.countdown')[index].getAttribute('data-name')}</h2>
          <p>${months} Months ${days} Days ${hours} Hours</p>
      `;
  });
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initial call to display countdown immediately
updateCountdown();
