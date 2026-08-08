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

//  TERCEIRA SEÇÃO - QUIZ DE HUMOR

const secaoHumor = document.querySelector(".secao_humor");

const fundoParticulas = document.querySelector(".particulas_humor");

const botoesHumor = document.querySelectorAll(".botao_humor");

const resultadoFilme = document.querySelector(".resultado_filme");

const capaResultado = document.querySelector(".capa_resultado");

const tituloResultado = document.querySelector(".titulo_resultado");

const descricaoResultado = document.querySelector(".descricao_resultado");

const generoResultado = document.querySelector(".genero_resultado");

/* FILMES */

const filmesHumor = {
  magico: {
    titulo: "O Reino dos Gatos",

    imagem: "assets/img/reino-dos-gatos.jpg",

    descricao:
      "Uma aventura encantadora por um reino misterioso cheio de gatos, magia e situações inesperadas.",

    genero: "Fantasia · Aventura",
  },

  relaxar: {
    titulo: "Sussurros do Coração",

    imagem: "assets/img/sussurros-do-coracao.jpg",

    descricao:
      "Uma história leve e acolhedora sobre sonhos, descobertas e encontrar aquilo que realmente nos inspira.",

    genero: "Romance · Cotidiano",
  },

  aventura: {
    titulo: "Porco Rosso",

    imagem: "assets/img/porco-rosso.jpg",

    descricao:
      "Uma aventura pelos céus do Adriático com pilotos, perseguições e um aviador muito diferente de qualquer outro.",

    genero: "Aventura · Comédia",
  },

  emocionar: {
    titulo: "O Conto da Princesa Kaguya",

    imagem: "assets/img/princesa-kaguya.jpg",

    descricao:
      "Uma história delicada e emocionante sobre liberdade, escolhas e a beleza passageira dos momentos da vida.",

    genero: "Drama · Fantasia",
  },
};

/* ========================================
   TROCAR FILME
======================================== */

function preencherFilme(humor) {
  const filme = filmesHumor[humor];

  capaResultado.src = filme.imagem;

  capaResultado.alt = filme.titulo;

  tituloResultado.textContent = filme.titulo;

  descricaoResultado.textContent = filme.descricao;

  generoResultado.textContent = filme.genero;
}

/* ========================================
   ABRIR CARD
======================================== */

function abrirResultado() {
  gsap.fromTo(
    resultadoFilme,
    {
      height: 0,
      opacity: 0,
      marginTop: 0,
      y: 15,
    },
    {
      height: "auto",
      opacity: 1,
      marginTop: window.innerWidth <= 600 ? 24 : 48,
      y: 0,
      duration: 0.65,
      ease: "power3.out",
    },
  );
}

/* ========================================
   CLIQUE NOS HUMORES
======================================== */

botoesHumor.forEach((botao) => {
  botao.addEventListener("click", () => {
    const humor = botao.dataset.humor;

    /* botão ativo */

    botoesHumor.forEach((item) => {
      item.classList.remove("ativo");
    });

    botao.classList.add("ativo");

    if (resultadoFilme.offsetHeight === 0) {
      preencherFilme(humor);

      abrirResultado();

      return;
    }

    gsap.to(
      resultadoFilme,

      {
        height: 0,
        opacity: 0,
        marginTop: 0,
        y: 10,

        duration: 0.3,

        ease: "power2.in",

        onComplete: () => {
          preencherFilme(humor);

          abrirResultado();
        },
      },
    );
  });
});

/* ========================================
   PARTÍCULAS
======================================== */

function numeroAleatorio(minimo, maximo) {
  return Math.random() * (maximo - minimo) + minimo;
}

/* CORES */

const coresBolhas = ["#101a3f", "#15112f", "#14264a", "#22163f"];

const coresEstrelas = ["#ffffff", "#9bdcff", "#ffd7e4", "#56bfff"];

/* ========================================
   CRIAR BOLHAS
======================================== */

