const bubbleContainer = document.getElementById('bubble-container');

// Function to generate random bubbles
function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  // Create audio element for the pop sound
  const popSound = new Audio('./pop.mp3'); // Replace with your sound file path

  // Array of words to display in the bubbles
  const words = ["سبحان الله", "الحمد لله", "الشكر لله", "استغفر لله", "لا اله الا الله", "الله اكبر"];

  const wordCounts = {"سبحان الله": 0,"الحمد لله": 0,"الشكر لله": 0,"استغفر لله": 0,"لا اله الا الله": 0,"الله اكبر": 0,};

// Declare count variables globally so they are not reset on each click
let count1 = 0;
let count2 = 0;
let count3 = 0;
let count4 = 0;
let count5 = 0;
let count6 = 0;

// Generate a random index to select a word from the array
const randomIndex = Math.floor(Math.random() * words.length);
const selectedWord = words[randomIndex];
bubble.textContent = selectedWord;

// Adjust bubble size based on the text
if (bubble.textContent === "لا اله الا الله") {
  bubble.style.width = '120px';
  bubble.style.height = '120px';
} else {
  bubble.style.width = '70px';
  bubble.style.height = '70px';
}

bubble.style.display = 'flex';
bubble.style.alignItems = 'center';
bubble.style.justifyContent = 'center';
bubble.style.userSelect = 'none'; /* Prevent text selection */
bubble.style.textAlign = 'center';
bubble.style.fontSize = '24px';

// Set random position for the bubble
const randomPosition = Math.random() * 70; // Random percentage for horizontal position
bubble.style.left = `${randomPosition}%`;

// Add click event to "pop" the bubble and play sound
bubble.addEventListener('click', () => {
  
  // Play the pop sound
  popSound.currentTime = 0; // Reset sound to the beginning in case it's played quickly multiple times
  popSound.play();

  // Apply the pop animation
  bubble.style.animation = 'pop 0.3s ease-out forwards';

    // Reset animation to allow it to restart every time
  function restartAnimation(element) {
    element.style.animation = 'none'; // Reset animation
    element.offsetHeight; // Trigger reflow to restart animation
    element.style.animation = 'glowAnimation 1s'; // Apply animation again
  }
      // Function to increment the count from the <span> element
  function incrementCount(elementId) {
    const element = document.getElementById(elementId);
    let currentCount = parseInt(element.textContent, 10); // Get current count and convert to integer
    currentCount++; // Increment the count
    element.textContent = currentCount; // Update the count in the span
  }

  switch (bubble.textContent) {
    case "سبحان الله":
      incrementCount("سبحان")
      restartAnimation(document.getElementById("p1"));
      break;
    case "الحمد لله":
      incrementCount("الحمد")
      restartAnimation(document.getElementById("p2"));
      break;
    case "الشكر لله":
      incrementCount("الشكر")
      restartAnimation(document.getElementById("p3"));
      break;
    case "استغفر لله":
      incrementCount("استغفر")
      restartAnimation(document.getElementById("p4"));
      break;
    case "لا اله الا الله":
      incrementCount("لااله")
      restartAnimation(document.getElementById("p5"));
      break;
    case "الله اكبر":
      incrementCount("الله")
      restartAnimation(document.getElementById("p6"));
      break;
  }

  // Remove bubble after the pop animation ends
  setTimeout(() => bubble.remove(), 300);});

  // Append the bubble to the container
  bubbleContainer.appendChild(bubble);

  // Automatically remove after the animation finishes (5s)
  setTimeout(() => {if (bubble.parentElement) {bubble.remove();}}, 5000);
}

// Function to generate multiple bubbles
function generateBubbles() {
  setInterval(createBubble, 1000); // Create a new bubble every second
}

// Start generating bubbles when the page loads
window.onload = generateBubbles;


