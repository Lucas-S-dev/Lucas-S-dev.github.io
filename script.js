// ==========================================================================
// CONTROLE DE PÁGINA CHEIA (1 SCROLL = 1 SEÇÃO ABSOLUTO)
// ==========================================================================
let currentIdx = 0;
let isAnimating = false;
const wrapper = document.querySelector('#site-wrapper');
const totalSections = document.querySelectorAll('section').length;

// Função auxiliar para verificar se o dispositivo está no modo responsivo (Mobile/Tablet)
function isMobile() {
    return window.innerWidth <= 768;
}

// Evento de Rolagem do Mouse (Apenas Desktop)
window.addEventListener('wheel', (e) => {
    if (isAnimating || isMobile()) return; // Ignora se estiver animando ou se for mobile

    if (e.deltaY > 0) {
        if (currentIdx < totalSections - 1) {
            currentIdx++;
            navigate(currentIdx);
        }
    } else if (e.deltaY < 0) {
        if (currentIdx > 0) {
            currentIdx--;
            navigate(currentIdx);
        }
    }
}, { passive: true });

// Evento de Acessibilidade: Navegação por Teclado (Setas e PageUp/PageDown)
window.addEventListener('keydown', (e) => {
    if (isAnimating || isMobile()) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIdx < totalSections - 1) {
            currentIdx++;
            navigate(currentIdx);
        }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIdx > 0) {
            currentIdx--;
            navigate(currentIdx);
        }
    }
});

function changeSection(index) {
    isAnimating = true;
    currentIdx = index;
    wrapper.style.transform = `translateY(-${index * 100}vh)`;

    setTimeout(() => {
        isAnimating = false;
    }, 1200);
}

// Centraliza a lógica de navegação interna
function navigate(index) {
    updateSectionsVisibility(index);
    changeSection(index);
}

document.querySelectorAll('.nav-links a, .hero-btn').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const sectionsArray = Array.from(document.querySelectorAll('section'));
            const index = sectionsArray.indexOf(targetSection);

            if (index !== -1) {
                // Se for mobile, deixa o navegador rolar naturalmente até a seção
                if (isMobile()) {
                    // Fecha o menu hambúrguer automaticamente ao clicar em um link
                    const menuCheckbox = document.querySelector('.menu-checkbox');
                    if (menuCheckbox) menuCheckbox.checked = false;

                    // Atualiza os estados visuais para quando o usuário chegar lá
                    updateSectionsVisibility(index);
                    currentIdx = index;
                    return; // Permite o comportamento padrão do link (scroll nativo do HTML)
                }

                // Se for desktop, intercepta e executa o efeito premium de slide
                e.preventDefault();
                navigate(index);
            }
        }
    });
});

// ==========================================================================
// MONITOR DE REDIMENSIONAMENTO (CORREÇÃO CRÍTICA DE BUG RESPONSIVO)
// ==========================================================================
window.addEventListener('resize', () => {
    if (isMobile()) {
        // Se mudou para Mobile, limpa os estilos de translação do desktop para libertar o scroll nativo
        if (wrapper) wrapper.style.transform = '';
    } else {
        // Se voltou para Desktop, força o wrapper a alinhar-se milimetricamente na secção onde o utilizador parou
        if (wrapper) {
            wrapper.style.transform = `translateY(-${currentIdx * 100}vh)`;
        }
        // Sincroniza instantaneamente quais elementos devem estar visíveis no desktop
        updateSectionsVisibility(currentIdx);
    }
});

// ==========================================================================
// GERENCIADOR DE ANIMAÇÕES DAS SEÇÕES (SOBRE, TECH, PROJETOS & CONTATO)
// ==========================================================================
function updateSectionsVisibility(activeIndex) {
    const sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
        const title = section.querySelector('h2');
        const categories = section.querySelectorAll('.tech-category-box');

        if (index === activeIndex) {
            section.classList.add('section-visible');
            if (title) title.classList.add('show-line');
            categories.forEach(cat => cat.classList.add('fade-in-up'));
        } else if (index !== 0) {
            section.classList.remove('section-visible');
            if (title) title.classList.remove('show-line');
            categories.forEach(cat => cat.classList.remove('fade-in-up'));
        }
    });
}

