/* ============================================================
   YASHWANT W. MAHAJAN — Cinematic Video Editor Portfolio
   Award-Winning Interactive JavaScript — Netflix-Level Effects
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Add loading class
    document.body.classList.add('loading');

    // ==================== CINEMATIC LOADER ====================
    const loader = document.getElementById('cinematic-loader');

    const hideLoader = () => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
    };

    setTimeout(hideLoader, 3000);

    // ==================== PARTICLE SYSTEM (Enhanced) ====================
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = -1000;
    let mouseY = -1000;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse for interactive particles
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.8 + 0.3;
            this.baseSpeedX = (Math.random() - 0.5) * 0.2;
            this.baseSpeedY = (Math.random() - 0.5) * 0.2;
            this.speedX = this.baseSpeedX;
            this.speedY = this.baseSpeedY;
            this.opacity = Math.random() * 0.35 + 0.05;
            this.baseOpacity = this.opacity;
            this.opacityDir = Math.random() > 0.5 ? 1 : -1;

            const colors = [
                'rgba(124, 106, 239,',
                'rgba(0, 229, 255,',
                'rgba(212, 168, 83,',
                'rgba(255, 255, 255,',
            ];
            const weights = [0.35, 0.25, 0.15, 0.25];
            let r = Math.random();
            let sum = 0;
            for (let i = 0; i < weights.length; i++) {
                sum += weights[i];
                if (r <= sum) { this.color = colors[i]; break; }
            }
        }

        update() {
            // Mouse interaction — particles gently move away from cursor
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                const force = (150 - dist) / 150;
                this.speedX = this.baseSpeedX + (dx / dist) * force * 0.5;
                this.speedY = this.baseSpeedY + (dy / dist) * force * 0.5;
                this.opacity = Math.min(this.baseOpacity + force * 0.3, 0.7);
            } else {
                this.speedX += (this.baseSpeedX - this.speedX) * 0.02;
                this.speedY += (this.baseSpeedY - this.speedY) * 0.02;
                this.opacity += (this.baseOpacity - this.opacity) * 0.02;
            }

            this.x += this.speedX;
            this.y += this.speedY;

            // Subtle twinkle
            this.opacity += this.opacityDir * 0.002;
            if (this.opacity >= this.baseOpacity + 0.15) this.opacityDir = -1;
            if (this.opacity <= this.baseOpacity * 0.5) this.opacityDir = 1;

            // Wrap around
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;
            if (this.y < -10) this.y = canvas.height + 10;
            if (this.y > canvas.height + 10) this.y = -10;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `${this.color} ${this.opacity})`;
            ctx.fill();

            // Glow for larger particles
            if (this.size > 1) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
                ctx.fillStyle = `${this.color} ${this.opacity * 0.1})`;
                ctx.fill();
            }
        }
    }

    function initParticles() {
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 100);
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Connection lines (subtle, fewer)
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    const opacity = (1 - dist / 100) * 0.06;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(124, 106, 239, ${opacity})`;
                    ctx.lineWidth = 0.4;
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initParticles, 300);
    });

    // ==================== NAVBAR ====================
    const navbar = document.getElementById('main-nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const allNavLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ==================== SCROLL ANIMATIONS ====================
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger animations for children
                const children = entry.target.querySelectorAll('.skill-card, .tool-card, .project-card, .counter-card');
                children.forEach((child, i) => {
                    child.style.transitionDelay = `${i * 0.08}s`;
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        child.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, 100 + i * 80);
                });

                entry.target.classList.add('animated');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));

    // ==================== ANIMATED COUNTERS ====================
    const counterNumbers = document.querySelectorAll('.counter-number[data-target]');

    function animateCounter(el) {
        const target = parseInt(el.dataset.target);
        const duration = 2200;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const value = Math.floor(eased * target);

            el.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterNumbers.forEach(el => counterObserver.observe(el));

    // ==================== SKILL BARS ====================
    const skillBars = document.querySelectorAll('.skill-bar-fill, .tool-bar-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    const width = entry.target.dataset.width;
                    entry.target.style.width = `${width}%`;
                }, 200);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ==================== PORTFOLIO FILTERS ====================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach((card, index) => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(25px) scale(0.97)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, index * 60);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    // ==================== VIDEO MODAL ====================
    const videoModal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const modalIframe = document.getElementById('modal-iframe');
    const modalTitle = document.getElementById('modal-title');
    const modalClose = document.getElementById('modal-close');
    const modalBackdrop = videoModal.querySelector('.modal-backdrop');

    const playButtons = document.querySelectorAll('.project-play-btn');

    playButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const videoSrc = btn.dataset.video;
            const title = btn.dataset.title;

            modalTitle.textContent = title;
            
            if (videoSrc.includes('youtube.com')) {
                modalVideo.style.display = 'none';
                if (modalIframe) {
                    modalIframe.style.display = 'block';
                    modalIframe.src = videoSrc + (videoSrc.includes('?') ? '&' : '?') + 'autoplay=1';
                }
            } else {
                if (modalIframe) modalIframe.style.display = 'none';
                modalVideo.style.display = 'block';
                modalVideo.src = videoSrc;
                setTimeout(() => modalVideo.play(), 400);
            }
            
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = '';
        if (modalIframe) modalIframe.src = '';
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ==================== PROJECT VIDEO HOVER ====================
    const projectThumbnails = document.querySelectorAll('.project-thumbnail');

    projectThumbnails.forEach(thumb => {
        const video = thumb.querySelector('.project-video-thumb');
        if (!video) return;

        video.addEventListener('loadeddata', () => {
            if (video.tagName === 'VIDEO') {
                video.currentTime = 1;
            }
        });

        thumb.addEventListener('mouseenter', () => {
            if (video.tagName === 'VIDEO') {
                video.currentTime = 0;
                video.play().catch(() => {});
            }
        });

        thumb.addEventListener('mouseleave', () => {
            if (video.tagName === 'VIDEO') {
                video.pause();
                video.currentTime = 1;
            }
        });
    });

    // ==================== SHOWREEL ====================
    const showreelVideo = document.getElementById('showreel-video');
    const showreelOverlay = document.getElementById('showreel-play-overlay');
    const showreelIframe = document.getElementById('showreel-iframe');

    if (showreelOverlay) {
        showreelOverlay.addEventListener('click', () => {
            showreelOverlay.classList.add('hidden');
            if (showreelVideo) showreelVideo.play();
            if (showreelIframe) {
                const currentSrc = showreelIframe.src;
                if (!currentSrc.includes('autoplay=1')) {
                    showreelIframe.src = currentSrc + (currentSrc.includes('?') ? '&' : '?') + 'autoplay=1';
                }
            }
        });

        if (showreelVideo) {
            showreelVideo.addEventListener('ended', () => {
                showreelOverlay.classList.remove('hidden');
            });
        }
    }

    // ==================== TESTIMONIALS CAROUSEL ====================
    const carouselTrack = document.getElementById('carousel-track');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    const carouselDotsContainer = document.getElementById('carousel-dots');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    let currentSlide = 0;
    let slidesPerView = 3;
    let autoPlayInterval;

    function getVisibleSlides() {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    }

    function getTotalSlides() {
        return Math.max(1, testimonialCards.length - slidesPerView + 1);
    }

    function updateCarousel() {
        slidesPerView = getVisibleSlides();
        const totalSlides = getTotalSlides();

        if (currentSlide >= totalSlides) {
            currentSlide = totalSlides - 1;
        }

        const cardWidth = 100 / slidesPerView;
        const translateX = -(currentSlide * cardWidth);
        carouselTrack.style.transform = `translateX(${translateX}%)`;

        updateDots();
    }

    function createDots() {
        carouselDotsContainer.innerHTML = '';
        const totalSlides = getTotalSlides();

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (i === currentSlide) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateCarousel();
                resetAutoPlay();
            });
            carouselDotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = carouselDotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        const totalSlides = getTotalSlides();
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        const totalSlides = getTotalSlides();
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    carouselNext.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
    carouselPrev.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4500);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Touch support
    let touchStartX = 0;
    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
            resetAutoPlay();
        }
    }, { passive: true });

    createDots();
    updateCarousel();
    startAutoPlay();

    window.addEventListener('resize', () => {
        createDots();
        updateCarousel();
    });

    // ==================== CONTACT FORM (WhatsApp) ====================
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;

        const whatsappMessage = `Hi, I'm *${name}*%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
        const whatsappUrl = `https://wa.me/918554826448?text=${whatsappMessage}`;

        const submitBtn = document.getElementById('form-submit');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.querySelector('.btn-text').textContent = 'Opening WhatsApp... ✓';
        submitBtn.style.pointerEvents = 'none';

        window.open(whatsappUrl, '_blank');

        setTimeout(() => {
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.style.pointerEvents = '';
            contactForm.reset();
        }, 3000);
    });

    // ==================== SMOOTH SCROLL ====================
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

    // ==================== MAGNETIC BUTTONS ====================
    if (window.matchMedia('(min-width: 768px)').matches) {
        const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .social-link, .carousel-btn');

        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ==================== CURSOR GLOW ====================
    if (window.matchMedia('(min-width: 768px) and (hover: hover)').matches) {
        const cursorGlow = document.createElement('div');
        cursorGlow.style.cssText = `
            position: fixed;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(124, 106, 239, 0.045) 0%, transparent 65%);
            pointer-events: none;
            z-index: 1;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(cursorGlow);

        let cursorX = 0, cursorY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        // Smooth follow with lerp
        function updateCursorGlow() {
            glowX += (cursorX - glowX) * 0.08;
            glowY += (cursorY - glowY) * 0.08;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(updateCursorGlow);
        }

        updateCursorGlow();
    }

    // ==================== PARALLAX ON SCROLL ====================
    const heroContent = document.querySelector('.hero-content');
    const heroFlare = document.querySelector('.hero-anamorphic-flare');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Hero parallax
        if (heroContent && scrollY < window.innerHeight) {
            const progress = scrollY / window.innerHeight;
            heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
            heroContent.style.opacity = 1 - progress * 1.2;
        }

        // Flare parallax
        if (heroFlare && scrollY < window.innerHeight) {
            heroFlare.style.transform = `translateY(${scrollY * -0.1}px)`;
        }
    });
});
