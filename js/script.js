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
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                document.body.classList.add('menu-open');
            } else {
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Zamykanie menu po kliknięciu w link
    const mobileLinks = document.querySelectorAll('.nav-links .nav-link, .nav-links .cta-nav');
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
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
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Usuń klasę active ze wszystkich przycisków i paneli
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Dodaj klasę active do klikniętego przycisku
            this.classList.add('active');
            
            // Aktywuj odpowiedni panel
            const tabId = this.getAttribute('data-tab');
            const targetPanel = document.getElementById(tabId + '-panel');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
    
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