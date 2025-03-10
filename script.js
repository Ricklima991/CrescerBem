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
const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Controle do menu mobile
burger.addEventListener('click', () => {
    // Alternar menu mobile
    nav.classList.toggle('active');
    burger.classList.toggle('active');

    // Animar links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Controle do menu flutuante no scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Fechar menu mobile ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
    });
});

/* ==========================================================================
   INICIALIZAÇÃO DO SITE
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    carousel.init();
}); 