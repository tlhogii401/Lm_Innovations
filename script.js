/* =========================================================
   LM INNOVATIONS
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
       ========================= */

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    const yearElement = document.getElementById("year");

    const cursorGlow = document.querySelector(".cursor-glow");

    const revealElements = document.querySelectorAll(".reveal");

    const heroLogo = document.querySelector(".business-logo-hero");


    /* =========================
       CURRENT YEAR
       ========================= */

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =========================
       MOBILE NAVIGATION
       ========================= */

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        /* Close menu when a navigation link is clicked */

        const navLinks = nav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =========================
       HEADER SCROLL EFFECT
       ========================= */

    const handleHeaderScroll = () => {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =========================
       ACTIVE NAVIGATION
       ========================= */

    const updateActiveNavigation = () => {

        const sections = document.querySelectorAll(
            "main section[id]"
        );

        const navLinks = nav
            ? nav.querySelectorAll("a")
            : [];

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (
                href === `#${currentSection}` ||
                (
                    currentSection === "home" &&
                    href === "index.html"
                )
            ) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =========================
       REVEAL ANIMATIONS
       ========================= */

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =========================
       HERO LOGO PARALLAX
       ========================= */

    if (heroLogo) {

        const heroVisual =
            document.querySelector(".hero-visual");

        if (heroVisual) {

            heroVisual.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        heroVisual.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateY =
                        ((x - centerX) / centerX) * 8;

                    const rotateX =
                        ((centerY - y) / centerY) * 8;

                    heroLogo.style.transform =
                        `perspective(800px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-4px)`;

                }
            );


            heroVisual.addEventListener(
                "mouseleave",
                () => {

                    heroLogo.style.transform =
                        "perspective(800px) rotateY(-8deg)";

                }
            );

        }

    }


    /* =========================
       CURSOR GLOW
       ========================= */

    if (cursorGlow) {

        let mouseX = 0;
        let mouseY = 0;

        let glowX = 0;
        let glowY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;

            }
        );


        const animateGlow = () => {

            glowX += (mouseX - glowX) * 0.12;
            glowY += (mouseY - glowY) * 0.12;

            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;

            requestAnimationFrame(animateGlow);

        };

        animateGlow();

    }


    /* =========================
       SMOOTH ANCHOR SCROLLING
       ========================= */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================
       ESCAPE KEY
       ========================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                if (nav) {
                    nav.classList.remove("open");
                }

                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


    /* =========================
       RESIZE HANDLING
       ========================= */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 768 &&
                nav &&
                menuToggle
            ) {

                nav.classList.remove("open");

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

});