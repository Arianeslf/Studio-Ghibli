gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

document.addEventListener("DOMContentLoaded", () => {
  iniciarPreloader();
});

function iniciarPreloader() {
  const preloader = document.querySelector("#preloader");

  if (!preloader) {
    iniciarAnimacoes();
    return;
  }

  const path = preloader.querySelector("path");

  gsap.set(preloader, {
    display: "flex",
    autoAlpha: 1,
  });

  if (path) {
    const comprimento = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: comprimento,
      strokeDashoffset: comprimento,
    });
  }

  const timelinePreloader = gsap.timeline({
    onComplete: () => {
      preloader.style.display = "none";
    },
  });

  if (path) {
    timelinePreloader.to(path, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: "power2.inOut",
    });

    timelinePreloader.to(path, {
      fill: "#ffffff",
      duration: 0.7,
      ease: "power2.out",
    });
  }

  timelinePreloader.call(() => {
    iniciarAnimacoes();
  });

  timelinePreloader.to(preloader, {
    autoAlpha: 0,
    duration: 0.8,
    ease: "power2.inOut",
  });
}

function iniciarAnimacoes() {
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.4,
    effects: true,
  });

  const telasGrandes = window.matchMedia("(min-width: 769px)").matches;

  if (telasGrandes) {
    const tituloHero = document.querySelector(".hero_info h1");

    if (tituloHero) {
      const splitTitulo = SplitText.create(tituloHero, {
        type: "chars",
      });

      gsap.set(splitTitulo.chars, {
        opacity: 0,
        y: 25,
        filter: "blur(5px)",
      });

      const heroTimeline = gsap.timeline({
        delay: 0.15,
      });

      heroTimeline.to(splitTitulo.chars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.55,
        stagger: 0.045,
        ease: "power3.out",
      });

      heroTimeline.to(
        splitTitulo.chars,
        {
          textShadow:
            "0 0 8px rgba(255,255,255,.55), 0 0 18px rgba(255,235,190,.25)",
          duration: 0.25,
          stagger: 0.045,
          ease: "power2.out",
        },
        "-=0.35",
      );

      heroTimeline.to(splitTitulo.chars, {
        textShadow: "none",
        duration: 0.5,
        stagger: 0.035,
        ease: "power2.out",
      });
    }

    gsap.from(".recorte", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      clearProps: "transform,opacity",
    });

    gsap.from(".fundo", {
      y: -65,
      opacity: 0.9,
      duration: 0.8,
      ease: "power2.out",
      clearProps: "transform,opacity",
    });
  }

  gsap.fromTo(
    ".filme_bg .lista_filmes .card",
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
        trigger: ".filme_bg .lista_filmes",
        start: "top 80%",
        once: true,
      },
    },
  );

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
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
  }

  const destaqueTitulo = gsap.timeline({
    scrollTrigger: {
      trigger: ".filme_bg .topo_da_secao",
      start: "top 80%",
      once: true,
    },
  });

  destaqueTitulo
    .from(".filme_bg .topo_da_secao .text h2", {
      opacity: 0,
      y: 25,
      duration: 0.7,
      ease: "power2.out",
    })
    .from(
      ".filme_bg .topo_da_secao .text p",
      {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4",
    )
    .from(
      ".filme_bg .topo_da_secao > button",
      {
        opacity: 0,
        x: 15,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.35",
    );

  const secaoHumor = document.querySelector(".secao_humor");
  const fundoParticulas = document.querySelector(".particulas_humor");
  const botoesHumor = document.querySelectorAll(".botao_humor");
  const resultadoFilme = document.querySelector(".resultado_filme");
  const capaResultado = document.querySelector(".capa_resultado");
  const tituloResultado = document.querySelector(".titulo_resultado");
  const descricaoResultado = document.querySelector(".descricao_resultado");
  const generoResultado = document.querySelector(".genero_resultado");

  const filmesHumor = {
    magico: {
      titulo: "O Reino dos Gatos",
      imagem: "assets/img/reino-dos-gatos.webp",
      descricao:
        "Uma aventura encantadora por um reino misterioso cheio de gatos, magia e situações inesperadas.",
      genero: "Fantasia · Aventura",
    },
    relaxar: {
      titulo: "Sussurros do Coração",
      imagem: "assets/img/sussurros-do-coracao.webp",
      descricao:
        "Uma história leve e acolhedora sobre sonhos, descobertas e encontrar aquilo que realmente nos inspira.",
      genero: "Romance · Cotidiano",
    },
    aventura: {
      titulo: "Porco Rosso",
      imagem: "assets/img/porco-rosso.webp",
      descricao:
        "Uma aventura pelos céus do Adriático com pilotos, perseguições e um aviador muito diferente de qualquer outro.",
      genero: "Aventura · Comédia",
    },
    emocionar: {
      titulo: "O Conto da Princesa Kaguya",
      imagem: "assets/img/princesa-kaguya.webp",
      descricao:
        "Uma história delicada e emocionante sobre liberdade, escolhas e a beleza passageira dos momentos da vida.",
      genero: "Drama · Fantasia",
    },
  };

  Object.values(filmesHumor).forEach((filme) => {
    const imagem = new Image();
    imagem.src = filme.imagem;
  });

  function preencherFilme(humor) {
    const filme = filmesHumor[humor];

    if (!filme) return;

    if (capaResultado) {
      capaResultado.src = filme.imagem;
      capaResultado.alt = filme.titulo;
    }

    if (tituloResultado) {
      tituloResultado.textContent = filme.titulo;
    }

    if (descricaoResultado) {
      descricaoResultado.textContent = filme.descricao;
    }

    if (generoResultado) {
      generoResultado.textContent = filme.genero;
    }
  }

  function abrirResultado() {
    if (!resultadoFilme) return;

    resultadoFilme.style.height = "auto";
    resultadoFilme.style.overflow = "visible";

    gsap.fromTo(
      resultadoFilme,
      {
        opacity: 0,
        y: 25,
        scale: 0.97,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "transform",
      },
    );
  }

  botoesHumor.forEach((botao) => {
    botao.addEventListener("click", () => {
      const humor = botao.dataset.humor;

      botoesHumor.forEach((item) => {
        item.classList.remove("ativo");
      });

      botao.classList.add("ativo");

      if (!resultadoFilme || !resultadoFilme.classList.contains("aberto")) {
        preencherFilme(humor);

        if (resultadoFilme) {
          resultadoFilme.classList.add("aberto");
        }

        abrirResultado();
        return;
      }

      gsap.to(".card_resultado", {
        opacity: 0,
        y: 10,
        duration: 0.18,
        ease: "power1.out",
        onComplete: () => {
          preencherFilme(humor);

          gsap.fromTo(
            ".card_resultado",
            {
              opacity: 0,
              y: 12,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power2.out",
              clearProps: "transform",
            },
          );
        },
      });
    });
  });

  function numeroAleatorio(minimo, maximo) {
    return Math.random() * (maximo - minimo) + minimo;
  }

  const coresBolhas = ["#101a3f", "#15112f", "#14264a", "#22163f"];
  const coresEstrelas = ["#ffffff", "#9bdcff", "#ffd7e4", "#56bfff"];

  function animarParticula(elemento, piscar) {
    const duracao = numeroAleatorio(4, 8);

    gsap.to(elemento, {
      keyframes: [
        {
          x: numeroAleatorio(-35, 35),
          y: numeroAleatorio(-30, 30),
        },
        {
          x: numeroAleatorio(-55, 55),
          y: numeroAleatorio(-40, 40),
        },
        {
          x: numeroAleatorio(-25, 25),
          y: numeroAleatorio(-45, 45),
        },
        {
          x: 0,
          y: 0,
        },
      ],
      duration: duracao,
      ease: "sine.inOut",
      repeat: -1,
      repeatRefresh: true,
    });

    if (piscar) {
      gsap.to(elemento, {
        opacity: numeroAleatorio(0.15, 1),
        scale: numeroAleatorio(0.7, 1.5),
        duration: numeroAleatorio(0.6, 1.6),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }

  if (fundoParticulas) {
    for (let i = 0; i < 17; i++) {
      const bolha = document.createElement("span");
      const tamanho = numeroAleatorio(11, 33);

      bolha.classList.add("bolha");
      bolha.style.width = `${tamanho}px`;
      bolha.style.height = `${tamanho}px`;
      bolha.style.left = `${numeroAleatorio(0, 100)}%`;
      bolha.style.top = `${numeroAleatorio(0, 100)}%`;
      bolha.style.background =
        coresBolhas[Math.floor(Math.random() * coresBolhas.length)];
      bolha.style.setProperty("--opacidade", numeroAleatorio(0.12, 0.7));

      fundoParticulas.appendChild(bolha);
      animarParticula(bolha, false);
    }

    for (let i = 0; i < 40; i++) {
      const estrela = document.createElement("span");
      const tamanho = numeroAleatorio(2, 5);
      const cor =
        coresEstrelas[Math.floor(Math.random() * coresEstrelas.length)];

      estrela.classList.add("estrela");
      estrela.style.width = `${tamanho}px`;
      estrela.style.height = `${tamanho}px`;
      estrela.style.left = `${numeroAleatorio(0, 100)}%`;
      estrela.style.top = `${numeroAleatorio(0, 100)}%`;
      estrela.style.background = cor;
      estrela.style.color = cor;

      fundoParticulas.appendChild(estrela);
      animarParticula(estrela, true);
    }
  }

  gsap.from(".cabecalho_humor", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".secao_humor",
      start: "top 72%",
      once: true,
    },
  });

  gsap.from(".opcoes_humor", {
    opacity: 0,
    y: 20,
    duration: 0.7,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".secao_humor",
      start: "top 68%",
      once: true,
    },
  });

  const animacaoCategorias = gsap.timeline({
    scrollTrigger: {
      trigger: ".secao_categorias",
      start: "top 65%",
      once: true,
    },
  });

  animacaoCategorias
    .from(".secao_categorias .topo_da_secao .text h2", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
    })
    .from(
      ".secao_categorias .topo_da_secao .text p",
      {
        opacity: 0,
        y: 15,
        duration: 0.65,
        ease: "power2.out",
      },
      "-=0.45",
    )
    .from(
      ".secao_categorias .topo_da_secao > button",
      {
        opacity: 0,
        x: 18,
        duration: 0.55,
        ease: "power2.out",
      },
      "-=0.4",
    )
    .from(
      ".secao_categorias .filtro_categoria",
      {
        opacity: 0,
        y: 12,
        duration: 0.45,
        stagger: 0.07,
        ease: "power2.out",
      },
      "-=0.25",
    );

  const filmesCategorias = {
    aventura: [
      {
        titulo: "O Menino e a Garça",
        ano: "2023",
        genero: "Fantasia, Aventura",
        imagem: "assets/img/menino-garca.webp",
        nota: "4.6",
      },
      {
        titulo: "Ponyo",
        ano: "2008",
        genero: "Fantasia, Família",
        imagem: "assets/img/ponyo.webp",
        nota: "4.7",
      },
      {
        titulo: "Nausicaä do Vale do Vento",
        ano: "1984",
        genero: "Fantasia, Aventura",
        imagem: "assets/img/nausicaa.webp",
        nota: "4.7",
      },
      {
        titulo: "O Castelo no Céu",
        ano: "1986",
        genero: "Aventura, Fantasia",
        imagem: "assets/img/castelo-ceu.webp",
        nota: "4.8",
      },
    ],

    fantasia: [
      {
        titulo: "O Reino dos Gatos",
        ano: "2002",
        genero: "Fantasia, Aventura",
        imagem: "assets/img/reino-dos-gatos.webp",
        nota: "4.6",
      },
      {
        titulo: "Ponyo",
        ano: "2008",
        genero: "Fantasia, Família",
        imagem: "assets/img/ponyo.webp",
        nota: "4.7",
      },
      {
        titulo: "O Conto da Princesa Kaguya",
        ano: "2013",
        genero: "Fantasia, Drama",
        imagem: "assets/img/princesa-kaguya.webp",
        nota: "4.8",
      },
      {
        titulo: "O Castelo no Céu",
        ano: "1986",
        genero: "Fantasia, Aventura",
        imagem: "assets/img/castelo-ceu.webp",
        nota: "4.8",
      },
    ],

    romance: [
      {
        titulo: "Sussurros do Coração",
        ano: "1995",
        genero: "Romance, Drama",
        imagem: "assets/img/sussurros-do-coracao.webp",
        nota: "4.8",
      },
      {
        titulo: "Da Colina Kokuriko",
        ano: "2011",
        genero: "Romance, Drama",
        imagem: "assets/img/colina-kokuriko.webp",
        nota: "4.6",
      },
      {
        titulo: "O Vento se Levanta",
        ano: "2013",
        genero: "Romance, Drama",
        imagem: "assets/img/vento-se-levanta.webp",
        nota: "4.7",
      },
      {
        titulo: "Memórias de Ontem",
        ano: "1991",
        genero: "Romance, Drama",
        imagem: "assets/img/memorias-de-ontem.webp",
        nota: "4.7",
      },
    ],

    infantil: [
      {
        titulo: "Ponyo",
        ano: "2008",
        genero: "Fantasia, Família",
        imagem: "assets/img/ponyo.webp",
        nota: "4.7",
      },
      {
        titulo: "Meus Vizinhos os Yamadas",
        ano: "1999",
        genero: "Comédia, Família",
        imagem: "assets/img/yamadas.webp",
        nota: "4.5",
      },
      {
        titulo: "O Reino dos Gatos",
        ano: "2002",
        genero: "Fantasia, Família",
        imagem: "assets/img/reino-dos-gatos.webp",
        nota: "4.6",
      },
      {
        titulo: "Arrietty",
        ano: "2010",
        genero: "Fantasia, Família",
        imagem: "assets/img/arrietty.webp",
        nota: "4.7",
      },
    ],
  };

  const listaCategorias = document.querySelector(
    ".secao_categorias .lista_categorias",
  );

  const filtrosCategorias = document.querySelectorAll(
    ".secao_categorias .filtro_categoria",
  );

  function criarCardCategoria(filme) {
    return `
    <article class="card">
      <div class="card-image">
        <img
          src="${filme.imagem}"
          alt="${filme.titulo}"
          loading="lazy"
          decoding="async"
        >

        <div class="card-rating">
          <span>★</span>
          ${filme.nota}
        </div>

        <div class="card-overlay">
          <button class="watch-button">
            <span>✦</span>
            Sobre o filme
          </button>
        </div>
      </div>

      <div class="info_card">
        <h3>${filme.titulo}</h3>

        <div class="movie-details">
          <p>${filme.ano} • ${filme.genero}</p>

          <button
            class="heart-button"
            aria-label="Favoritar ${filme.titulo}"
          >
            <img
              src="assets/img/boxicons_heart.svg"
              alt=""
              loading="lazy"
            >
          </button>
        </div>

        <div class="card-line"></div>

        <div class="card-footer">
          <span class="quality">HD</span>

          <button class="watch-link">
            Assistir agora
          </button>
        </div>
      </div>
    </article>
  `;
  }

  function mostrarCategoria(categoria) {
    if (!listaCategorias) return;

    const filmes = filmesCategorias[categoria];

    if (!filmes) return;

    gsap.killTweensOf(listaCategorias.querySelectorAll(".card"));

    listaCategorias.innerHTML = filmes.map(criarCardCategoria).join("");

    const novosCards = listaCategorias.querySelectorAll(".card");

    gsap.fromTo(
      novosCards,
      {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "transform,opacity,filter",
        scrollTrigger: {
          trigger: ".secao_categorias .lista_categorias",
          start: "top 80%",
          once: true,
        },
      },
    );

    if (typeof ativarFavoritos === "function") {
      ativarFavoritos();
    }
  }

  if (listaCategorias) {
    mostrarCategoria("aventura");
  }

  filtrosCategorias.forEach((botao) => {
    botao.addEventListener("click", () => {
      if (botao.classList.contains("ativo")) return;

      const categoria = botao.dataset.categoria;

      filtrosCategorias.forEach((item) => {
        item.classList.remove("ativo");
      });

      botao.classList.add("ativo");

      const cardsAtuais = listaCategorias
        ? listaCategorias.querySelectorAll(".card")
        : [];

      gsap.to(cardsAtuais, {
        opacity: 0,
        y: -15,
        duration: 0.2,
        ease: "power1.out",
        onComplete: () => {
          mostrarCategoria(categoria);
        },
      });
    });
  });
}

