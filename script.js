document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Obtiene el tema guardado en localStorage
    let savedTheme = localStorage.getItem('theme');

    // Si no hay un tema guardado, establecer el tema por defecto (dark)
    if (!savedTheme) {
        savedTheme = 'dark';
        localStorage.setItem('theme', savedTheme);
    }

    // Aplica el tema guardado
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.classList.remove('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Función para cambiar el tema
    function toggleTheme() {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        themeToggle.innerHTML = `<i class="fas ${isLight ? 'fa-moon' : 'fa-sun'}"></i>`;
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    // Asegurar que solo un evento de clic está registrado
    if (themeToggle) {
        themeToggle.removeEventListener('click', toggleTheme); // Previene múltiples eventos
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Language Toggle
    const langToggle = document.getElementById('lang-toggle');
    const elements = document.querySelectorAll('[data-en], [data-es]');
    
    function toggleLanguage() {
        const currentLang = body.getAttribute('data-lang') || 'en';
        const newLang = currentLang === 'en' ? 'es' : 'en';
        
        body.setAttribute('data-lang', newLang);
        if (langToggle) {
            langToggle.textContent = (newLang === 'en' ? 'ES' : 'EN');
        }
        
        elements.forEach(element => {
            const text = element.getAttribute(`data-${newLang}`);
            if (text) {
                if (element.tagName.toLowerCase() === 'input' || 
                    element.tagName.toLowerCase() === 'textarea') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });
        
        localStorage.setItem('lang', newLang);
    }

    // Set initial language
    const savedLang = localStorage.getItem('lang') || 'en';
    body.setAttribute('data-lang', savedLang);
    if (langToggle) {
        langToggle.textContent = (savedLang === 'en' ? 'ES' : 'EN');
    }
    
    if (savedLang === 'es') {
        elements.forEach(element => {
            const text = element.getAttribute('data-es');
            if (text) {
                if (element.tagName.toLowerCase() === 'input' || 
                    element.tagName.toLowerCase() === 'textarea') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }

    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }

    // Timeline Navigation
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    function updateTimelineProgress() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - windowHeight * 0.3;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navItems.forEach(item => item.classList.remove('active'));
                navItems[index].classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateTimelineProgress);
    updateTimelineProgress();

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if it's open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent document click from immediately closing the menu
            mobileMenu.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target) && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Prevent clicks inside the menu from closing it
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Close menu when a menu item is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
});
