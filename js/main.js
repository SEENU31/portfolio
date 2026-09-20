(() => {
  "use strict";

  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem("tk-theme", theme);
    const isLight = theme === "light";
    themeIcon.textContent = isLight ? "☾" : "☼";
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  };

  setTheme(localStorage.getItem("tk-theme") || "dark");
  themeToggle.addEventListener("click", () => setTheme(root.dataset.theme === "light" ? "dark" : "light"));

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const updateScrollState = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
    const current = sections.reduce((active, section) => {
      if (window.scrollY + 140 >= section.offsetTop) return section.id;
      return active;
    }, "home");
    navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
  };
  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();

  const typingText = document.querySelector(".typing-text");
  const phrases = ["Full-Stack Developer", "Python & Java Developer", "AI/ML Enthusiast"];
  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;
  const typePhrase = () => {
    if (reducedMotion) {
      typingText.textContent = phrases[0];
      return;
    }
    const phrase = phrases[phraseIndex];
    typingText.textContent = phrase.slice(0, characterIndex);
    if (!deleting && characterIndex < phrase.length) {
      characterIndex += 1;
      setTimeout(typePhrase, 75);
    } else if (!deleting && characterIndex === phrase.length) {
      deleting = true;
      setTimeout(typePhrase, 1600);
    } else if (deleting && characterIndex > 0) {
      characterIndex -= 1;
      setTimeout(typePhrase, 40);
    } else {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typePhrase, 350);
    }
  };
  typePhrase();

  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));

  const counters = document.querySelectorAll(".counter");
  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target);
    const decimals = Number(counter.dataset.decimals || 0);
    if (reducedMotion) {
      counter.textContent = target.toFixed(decimals);
      return;
    }
    const duration = 1000;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = (target * eased).toFixed(decimals);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach((counter) => counterObserver.observe(counter));

  const form = document.querySelector("#contact-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.elements.name;
    const email = form.elements.email;
    const message = form.elements.message;
    const fields = [name, email, message];
    let isValid = true;
    fields.forEach((field) => {
      const error = field.parentElement.querySelector(".field-error");
      error.textContent = "";
      field.removeAttribute("aria-invalid");
      if (!field.value.trim()) {
        error.textContent = "This field is required.";
        field.setAttribute("aria-invalid", "true");
        isValid = false;
      } else if (field === email && !field.validity.valid) {
        error.textContent = "Enter a valid email address.";
        field.setAttribute("aria-invalid", "true");
        isValid = false;
      }
    });
    const status = form.querySelector(".form-status");
    if (!isValid) {
      status.textContent = "Please check the highlighted fields.";
      return;
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${name.value.trim()}`);
    const body = encodeURIComponent(`Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\n\n${message.value.trim()}`);
    window.location.href = `mailto:tkshreyas2005@gmail.com?subject=${subject}&body=${body}`;
    status.textContent = "Your email draft is ready to send.";
    form.reset();
  });

  document.querySelector("#current-year").textContent = new Date().getFullYear();
})();