for (let i = 0; i < 17; i++) {
  const bolha = document.createElement("span");

  bolha.classList.add("bolha");

  const tamanho = numeroAleatorio(11, 33);

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

/* ========================================
   CRIAR ESTRELAS
======================================== */

for (let i = 0; i < 40; i++) {
  const estrela = document.createElement("span");

  estrela.classList.add("estrela");

  const tamanho = numeroAleatorio(2, 5);

  estrela.style.width = `${tamanho}px`;

  estrela.style.height = `${tamanho}px`;

  estrela.style.left = `${numeroAleatorio(0, 100)}%`;

  estrela.style.top = `${numeroAleatorio(0, 100)}%`;

  const cor = coresEstrelas[Math.floor(Math.random() * coresEstrelas.length)];

  estrela.style.background = cor;

  estrela.style.color = cor;

  fundoParticulas.appendChild(estrela);

  animarParticula(estrela, true);
}

/* ========================================
   MOVIMENTO ALEATÓRIO
======================================== */

function animarParticula(elemento, piscar) {
  const duracao = numeroAleatorio(4, 8);

  gsap.to(
    elemento,

    {
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
    },
  );

  if (piscar) {
    gsap.to(
      elemento,

      {
        opacity: numeroAleatorio(0.15, 1),

        scale: numeroAleatorio(0.7, 1.5),

        duration: numeroAleatorio(0.6, 1.6),

        ease: "sine.inOut",

        repeat: -1,

        yoyo: true,
      },
    );
  }
}

/* entrada dos textos */

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

/* entrada dos botões */

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
/* ==========================================
   FILMES POR CATEGORIA
========================================== */

const filmesCategorias = {
  aventura: [
    {
      titulo: "O Menino e a Garça",
      ano: "2023",
      genero: "Fantasia, Aventura",
      imagem: "assets/img/menino-garca.png",
      nota: "4.6",
    },

    {
      titulo: "Ponyo",
      ano: "2008",
      genero: "Fantasia, Família",
      imagem: "assets/img/ponyo.png",
      nota: "4.7",
    },

    {
      titulo: "Nausicaä do Vale do Vento",
      ano: "1984",
      genero: "Fantasia, Aventura",
      imagem: "assets/img/nausicaa.png",
      nota: "4.7",
    },

    {
      titulo: "O Castelo no Céu",
      ano: "1986",
      genero: "Aventura, Fantasia",
      imagem: "assets/img/castelo-ceu.png",
      nota: "4.8",
    },
  ],

  fantasia: [
    {
      titulo: "O Reino dos Gatos",
      ano: "2002",
      genero: "Fantasia, Aventura",
      imagem: "assets/img/reino-dos-gatos.png",
      nota: "4.6",
    },

    {
      titulo: "Ponyo",
      ano: "2008",
      genero: "Fantasia, Família",
      imagem: "assets/img/ponyo.png",
      nota: "4.7",
    },

    {
      titulo: "O Conto da Princesa Kaguya",
      ano: "2013",
      genero: "Fantasia, Drama",
      imagem: "assets/img/princesa-kaguya.png",
      nota: "4.8",
    },

    {
      titulo: "O Castelo no Céu",
      ano: "1986",
      genero: "Fantasia, Aventura",
      imagem: "assets/img/castelo-ceu.png",
      nota: "4.8",
    },
  ],

  romance: [
    {
      titulo: "Sussurros do Coração",
      ano: "1995",
      genero: "Romance, Drama",
      imagem: "assets/img/sussurros-do-coracao.png",
      nota: "4.8",
    },

    {
      titulo: "Da Colina Kokuriko",
      ano: "2011",
      genero: "Romance, Drama",
      imagem: "assets/img/colina-kokuriko.png",
      nota: "4.6",
    },

    {
      titulo: "O Vento se Levanta",
      ano: "2013",
      genero: "Romance, Drama",
      imagem: "assets/img/vento-se-levanta.png",
      nota: "4.7",
    },

    {
      titulo: "Memórias de Ontem",
      ano: "1991",
      genero: "Romance, Drama",
      imagem: "assets/img/memorias-de-ontem.png",
      nota: "4.7",
    },
  ],

  infantil: [
    {
      titulo: "Ponyo",
      ano: "2008",
      genero: "Fantasia, Família",
      imagem: "assets/img/ponyo.png",
      nota: "4.7",
    },

    {
      titulo: "Meus Vizinhos os Yamadas",
      ano: "1999",
      genero: "Comédia, Família",
      imagem: "assets/img/yamadas.png",
      nota: "4.5",
    },

    {
      titulo: "O Reino dos Gatos",
      ano: "2002",
      genero: "Fantasia, Família",
      imagem: "assets/img/reino-dos-gatos.png",
      nota: "4.6",
    },

    {
      titulo: "Arrietty",
      ano: "2010",
      genero: "Fantasia, Família",
      imagem: "assets/img/arrietty.png",
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

/* ==========================================
   CRIA O CARD
========================================== */

function criarCardCategoria(filme) {
  return `
    <article class="card">

      <div class="card-image">

        <img
          src="${filme.imagem}"
          alt="${filme.titulo}"
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

          <p>
            ${filme.ano} • ${filme.genero}
          </p>


          <button
            class="heart-button"
            aria-label="Favoritar ${filme.titulo}"
          >
            <img
              src="assets/img/boxicons_heart.svg"
              alt=""
            >
          </button>

        </div>


        <div class="card-line"></div>


        <div class="card-footer">

          <span class="quality">
            HD
          </span>


          <button class="watch-link">
            Assistir agora
          </button>

        </div>

      </div>

    </article>
  `;
}

/* ==========================================
   MOSTRAR CATEGORIA
========================================== */

function mostrarCategoria(categoria) {
  const filmes = filmesCategorias[categoria];

  listaCategorias.innerHTML = filmes.map(criarCardCategoria).join("");

  const cards = listaCategorias.querySelectorAll(".card");

  gsap.fromTo(
    cards,

    {
      opacity: 0,
      y: 25,
    },

    {
      opacity: 1,
      y: 0,

      duration: 0.55,
      stagger: 0.08,

      ease: "power2.out",

      clearProps: "transform",
    },
  );

  ativarFavoritos();
}

/* ==========================================
   TROCA DE CATEGORIA
========================================== */

let trocandoCategoria = false;

filtrosCategorias.forEach((botao) => {
  botao.addEventListener("click", () => {
    if (botao.classList.contains("ativo") || trocandoCategoria) {
      return;
    }

    trocandoCategoria = true;

    const categoria = botao.dataset.categoria;

    /* troca botão ativo */

    filtrosCategorias.forEach((item) => {
      item.classList.remove("ativo");
    });

    botao.classList.add("ativo");

    /* cards que estão aparecendo */

    const cardsAtuais = listaCategorias.querySelectorAll(".card");

    gsap.to(cardsAtuais, {
      opacity: 0,
      y: 15,

      duration: 0.25,
      stagger: 0.035,

      ease: "power2.in",

      onComplete: () => {
        mostrarCategoria(categoria);

        trocandoCategoria = false;
      },
    });
  });
});
