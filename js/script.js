// Inicjalizacja AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Inicjalizacja animacji AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out-back',
        once: false,
        mirror: true
    });
    
    // Obsługa menu mobilnego
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    // Dodajemy backdrop do body (jeśli nie istnieje)
    let menuBackdrop = document.getElementById('menuBackdrop');
    if (!menuBackdrop) {
        menuBackdrop = document.createElement('div');
        menuBackdrop.id = 'menuBackdrop';
        menuBackdrop.style.display = 'none';
        document.body.appendChild(menuBackdrop);
    }
    
    function openMobileMenu() {
        menuToggle.classList.add('active');
        navLinks.classList.add('active');
        document.body.classList.add('menu-open');
        menuBackdrop.style.display = 'block';
        menuBackdrop.style.position = 'fixed';
        menuBackdrop.style.top = '0';
        menuBackdrop.style.left = '0';
        menuBackdrop.style.width = '100vw';
        menuBackdrop.style.height = '100vh';
        menuBackdrop.style.background = 'rgba(0,0,0,0.25)';
        menuBackdrop.style.zIndex = '9998';
    }
    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuBackdrop.style.display = 'none';
    }
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }
    menuBackdrop.addEventListener('click', closeMobileMenu);
    
    // Zamykanie menu po kliknięciu w link
    const mobileLinks = document.querySelectorAll('.nav-links .nav-link, .nav-links .cta-nav');
    
    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuBackdrop.style.display = 'none';
    }
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Zamykanie menu przy zmianie rozmiaru okna (np. obrót telefonu, powrót do desktopu)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Obsługa FAQ - rozwijanie/zwijanie odpowiedzi
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Zamknij wszystkie inne elementy FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Przełącz stan aktywny dla klikniętego elementu
            item.classList.toggle('active');
        });
    });
    
    // Obsługa przełączania zakładek w sekcji korzyści
    // Obsługa przełączania zakładek w sekcji korzyści
    const korzysciTabs = document.querySelector('.benefits-tabs');
    if (korzysciTabs) {
        const tabBtns = korzysciTabs.querySelectorAll('.tab-btn');
        const tabPanels = korzysciTabs.querySelectorAll('.tab-panel');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                const targetPanel = document.getElementById(tabId + '-panel');
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    // Obsługa przełączania tabów w sekcji "solution"
    const solutionTabs = document.querySelector('.solution-tabs');
    if (solutionTabs) {
        const tabBtns = solutionTabs.querySelectorAll('.tab-btn');
        const tabPanels = solutionTabs.querySelectorAll('.tab-panel');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                const targetPanel = document.getElementById(tabId + '-panel');
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }
    
    // Obsługa formularza kontaktowego
    const contactForm = document.getElementById('contactForm');

    // Obsługa dynamicznego dodawania lokalizacji
    const locationsContainer = document.getElementById('locations-container');
    const addLocationBtn = document.getElementById('add-location-btn');
    let locationCount = 1;
    if (addLocationBtn && locationsContainer) {
        addLocationBtn.addEventListener('click', function() {
            locationCount++;
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.id = `location-${locationCount}`;
            newInput.name = 'locations[]';
            newInput.className = 'form-input';
            newInput.placeholder = `Wpisz lokalizację (np. Warszawa, ul. Przykładowa 1)`;
            newInput.style.marginTop = '10px';
            locationsContainer.appendChild(newInput);
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Tutaj można dodać walidację formularza i wysyłkę danych
            // Dla przykładu pokazujemy komunikat o sukcesie
            alert('Dziękujemy za przesłanie formularza! Skontaktujemy się z Tobą wkrótce.');
            contactForm.reset();
        });
    }
    
    // Efekt przyklejania menu przy przewijaniu
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Aktywacja linków nawigacyjnych podczas przewijania
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        let found = false;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; 
            const sectionHeight = section.offsetHeight;
            if (!found && window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
                found = true;
            }
        });
        navItems.forEach(item => {
            item.classList.remove('active');
            if (current && item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
});

// Funkcja przewijania do sekcji kontaktowej
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}