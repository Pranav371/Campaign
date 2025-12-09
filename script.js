/* ========================================
   SARPANCH ELECTION CAMPAIGN WEBSITE
   JavaScript - Interactivity & Animations
   ======================================== */

// ========================================
// CONFIGURATION
// ========================================
const CONFIG = {
    // Campaign details - REPLACE THESE VALUES
    candidateName: '[అభ్యర్థి పేరు]',
    wardNumber: '[X]',
    villageName: '[గ్రామం పేరు]',
    electionDate: 'డిసెంబర్ [11/14/17], 2025',
    websiteUrl: window.location.href,

    // WhatsApp message template (Telugu)
    whatsappMessage: `🗳️ *సర్పంచ్ ఎన్నికలు 2025*

మన గ్రామ అభివృద్ధికి ఓటు వేద్దాం!

✅ అభ్యర్థి: [అభ్యర్థి పేరు]
🏺 గుర్తు: [గుర్తు పేరు]
📅 పోలింగ్ తేదీ: డిసెంబర్ [11/14/17], 2025
⏰ సమయం: ఉదయం 7:00 - మధ్యాహ్నం 1:00

📋 గమనించండి:
• పింక్ బ్యాలెట్ = సర్పంచ్
• తెలుపు బ్యాలెట్ = వార్డు మెంబర్

🔗 మరిన్ని వివరాలకు: `,
};

// ========================================
// DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initWhatsAppShare();
    initVideoPlaceholder();
    initSmoothScroll();
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for elements that come into view together
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// WHATSAPP SHARE FUNCTIONALITY
// ========================================
function initWhatsAppShare() {
    const whatsappButtons = document.querySelectorAll('#whatsapp-share, #floating-whatsapp');

    whatsappButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            shareOnWhatsApp();
        });
    });
}

function shareOnWhatsApp() {
    // Construct the message with website URL
    const message = CONFIG.whatsappMessage + CONFIG.websiteUrl;

    // Encode for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL (works on mobile and desktop)
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    // Open in new window/tab
    window.open(whatsappUrl, '_blank');

    // Track share event (if analytics is enabled)
    trackEvent('share', 'whatsapp', 'campaign_page');
}

// ========================================
// VIDEO PLACEHOLDER
// ========================================
function initVideoPlaceholder() {
    const videoPlaceholder = document.querySelector('.video-placeholder');

    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', () => {
            // Replace with actual video embed URL when available
            const videoUrl = null; // Set your video URL here

            if (videoUrl) {
                // Replace placeholder with video iframe
                const container = videoPlaceholder.parentElement;
                container.innerHTML = `
                    <iframe 
                        src="${videoUrl}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                        style="width: 100%; aspect-ratio: 16/9;">
                    </iframe>
                `;
            } else {
                // Show message that video is coming soon
                alert('వీడియో త్వరలో అందుబాటులో ఉంటుంది!');
            }
        });
    }
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// ANALYTICS HELPER (Optional)
// ========================================
function trackEvent(action, category, label) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }

    // Console log for debugging
    console.log(`📊 Event tracked: ${action} | ${category} | ${label}`);
}

// ========================================
// UTILITIES
// ========================================

// Detect if user is on mobile
function isMobile() {
    return window.innerWidth < 768;
}

// Format date for display (if needed)
function formatDateTelugu(dateString) {
    const months = [
        'జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్',
        'జులై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్', 'డిసెంబర్'
    ];
    const date = new Date(dateString);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// ========================================
// COUNTDOWN TIMER (Optional Feature)
// ========================================
function initCountdownTimer(targetDate) {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    const target = new Date(targetDate).getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const diff = target - now;

        if (diff < 0) {
            countdownElement.innerHTML = 'ఎన్నికలు ముగిశాయి';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        countdownElement.innerHTML = `${days} రోజులు, ${hours} గంటలు మిగిలి ఉన్నాయి`;
    };

    updateCountdown();
    setInterval(updateCountdown, 1000 * 60); // Update every minute
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// ERROR HANDLING
// ========================================
window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.error('Error: ', msg, '\nURL: ', url, '\nLine: ', lineNo);
    return false;
};
