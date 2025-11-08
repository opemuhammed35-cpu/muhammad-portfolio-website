// ===== Hamburger Menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// ===== Back to Top Button =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Typing Effect =====
const typingElement = document.getElementById('typing');
const words = ["Frontend Developer", "Backend Developer", "Fullstack Engineer"];
let wordIndex = 0;
let letterIndex = 0;
let currentWord = "";
let isDeleting = false;

function type() {
  if (wordIndex >= words.length) wordIndex = 0;
  currentWord = words[wordIndex];

  if (!isDeleting) {
    typingElement.textContent = currentWord.slice(0, letterIndex + 1);
    letterIndex++;
    if (letterIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    typingElement.textContent = currentWord.slice(0, letterIndex - 1);
    letterIndex--;
    if (letterIndex === 0) {
      isDeleting = false;
      wordIndex++;
    }
  }
  setTimeout(type, isDeleting ? 50 : 150);
}
type();

// ===== Skills Filter =====
const filterButtons = document.querySelectorAll('.filter-buttons button');
const skills = document.querySelectorAll('.skill');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    skills.forEach(skill => {
      if (filter === 'all' || skill.classList.contains(filter)) {
        skill.classList.remove('hidden');
      } else {
        skill.classList.add('hidden');
      }
    });
  });
});

// ===== Appwrite Contact Form =====
const client = new Appwrite.Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('690f2da00003aede713b'); // Your project ID

const database = new Appwrite.Database(client);
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    status.textContent = "Please fill in all fields!";
    status.style.color = "red";
    return;
  }

  try {
    await database.createDocument('690f36bd0014b1e3edc7', 'unique()', {
      name: name,
      email: email,
      message: message
    });

    status.textContent = "Message sent! You will also receive an email.";
    status.style.color = "lightgreen";
    form.reset();
  } catch (err) {
    console.error(err);
    status.textContent = "Failed to send message.";
    status.style.color = "red";
  }
});