const personagens = [
  {
    nome: "San",
    imagem: "assets/img/san.webp",
  },
  {
    nome: "Totoro",
    imagem: "assets/img/totorop.webp",
  },
  {
    nome: "Chihiro",
    imagem: "assets/img/chihiro.webp",
  },
  {
    nome: "Sophie",
    imagem: "assets/img/sophie.webp",
  },
  {
    nome: "Kiki",
    imagem: "assets/img/kiki.webp",
  },
];

const listaPersonagens = document.querySelector(".lista_personagens");
const nomePersonagem = document.querySelector(".nome_personagem");
const conhecerPersonagem = document.querySelector(".conhecer_personagem");
const setaAnterior = document.querySelector(".seta_personagem.esquerda");
const setaProximo = document.querySelector(".seta_personagem.direita");

let personagemAtual = 2;

function indiceCircular(indice) {
  return (indice + personagens.length) % personagens.length;
}

function atualizarInformacoes() {
  const personagem = personagens[personagemAtual];

  if (nomePersonagem) {
    nomePersonagem.textContent = personagem.nome;
  }

  if (conhecerPersonagem) {
    conhecerPersonagem.innerHTML = `
      Clique para conhecer a história de
      ${personagem.nome}
      <span>→</span>
    `;
  }
}

function montarPersonagens() {
  if (!listaPersonagens) return;

  listaPersonagens.innerHTML = "";

  for (let posicao = -2; posicao <= 2; posicao++) {
    const indiceReal = indiceCircular(personagemAtual + posicao);
    const personagem = personagens[indiceReal];
    const selecionado = posicao === 0;

    const botao = document.createElement("button");

    botao.className = selecionado ? "personagem selecionado" : "personagem";

    botao.dataset.indice = indiceReal;

    botao.innerHTML = `
      <img
        src="${personagem.imagem}"
        alt="${personagem.nome}"
        draggable="false"
      >
    `;

    botao.addEventListener("click", () => {
      if (selecionado) return;
      trocarPersonagem(indiceReal);
    });

    listaPersonagens.appendChild(botao);
  }

  atualizarInformacoes();
}

