const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const navLinks = document.querySelectorAll(".nav-panel a");
const leadForm = document.getElementById("lead-form");
const formStatus = document.getElementById("form-status");
const revealItems = document.querySelectorAll(".reveal");

if (menuToggle && navPanel) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navPanel.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    body.classList.toggle("menu-open", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navPanel.classList.remove("is-open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      body.classList.remove("menu-open");
    });
  });
}

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
}

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(leadForm);
    const name = String(formData.get("name") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !phone || !email || !message) {
      formStatus.textContent = "Пожалуйста, заполните обязательные поля формы.";
      return;
    }

    const subject = encodeURIComponent("Заявка с сайта RC-WAY");
    const bodyText = encodeURIComponent(
      [
        "Здравствуйте!",
        "",
        "Отправляю заявку с сайта RC-WAY.",
        "",
        `Имя: ${name}`,
        `Компания: ${company || "Не указана"}`,
        `Телефон: ${phone}`,
        `Email: ${email}`,
        "",
        "Описание задачи:",
        message,
      ].join("\n")
    );

    formStatus.textContent = "Открываем письмо для отправки заявки...";
    window.location.href = `mailto:a.bessmertnaya@gmail.com?subject=${subject}&body=${bodyText}`;
  });
}
