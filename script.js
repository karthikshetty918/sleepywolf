// CTA Function - Centralized action handler
function handleCTA(action, product = null) {
  const modalData = {
    shop: {
      title: "Shop Our Collection ☕",
      message: "Browse our 100% Arabica coffee collection! Premium quality for sleepy souls who still got dreams. 🐺",
      primaryText: "Shop Now",
      secondaryText: "View Products"
    },
    buy: {
      title: "Get Your Premium Coffee! ☕",
      message: "Get your premium 100% Arabica coffee now! Wake up. Stay Wild. 🐺",
      primaryText: "Buy Now",
      secondaryText: "Learn More"
    },
    product: (name) => ({
      title: `${name} ☕`,
      message: `${name} - 100% Arabica coffee coming soon! Premium quality, smooth taste. Stay wild 🐺`,
      primaryText: "Pre-order",
      secondaryText: "View Details"
    }),
    about: {
      title: "About Sleepy Wolf 🐺",
      message: "Learn more about Sleepy Wolf Coffee Co. - Premium Arabica coffee for sleepy souls who still got dreams!",
      primaryText: "Our Story",
      secondaryText: "Contact Us"
    },
    merch: {
      title: "Sleepy Wolf Merch 🧢",
      message: "Check out our Sleepy Wolf merch! Drip > sleep sometimes. Show your wild side! 🐺",
      primaryText: "Shop Merch",
      secondaryText: "View Collection"
    },
    quality: {
      title: "100% Premium Arabica ☕",
      message: "Discover our 100% Premium Arabica coffee powder! No blends, no shortcuts—just pure, smooth coffee. Stay wild 🐺",
      primaryText: "Shop Coffee",
      secondaryText: "Learn More"
    }
  };

  let data = modalData[action];
  if (product) {
    data = modalData.product(product);
  }

  // Show the modal popup
  showModal(data);
}

// Modal popup function
function showModal(data) {
  const modal = document.getElementById('ctaModal');
  const title = document.getElementById('modalTitle');
  const message = document.getElementById('modalMessage');
  const primaryBtn = document.getElementById('modalPrimaryBtn');
  const secondaryBtn = document.getElementById('modalSecondaryBtn');

  // Update modal content
  title.textContent = data.title;
  message.textContent = data.message;
  primaryBtn.textContent = data.primaryText;
  secondaryBtn.textContent = data.secondaryText;

  // Show modal
  modal.classList.add('show');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close modal function
function closeModal() {
  const modal = document.getElementById('ctaModal');
  modal.classList.remove('show');
  document.body.style.overflow = ''; // Restore scrolling
}

// Close button event
document.getElementById('closeModal').addEventListener('click', closeModal);

// Close on overlay click
document.getElementById('ctaModal').addEventListener('click', (e) => {
  if (e.target.id === 'ctaModal') {
    closeModal();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Modal button actions
document.getElementById('modalPrimaryBtn').addEventListener('click', () => {
  alert("☕ Redirecting to shop... Stay wild 🐺");
  closeModal();
});

document.getElementById('modalSecondaryBtn').addEventListener('click', () => {
  alert("🐺 Learn more about Sleepy Wolf Coffee Co.!");
  closeModal();
});

// Hero CTA Button
document.querySelector('.big-cta').addEventListener('click', () => {
  handleCTA('buy');
});

// Nav CTA Button
document.querySelector('.cta').addEventListener('click', () => {
  handleCTA('buy');
});

// Navigation links CTA
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const text = link.textContent.trim().toLowerCase();
    
    // Handle different nav links
    if (text === 'shop') {
      handleCTA('shop');
      // Scroll to products section
      const productsSection = document.querySelector('.products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (text === 'about') {
      handleCTA('about');
    } else if (text === 'merch') {
      handleCTA('merch');
      // Scroll to products section (merch is there)
      const productsSection = document.querySelector('.products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Smooth scroll to section if implemented
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  });
});

// Add scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe cards for scroll animations and add CTA
document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
  
  // Make cards clickable with CTA
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    const productName = card.querySelector('h3').textContent;
    handleCTA('product', productName);
    // Add a visual feedback
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
      card.style.transform = '';
    }, 150);
  });
});

// Social icons click handlers
document.querySelectorAll('.socials a').forEach((link, index) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const platforms = ['Instagram', 'TikTok', 'Twitter'];
    alert(`Follow us on ${platforms[index]}! 🐺☕`);
  });
});

// Quality section CTA button
const qualityCTA = document.querySelector('.quality-cta');
if (qualityCTA) {
  qualityCTA.addEventListener('click', () => {
    handleCTA('quality');
  });
}

