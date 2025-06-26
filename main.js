// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Select DOM elements
const heart = document.querySelector('.like-glyph');
const errorModal = document.querySelector('#error-modal');
const errorMessage = document.querySelector('#error-modal p');

// Add event listener for heart click
heart.addEventListener('click', () => {
  // Check if heart is already activated
  if (heart.classList.contains('activated-heart')) {
    // If full heart, make it empty
    heart.classList.remove('activated-heart');
    heart.textContent = EMPTY_HEART;
  } else {
    // If empty heart, make server call
    mimicServerCall()
      .then(() => {
        // On success, fill heart and make it red
        heart.textContent = FULL_HEART;
        heart.classList.add('activated-heart');
      })
      .catch((error) => {
        // On error, show modal with message
        errorModal.classList.remove('hidden');
        errorMessage.textContent = error; // Use the error message from the server
        
        // Hide modal after 3 seconds
        setTimeout(() => {
          errorModal.classList.add('hidden');
        }, 3000);
      });
  }
});