function trocarPersonagem(novoIndice) {
  if (!listaPersonagens) return;

  const personagensAtuais = listaPersonagens.querySelectorAll(".personagem");

  gsap.to(personagensAtuais, {
    opacity: 0,
    y: 10,
    duration: 0.18,
    ease: "power1.in",
    onComplete: () => {
      personagemAtual = indiceCircular(novoIndice);

      montarPersonagens();

      const novosPersonagens = listaPersonagens.querySelectorAll(".personagem");

      gsap.fromTo(
        novosPersonagens,
        {
          opacity: 0,
          y: 14,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: "power2.out",
          clearProps: "transform,opacity",
        },
      );

      gsap.fromTo(
        [nomePersonagem, conhecerPersonagem],
        {
          opacity: 0,
          y: 6,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        },
      );
    },
  });
}

if (setaProximo) {
  setaProximo.addEventListener("click", () => {
    trocarPersonagem(personagemAtual + 1);
  });
}

if (setaAnterior) {
  setaAnterior.addEventListener("click", () => {
    trocarPersonagem(personagemAtual - 1);
  });
}

montarPersonagens();

const animacaoPersonagens = gsap.timeline({
  scrollTrigger: {
    trigger: ".secao_personagens",
    start: "top 70%",
    once: true,
  },
});

