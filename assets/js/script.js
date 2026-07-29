gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

ScrollSmoother.create({
  smooth: 1.5,
  effects: true,
});

function animarPagina() {
  gsap.from(".recorte", {
    y: 60,
    duration: 1,
  });

  gsap.from(".fundo", {
    y: -60,
    duration: 1,
  });
}

window.addEventListener("load", animarPagina);

gsap.from(".card", {
  opacity: 0,
  filter: "blur(10px)",
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".lista_filmes",
    start: "0% 80%",
    end: "100% 80%",
    scrub: true,
  },
});

// menu hamburguer

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {
  const abriu = navMenu.classList.toggle("active");

  menuToggle.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", abriu);
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});
