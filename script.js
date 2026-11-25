// CONFIGURAÇÃO: substitua pelo WhatsApp real (55 + DDD + número).
const WHATSAPP_NUMBER = "5511999999999";
const INSTAGRAM_URL = "";

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const opened = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
  menuToggle.setAttribute("aria-label", opened ? "Fechar menu" : "Abrir menu");
  menuToggle.querySelector("i").className = opened
    ? "fa-solid fa-xmark"
    : "fa-solid fa-bars";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.querySelector("i").className = "fa-solid fa-bars";
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && navLinks.classList.contains("open")) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.querySelector("i").className = "fa-solid fa-bars";
    menuToggle.focus();
  }
});

// Animação de entrada ao rolar.
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}

// Filtros do portfólio.
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    filterButtons.forEach(item => item.setAttribute("aria-pressed", "false"));
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    const filter = button.dataset.filter;

    galleryItems.forEach(item => {
      const matches = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("hidden", !matches);
    });
  });
});

// Lightbox da galeria.
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
let lightboxTrigger = null;

galleryItems.forEach(item => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    lightboxTrigger = item;
    lightboxImage.src = item.dataset.full || img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.add("open");
    document.body.classList.add("lightbox-open");
    lightboxClose.focus();
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.classList.remove("lightbox-open");
  lightboxImage.src = "";
  if (lightboxTrigger) {
    lightboxTrigger.focus();
    lightboxTrigger = null;
  }
}
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeLightbox();
});

// FAQ expansível, uma pergunta aberta por vez.
document.querySelectorAll(".faq-question").forEach(question => {
  question.addEventListener("click", () => {
    const item = question.closest(".faq-item");
    const answer = item.querySelector(".faq-answer");
    const willOpen = !item.classList.contains("open");

    document.querySelectorAll(".faq-item").forEach(other => {
      other.classList.remove("open");
      other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      other.querySelector(".faq-answer").style.maxHeight = null;
    });

    if (willOpen) {
      item.classList.add("open");
      question.setAttribute("aria-expanded", "true");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// Formulário abre WhatsApp com os dados preenchidos.
document.getElementById("quoteForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const description = document.getElementById("description").value.trim();

  if (!name || !phone || !service) {
    alert("Preencha os campos obrigatórios.");
    return;
  }

  const message = `Olá, NunesPank! Gostaria de solicitar um orçamento.

Nome: ${name}
Telefone: ${phone}
Serviço: ${service}

Descrição do projeto:
${description || "Não informado"}

Aguardo retorno.`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

// WhatsApp flutuante.
const whatsappMessage = encodeURIComponent(
  "Olá! Conheci a NunesPank pelo site e gostaria de solicitar um orçamento."
);
document.getElementById("whatsappFloat").href =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

// Instagram: só ativa quando o endereço real for informado.
const instagramLink = document.getElementById("instagramLink");
if (INSTAGRAM_URL) {
  instagramLink.href = INSTAGRAM_URL;
  instagramLink.target = "_blank";
  instagramLink.rel = "noopener noreferrer";
} else {
  instagramLink.addEventListener("click", event => event.preventDefault());
}

document.getElementById("year").textContent = new Date().getFullYear();