animacaoPersonagens
  .from(".cabecalho_personagens h2", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
  })
  .from(
    ".cabecalho_personagens p",
    {
      opacity: 0,
      y: 15,
      duration: 0.65,
      ease: "power2.out",
    },
    "-=0.4",
  )
  .from(
    ".lista_personagens .personagem",
    {
      opacity: 0,
      y: 25,
      duration: 0.55,
      stagger: 0.08,
      ease: "power2.out",
    },
    "-=0.25",
  )
  .from(
    ".nome_personagem",
    {
      opacity: 0,
      y: 10,
      duration: 0.4,
      ease: "power2.out",
    },
    "-=0.2",
  )
  .from(
    ".conhecer_personagem",
    {
      opacity: 0,
      y: 10,
      duration: 0.4,
      ease: "power2.out",
    },
    "-=0.25",
  );

const secaoMusicas = document.querySelector(".secao_musicas");
const cardsMusicas = document.querySelectorAll(".card_musica");
const botoesPlay = document.querySelectorAll(".botao_play");

if (secaoMusicas) {
  gsap.from(".cabecalho_musicas", {
    opacity: 0,
    y: 35,
    duration: 0.9,
    ease: "power2.out",
    scrollTrigger: {
      trigger: secaoMusicas,
      start: "top 75%",
      once: true,
    },
  });

  gsap.from(cardsMusicas, {
    opacity: 0,
    y: 35,
    duration: 0.7,
    stagger: 0.15,
    ease: "power2.out",
    clearProps: "transform",
    scrollTrigger: {
      trigger: ".lista_musicas",
      start: "top 80%",
      once: true,
    },
  });
}

