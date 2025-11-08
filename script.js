// ------------------ Skill Filter ------------------
const buttons = document.querySelectorAll(".filter-buttons button");
const skills = document.querySelectorAll(".skill");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    skills.forEach(skill => {
      if (filter === "all" || skill.classList.contains(filter)) {
        skill.classList.remove("hidden");
      } else {
        skill.classList.add("hidden");
      }
    });
  });
});

// ------------------ Typing Effect ------------------
const texts = [
  "Software Engineer",
  "Web & App Developer",
  "UI/UX Designer",
  "Problem Solver"
];

let i = 0;   // phrase index
let j = 0;   // character index
let isDeleting = false;
const speed = 100; // typing speed in ms
const typingDiv = document.getElementById("typing");

function type() {
  const currentText = texts[i];

  if (!isDeleting) {
    typingDiv.textContent = currentText.slice(0, j++);
    if (j > currentText.length) {
      isDeleting = true;
      setTimeout(type, 1200); // pause before deleting
      return;
    }
  } else {
    typingDiv.textContent = currentText.slice(0, j--);
    if (j < 0) {
      isDeleting = false;
      i = (i + 1) % texts.length; // move to next phrase
    }
  }

  setTimeout(type, isDeleting ? speed / 2 : speed);
}
type();

// ------------------ Back To Top Button ------------------
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ------------------ Hamburger Menu ------------------
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// ------------------ Appwrite Contact Form ------------------
// Make sure you include Appwrite SDK in HTML:
// <script src="https://cdn.jsdelivr.net/npm/appwrite@8.4.0/dist/appwrite.min.js"></script>

const client = new appwrite.Client();
client
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // API Endpoint
  .setProject('690f2da00003aede713b');             // Project ID

const functions = new appwrite.Functions(client);

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.name.value;
  const email = form.email.value;
  const message = form.message.value;

  try {
    await functions.createExecution('690f3436813097b72374', JSON.stringify({
      name,
      email,
      message
    }));

    alert("Message sent successfully!");
    form.reset();
  } catch (error) {
    console.error(error);
    alert("Failed to send message. Try again.");
  }
});
