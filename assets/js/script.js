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

gsap.fromTo(
  ".card",
  {
    opacity: 0,
    y: 50,
    filter: "blur(10px)",
  },
  {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.8,
    stagger: 0.13,
    ease: "power1.out",

    scrollTrigger: {
      trigger: ".lista_filmes",
      start: "top 80%",
      once: true,

      // coloque true só enquanto estiver testando
      markers: true,
    },
  },
);

window.addEventListener("load", animarPagina);

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

// segunda seção

const destaqueTitulo = gsap.timeline({
  scrollTrigger: {
    trigger: ".topo_da_secao",
    start: "top 85%",
    once: true,
  },
});

destaqueTitulo
  .from(".topo_da_secao .text h2", {
    opacity: 0,
    y: 25,
    duration: 0.7,
    ease: "power2.out",
  })
  .from(
    ".topo_da_secao .text p",
    {
      opacity: 0,
      y: 15,
      duration: 0.6,
      ease: "power2.out",
    },
    "-=0.4",
  );

destaqueTitulo.from(
  ".topo_da_secao button",
  {
    opacity: 0,
    x: 15,
    duration: 0.5,
    ease: "power2.out",
  },
  "-=0.35",
);
