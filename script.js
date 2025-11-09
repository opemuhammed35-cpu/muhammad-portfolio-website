// ===== Hamburger Menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// ===== Typing Effect =====
const typingElement = document.getElementById('typing');
const words = ["I'm a Software Engineer.", "I build Web Apps.", "I create Scalable Solutions."];
let wordIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < words[wordIndex].length) {
    typingElement.textContent += words[wordIndex][charIndex];
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 500);
  }
}

type();

// ===== Skills Filter =====
const filterButtons = document.querySelectorAll('.filter-buttons button');
const skills = document.querySelectorAll('.skill');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-buttons .active').classList.remove('active');
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');

    skills.forEach(skill => {
      if (filter === 'all' || skill.classList.contains(filter)) {
        skill.style.display = 'flex';
      } else {
        skill.style.display = 'none';
      }
    });
  });
});

// ===== Back To Top Button =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Services Auto Scroll =====
const servicesContainer = document.querySelector('.services-container');
let scrollAmount = 0;
function autoScrollServices() {
  if (!servicesContainer) return;
  scrollAmount += 1;
  if (scrollAmount > servicesContainer.scrollWidth - servicesContainer.clientWidth) {
    scrollAmount = 0;
  }
  servicesContainer.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  requestAnimationFrame(autoScrollServices);
}
autoScrollServices();

// ===== Appwrite Contact Form =====
const client = new Appwrite.Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('690f2da00003aede713b'); // Your Project ID

const database = new Appwrite.Database(client);

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.name.value;
  const email = form.email.value;
  const message = form.message.value;

  try {
    // Replace 'messages' with your collection ID
    const response = await database.createDocument('690f36bd0014b1e3edc7', 'unique()', {
      name,
      email,
      message
    });

    status.textContent = "Message sent successfully!";
    status.style.color = "lightgreen";
    form.reset();
  } catch (error) {
    console.error(error);
    status.textContent = "Failed to send message.";
    status.style.color = "red";
  }
});
