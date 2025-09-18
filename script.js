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
  "Web and App Developer",
  "UI/UX Designer",
  "Problem Solver"
];

let i = 0;
let j = 0;
let isDeleting = false;
const speed = 100;
const typingDiv = document.getElementById("typing");

function type() {
  const currentText = texts[i];

  if (!isDeleting) {
    typingDiv.textContent = currentText.slice(0, j++);
    if (j > currentText.length) {
      isDeleting = true;
      setTimeout(type, 1200);
      return;
    }
  } else {
    typingDiv.textContent = currentText.slice(0, j--);
    if (j < 0) {
      isDeleting = false;
      i = (i + 1) % texts.length;
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

// ------------------ Visitor Counter ------------------
// Using localStorage for demo (replace with server API in production)
const visitorDisplay = document.getElementById("visitorCount");
let count = parseInt(localStorage.getItem("visitorCount") || "0");
count += 1;
localStorage.setItem("visitorCount", count);

// Animate counter
let displayCount = 0;
const animateCounter = () => {
  const interval = setInterval(() => {
    displayCount += 1;
    visitorDisplay.textContent = displayCount;
    if (displayCount >= count) clearInterval(interval);
  }, Math.floor(2000 / count));
};
animateCounter();
