// Background bubbles animation
function createBubbles() {
  const background = document.getElementById("background-animation");
  const bubbleCount = 15;

  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const size = Math.random() * 60 + 20;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 10;

    bubble.style.width = size + "px";
    bubble.style.height = size + "px";
    bubble.style.left = left + "%";
    bubble.style.animationDelay = delay + "s";
    bubble.style.animationDuration = duration + "s";

    background.appendChild(bubble);
  }
}

// Password toggle visibility
document
  .getElementById("password-toggle")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.textContent = type === "password" ? "👁" : "👁‍🗨";
  });

// Form validation and submission
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const button = document.getElementById("login-button");

    // Clear previous errors
    document.querySelectorAll(".error-message").forEach((error) => {
      error.textContent = "";
      error.classList.remove("show");
    });

    let isValid = true;

    // Validate email
    if (!email.value) {
      showError("email-error", "Email is required");
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showError("email-error", "Please enter a valid email");
      isValid = false;
    }

    // Validate password
    if (!password.value) {
      showError("password-error", "Password is required");
      isValid = false;
    } else if (password.value.length < 6) {
      showError("password-error", "Password must be at least 6 characters");
      isValid = false;
    }

    if (isValid) {
      // Show loading state
      button.classList.add("loading");
      button.disabled = true;

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success animation
      button.textContent = "✓ Success";
      button.style.background = "linear-gradient(135deg, #4CAF50, #45a049)";

      // Redirect after success (simulate)
      setTimeout(() => {
        alert("Login successful! Redirecting...");
        // window.location.href = '/dashboard';
      }, 1000);
    }
  });

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Initialize
createBubbles();

// Add some interactive effects
document.querySelectorAll(".input-field").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "scale(1.02)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "scale(1)";
  });
});

// Social login hover effects
document.querySelectorAll(".social-icon").forEach((icon) => {
  icon.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1) rotate(360deg)";
  });

  icon.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) rotate(0deg)";
  });
});
