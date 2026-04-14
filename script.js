/**
 * Комплекс Реутского 2.0 — Apple-Style Landing Page
 * Скрипт для Before/After слайдера, навигации и анимаций
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // BEFORE/AFTER SLIDER
    // ========================================
    
    const compareContainer = document.getElementById('compareContainer');
    const compareDivider = document.getElementById('compareDivider');
    const compareBeforeLayer = compareContainer.querySelector('.compare-before');
    
    if (compareContainer && compareDivider && compareBeforeLayer) {
        let isDragging = false;
        
        // Update slider position
        function updateSliderPosition(clientX) {
            const rect = compareContainer.getBoundingClientRect();
            let x = clientX - rect.left;
            
            // Constrain to container bounds
            x = Math.max(0, Math.min(x, rect.width));
            
            // Calculate percentage
            const percentage = (x / rect.width) * 100;
            
            // Update clip-path for before layer
            compareBeforeLayer.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            
            // Update divider position
            compareDivider.style.left = `${percentage}%`;
        }
        
        // Mouse events
        compareContainer.addEventListener('mousedown', function(e) {
            isDragging = true;
            compareContainer.style.cursor = 'ew-resize';
            updateSliderPosition(e.clientX);
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
            updateSliderPosition(e.clientX);
        });
        
        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                compareContainer.style.cursor = 'ew-resize';
            }
        });
        
        // Touch events
        compareContainer.addEventListener('touchstart', function(e) {
            isDragging = true;
            updateSliderPosition(e.touches[0].clientX);
        }, { passive: true });
        
        document.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            updateSliderPosition(e.touches[0].clientX);
        }, { passive: true });
        
        document.addEventListener('touchend', function() {
            isDragging = false;
        });
        
        // Click to jump
        compareContainer.addEventListener('click', function(e) {
            updateSliderPosition(e.clientX);
        });
    }
    
    // ========================================
    // NAVIGATION SCROLL EFFECT
    // ========================================
    
    const nav = document.getElementById('nav');
    const heroSection = document.getElementById('hero');
    
    if (nav && heroSection) {
        function updateNavScroll() {
            const scrollY = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            
            if (scrollY > 100) {
                nav.classList.add('scrolled');
                heroSection.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
                heroSection.classList.remove('scrolled');
            }
        }
        
        window.addEventListener('scroll', updateNavScroll, { passive: true });
        updateNavScroll(); // Initial check
    }
    
    // ========================================
    // FADE-IN ANIMATION ON SCROLL
    // ========================================
    
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        fadeElements.forEach(el => observer.observe(el));
    }
    
    // ========================================
    // SMOOTH SCROLL FOR HERO CTA
    // ========================================
    
    const heroCta = document.querySelector('.cta-group-hero a[href="#contact"]');
    if (heroCta) {
        heroCta.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector('#contact');
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // ========================================
    // FINAL CTA BUTTON HANDLER
    // ========================================
    
    const ctaFinal = document.getElementById('cta-final');
    if (ctaFinal) {
        ctaFinal.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Prevent multiple clicks
            if (this.classList.contains('loading')) {
                return;
            }

            // Show loading state
            const originalText = this.textContent;
            this.classList.add('loading');
            this.textContent = 'загрузка...';
            this.disabled = true;

            // Simulate async action, then show success message
            setTimeout(() => {
                ctaFinal.classList.remove('loading');
                ctaFinal.textContent = 'Спасибо, мы свяжемся с вами';
                ctaFinal.disabled = false;
            }, 800);
        });
    }
});