document.querySelectorAll(".card_musica").forEach((card) => {
  const botao = card.querySelector(".botao_play");
  const audio = card.querySelector(".audio_musica");
  const barra = card.querySelector(".progresso_musica span");
  const duracao = card.querySelector(".duracao_musica");

  if (!botao || !audio) return;

  botao.addEventListener("click", async () => {
    if (!audio.paused) {
      audio.pause();
      botao.textContent = "▶";
      botao.classList.remove("tocando");
      return;
    }

    document.querySelectorAll(".audio_musica").forEach((outroAudio) => {
      if (outroAudio !== audio) {
        outroAudio.pause();
        outroAudio.currentTime = 0;
      }
    });

    document.querySelectorAll(".botao_play").forEach((outroBotao) => {
      if (outroBotao !== botao) {
        outroBotao.textContent = "▶";
        outroBotao.classList.remove("tocando");
      }
    });

    try {
      await audio.play();

      botao.textContent = "❚❚";
      botao.classList.add("tocando");
    } catch (erro) {
      console.error("Não foi possível reproduzir o áudio:", erro);

      alert(
        "Não foi possível carregar a música. Verifique o caminho do arquivo.",
      );
    }
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration || !barra) return;

    const porcentagem = (audio.currentTime / audio.duration) * 100;

    barra.style.width = `${porcentagem}%`;
  });

  audio.addEventListener("loadedmetadata", () => {
    if (!audio.duration || !duracao) return;

    const minutos = Math.floor(audio.duration / 60);
    const segundos = Math.floor(audio.duration % 60);

    duracao.textContent = `${minutos}:${String(segundos).padStart(2, "0")}`;
  });

  audio.addEventListener("ended", () => {
    botao.textContent = "▶";
    botao.classList.remove("tocando");

    if (barra) {
      barra.style.width = "0%";
    }
  });
});

