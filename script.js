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

// ===== Services Horizontal Scroll (Infinite Loop) =====
const servicesContainer = document.querySelector('.services-container');
let scrollAmount = 0;

function scrollServices() {
  if (!servicesContainer) return;
  
  scrollAmount += 1; // scroll speed
  if (scrollAmount >= servicesContainer.scrollWidth / 2) {
    scrollAmount = 0; // loop back to start
  }
  
  servicesContainer.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });
  
  requestAnimationFrame(scrollServices);
}

// Duplicate the items for seamless infinite scroll
if (servicesContainer) {
  servicesContainer.innerHTML += servicesContainer.innerHTML;
  scrollServices();
}
