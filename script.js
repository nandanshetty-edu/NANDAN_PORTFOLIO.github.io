/* =======================
   LOADER
======================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 700);
});

/* =======================
   YEAR IN FOOTER
======================= */
document.getElementById("year").textContent = new Date().getFullYear();

/* =======================
   CUSTOM CURSOR
======================= */
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

if (cursorDot && cursorOutline) {
  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  });

  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorOutline.style.left = outlineX + "px";
    cursorOutline.style.top = outlineY + "px";

    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

if ("ontouchstart" in window) {
  cursorDot.style.display = "none";
  cursorOutline.style.display = "none";
}

/* =======================
   MOBILE NAV
======================= */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

/* =======================
   SMOOTH SCROLL
======================= */
function scrollToSection(target) {
  const el = document.querySelector(target);
  if (!el) return;

  const navHeight = 82;
  const y = el.getBoundingClientRect().top + window.scrollY - navHeight;

  window.scrollTo({ top: y, behavior: "smooth" });
}

document.querySelectorAll("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    scrollToSection(btn.getAttribute("data-scroll"));
  });
});

/* =======================
   TYPING EFFECT
======================= */
const typingEl = document.getElementById("typing");

if (typingEl) {
  const words = [
    "Full Stack Developer",
    "Programmer",
    "Editor",
    "Designer",
    "Content Creator"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const word = words[wordIndex];
    typingEl.textContent = word.slice(0, charIndex);

    if (!isDeleting) {
      if (charIndex < word.length) {
        charIndex++;
        setTimeout(type, 80);
      } else {
        setTimeout(() => {
          isDeleting = true;
          type();
        }, 1100);
      }
    } else {
      if (charIndex > 0) {
        charIndex--;
        setTimeout(type, 40);
      } else {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 300);
      }
    }
  }

  type();
}

/* =======================
   TABS (SKILLS + PROJECTS)
======================= */
function setupTabs(tabSelector, panelSelector) {
  const tabs = document.querySelectorAll(tabSelector);
  const panels = document.querySelectorAll(panelSelector);

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-target");

      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      panels.forEach(panel => {
        panel.classList.toggle("active", "#" + panel.id === target);
      });
    });
  });
}

setupTabs("#skills .tab-btn", "#skills .tab-panel");
setupTabs("#projects .tab-btn", "#projects .tab-panel");

/* =======================
   HIDE EXTRAS ON LOAD
======================= */
document.querySelectorAll(
  ".extra-skill-tech, .extra-skill-creative, .extra-project-tech, .extra-project-creative"
).forEach(el => el.style.display = "none");

/* =======================
   VIEW MORE BUTTONS
======================= */
function setupViewMore(btnId, selector) {
  const btn = document.getElementById(btnId);
  const items = document.querySelectorAll(selector);
  if (!btn) return;

  let show = false;

  btn.addEventListener("click", () => {
    show = !show;
    items.forEach(el => el.style.display = show ? "flex" : "none");
    btn.textContent = show ? "View Less" : "View More";
  });
}

setupViewMore("skillsTechMore", ".extra-skill-tech");
setupViewMore("skillsCreativeMore", ".extra-skill-creative");
setupViewMore("projectsTechMore", ".extra-project-tech");
setupViewMore("projectsCreativeMore", ".extra-project-creative");

/* =======================
   PARALLAX
======================= */
document.addEventListener("mousemove", (e) => {
  document.querySelectorAll("[data-parallax]").forEach(el => {
    const speed = parseFloat(el.dataset.speed) || 0.03;
    const x = (e.clientX - window.innerWidth / 2) * speed;
    const y = (e.clientY - window.innerHeight / 2) * speed;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
});

/* =======================
   SCROLL REVEAL
======================= */
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

reveals.forEach(el => revealObserver.observe(el));

/* =======================
   CONTACT FORM
======================= */
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Form received! Backend will be added later.");
  });
}

/* =======================
   MEDIA POPUP (FINAL WORKING VERSION)
======================= */
const popup = document.getElementById("mediaPopup");
const popupContent = document.getElementById("popupContent");
const popupClose = document.getElementById("popupClose");

document.querySelectorAll(".media-card").forEach(card => {
  card.addEventListener("click", () => {
    const src = card.dataset.src;
    const type = card.dataset.type;

    popup.classList.add("active");

    if (type === "video") {
      popupContent.innerHTML = `
        <video id="popupVideo"
               src="${src}"
               controls
               autoplay
               playsinline
               style="width:100%; border-radius:12px;">
        </video>
      `;

      const vid = document.getElementById("popupVideo");
      vid.muted = false;
      vid.play().catch(() => {
        console.log("Autoplay blocked, waiting for user gesture");
      });

    } else {
      popupContent.innerHTML = `
        <img src="${src}" style="width:100%; border-radius:12px;">
      `;
    }
  });
});

popupClose.addEventListener("click", () => {
  popup.classList.remove("active");
  popupContent.innerHTML = "";
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    document.getElementById("mediaPopup").classList.add("active");
    popupContent.innerHTML = "";
  }
});

/* =======================
   LOOP + HOVER AUDIO PREVIEW
======================= */
document.querySelectorAll(".media-card video").forEach(video => {
  video.loop = true;
  video.muted = true;
  video.play().catch(() => {});

  video.addEventListener("mouseenter", () => {
    video.muted = false;
    video.play();
  });

  video.addEventListener("mouseleave", () => {
    video.muted = true;
  });
});
