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

/* ==============================
   SEGUNDA SEÇÃO
============================== */

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

    imagem: "assets/img/sussurros-do-coracao.png",

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

Object.values(filmesHumor).forEach((filme) => {
  const imagem = new Image();

  imagem.src = filme.imagem;

  imagem.decode?.().catch(() => {});
});

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
/* ========================================
   CLIQUE NOS HUMORES
======================================== */

botoesHumor.forEach((botao) => {
  botao.addEventListener("click", () => {
    const humor = botao.dataset.humor;

    botoesHumor.forEach((item) => {
      item.classList.remove("ativo");
    });

    botao.classList.add("ativo");

    /* primeira vez */

    if (!resultadoFilme.classList.contains("aberto")) {
      preencherFilme(humor);

      resultadoFilme.classList.add("aberto");

      abrirResultado();

      return;
    }

    /* troca de filme */

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

/* ==============================
   QUARTA SEÇÃO
============================== */

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
      imagem: "assets/img/ponyo.jpg",
      nota: "4.7",
    },

    {
      titulo: "Nausicaä do Vale do Vento",
      ano: "1984",
      genero: "Fantasia, Aventura",
      imagem: "assets/img/nausicaa.jpg",
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
      imagem: "assets/img/reino-dos-gatos.jpg",
      nota: "4.6",
    },

    {
      titulo: "Ponyo",
      ano: "2008",
      genero: "Fantasia, Família",
      imagem: "assets/img/ponyo.jpg",
      nota: "4.7",
    },

    {
      titulo: "O Conto da Princesa Kaguya",
      ano: "2013",
      genero: "Fantasia, Drama",
      imagem: "assets/img/princesa-kaguya.jpg",
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
      imagem: "assets/img/colina-kokuriko.jpg",
      nota: "4.6",
    },

    {
      titulo: "O Vento se Levanta",
      ano: "2013",
      genero: "Romance, Drama",
      imagem: "assets/img/vento-se-levanta.jpg",
      nota: "4.7",
    },

    {
      titulo: "Memórias de Ontem",
      ano: "1991",
      genero: "Romance, Drama",
      imagem: "assets/img/memorias-de-ontem.jpg",
      nota: "4.7",
    },
  ],

  infantil: [
    {
      titulo: "Ponyo",
      ano: "2008",
      genero: "Fantasia, Família",
      imagem: "assets/img/ponyo.jpg",
      nota: "4.7",
    },

    {
      titulo: "Meus Vizinhos os Yamadas",
      ano: "1999",
      genero: "Comédia, Família",
      imagem: "assets/img/yamadas.jpg",
      nota: "4.5",
    },

    {
      titulo: "O Reino dos Gatos",
      ano: "2002",
      genero: "Fantasia, Família",
      imagem: "assets/img/reino-dos-gatos.jpg",
      nota: "4.6",
    },

    {
      titulo: "Arrietty",
      ano: "2010",
      genero: "Fantasia, Família",
      imagem: "assets/img/arrietty.jpg",
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

  const novosCards = listaCategorias.querySelectorAll(".card");

  /* garante o estado inicial */
  gsap.set(novosCards, {
    opacity: 0,
    y: 18,
  });

  /* anima os novos cards */
  gsap.to(novosCards, {
    opacity: 1,
    y: 0,

    duration: 0.45,
    stagger: 0.06,

    ease: "power2.out",

    onComplete: () => {
      /*
        libera o transform para o
        :hover do CSS funcionar
      */
      gsap.set(novosCards, {
        clearProps: "transform,opacity",
      });
    },
  });

  ativarFavoritos();
}

/* ==========================================
   TROCA DE CATEGORIA
========================================== */

let trocandoCategoria = false;

filtrosCategorias.forEach((botao) => {
  botao.addEventListener("click", () => {
    if (botao.classList.contains("ativo")) {
      return;
    }

    const categoria = botao.dataset.categoria;

    filtrosCategorias.forEach((item) => {
      item.classList.remove("ativo");
    });

    botao.classList.add("ativo");

    const cardsAtuais = listaCategorias.querySelectorAll(".card");

    /* para qualquer animação anterior */
    gsap.killTweensOf(cardsAtuais);

    /* some com os cards atuais */
    gsap.to(cardsAtuais, {
      opacity: 0,

      duration: 0.22,

      ease: "power1.out",

      onComplete: () => {
        mostrarCategoria(categoria);
      },
    });
  });
});

/* ==========================================
   QUINTA SEÇÃO - PERSONAGENS
========================================== */

/* ===============================
   PERSONAGENS
=============================== */

const personagens = [
  {
    nome: "San",
    imagem: "assets/img/san.png",
  },

  {
    nome: "Totoro",
    imagem: "assets/img/totorop.png",
  },

  {
    nome: "Chihiro",
    imagem: "assets/img/chihiro.png",
  },

  {
    nome: "Sophie",
    imagem: "assets/img/sophie.png",
  },

  {
    nome: "Kiki",
    imagem: "assets/img/kiki.png",
  },
];

/* ===============================
   ELEMENTOS DO HTML
=============================== */

const listaPersonagens = document.querySelector(".lista_personagens");

const nomePersonagem = document.querySelector(".nome_personagem");

const conhecerPersonagem = document.querySelector(".conhecer_personagem");

const setaAnterior = document.querySelector(".seta_personagem.esquerda");

const setaProximo = document.querySelector(".seta_personagem.direita");

/* ===============================
   PERSONAGEM INICIAL
=============================== */

/*
  0 = San
  1 = Totoro
  2 = Chihiro
  3 = Sophie
  4 = Kiki

  Queremos Chihiro inicialmente.
*/

let personagemAtual = 2;

/* ===============================
   ÍNDICE CIRCULAR
=============================== */

function indiceCircular(indice) {
  return (indice + personagens.length) % personagens.length;
}

/* ===============================
   CRIAR OS 5 PERSONAGENS
=============================== */

function montarPersonagens() {
  listaPersonagens.innerHTML = "";

  /*
    sempre mostramos:

    -2
    -1
     0  <- personagem central
    +1
    +2
  */

  for (let posicao = -2; posicao <= 2; posicao++) {
    /* pega o índice correto */

    const indiceReal = indiceCircular(personagemAtual + posicao);

    const personagem = personagens[indiceReal];

    /*
      posição 0 significa:
      personagem central
    */

    const selecionado = posicao === 0;

    /* cria botão */

    const botao = document.createElement("button");

    botao.className = selecionado ? "personagem selecionado" : "personagem";

    botao.dataset.indice = indiceReal;

    /* imagem */

    botao.innerHTML = `
      <img
        src="${personagem.imagem}"
        alt="${personagem.nome}"
        draggable="false"
      >
    `;

    /* clique nos personagens */

    botao.addEventListener("click", () => {
      /*
          se já estiver no centro,
          não faz nada
        */

      if (selecionado) {
        return;
      }

      trocarPersonagem(indiceReal);
    });

    /* coloca na tela */

    listaPersonagens.appendChild(botao);
  }

  atualizarInformacoes();
}

/* ===============================
   ATUALIZAR NOME E TEXTO
=============================== */

function atualizarInformacoes() {
  const personagem = personagens[personagemAtual];

  /* nome da pílula */

  nomePersonagem.textContent = personagem.nome;

  /* texto embaixo */

  conhecerPersonagem.innerHTML = `
    Clique para conhecer a história de
    ${personagem.nome}
    <span>→</span>
  `;
}

/* ===============================
   TROCAR PERSONAGEM
=============================== */

function trocarPersonagem(novoIndice) {
  const personagensAtuais = listaPersonagens.querySelectorAll(".personagem");

  /*
    primeiro some com os atuais
  */

  gsap.to(personagensAtuais, {
    opacity: 0,

    y: 10,

    duration: 0.18,

    ease: "power1.in",

    onComplete: () => {
      /*
          muda quem é o atual
        */

      personagemAtual = indiceCircular(novoIndice);

      /*
          recria a fileira
        */

      montarPersonagens();

      const novosPersonagens = listaPersonagens.querySelectorAll(".personagem");

      /*
          entrada dos novos
        */

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

      /*
          anima nome e texto
        */

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

/* ===============================
   SETA DIREITA
=============================== */

setaProximo.addEventListener("click", () => {
  trocarPersonagem(personagemAtual + 1);
});

/* ===============================
   SETA ESQUERDA
=============================== */

setaAnterior.addEventListener("click", () => {
  trocarPersonagem(personagemAtual - 1);
});

/* ===============================
   INICIAR
=============================== */

montarPersonagens();
