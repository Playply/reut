/**
 * Комплекс Реутского 2.0 — лендинг v1
 * Скрипт для базового интерактива CTA
 */

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for hero CTA to #contact
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

    // Final CTA button handler - replace text without reload or alert
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
            setTimeout(function() {
                ctaFinal.classList.remove('loading');
                ctaFinal.textContent = 'Спасибо, мы свяжемся с вами';
                ctaFinal.disabled = false;
            }, 800);
        });
    }
});

