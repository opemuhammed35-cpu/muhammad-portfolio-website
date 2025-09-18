// Typing Effect
const typingElement = document.getElementById("typing");
const textArray = ["Web Developer", "Software Engineer", "UI/UX Designer"];
let textIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textIndex].length) {
    typingElement.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    textIndex = (textIndex + 1) % textArray.length;
    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 500);
});

// Back to Top Button
const backToTop = document.getElementById("backToTop");
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Skills Filter
const filterButtons = document.querySelectorAll(".filter-buttons button");
const skills = document.querySelectorAll(".skill");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
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

// Contact Form (demo only)
document.querySelector(".contact-form form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you! Your message has been sent.");
});