// ==========================================================================
// DICIONÁRIO DE TRADUÇÃO (SISTEMA MULTI-IDIOMA)
// ==========================================================================
const translations = {
    'pt-br': {
        'nav-home': 'Início',
        'nav-about': 'Sobre',
        'nav-tech': 'Tecnologias',
        'nav-projects': 'Projetos',
        'nav-contact': 'Contato',
        'hero-title': 'Olá, eu sou Lucas Santos',
        'hero-subtitle': 'Desenvolvedor Backend & Analista de Dados',
        'hero-tagline': '"Transformando dados em soluções eficientes."',
        'hero-btn': 'Download Currículo',
        'about-title': 'Sobre Mim',
        'about-text-1': 'Sou um profissional focado em desenvolvimento Backend e Análise de Dados. Minha paixão é arquitetar soluções robustas e transformar grandes volumes de dados brutos em insights estratégicos que impulsionam decisões eficientes.',
        'about-text-2': 'Com forte base em lógica e otimização de processos, busco constantemente unir a engenharia de software com a inteligência de dados para buildar aplicações escaláveis, seguras e de alto impacto.',
        'tech-title': 'Tecnologias',
        'tech-cat-backend': 'Desenvolvimento Backend',
        'tech-cat-data': 'Análise de Dados',
        'tech-cat-ai': 'Inteligência Artificial',
        'tech-stat': 'Estatística',
        'projects-title': 'Projetos',
        'contact-title': 'Contato',
        'contact-subtitle': 'Vamos conversar!',
        'contact-text': 'Sinta-se à vontade para entrar em contato se tiver uma proposta de projeto, oportunidade de trabalho ou apenas quiser criar uma conexão.',
        'form-name': 'Nome',
        'form-email': 'E-mail',
        'form-message': 'Mensagem',
        'form-placeholder-name': 'Seu nome',
        'form-placeholder-message': 'Sua mensagem...',
        'form-btn': 'Enviar Mensagem'
    },
    'pt-pt': {
        'nav-home': 'Início',
        'nav-about': 'Sobre',
        'nav-tech': 'Tecnologias',
        'nav-projects': 'Projetos',
        'nav-contact': 'Contacto',
        'hero-title': 'Olá, eu sou Lucas Santos',
        'hero-subtitle': 'Desenvolvedor Backend & Analista de Dados',
        'hero-tagline': '"Transformando dados em soluções eficientes."',
        'hero-btn': 'Download Currículo',
        'about-title': 'Sobre Mim',
        'about-text-1': 'Sou um profissional focado em desenvolvimento Backend e Análise de Dados. A minha paixão é arquitetar soluções robustas e transformar grandes volumes de dados brutos em insights estratégicos que impulsionam decisões eficientes.',
        'about-text-2': 'Com forte base em lógica e otimização de processos, procuro constantemente unir a engenharia de software com a inteligência de dados para construir aplicações escaláveis, seguras e de alto impacto.',
        'tech-title': 'Tecnologias',
        'tech-cat-backend': 'Desenvolvimento Backend',
        'tech-cat-data': 'Análise de Dados',
        'tech-cat-ai': 'Inteligência Artificial',
        'tech-stat': 'Estatística',
        'projects-title': 'Projetos',
        'contact-title': 'Contacto',
        'contact-subtitle': 'Vamos conversar!',
        'contact-text': 'Sinta-se à vontade para entrar em contacto se tiver uma proposta de projeto, oportunidade de trabalho ou apenas quiser criar uma ligação.',
        'form-name': 'Nome',
        'form-email': 'E-mail',
        'form-message': 'Mensagem',
        'form-placeholder-name': 'O seu nome',
        'form-placeholder-message': 'A sua mensagem...',
        'form-btn': 'Enviar Mensagem'
    },
    'en': {
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-tech': 'Technologies',
        'nav-projects': 'Projects',
        'nav-contact': 'Contact',
        'hero-title': "Hi, I'm Lucas Santos",
        'hero-subtitle': 'Backend Developer & Data Analyst',
        'hero-tagline': '"Turning data into efficient solutions."',
        'hero-btn': 'Download CV',
        'about-title': 'About Me',
        'about-text-1': "I'm a professional focused on Backend development and Data Analysis. My passion is computing robust solutions and transforming large volumes of raw data into strategic insights that drive efficient decisions.",
        'about-text-2': 'With a strong background in logic and process optimization, I constantly seek to bridge software engineering with data intelligence to build scalable, secure, and high-impact applications.',
        'tech-title': 'Technologies',
        'tech-cat-backend': 'Backend Development',
        'tech-cat-data': 'Data Analysis',
        'tech-cat-ai': 'Artificial Intelligence',
        'tech-stat': 'Statistics',
        'projects-title': 'Projects',
        'contact-title': 'Contact',
        'contact-subtitle': 'Let\'s talk!',
        'contact-text': 'Feel free to reach out if you have a project proposal, job opportunity, or just want to connect.',
        'form-name': 'Name',
        'form-email': 'Email',
        'form-message': 'Message',
        'form-placeholder-name': 'Your name',
        'form-placeholder-message': 'Your message...',
        'form-btn': 'Send Message'
    }
};

// Variável de controle global para saber qual idioma está ativo no momento
let currentLang = 'pt-br';

