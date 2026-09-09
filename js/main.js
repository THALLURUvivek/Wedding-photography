/* ============================================
   ETERNITY STUDIO — Main JavaScript
   GSAP Animations & Interactive Features
   ============================================ */

(function () {
    'use strict';

    // --- Register GSAP Plugins ---
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // --- Preloader ---
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        const tl = gsap.timeline();
        tl.to(preloader, {
            opacity: 0,
            duration: 0.8,
            delay: 1.5,
            ease: 'power2.inOut',
            onComplete: function () {
                preloader.style.display = 'none';
                document.body.style.overflow = '';
                if (isHomePage) {
                    initHeroAnimations();
                } else {
                    initPageHeroAnimation();
                }
            }
        });
    }

    // --- Page Hero Animation (Inner Pages) ---
    function initPageHeroAnimation() {
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        heroTl
            .from('.page-hero-title', { opacity: 0, y: 50, duration: 1 })
            .from('.page-hero-subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.5')
            .from('.breadcrumb-nav', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
            .from('.page-hero .section-tag', { opacity: 0, y: 20, duration: 0.6 }, '-=0.8');
    }

    // --- Hero Animations ---
    function initHeroAnimations() {
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        heroTl
            .from('.hero-badge span', {
                opacity: 0,
                y: 30,
                duration: 0.8,
            })
            .from('.title-line', {
                opacity: 0,
                y: 80,
                rotationX: 40,
                stagger: 0.15,
                duration: 1,
            }, '-=0.4')
            .from('.hero-subtitle', {
                opacity: 0,
                y: 30,
                duration: 0.8,
            }, '-=0.5')
            .from('.hero-cta', {
                opacity: 0,
                y: 30,
                duration: 0.8,
            }, '-=0.4')
            .from('.hero-scroll-indicator', {
                opacity: 0,
                y: 20,
                duration: 0.6,
            }, '-=0.3');
    }

    // --- Hero Background Slideshow ---
    function initHeroSlideshow() {
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length < 2) return;

        let currentSlide = 0;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, 6000);
    }

    // --- Particle Effect in Hero ---
    function initParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;

        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(201, 169, 110, ${Math.random() * 0.4 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            container.appendChild(particle);

            gsap.to(particle, {
                y: -200 - Math.random() * 300,
                x: (Math.random() - 0.5) * 100,
                opacity: 0,
                duration: 4 + Math.random() * 4,
                delay: Math.random() * 4,
                repeat: -1,
                ease: 'none',
            });
        }
    }

    // --- Navbar Scroll Effect ---
    function initNavbar() {
        const nav = document.getElementById('mainNav');
        if (!nav) return;

        const handleScroll = function () {
            if (window.scrollY > 80) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        const navLinks = document.querySelectorAll('.nav-link');

        // On home page: active link based on scroll position
        if (isHomePage) {
            const sections = document.querySelectorAll('section[id]');
            window.addEventListener('scroll', function () {
                let current = '';
                sections.forEach(function (section) {
                    const sectionTop = section.offsetTop - 120;
                    if (window.scrollY >= sectionTop) {
                        current = section.getAttribute('id');
                    }
                });
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });
            }, { passive: true });
        }

        // Smooth scroll for anchor links / navigate for page links
        navLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                // Close mobile menu
                const navbarCollapse = document.getElementById('navbarNav');
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();

                // If it's an anchor link on the same page
                if (href && href.startsWith('#') && isHomePage) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        gsap.to(window, {
                            duration: 1.2,
                            scrollTo: { y: target, offsetY: 80 },
                            ease: 'power3.inOut',
                        });
                    }
                }
                // Otherwise let the browser navigate to the new page
            });
        });
    }

    // --- Scroll Reveal Animations ---
    function initScrollAnimations() {
        // Reveal up elements
        const revealElements = document.querySelectorAll('.reveal-up');
        revealElements.forEach(function (el) {
            const delay = parseFloat(el.dataset.delay) || 0;

            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    end: 'top 60%',
                    toggleActions: 'play none none none',
                },
                opacity: 1,
                y: 0,
                duration: 0.9,
                delay: delay,
                ease: 'power3.out',
            });
        });

        // Parallax on about images
        gsap.to('.about-img-main img', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
            y: -40,
            ease: 'none',
        });

        gsap.to('.about-img-accent img', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
            y: -25,
            ease: 'none',
        });

        // Parallax on quote background
        gsap.to('.quote-bg', {
            scrollTrigger: {
                trigger: '.quote-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
            y: -80,
            ease: 'none',
        });
    }

    // --- Counter Animation ---
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        counters.forEach(function (counter) {
            const target = parseInt(counter.dataset.count);

            ScrollTrigger.create({
                trigger: counter,
                start: 'top 85%',
                once: true,
                onEnter: function () {
                    gsap.to(counter, {
                        duration: 2,
                        ease: 'power2.out',
                        onUpdate: function () {
                            const progress = this.progress();
                            counter.textContent = Math.round(target * progress);
                        },
                    });
                },
            });
        });
    }

    // --- Portfolio Filter ---
    function initPortfolioFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const items = document.querySelectorAll('.portfolio-item');
        const grid = document.querySelector('.portfolio-grid');

        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const filter = this.dataset.filter;

                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');

                items.forEach(function (item) {
                    const category = item.dataset.category;
                    if (filter === 'all' || category === filter) {
                        gsap.to(item, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.4,
                            ease: 'power2.out',
                            onStart: function () {
                                item.classList.remove('hidden');
                                item.style.position = 'relative';
                                item.style.pointerEvents = 'auto';
                            }
                        });
                    } else {
                        gsap.to(item, {
                            opacity: 0,
                            scale: 0.8,
                            duration: 0.3,
                            ease: 'power2.in',
                            onComplete: function () {
                                item.classList.add('hidden');
                            }
                        });
                    }
                });
            });
        });
    }

    // --- Portfolio Modal ---
    function initPortfolioModal() {
        const expandBtns = document.querySelectorAll('.portfolio-expand');
        const modalImg = document.getElementById('portfolioModalImg');
        const modalTitle = document.getElementById('portfolioModalLabel');

        expandBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const imgSrc = this.dataset.img;
                const title = this.dataset.title;
                if (modalImg) modalImg.src = imgSrc;
                if (modalTitle) modalTitle.textContent = title;
            });
        });
    }

    // --- Testimonial Slider ---
    function initTestimonials() {
        const cards = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        const dotsContainer = document.querySelector('.testimonial-dots');

        if (cards.length === 0) return;

        let currentIndex = 0;

        // Create dots
        cards.forEach(function (_, i) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', function () { goToSlide(i); });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        function goToSlide(index) {
            cards[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');

            currentIndex = index;

            cards[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');

            gsap.from(cards[currentIndex], {
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: 'power3.out',
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                goToSlide((currentIndex + 1) % cards.length);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                goToSlide((currentIndex - 1 + cards.length) % cards.length);
            });
        }

        // Auto play
        setInterval(function () {
            goToSlide((currentIndex + 1) % cards.length);
        }, 6000);
    }

    // --- Contact Form ---
    function initContactForm() {
        const form = document.getElementById('contactForm');
        const success = document.getElementById('formSuccess');

        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Save to localStorage for dashboard
            saveContactSubmission({
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                weddingDate: document.getElementById('weddingDate').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value.trim()
            });

            const submitBtn = form.querySelector('.btn-submit');
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            setTimeout(function () {
                gsap.to(form, {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    ease: 'power2.in',
                    onComplete: function () {
                        form.style.display = 'none';
                        success.style.display = 'block';
                        gsap.from(success, {
                            opacity: 0,
                            y: 20,
                            scale: 0.9,
                            duration: 0.6,
                            ease: 'power3.out',
                        });
                    }
                });
            }, 1500);
        });

        // Animate form inputs on focus
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(function (input) {
            input.addEventListener('focus', function () {
                gsap.to(this, {
                    scale: 1.01,
                    duration: 0.2,
                    ease: 'power2.out',
                });
            });

            input.addEventListener('blur', function () {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out',
                });
            });
        });
    }

    // --- Back to Top ---
    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;

        window.addEventListener('scroll', function () {
            if (window.scrollY > 600) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });

        btn.addEventListener('click', function () {
            if (isHomePage) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: { y: 0 },
                    ease: 'power3.inOut',
                });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // --- Magnetic Hover Effect on Buttons ---
    function initMagneticButtons() {
        const magneticElements = document.querySelectorAll('.btn-hero-primary, .btn-hero-outline, .btn-primary-custom');

        magneticElements.forEach(function (el) {
            el.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(this, {
                    x: x * 0.2,
                    y: y * 0.2,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });

            el.addEventListener('mouseleave', function () {
                gsap.to(this, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)',
                });
            });
        });
    }

    // --- Cursor Effect (Desktop only) ---
    function initCursorEffect() {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(201, 169, 110, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99998;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, border-color 0.3s;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        cursorDot.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99998;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(cursorDot);

        document.addEventListener('mousemove', function (e) {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power3.out' });
            gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
        });

        // Hover effects on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .portfolio-card, .filter-btn');
        hoverTargets.forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                gsap.to(cursor, { width: 40, height: 40, borderColor: 'rgba(201, 169, 110, 1)', duration: 0.3 });
            });
            el.addEventListener('mouseleave', function () {
                gsap.to(cursor, { width: 20, height: 20, borderColor: 'rgba(201, 169, 110, 0.6)', duration: 0.3 });
            });
        });
    }

    // --- Smooth Anchor Scroll for Footer Links ---
    function initFooterLinks() {
        document.querySelectorAll('.footer-links a, .navbar-brand').forEach(function (link) {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#') && isHomePage) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        gsap.to(window, {
                            duration: 1.2,
                            scrollTo: { y: target, offsetY: 80 },
                            ease: 'power3.inOut',
                        });
                    }
                }
                // Otherwise let the browser navigate normally
            });
        });
    }

    // --- Service Card Hover Tilt ---
    function initServiceCardTilt() {
        const cards = document.querySelectorAll('.service-card');
        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                gsap.to(this, {
                    rotationY: x * 8,
                    rotationX: -y * 8,
                    transformPerspective: 800,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            });

            card.addEventListener('mouseleave', function () {
                gsap.to(this, {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.5)',
                });
            });
        });
    }

    // --- Auth Functions ---
    function getUsers() {
        try {
            var users = JSON.parse(localStorage.getItem('eternity_users')) || [];
            // Migration: ensure roles exist (first user becomes admin)
            var hasAdmin = users.some(function (u) { return u.role === 'admin'; });
            var changed = false;
            if (!hasAdmin && users.length > 0) {
                users[0].role = 'admin';
                changed = true;
            }
            users.forEach(function (u) {
                if (!u.role) { u.role = 'client'; changed = true; }
            });
            if (changed) localStorage.setItem('eternity_users', JSON.stringify(users));
            return users;
        } catch (e) {
            return [];
        }
    }

    function saveUsers(users) {
        localStorage.setItem('eternity_users', JSON.stringify(users));
    }

    function getCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem('eternity_currentUser'));
        } catch (e) {
            return null;
        }
    }

    function setCurrentUser(user) {
        localStorage.setItem('eternity_currentUser', JSON.stringify(user));
    }

    function logoutUser() {
        localStorage.removeItem('eternity_currentUser');
        window.location.href = 'index.html';
    }

    window.logoutUser = logoutUser;

    // Global password toggle
    window.togglePassword = function (inputId, btn) {
        var input = document.getElementById(inputId);
        if (!input) return;
        var icon = btn.querySelector('i');
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'bi bi-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'bi bi-eye';
        }
    };

    // --- Update Navigation Based on Auth State ---
    function initAuthNav() {
        var authNavItem = document.querySelector('.auth-nav-item');
        if (!authNavItem) return;

        var user = getCurrentUser();

        if (user) {
            var initials = (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
            var fullName = escapeHtml(user.firstName + ' ' + user.lastName);
            var safeEmail = escapeHtml(user.email);
            var isAdmin = user.role === 'admin' || user.role === undefined;
            var roleLabel = isAdmin ? 'Admin' : 'Member';
            var roleClass = isAdmin ? 'role-admin' : 'role-client';

            authNavItem.innerHTML =
                '<div class="user-menu-toggle" id="userMenuToggle" onclick="toggleUserMenu(event)">' +
                    '<div class="user-avatar">' + initials + '</div>' +
                    '<span class="user-menu-name">' + escapeHtml(user.firstName) + '</span>' +
                    '<i class="bi bi-chevron-down user-menu-caret"></i>' +
                '</div>' +
                '<div class="user-dropdown" id="userDropdown">' +
                    '<a class="user-dropdown-header" href="dashboard.html">' +
                        '<div class="user-dropdown-avatar">' + initials + '</div>' +
                        '<div class="user-dropdown-id">' +
                            '<h6>' + fullName + '</h6>' +
                            '<small>' + safeEmail + '</small>' +
                            '<span class="user-dropdown-role ' + roleClass + '">' + roleLabel + '</span>' +
                        '</div>' +
                    '</a>' +
                    '<div class="user-dropdown-body">' +
                        '<a class="user-dropdown-item" href="dashboard.html">' +
                            '<i class="bi bi-grid-1x2"></i><span>Dashboard</span>' +
                        '</a>' +
                        '<a class="user-dropdown-item" href="dashboard.html">' +
                            '<i class="bi bi-calendar-check"></i><span>My Bookings</span>' +
                        '</a>' +
                        '<a class="user-dropdown-item" href="dashboard.html">' +
                            '<i class="bi bi-person-gear"></i><span>Account Settings</span>' +
                        '</a>' +
                        '<div class="user-dropdown-divider"></div>' +
                        '<button class="user-dropdown-item logout" onclick="logoutUser()">' +
                            '<i class="bi bi-box-arrow-right"></i><span>Sign Out</span>' +
                        '</button>' +
                    '</div>' +
                '</div>';
        } else {
            var isSigninPage = window.location.pathname.indexOf('signin.html') !== -1;
            var isSignupPage = window.location.pathname.indexOf('signup.html') !== -1;

            if (isSignupPage) {
                authNavItem.innerHTML =
                    '<a href="signin.html" class="nav-link auth-link-btn">Sign In</a>';
            } else {
                authNavItem.innerHTML =
                    '<a href="signin.html" class="nav-link auth-link-btn">Sign In</a>' +
                    '<a href="signup.html" class="btn btn-primary-custom auth-signup-btn">Sign Up</a>';
            }
        }
    }

    // Global toggle user dropdown
    window.toggleUserMenu = function (e) {
        e.stopPropagation();
        var dropdown = document.getElementById('userDropdown');
        var toggle = document.getElementById('userMenuToggle');
        if (!dropdown) return;
        var open = dropdown.classList.toggle('show');
        if (toggle) toggle.classList.toggle('open', open);
    };

    // Escape user-provided text before injecting into HTML
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Close dropdown on outside click
    document.addEventListener('click', function () {
        var dropdown = document.getElementById('userDropdown');
        if (dropdown) dropdown.classList.remove('show');
    });

    // --- Sign Up Form Handler ---
    function initSignupForm() {
        var form = document.getElementById('signupForm');
        var success = document.getElementById('signupSuccess');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var firstName = document.getElementById('firstName').value.trim();
            var lastName = document.getElementById('lastName').value.trim();
            var email = document.getElementById('email').value.trim().toLowerCase();
            var phone = document.getElementById('phone').value.trim();
            var password = document.getElementById('password').value;
            var confirmPassword = document.getElementById('confirmPassword').value;
            var agreeTerms = document.getElementById('agreeTerms').checked;

            // Validate
            if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
                showAuthAlert('Please fill in all required fields.', 'error');
                return;
            }

            if (password.length < 6) {
                showAuthAlert('Password must be at least 6 characters.', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showAuthAlert('Passwords do not match.', 'error');
                return;
            }

            if (!agreeTerms) {
                showAuthAlert('Please agree to the Terms of Service.', 'error');
                return;
            }

            // Save user
            var users = getUsers();
            var newUser = {
                id: Date.now(),
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                password: password,
                role: users.length === 0 ? 'admin' : 'client',
                createdAt: new Date().toISOString()
            };
            users.push(newUser);
            saveUsers(users);

            // Show success
            form.style.display = 'none';
            success.style.display = 'block';
            gsap.from(success, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' });

            // Redirect to signin
            setTimeout(function () {
                window.location.href = 'signin.html?registered=1';
            }, 2000);
        });
    }

    // --- Sign In Form Handler ---
    function initSigninForm() {
        var form = document.getElementById('signinForm');
        if (!form) return;

        // Show registration success message
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('registered') === '1') {
            showAuthAlert('Account created successfully! Please sign in.', 'success');
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var email = document.getElementById('email').value.trim().toLowerCase();
            var password = document.getElementById('password').value;

            if (!email || !password) {
                showAuthAlert('Please enter your email and password.', 'error');
                return;
            }

            var users = getUsers();
            var user = users.find(function (u) {
                return u.email === email && u.password === password;
            });

            if (!user) {
                showAuthAlert('Invalid email or password. Please try again.', 'error');
                return;
            }

            // Set current user (exclude password from stored session)
            var sessionUser = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                role: user.role || 'client'
            };
            setCurrentUser(sessionUser);

            // Success animation
            var submitBtn = form.querySelector('.btn-auth-submit');
            submitBtn.innerHTML = '<span>Welcome back!</span><i class="bi bi-check-lg"></i>';
            submitBtn.style.background = '#15803d';
            submitBtn.style.borderColor = '#15803d';

            setTimeout(function () {
                var urlParams = new URLSearchParams(window.location.search);
                var redirect = urlParams.get('redirect');
                if (redirect === 'dashboard') {
                    window.location.href = 'dashboard.html';
                } else {
                    window.location.href = 'index.html';
                }
            }, 1200);
        });
    }

    // --- Auth Alert Helper ---
    function showAuthAlert(message, type) {
        var alertEl = document.getElementById('loginAlert') || document.getElementById('signupAlert');
        if (!alertEl) {
            // For signup page, create alert dynamically
            var form = document.getElementById('signupForm');
            if (form) {
                alertEl = document.createElement('div');
                alertEl.id = 'signupAlert';
                alertEl.className = 'auth-alert';
                form.parentNode.insertBefore(alertEl, form);
            }
        }
        if (!alertEl) return;

        var icon = type === 'error' ? 'bi-exclamation-circle' : 'bi-check-circle';
        alertEl.className = 'auth-alert ' + type;
        alertEl.innerHTML = '<i class="bi ' + icon + '"></i> ' + message;
        alertEl.style.display = 'flex';
        gsap.from(alertEl, { opacity: 0, y: -10, duration: 0.3, ease: 'power2.out' });
    }

    // --- Bookings & Messages Storage ---
    function getBookings() {
        try { return JSON.parse(localStorage.getItem('eternity_bookings')) || []; } catch (e) { return []; }
    }

    function saveBookings(bookings) {
        localStorage.setItem('eternity_bookings', JSON.stringify(bookings));
    }

    function getMessages() {
        try { return JSON.parse(localStorage.getItem('eternity_messages')) || []; } catch (e) { return []; }
    }

    function saveMessages(messages) {
        localStorage.setItem('eternity_messages', JSON.stringify(messages));
    }

    // Save contact form submission to bookings + messages
    function saveContactSubmission(data) {
        var bookings = getBookings();
        var messages = getMessages();
        var now = new Date().toISOString();

        var booking = {
            id: Date.now(),
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone || '',
            weddingDate: data.weddingDate || '',
            service: data.service || 'wedding',
            message: data.message || '',
            status: 'pending',
            createdAt: now
        };
        bookings.push(booking);
        saveBookings(bookings);

        var message = {
            id: Date.now() + 1,
            from: data.firstName + ' ' + data.lastName,
            email: data.email,
            subject: 'New Booking Enquiry' + (data.service ? ' — ' + data.service : ''),
            body: data.message || 'No additional message.',
            createdAt: now
        };
        messages.push(message);
        saveMessages(messages);
    }

    // --- Dashboard Logic ---
    function isDashboardPage() {
        return window.location.pathname.indexOf('dashboard.html') !== -1;
    }

    function initDashboard() {
        if (!isDashboardPage()) return;

        // Auth protection
        var user = getCurrentUser();
        if (!user) {
            window.location.href = 'signin.html?redirect=dashboard';
            return;
        }

        var isAdmin = user.role === 'admin';

        // Topbar date
        var dateEl = document.getElementById('topbarDate');
        if (dateEl) {
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateEl.textContent = new Date().toLocaleDateString('en-US', options);
        }

        // Topbar user
        var topbarUser = document.getElementById('topbarUser');
        if (topbarUser) {
            var initials = (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
            topbarUser.innerHTML =
                '<div class="profile-avatar" style="width:38px;height:38px;font-size:14px;">' + initials + '</div>' +
                '<div class="topbar-user-name">' + user.firstName + ' ' + user.lastName +
                '<span class="topbar-user-role">' + (isAdmin ? 'Administrator' : 'Client') + '</span></div>';
        }

        // Profile display
        setProfileDisplay(user, isAdmin);

        // Show/hide admin items
        document.querySelectorAll('.admin-only').forEach(function (el) {
            el.style.display = isAdmin ? (el.tagName === 'BUTTON' ? 'flex' : 'block') : 'none';
        });

        // Update labels
        var bookingsNavLabel = document.getElementById('bookingsNavLabel');
        var bookingsTableTitle = document.getElementById('bookingsTableTitle');
        var statUsersLabel = document.getElementById('statUsersLabel');
        var messagesTitle = document.getElementById('messagesTitle');
        if (bookingsNavLabel) bookingsNavLabel.textContent = isAdmin ? 'All Bookings' : 'My Bookings';
        if (bookingsTableTitle) bookingsTableTitle.textContent = isAdmin ? 'All Bookings' : 'My Bookings';
        if (statUsersLabel) statUsersLabel.textContent = isAdmin ? 'Registered Users' : 'Happy Couples';
        if (messagesTitle) messagesTitle.textContent = isAdmin ? 'All Messages' : 'My Messages';

        // If admin, render users view
        if (isAdmin) {
            renderUsersView();
        }

        renderDashboardData(user, isAdmin);
        initDashboardViews();
        initProfileForm(user);
        initBookingStatusFilter(user, isAdmin);
        initGalleryView();
    }

    // --- Set profile display ---
    function setProfileDisplay(user, isAdmin) {
        var avatar = document.getElementById('profileAvatar');
        var name = document.getElementById('profileName');
        var role = document.getElementById('profileRole');
        var email = document.getElementById('profileEmail');
        var firstName = document.getElementById('profileFirstName');
        var lastName = document.getElementById('profileLastName');
        var emailInput = document.getElementById('profileEmailInput');
        var phone = document.getElementById('profilePhone');
        var weddingDate = document.getElementById('profileWeddingDate');
        var location = document.getElementById('profileLocation');

        if (avatar) avatar.textContent = (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
        if (name) name.textContent = user.firstName + ' ' + user.lastName;
        if (role) role.textContent = isAdmin ? 'Administrator' : 'Client';
        if (email) email.textContent = user.email;

        if (firstName) firstName.value = user.firstName || '';
        if (lastName) lastName.value = user.lastName || '';
        if (emailInput) emailInput.value = user.email || '';
        if (phone) phone.value = user.phone || '';
        if (weddingDate) weddingDate.value = user.weddingDate || '';
        if (location) location.value = user.location || '';
    }

    // --- Dashboard view switching ---
    function initDashboardViews() {
        var sidebarLinks = document.querySelectorAll('.sidebar-link[data-view]');
        var quickGotos = document.querySelectorAll('[data-goto]');

        function goToView(view) {
            sidebarLinks.forEach(function (l) { l.classList.remove('active'); });
            var activeLink = document.querySelector('.sidebar-link[data-view="' + view + '"]');
            if (activeLink) activeLink.classList.add('active');

            document.querySelectorAll('.dash-view').forEach(function (v) { v.classList.remove('active'); });
            var viewEl = document.getElementById('view-' + view);
            if (viewEl) viewEl.classList.add('active');

            var headings = {
                overview: 'Overview',
                profile: 'My Profile',
                bookings: document.getElementById('bookingsTableTitle').textContent,
                galleries: 'Photo Galleries',
                messages: document.getElementById('messagesTitle').textContent,
                users: 'Users'
            };
            var heading = document.getElementById('pageHeading');
            if (heading) heading.textContent = headings[view] || 'Overview';

            // Close mobile sidebar
            document.getElementById('dashboardSidebar').classList.remove('open');
            document.getElementById('sidebarBackdrop').classList.remove('show');
        }

        sidebarLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                goToView(this.dataset.view);
            });
        });

        quickGotos.forEach(function (btn) {
            btn.addEventListener('click', function () {
                goToView(this.dataset.goto);
            });
        });

        // Mobile sidebar toggle
        var toggle = document.getElementById('sidebarToggle');
        var sidebar = document.getElementById('dashboardSidebar');
        var backdrop = document.getElementById('sidebarBackdrop');
        if (toggle) {
            toggle.addEventListener('click', function () {
                sidebar.classList.add('open');
                backdrop.classList.add('show');
            });
        }
        if (backdrop) {
            backdrop.addEventListener('click', function () {
                sidebar.classList.remove('open');
                backdrop.classList.remove('show');
            });
        }
    }

    // --- Render dashboard data ---
    function renderDashboardData(user, isAdmin) {
        var bookings = getBookings();
        var messages = getMessages();
        var users = getUsers();

        var myBookings = isAdmin ? bookings : bookings.filter(function (b) {
            return b.email === user.email;
        });
        var myMessages = isAdmin ? messages : messages.filter(function (m) {
            return m.email === user.email;
        });

        // Stats
        var statBookings = document.getElementById('statBookings');
        var statGalleries = document.getElementById('statGalleries');
        var statMessages = document.getElementById('statMessages');
        var statUsers = document.getElementById('statUsers');

        if (statBookings) statBookings.textContent = myBookings.length;
        if (statMessages) statMessages.textContent = myMessages.length;

        // 9 featured galleries in the studio collection
        var galleryCount = 9;
        if (statGalleries) statGalleries.textContent = galleryCount;
        if (statUsers) statUsers.textContent = users.length;

        // Recent bookings
        renderRecentBookings(myBookings.slice(-3).reverse());

        // Bookings table
        renderBookingsTable(myBookings, isAdmin);

        // Messages
        renderMessages(myMessages);
    }

    // --- Recent bookings ---
    function renderRecentBookings(bookings) {
        var container = document.getElementById('recentBookings');
        if (!container) return;

        if (bookings.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="bi bi-calendar-x"></i><p>No bookings yet.</p></div>';
            return;
        }

        var serviceNames = {
            wedding: 'Wedding Photography',
            videography: 'Cinematic Videography',
            prewedding: 'Pre-Wedding Shoot',
            engagement: 'Engagement Session',
            custom: 'Custom Package'
        };

        var html = '';
        bookings.forEach(function (b) {
            var statusClass = b.status || 'pending';
            var date = b.weddingDate ? new Date(b.weddingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD';
            html += '<div class="message-item">' +
                '<div class="message-item-icon"><i class="bi bi-camera"></i></div>' +
                '<div class="message-item-body">' +
                    '<h5>' + b.firstName + ' ' + b.lastName + '</h5>' +
                    '<p>' + (serviceNames[b.service] || b.service) + '</p>' +
                    '<small><i class="bi bi-calendar"></i> ' + date + '</small>' +
                '</div>' +
                '<span class="status-badge ' + statusClass + '">' + statusClass + '</span>' +
            '</div>';
        });
        container.innerHTML = html;
    }

    // --- Bookings table ---
    function renderBookingsTable(bookings, isAdmin) {
        var tbody = document.getElementById('bookingsTableBody');
        var empty = document.getElementById('bookingsEmpty');
        if (!tbody) return;

        var serviceNames = {
            wedding: 'Wedding Photography',
            videography: 'Cinematic Videography',
            prewedding: 'Pre-Wedding Shoot',
            engagement: 'Engagement Session',
            custom: 'Custom Package'
        };

        if (bookings.length === 0) {
            tbody.innerHTML = '';
            if (empty) empty.style.display = 'block';
            return;
        }
        if (empty) empty.style.display = 'none';

        var html = '';
        bookings.forEach(function (b) {
            var status = b.status || 'pending';
            var date = b.weddingDate ? new Date(b.weddingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD';
            html += '<tr>' +
                '<td><strong>' + b.firstName + ' ' + b.lastName + '</strong><br><small class="text-muted">' + b.email + '</small></td>' +
                '<td>' + (serviceNames[b.service] || b.service) + '</td>' +
                '<td>' + date + '</td>' +
                '<td><span class="status-badge ' + status + '">' + status + '</span></td>' +
                '<td>' +
                    (isAdmin ? '<select class="form-control form-control-sm booking-status" style="width:auto;padding:6px 10px;font-size:12px;" data-id="' + b.id + '"><option value="pending"' + (status === 'pending' ? ' selected' : '') + '>Pending</option><option value="confirmed"' + (status === 'confirmed' ? ' selected' : '') + '>Confirmed</option><option value="completed"' + (status === 'completed' ? ' selected' : '') + '>Completed</option></select>' : '<span class="status-badge ' + status + '">' + status + '</span>') +
                '</td>' +
            '</tr>';
        });
        tbody.innerHTML = html;

        // Status change handler (admin)
        document.querySelectorAll('.booking-status').forEach(function (select) {
            select.addEventListener('change', function () {
                var id = parseInt(this.dataset.id);
                var bookingsAll = getBookings();
                var b = null;
                for (var i = 0; i < bookingsAll.length; i++) {
                    if (bookingsAll[i].id === id) { b = bookingsAll[i]; break; }
                }
                if (b) {
                    b.status = this.value;
                    saveBookings(bookingsAll);
                    updateBookingStatusBadge(this);
                }
            });
        });
    }

    function updateBookingStatusBadge(select) {
        var tr = select.closest('tr');
        if (!tr) return;
        var badge = tr.querySelector('.status-badge');
        if (badge) {
            badge.className = 'status-badge ' + select.value;
            badge.textContent = select.value;
        }
    }

    // --- Booking status filter ---
    function initBookingStatusFilter(user, isAdmin) {
        var filter = document.getElementById('bookingStatusFilter');
        if (!filter) return;

        filter.addEventListener('change', function () {
            var bookings = getBookings();
            var myBookings = isAdmin ? bookings : bookings.filter(function (b) {
                return b.email === user.email;
            });

            if (this.value !== 'all') {
                myBookings = myBookings.filter(function (b) {
                    return (b.status || 'pending') === filter.value;
                });
            }
            renderBookingsTable(myBookings, isAdmin);
        });
    }

    // --- Messages ---
    function renderMessages(messages) {
        var container = document.getElementById('messagesList');
        if (!container) return;

        if (!messages || messages.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="bi bi-envelope"></i><p>No messages yet. Messages you send from the contact form will appear here.</p></div>';
            return;
        }

        var html = '';
        messages.slice().reverse().forEach(function (m) {
            var date = new Date(m.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
            html += '<div class="message-item">' +
                '<div class="message-item-icon"><i class="bi bi-envelope-open"></i></div>' +
                '<div class="message-item-body">' +
                    '<h5>' + m.subject + '</h5>' +
                    '<p>' + m.body + '</p>' +
                    '<small><i class="bi bi-person"></i> ' + m.from + ' &nbsp; <i class="bi bi-clock"></i> ' + date + '</small>' +
                '</div>' +
            '</div>';
        });
        container.innerHTML = html;
    }

    // --- Admin users view ---
    function renderUsersView() {
        var tbody = document.getElementById('usersTableBody');
        var empty = document.getElementById('usersEmpty');
        var countBadge = document.getElementById('userCountBadge');
        var users = getUsers();
        if (!tbody) return;

        if (countBadge) countBadge.textContent = users.length + ' users';

        if (users.length === 0) {
            tbody.innerHTML = '';
            if (empty) empty.style.display = 'block';
            return;
        }
        if (empty) empty.style.display = 'none';

        var html = '';
        users.forEach(function (u) {
            var role = u.role === 'admin' ? 'admin' : 'client';
            var joined = u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
            html += '<tr>' +
                '<td><strong>' + u.firstName + ' ' + u.lastName + '</strong></td>' +
                '<td>' + u.email + '</td>' +
                '<td>' + (u.phone || '—') + '</td>' +
                '<td><span class="role-badge ' + role + '">' + role + '</span></td>' +
                '<td>' + joined + '</td>' +
                '<td>' +
                    '<button class="btn btn-sm btn-outline-danger" onclick="deleteUser(' + u.id + ')"><i class="bi bi-trash"></i></button>' +
                '</td>' +
            '</tr>';
        });
        tbody.innerHTML = html;
    }

    window.deleteUser = function (id) {
        if (!confirm('Delete this user permanently?')) return;
        var users = getUsers();
        users = users.filter(function (u) { return u.id !== id; });
        saveUsers(users);
        renderUsersView();
        // Also clear their session if they were logged in
        var current = getCurrentUser();
        if (current && current.id === id) {
            localStorage.removeItem('eternity_currentUser');
        }
        renderDashboardData(getCurrentUser() || { email: '' }, getCurrentUser() ? getCurrentUser().role === 'admin' : false);
    };

    // --- Profile form ---
    function initProfileForm(user) {
        var form = document.getElementById('profileForm');
        var success = document.getElementById('profileSuccess');
        if (!form) return;

        // Try to load saved profile extras
        var users = getUsers();
        var fullUser = users.find(function (u) { return u.id === user.id; });
        if (fullUser) {
            var weddingDate = document.getElementById('profileWeddingDate');
            var location = document.getElementById('profileLocation');
            if (weddingDate) weddingDate.value = fullUser.weddingDate || '';
            if (location) location.value = fullUser.location || '';
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var firstName = document.getElementById('profileFirstName').value.trim();
            var lastName = document.getElementById('profileLastName').value.trim();
            var email = document.getElementById('profileEmailInput').value.trim().toLowerCase();
            var phone = document.getElementById('profilePhone').value.trim();
            var weddingDate = document.getElementById('profileWeddingDate').value;
            var location = document.getElementById('profileLocation').value.trim();

            if (!firstName || !lastName || !email) {
                if (success) {
                    success.className = 'auth-alert error';
                    success.innerHTML = '<i class="bi bi-exclamation-circle"></i> Please fill in first name, last name, and email.';
                    success.style.display = 'flex';
                }
                return;
            }

            // Update in users list
            var users = getUsers();
            var idx = users.findIndex(function (u) { return u.id === user.id; });
            if (idx !== -1) {
                users[idx].firstName = firstName;
                users[idx].lastName = lastName;
                users[idx].email = email;
                users[idx].phone = phone;
                users[idx].weddingDate = weddingDate;
                users[idx].location = location;
                saveUsers(users);

                // Update session
                var session = getCurrentUser();
                if (session) {
                    session.firstName = firstName;
                    session.lastName = lastName;
                    session.email = email;
                    session.phone = phone;
                    session.weddingDate = weddingDate;
                    session.location = location;
                    setCurrentUser(session);

                    // Refresh topbar + profile display
                    setProfileDisplay(session, session.role === 'admin');
                    initDashboardDisplay(session);
                }
            }

            if (success) {
                success.className = 'auth-alert success';
                success.innerHTML = '<i class="bi bi-check-circle"></i> Profile updated successfully!';
                success.style.display = 'flex';
                setTimeout(function () { success.style.display = 'none'; }, 3000);
            }

            // Update avatar initials
            var avatar = document.getElementById('profileAvatar');
            if (avatar) avatar.textContent = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
        });
    }

    function initDashboardDisplay(user) {
        var topbarUser = document.getElementById('topbarUser');
        if (topbarUser) {
            var initials = (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
            var isAdmin = user.role === 'admin';
            topbarUser.innerHTML =
                '<div class="profile-avatar" style="width:38px;height:38px;font-size:14px;">' + initials + '</div>' +
                '<div class="topbar-user-name">' + user.firstName + ' ' + user.lastName +
                '<span class="topbar-user-role">' + (isAdmin ? 'Administrator' : 'Client') + '</span></div>';
        }
    }

    // --- Gallery view ---
    function initGalleryView() {
        var galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;

        var galleries = [
            { id: 1, title: 'The Royal Celebration', location: 'Rajasthan, India', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80' },
            { id: 2, title: 'Enchanted Garden', location: 'Mahabaleshwar, India', img: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80' },
            { id: 3, title: 'Silver Jubilee Gala', location: 'Mumbai, India', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80' },
            { id: 4, title: 'Coastal Vows', location: 'Goa, India', img: 'https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=800&q=80' },
            { id: 5, title: 'Golden Heritage', location: 'Udaipur, India', img: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=800&q=80' },
            { id: 6, title: 'Mountain Romance', location: 'Shimla, India', img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80' },
            { id: 7, title: 'Lake Palace Romance', location: 'Udaipur, India', img: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80' },
            { id: 8, title: 'Starlight Soiree', location: 'Delhi, India', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80' },
            { id: 9, title: 'Eternal Devotion', location: 'Jaipur, India', img: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80' }
        ];

        var html = '';
        galleries.forEach(function (g) {
            html += '<div class="col-md-6 col-lg-4">' +
                '<div class="gallery-item" data-img="' + g.img + '" data-title="' + g.title + '" data-location="' + g.location + '">' +
                    '<img src="' + g.img + '" alt="' + g.title + '" loading="lazy">' +
                    '<div class="gallery-item-overlay">' +
                        '<div><h5>' + g.title + '</h5><small>' + g.location + '</small></div>' +
                    '</div>' +
                '</div>' +
            '</div>';
        });
        galleryGrid.innerHTML = html;

        // Modal handling
        document.querySelectorAll('.gallery-item').forEach(function (item) {
            item.addEventListener('click', function () {
                var title = document.getElementById('galleryModalTitle');
                var img = document.getElementById('galleryModalImg');
                var desc = document.getElementById('galleryModalDesc');
                if (title) title.textContent = this.dataset.title;
                if (img) img.src = this.dataset.img;
                if (desc) desc.textContent = 'Captured in ' + this.dataset.location + '. Part of the Eternity Studio collection.';
                var modal = new bootstrap.Modal(document.getElementById('galleryModal'));
                modal.show();
            });
        });
    }

    // --- Initialize Everything ---
    var isHomePage = false;

    document.addEventListener('DOMContentLoaded', function () {
        // Detect home page
        var path = window.location.pathname;
        isHomePage = path.endsWith('index.html') || path.endsWith('/') || path === '';

        // Lock scroll only if preloader is present
        if (document.getElementById('preloader')) {
            document.body.style.overflow = 'hidden';
        }

        initPreloader();
        initHeroSlideshow();
        initParticles();
        initNavbar();
        initScrollAnimations();
        initCounters();
        initPortfolioFilter();
        initPortfolioModal();
        initTestimonials();
        initContactForm();
        initBackToTop();
        initMagneticButtons();
        initServiceCardTilt();
        initFooterLinks();
        initAuthNav();
        initSignupForm();
        initSigninForm();
        initDashboard();

        // Delayed cursor init
        setTimeout(initCursorEffect, 2000);

        // Safety fallback: ensure preloader hides even if GSAP fails
        setTimeout(function () {
            var preloader = document.getElementById('preloader');
            if (preloader && preloader.style.display !== 'none') {
                preloader.style.transition = 'opacity 0.5s';
                preloader.style.opacity = '0';
                setTimeout(function () {
                    preloader.style.display = 'none';
                }, 500);
                document.body.style.overflow = '';
                // Force all reveal-up elements to be visible
                document.querySelectorAll('.reveal-up').forEach(function (el) {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                });
                // Force hero elements to be visible
                document.querySelectorAll('.hero-badge span, .title-line, .hero-subtitle, .hero-cta, .hero-scroll-indicator, .page-hero-title, .page-hero-subtitle, .breadcrumb-nav, .page-hero .section-tag').forEach(function (el) {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                });
                // Force testimonial cards to show
                document.querySelectorAll('.testimonial-card').forEach(function (el, i) {
                    el.style.display = i === 0 ? 'block' : '';
                });
            }
        }, 5000);
    });

})();
