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
let i = 0, j = 0;
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
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ------------------ Visitor Counter ------------------
const visitorCount = document.getElementById("visitorCount");
let count = localStorage.getItem("visitCount") || 0;
count++;
localStorage.setItem("visitCount", count);
visitorCount.textContent = count;