function changeLanguage(lang) {
    currentLang = lang;

    // 1. Traduz os textos normais com data-i18n
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    elementsToTranslate.forEach(element => {
        const translationKey = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][translationKey]) {
            element.textContent = translations[lang][translationKey];
        }
    });

    // 2. Traduz os placeholders dos inputs com data-i18n-placeholder
    const placeholdersToTranslate = document.querySelectorAll('[data-i18n-placeholder]');
    placeholdersToTranslate.forEach(element => {
        const translationKey = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][translationKey]) {
            element.setAttribute('placeholder', translations[lang][translationKey]);
        }
    });

    // 3. TROCA DINÂMICA DO CURRÍCULO (PT / EN) - DENTRO DO ESCOPO CORRETO
    const cvButton = document.getElementById('cv-btn');
    if (cvButton) {
        if (lang === 'en') {
            // Aponta para o PDF em inglês dentro da pasta assets
            cvButton.setAttribute('href', 'assets/cv-lucas-en.pdf');
        } else {
            // Aponta para o PDF em português dentro da pasta assets
            cvButton.setAttribute('href', 'assets/curriculo-lucas-pt.pdf');
        }
    }
}

// ==========================================================================
// VALIDAÇÃO AVANÇADA E INTEGRAÇÃO SEGURA COM FORMSUBMIT
// ==========================================================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nextInput = document.getElementById('hidden-next');

        // Expressão Regular para validar o formato do e-mail
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isEnglish = (currentLang === 'en');

        // 1. Validação do Nome (Mínimo 3 caracteres reais)
        if (nameInput.value.trim().length < 3) {
            e.preventDefault(); // Bloqueia o envio
            alert(isEnglish ? 'Please enter your full name.' : 'Por favor, insira seu nome completo.');
            nameInput.focus();
            return;
        }

        // 2. Validação estrutural do E-mail
        if (!emailRegex.test(emailInput.value.trim())) {
            e.preventDefault(); // Bloqueia o envio
            alert(isEnglish ? 'Please enter a valid email address.' : 'Por favor, insira um endereço de e-mail válido.');
            emailInput.focus();
            return;
        }

        // 3. Validação da Mensagem (Mínimo 10 caracteres)
        if (messageInput.value.trim().length < 10) {
            e.preventDefault(); // Bloqueia o envio
            alert(isEnglish
                ? 'Your message is too short. Please write at least 10 characters.'
                : 'Sua mensagem está muito curta. Por favor, escreva pelo menos 10 caracteres.');
            messageInput.focus();
            return;
        }

        // ==========================================================================
        // INJEÇÃO DE SEGURANÇA E IDIOMA ANTES DO ENVIO
        // ==========================================================================
        if (nextInput) {
            // Substitua pela URL final onde o seu site vai ficar hospedado online
            const urlBase = "https://lucas-s-dev.github.io/thanks.html";

            // Se estiver em inglês, injeta a query string na URL de redirecionamento
            nextInput.value = isEnglish ? `${urlBase}?lang=en` : urlBase;
        }

        // AVISO: Não colocamos e.preventDefault() aqui no final. 
        // Se o código passar por todas as validações acima, o formulário é enviado nativamente para o FormSubmit!
    });
}

// ==========================================================================
// INICIALIZAÇÃO UNIFICADA (DOM ContentLoaded)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const langSelector = document.querySelector('.lang-selector');
    const langBtn = document.getElementById('langBtn');
    const langOptions = document.querySelectorAll('.lang-option');
    const btnText = langBtn ? langBtn.querySelector('span') : null;

    if (langBtn && langSelector) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langSelector.classList.toggle('open');
            const isOpen = langSelector.classList.contains('open');
            langBtn.setAttribute('aria-expanded', isOpen);
        });

        langOptions.forEach(option => {
            option.addEventListener('click', () => {
                const selectedLang = option.getAttribute('data-value');
                if (btnText) btnText.textContent = option.textContent;

                langOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');

                langSelector.classList.remove('open');
                langBtn.setAttribute('aria-expanded', 'false');

                changeLanguage(selectedLang);
            });
        });

        document.addEventListener('click', () => {
            langSelector.classList.remove('open');
            langBtn.setAttribute('aria-expanded', 'false');
        });
    }

    // ATUALIZAÇÃO SÉRIA: O IntersectionObserver passa a escutar sempre. 
    // Ele deteta onde o utilizador está no telemóvel, mas não interfere com o Desktop.
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        threshold: 0.4 // Ativa quando 40% da seção estiver visível no ecrã
    };

    const mobileObserver = new IntersectionObserver((entries) => {
        if (!isMobile()) return; // Se estiver no desktop, o observer fica em standby e não mexe em nada

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionsArray = Array.from(sections);
                const index = sectionsArray.indexOf(entry.target);
                updateSectionsVisibility(index);
                currentIdx = index; // Guarda a posição exata caso o utilizador vire o ecrã para Desktop
            }
        });
    }, observerOptions);

    sections.forEach(sec => mobileObserver.observe(sec));

    // Inicialização padrão dos estados de animação base do site
    if (!isMobile()) {
        const inicioSecao = document.querySelector('#inicio');
        if (inicioSecao) inicioSecao.classList.add('section-visible');
    } else {
        // Se carregar direto no mobile, garante que a primeira seção está ativa
        updateSectionsVisibility(0);
    }
});
