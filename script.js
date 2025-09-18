// =======================
// Typing Effect in Hero
// =======================
const typingElement = document.getElementById("typing");
const typingTexts = [
  "Software Engineer 💻",
  "Web & App Developer 🌍",
  "UI/UX Designer 🎨"
];

let typingIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function type() {
  if (typingIndex >= typingTexts.length) typingIndex = 0;
  currentText = typingTexts[typingIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex--);
  } else {
    typingElement.textContent = currentText.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(type, 1500); // pause before deleting
    return;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typingIndex++;
  }

  setTimeout(type, isDeleting ? 50 : 100);
}
type();

// =======================
// Back to Top Button
// =======================
const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =======================
// Skills Filter
// =======================
const filterButtons = document.querySelectorAll(".filter-buttons button");
const skills = document.querySelectorAll(".skill");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active state
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    skills.forEach(skill => {
      if (filter === "all" || skill.classList.contains(filter)) {
        skill.style.display = "block";
      } else {
        skill.style.display = "none";
      }
    });
  });
});

// =======================
// Contact Form Handler (basic)
// =======================
const form = document.querySelector(".contact-form form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thanks for reaching out! I’ll reply soon.");
  form.reset();
});
