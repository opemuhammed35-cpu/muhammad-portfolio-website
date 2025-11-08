/* ===== Your original JS starts ===== */

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Back to top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Typing effect
const typingElement = document.getElementById('typing');
const words = ["Frontend Developer", "Backend Developer", "Fullstack Engineer"];
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    typingElement.textContent = currentWord.slice(0, letterIndex - 1);
    letterIndex--;
    if (letterIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  } else {
    typingElement.textContent = currentWord.slice(0, letterIndex + 1);
    letterIndex++;
    if (letterIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  }
  setTimeout(type, isDeleting ? 50 : 150);
}
type();

// Skills filter
const filterButtons = document.querySelectorAll('.filter-buttons button');
const skills = document.querySelectorAll('.skill');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    skills.forEach(skill => {
      skill.classList.toggle('hidden', !(filter === 'all' || skill.classList.contains(filter)));
    });
  });
});

/* ===== Contact Form (Appwrite) ===== */
const client = new Appwrite.Client
