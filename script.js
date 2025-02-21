const { produtos } = require("./produtos");

/* ==========================================================================
   CONFIGURAÇÃO E CONTROLE DO CARROSSEL
   ========================================================================== */
const carousel = {
    // Propriedades do carrossel
    currentSlide: 0,
    items: document.querySelectorAll('.carousel-item'),
    indicators: document.querySelectorAll('.indicator'),
    totalSlides: document.querySelectorAll('.carousel-item').length,
    autoPlayInterval: null,

    // Inicialização do carrossel
    init() {
        // Configuração dos botões de navegação
        document.querySelector('.prev').addEventListener('click', () => this.prevSlide());
        document.querySelector('.next').addEventListener('click', () => this.nextSlide());

        // Configuração dos indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Iniciar reprodução automática
        this.startAutoPlay();

        // Controle de pausa no hover
        document.querySelector('.carousel').addEventListener('mouseenter', () => this.stopAutoPlay());
        document.querySelector('.carousel').addEventListener('mouseleave', () => this.startAutoPlay());
    },

    // Atualização dos slides
    updateSlides() {
        // Atualizar visibilidade dos slides
        this.items.forEach((item, index) => {
            if (index === this.currentSlide) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Atualizar indicadores
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    },

    // Navegação dos slides
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlides();
    },

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlides();
    },

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlides();
    },

    // Controle de reprodução automática
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000); // Muda a cada 5 segundos
    },

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
};

/* ==========================================================================
   MENU MOBILE
   ========================================================================== */
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

/* ==========================================================================
   FUNÇÕES DE RENDERIZAÇÃO DA LOJA
   ========================================================================== */
// Função para renderizar produtos na loja
function renderizarProdutos() {
    const container = document.querySelector('.produtos-container');
    if (!container) return;

    container.innerHTML = produtos.map(produto => `
        <div class="produto">
            <a href="${produto.link}" class="produto-link">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <div class="produto-info">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <p class="categoria">${produto.categoria}</p>
                    <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
                    <ul class="especificacoes">
                        ${produto.especificacoes.map(esp => `<li>${esp}</li>`).join('')}
                    </ul>
                    <div class="produto-botoes">
                        <button onclick="adicionarAoCarrinho(${produto.id})" class="btn-comprar">
                            <i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho
                        </button>
                        <button onclick="adicionarAosFavoritos(${produto.id})" class="btn-favorito">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </a>
        </div>
    `).join('');
}

/* ==========================================================================
   FUNÇÕES DO CARRINHO DE COMPRAS
   ========================================================================== */
let carrinho = [];

// Adicionar produto ao carrinho
function adicionarAoCarrinho(produtoId) {
    if (!verificarLogin()) {
        window.location.href = 'login.html';
        return;
    }

    const produto = produtos.find(p => p.id === produtoId);
    if (produto) {
        carrinho.push(produto);
        atualizarCarrinho();
        mostrarNotificacao(`${produto.nome} adicionado ao carrinho!`);
    }
}

// Adicionar produto aos favoritos
function adicionarAosFavoritos(produtoId) {
    if (!verificarLogin()) {
        window.location.href = 'login.html';
        return;
    }

    const produto = produtos.find(p => p.id === produtoId);
    if (produto) {
        mostrarNotificacao(`${produto.nome} adicionado aos favoritos!`);
    }
}

// Verificar status do login
function verificarLogin() {
    return localStorage.getItem('usuarioLogado') !== null;
}

// Atualizar informações do carrinho
function atualizarCarrinho() {
    const total = carrinho.reduce((soma, produto) => soma + produto.preco, 0);
    console.log(`Total do carrinho: R$ ${total.toFixed(2)}`);
    
    // Atualizar badge do carrinho no menu
    const badgeCarrinho = document.querySelector('.badge-carrinho');
    if (badgeCarrinho) {
        badgeCarrinho.textContent = carrinho.length;
    }
}

/* ==========================================================================
   FUNÇÕES DE NOTIFICAÇÃO
   ========================================================================== */
function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao';
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);

    setTimeout(() => {
        notificacao.remove();
    }, 3000);
}

/* ==========================================================================
   FORMULÁRIO DE CONTATO
   ========================================================================== */
const formContato = document.getElementById('contato-form');
if (formContato) {
    formContato.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(formContato);
        mostrarNotificacao('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        formContato.reset();
    });
}

/* ==========================================================================
   NAVEGAÇÃO SUAVE
   ========================================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Fecha o menu mobile se estiver aberto
            nav.classList.remove('active');
        }
    });
});

/* ==========================================================================
   INICIALIZAÇÃO DO SITE
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    carousel.init();
    renderizarProdutos();
}); 