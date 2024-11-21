
document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");

  function handleMenuDisplay() {
    // Show menu
    if (navToggle) {
      navToggle.addEventListener("click", () =>
        navMenu.classList.add("show-menu")
      );
    }

    // Hide menu
    if (navClose) {
      navClose.addEventListener("click", () =>
        navMenu.classList.remove("show-menu")
      );
    }
  }

  /** Handle each nav__link click */
  function handleRemoveMobileMenu() {
    const navLink = document.querySelectorAll(".nav__link");
    const _linkAction = () => {
      const navMenu = document.getElementById("nav-menu");
      navMenu.classList.remove("show-menu"); // close menu
    };

    navLink.forEach((el) => el.addEventListener("click", _linkAction));
  }

  function addBlurToHeader() {
    const blurHeader = () => {
      const header = document.getElementById("header");

      this.scrollY >= 50
        ? header.classList.add("blur-header")
        : header.classList.remove("blur-header");
    };

    window.addEventListener("scroll", blurHeader);
  }

  async function sendEmailHandler() {
    const contactForm = document.getElementById("contact-form"),
      contactMessage = document.getElementById("contact-message");

    const sendEmail = async (e) => {
      const contactButton = document.getElementById("contact-button");
      const buttonDefaultMessage = contactButton.textContent;

      contactButton.textContent = "Sending...";
      contactButton.classList.add("btn__disabled");

      e.preventDefault();

      await emailjs
        .sendForm(
          "service_ard3tah",
          "template_rlvhmt5",
          "#contact-form",
          "_Zu4bgA-1SxdMLl1-"
        )
        .then(
          (/** Success */) => {
            contactMessage.textContent = "Message sent successfuly";
            contactForm.reset();
          },
          (err) => {
            // Show error feedback
            console.error("Unexpected error on trying to send email: ", err);
            contactMessage.textContent =
              "Oops, something went wrong. Please try again.";
          }
        );

      contactButton.classList.remove("btn__disabled");
      contactButton.textContent = buttonDefaultMessage;

      setTimeout(() => {
        contactMessage.textContent = "";
      }, 5000);
    };
    contactForm.addEventListener("submit", sendEmail);
  }

  function scrollUpHandler() {
    const scrollUp = () => {
      const scroll = document.getElementById("scroll-up");
      this.scrollY >= 350
        ? scroll.classList.add("show-scroll")
        : scroll.classList.remove("show-scroll");
    };

    window.addEventListener("scroll", scrollUp);
  }

  function handleActiveSection() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav__link");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => link.classList.remove("active-link"));

            const activeLink = document.querySelector(
              `.nav__link[href="#${entry.target.id}"]`
            );
            if (activeLink) activeLink.classList.add("active-link");
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function handleScrollRevealAnimation() {
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 2500,
      delay: 100,
      // reset: true
    });

    sr.reveal(`.home__data, .home__social, .contact__container`);
    sr.reveal(`.home__image`, { origin: "bottom" });
    sr.reveal(`.about__data, .skills__data`, { origin: "left" });
    sr.reveal(`.about__image, .skills__content`, { origin: "right" });
    sr.reveal(`.services__card, .projects__card`, { interval: 100 });
  }

  handleMenuDisplay();
  handleRemoveMobileMenu();
  addBlurToHeader();

  // Scrolls handlers
  scrollUpHandler();
  handleActiveSection();

  // Email handlers
  sendEmailHandler();

  // Animation
  handleScrollRevealAnimation()
});
