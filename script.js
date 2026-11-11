// Плавное появление элементов при скролле
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Плавная прокрутка к якорям (если добавите навигацию)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Анимация карточек навыков при наведении
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s, box-shadow 0.3s';
        });
    });
    
    // Добавление эффекта параллакса для шапки
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const header = document.querySelector('.header');
                if (header && scrolled < 600) {
                    header.style.transform = `translateY(${scrolled * 0.3}px)`;
                    header.style.opacity = 1 - (scrolled / 600);
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Кнопка "Наверх"
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
    `;
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'scale(1)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'scale(0.8)';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Анимация счетчиков (если нужно добавить статистику)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Печать резюме
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '🖨️ Печать';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        padding: 12px 24px;
        background: #2d3748;
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        transition: transform 0.3s;
    `;
    document.body.appendChild(printBtn);
    
    printBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    printBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Стили для печати
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
        @media print {
            body {
                background: white;
                padding: 0;
            }
            .container {
                box-shadow: none;
                max-width: 100%;
            }
            .scroll-to-top,
            button[style*="position: fixed"] {
                display: none !important;
            }
            .section {
                page-break-inside: avoid;
            }
            .skill-card,
            .certificate-card {
                break-inside: avoid;
            }
        }
    `;
    document.head.appendChild(printStyles);
});

// Отслеживание кликов по контактам (аналитика)
document.querySelectorAll('.contact-item a').forEach(link => {
    link.addEventListener('click', function(e) {
        console.log('Контакт использован:', this.textContent);
        // Здесь можно добавить отправку данных в аналитику
    });
});

// Эффект печатной машинки для заголовка (опционально)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Раскомментируйте, если хотите анимацию заголовка:
// const nameElement = document.querySelector('.name');
// if (nameElement) {
//     typeWriter(nameElement, 'ИРАИДА ДЕНИСОВНА МОТОВА', 100);
// }