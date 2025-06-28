// Provided function to simulate a server call
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      const isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

// Heart symbols for toggling
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Select all like glyphs (hearts)
const hearts = document.querySelectorAll(".like-glyph");
const errorModal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");

// Attach event listener to each heart
hearts.forEach(heart => {
  heart.addEventListener("click", () => {
    mimicServerCall()
      .then(() => {
        if (heart.textContent === EMPTY_HEART) {
          heart.textContent = FULL_HEART;
          heart.classList.add("activated-heart");
        } else {
          heart.textContent = EMPTY_HEART;
          heart.classList.remove("activated-heart");
        }
      })
      .catch(error => {
        modalMessage.textContent = error;
        errorModal.classList.remove("hidden");
        setTimeout(() => {
          errorModal.classList.add("hidden");
        }, 3000);
      });
  });
});
