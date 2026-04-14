/**
 * Комплекс Реутского 2.0 — лендинг v1
 * Скрипт для базового интерактива CTA
 */

document.addEventListener('DOMContentLoaded', function() {
    // CTA button handlers
    const ctaButtons = document.querySelectorAll('.button-primary');
    
    ctaButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            // Prevent default only for hash links that need handling
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                handleCTAClick(this);
            }
        });
    });
    
    /**
     * Handle CTA click
     * In production, this would open a modal or navigate to a contact form
     */
    function handleCTAClick(button) {
        // For now, just log the action
        console.log('CTA clicked:', button.textContent.trim());
        
        // Show loading state
        const originalText = button.textContent;
        button.classList.add('loading');
        button.textContent = 'загрузка...';
        button.disabled = true;
        
        // Simulate async action (in production, this would be a real request)
        setTimeout(function() {
            button.classList.remove('loading');
            button.textContent = originalText;
            button.disabled = false;
            
            // In production: open modal or redirect
            alert('CTA активирован: обсудить проект / получить презентацию');
        }, 500);
    }
    
    /**
     * Smooth scroll for anchor links
     */
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '#contact') {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

