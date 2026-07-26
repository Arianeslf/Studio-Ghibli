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