// Add parallax effect to hero on scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
  }
});

// ============================================
// CRAZY COFFEE ANIMATIONS
// ============================================

// Create floating coffee beans dynamically
function createFloatingBean() {
  const bean = document.createElement('div');
  bean.className = 'floating-bean';
  bean.textContent = '☕';
  bean.style.position = 'fixed';
  bean.style.left = Math.random() * 100 + '%';
  bean.style.bottom = '-50px';
  bean.style.fontSize = (Math.random() * 20 + 15) + 'px';
  bean.style.opacity = Math.random() * 0.5 + 0.2;
  bean.style.zIndex = '1';
  bean.style.pointerEvents = 'none';
  bean.style.filter = 'drop-shadow(0 0 10px rgba(255, 204, 112, 0.5))';
  bean.style.animation = `floatBeanUp ${Math.random() * 10 + 15}s linear forwards`;
  bean.style.animationDelay = Math.random() * 2 + 's';
  
  document.body.appendChild(bean);
  
  // Remove bean after animation
  setTimeout(() => {
    bean.remove();
  }, 20000);
}

// Add keyframe animation for floating beans
const style = document.createElement('style');
style.textContent = `
  @keyframes floatBeanUp {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.5;
    }
    90% {
      opacity: 0.5;
    }
    100% {
      transform: translateY(calc(-100vh - 100px)) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Spawn coffee beans periodically
setInterval(createFloatingBean, 2000);

// Create coffee bean burst on button clicks
function createCoffeeBurst(x, y) {
  for (let i = 0; i < 8; i++) {
    const bean = document.createElement('div');
    bean.textContent = '☕';
    bean.style.position = 'fixed';
    bean.style.left = x + 'px';
    bean.style.top = y + 'px';
    bean.style.fontSize = '20px';
    bean.style.zIndex = '10000';
    bean.style.pointerEvents = 'none';
    bean.style.filter = 'drop-shadow(0 0 10px rgba(255, 204, 112, 0.8))';
    
    const angle = (Math.PI * 2 * i) / 8;
    const distance = 100 + Math.random() * 50;
    const endX = x + Math.cos(angle) * distance;
    const endY = y + Math.sin(angle) * distance;
    
    bean.style.animation = `beanBurst 1s ease-out forwards`;
    bean.style.setProperty('--end-x', endX + 'px');
    bean.style.setProperty('--end-y', endY + 'px');
    
    document.body.appendChild(bean);
    
    setTimeout(() => bean.remove(), 1000);
  }
}

// Add burst animation
const burstStyle = document.createElement('style');
burstStyle.textContent = `
  @keyframes beanBurst {
    0% {
      transform: translate(0, 0) rotate(0deg) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(calc(var(--end-x) - var(--start-x)), calc(var(--end-y) - var(--start-y))) rotate(720deg) scale(0.5);
      opacity: 0;
    }
  }
`;
document.head.appendChild(burstStyle);

// Add burst effect to CTA buttons
document.querySelectorAll('.big-cta, .cta, .quality-cta').forEach(button => {
  button.addEventListener('click', (e) => {
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    createCoffeeBurst(x, y);
  });
});

// Coffee swirl effect on mouse move
let swirlTimeout;
document.addEventListener('mousemove', (e) => {
  clearTimeout(swirlTimeout);
  
  const swirl = document.createElement('div');
  swirl.style.position = 'fixed';
  swirl.style.left = e.clientX + 'px';
  swirl.style.top = e.clientY + 'px';
  swirl.style.width = '30px';
  swirl.style.height = '30px';
  swirl.style.borderRadius = '50%';
  swirl.style.background = `radial-gradient(circle, rgba(255, 204, 112, 0.3) 0%, transparent 70%)`;
  swirl.style.pointerEvents = 'none';
  swirl.style.zIndex = '9999';
  swirl.style.transform = 'translate(-50%, -50%)';
  swirl.style.animation = 'swirlFade 1s ease-out forwards';
  
  document.body.appendChild(swirl);
  
  setTimeout(() => swirl.remove(), 1000);
  
  swirlTimeout = setTimeout(() => {}, 100);
});

// Add swirl fade animation
const swirlStyle = document.createElement('style');
swirlStyle.textContent = `
  @keyframes swirlFade {
    0% {
      transform: translate(-50%, -50%) scale(0) rotate(0deg);
      opacity: 0.8;
    }
    100% {
      transform: translate(-50%, -50%) scale(3) rotate(180deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(swirlStyle);