const secaoFinal = document.querySelector(".secao_final");

if (secaoFinal) {
  const animacaoFinal = gsap.timeline({
    scrollTrigger: {
      trigger: secaoFinal,
      start: "top 75%",
      once: true,
    },
  });

  animacaoFinal
    .from(".secao_final .fundo_final", {
      opacity: 0,
      scale: 1.08,
      duration: 1.4,
      ease: "power2.out",
    })
    .from(
      ".secao_final .conteudo_final h2",
      {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power2.out",
      },
      "-=0.8",
    )
    .from(
      ".secao_final .botao_final",
      {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.out",
      },
      "-=0.45",
    );
}

const footer = document.querySelector(".footer");

if (footer) {
  const animacaoFooter = gsap.timeline({
    scrollTrigger: {
      trigger: footer,
      start: "top 85%",
      once: true,
    },
  });

  animacaoFooter
    .from(footer, {
      y: 70,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
    .from(
      ".footer .folha-esquerda",
      {
        x: -70,
        y: 40,
        opacity: 0,
        rotation: -8,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.7",
    )
    .from(
      ".footer .folha-direita",
      {
        x: 70,
        y: 40,
        opacity: 0,
        rotation: 8,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.85",
    )
    .from(
      ".footer-marca",
      {
        opacity: 0,
        y: 25,
        duration: 0.65,
        ease: "power2.out",
      },
      "-=0.55",
    )
    .from(
      ".footer-navegacao",
      {
        opacity: 0,
        y: 25,
        duration: 0.65,
        ease: "power2.out",
      },
      "-=0.45",
    )
    .from(
      ".footer-social",
      {
        opacity: 0,
        y: 25,
        duration: 0.65,
        ease: "power2.out",
      },
      "-=0.45",
    )
    .from(
      ".footer-bottom",
      {
        opacity: 0,
        y: 15,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.25",
    );
}
