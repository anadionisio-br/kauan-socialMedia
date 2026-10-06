"use strict";

/* =========================================================
   KAUAN FERREIRA — SCRIPT PREMIUM — MOTION EDITION
========================================================= */

const header = document.getElementById("top");
const progress = document.getElementById("progress");
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursorDot");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const finePointer = window.matchMedia(
    "(pointer: fine)"
).matches;


/* =========================================================
   SCROLL / HEADER / PROGRESS
========================================================= */

let scrollTicking = false;

function handleScroll() {

    const scrollY = window.scrollY;

    if (header) {
        header.classList.toggle("scrolled", scrollY > 40);
    }

    if (progress) {

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? scrollY / documentHeight
                : 0;

        progress.style.transform =
            `scaleX(${Math.min(1, Math.max(0, percentage))})`;
    }

    const heroVisual =
        document.querySelector(".hero-visual");

    const heroContent =
        document.querySelector(".hero-content");

    if (heroVisual) {
        heroVisual.style.setProperty(
            "--scroll-offset",
            `${scrollY * 0.08}px`
        );
    }

    if (heroContent) {
        heroContent.style.setProperty(
            "--scroll-offset",
            `${scrollY * -0.025}px`
        );
    }

    scrollTicking = false;
}

window.addEventListener("scroll", () => {

    if (!scrollTicking) {

        window.requestAnimationFrame(handleScroll);

        scrollTicking = true;
    }

}, { passive: true });

handleScroll();


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuBtn && menu) {

    menuBtn.addEventListener("click", () => {

        const isOpen =
            menu.classList.toggle("open");

        menuBtn.classList.toggle("active", isOpen);

        menuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "no-scroll",
            isOpen
        );
    });


    menu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("open");

            menuBtn.classList.remove("active");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "no-scroll"
            );
        });

    });
}


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("in");

                    setTimeout(() => {

                        entry.target.classList.add("done");

                    }, 1300);

                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("in");
        element.classList.add("done");

    });
}


/* =========================================================
   TITLE TEXT ANIMATION — CORRIGIDA
========================================================= */

const titleTargets = document.querySelectorAll(
    ".hero-title .hero-line," +
    ".about-title h2," +
    ".section-intro h2," +
    ".portfolio-heading h2," +
    ".statement h2," +
    ".plans-intro h2," +
    ".extras-heading h2," +
    ".process-heading h2," +
    ".contact h2," +
    ".service-card h3," +
    ".project-overlay h3"
);

titleTargets.forEach(element => {

    if (element.dataset.motionSplit) {
        return;
    }

    element.dataset.motionSplit = "1";

    element.classList.add(
        "motion-text",
        "motion-heading"
    );

    element.setAttribute(
        "aria-label",
        element.textContent
            .replace(/\s+/g, " ")
            .trim()
    );

    const walker =
        document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT
        );

    const nodes = [];

    while (walker.nextNode()) {

        const node = walker.currentNode;

        if (node.textContent.trim()) {
            nodes.push(node);
        }
    }

    let characterIndex = 0;

    nodes.forEach(node => {

        const fragment =
            document.createDocumentFragment();

        const text =
            node.textContent;

        const words =
            text.split(/(\s+)/);

        words.forEach(part => {

            if (/^\s+$/.test(part)) {

                const space =
                    document.createElement("span");

                space.className =
                    "motion-space";

                space.setAttribute(
                    "aria-hidden",
                    "true"
                );

                fragment.appendChild(space);

                return;
            }

            if (!part) {
                return;
            }

            /*
             * Cada palavra fica em um bloco próprio.
             * Isso impede que o navegador quebre
             * uma palavra no meio durante a animação.
             */

            const word =
                document.createElement("span");

            word.className =
                "motion-word";

            word.setAttribute(
                "aria-hidden",
                "true"
            );

            [...part].forEach(character => {

                const char =
                    document.createElement("span");

                char.className =
                    "motion-char";

                char.textContent =
                    character;

                char.style.setProperty(
                    "--char-index",
                    characterIndex
                );

                char.setAttribute(
                    "aria-hidden",
                    "true"
                );

                word.appendChild(char);

                characterIndex++;
            });

            fragment.appendChild(word);
        });

        node.parentNode.replaceChild(
            fragment,
            node
        );
    });
});


/*
 * Ativa a animação dos títulos
 * quando eles entram na tela.
 */

const motionTextElements =
    document.querySelectorAll(".motion-text");

if ("IntersectionObserver" in window) {

    const textObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "motion-visible"
                    );

                    textObserver.unobserve(
                        entry.target
                    );
                });

            },
            {
                threshold: 0.22
            }
        );

    motionTextElements.forEach(element => {

        textObserver.observe(element);

    });

} else {

    motionTextElements.forEach(element => {

        element.classList.add(
            "motion-visible"
        );

    });
}


/*
 * Usuários que preferem menos movimento
 * recebem os títulos imediatamente visíveis.
 */

if (reducedMotion) {

    motionTextElements.forEach(element => {

        element.classList.add(
            "motion-visible"
        );

    });
}


/* =========================================================
   COUNTERS
========================================================= */

const counters =
    document.querySelectorAll("[data-count]");

counters.forEach(counter => {

    const target =
        Number(counter.dataset.count);

    if (Number.isNaN(target)) {
        return;
    }

    let startTime = null;

    function animateCounter(timestamp) {

        if (!startTime) {
            startTime = timestamp;
        }

        const progressValue =
            Math.min(
                (timestamp - startTime) / 1600,
                1
            );

        const eased =
            1 - Math.pow(
                1 - progressValue,
                3
            );

        const current =
            Math.floor(target * eased);

        counter.textContent =
            `+${current}`;

        if (progressValue < 1) {

            requestAnimationFrame(
                animateCounter
            );

        } else {

            counter.textContent =
                `+${target}`;
        }
    }

    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        requestAnimationFrame(
                            animateCounter
                        );

                        counterObserver.unobserve(
                            entry.target
                        );
                    });

                },
                {
                    threshold: 0.5
                }
            );

        counterObserver.observe(counter);

    } else {

        requestAnimationFrame(
            animateCounter
        );
    }
});


/* =========================================================
   PREMIUM CURSOR
========================================================= */

if (
    cursor &&
    cursorDot &&
    finePointer &&
    !reducedMotion
) {

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;

    window.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.transform =
                `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        },
        {
            passive: true
        }
    );


    function animateCursor() {

        cursorX +=
            (mouseX - cursorX) * 0.16;

        cursorY +=
            (mouseY - cursorY) * 0.16;

        cursor.style.transform =
            `translate3d(${cursorX}px, ${cursorY}px, 0)`;

        requestAnimationFrame(
            animateCursor
        );
    }

    animateCursor();


    const interactiveElements =
        document.querySelectorAll(
            "a, button, .project, .service-card, .plan, .event-card, .extra, .process-step"
        );

    interactiveElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursor.classList.add(
                    "active"
                );

                document.body.classList.add(
                    "cursor-hover"
                );
            }
        );

        element.addEventListener(
            "mouseleave",
            () => {

                cursor.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "cursor-hover"
                );
            }
        );
    });
}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

const magneticElements =
    document.querySelectorAll(".magnetic");

magneticElements.forEach(element => {

    element.addEventListener(
        "mousemove",
        event => {

            const rect =
                element.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            element.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;
        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            element.style.transform = "";
        }
    );
});


/* =========================================================
   HERO PARALLAX
========================================================= */

const hero =
    document.querySelector(".hero");

const heroVisual =
    document.querySelector(".hero-visual");

const heroContent =
    document.querySelector(".hero-content");

if (
    hero &&
    heroVisual &&
    heroContent &&
    finePointer &&
    !reducedMotion
) {

    let heroMouseX = 0;
    let heroMouseY = 0;

    let heroCurrentX = 0;
    let heroCurrentY = 0;

    let heroAnimationFrame = null;

    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();

            heroMouseX =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            heroMouseY =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            if (!heroAnimationFrame) {

                heroAnimationFrame =
                    requestAnimationFrame(
                        animateHeroParallax
                    );
            }
        }
    );


    function animateHeroParallax() {

        heroCurrentX +=
            (heroMouseX - heroCurrentX) *
            0.08;

        heroCurrentY +=
            (heroMouseY - heroCurrentY) *
            0.08;

        heroVisual.style.setProperty(
            "--mouse-x",
            `${heroCurrentX * 18}px`
        );

        heroVisual.style.setProperty(
            "--mouse-y",
            `${heroCurrentY * 18}px`
        );

        heroContent.style.setProperty(
            "--mouse-x",
            `${heroCurrentX * -8}px`
        );

        heroContent.style.setProperty(
            "--mouse-y",
            `${heroCurrentY * -8}px`
        );

        heroAnimationFrame =
            requestAnimationFrame(
                animateHeroParallax
            );
    }


    hero.addEventListener(
        "mouseleave",
        () => {

            heroMouseX = 0;
            heroMouseY = 0;
        }
    );
}


/* =========================================================
   TILT PREMIUM CARDS
========================================================= */

const tiltElements =
    document.querySelectorAll(
        ".service-card, .project, .plan, .event-card, .extra"
    );

tiltElements.forEach(element => {

    if (
        reducedMotion ||
        !finePointer
    ) {
        return;
    }

    element.addEventListener(
        "mousemove",
        event => {

            const rect =
                element.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateY =
                ((x - centerX) /
                    centerX) * 4;

            const rotateX =
                ((centerY - y) /
                    centerY) * 4;

            element.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-4px)`;
        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            element.style.transform = "";
        }
    );
});


/* =========================================================
   MARQUEE
========================================================= */

const marqueeTracks =
    document.querySelectorAll(
        ".marquee-track"
    );

marqueeTracks.forEach(track => {

    if (reducedMotion) {
        return;
    }

    track.animate(
        [
            {
                transform:
                    "translateX(0)"
            },
            {
                transform:
                    "translateX(-50%)"
            }
        ],
        {
            duration: 18000,
            iterations: Infinity,
            easing: "linear"
        }
    );
});


/* =========================================================
   SECTION PARALLAX
========================================================= */

const parallaxElements =
    document.querySelectorAll(
        ".statement-content, .section-intro, .events-heading, .extras-heading, .process-heading"
    );

if (
    !reducedMotion &&
    parallaxElements.length
) {

    let parallaxTicking = false;

    function updateSectionParallax() {

        parallaxElements.forEach(element => {

            const rect =
                element.getBoundingClientRect();

            const center =
                window.innerHeight / 2;

            const distance =
                rect.top +
                rect.height / 2 -
                center;

            const offset =
                distance * -0.025;

            element.style.setProperty(
                "--parallax-y",
                `${offset}px`
            );
        });

        parallaxTicking = false;
    }

    window.addEventListener(
        "scroll",
        () => {

            if (!parallaxTicking) {

                requestAnimationFrame(
                    updateSectionParallax
                );

                parallaxTicking = true;
            }

        },
        {
            passive: true
        }
    );

    updateSectionParallax();
}


/* =========================================================
   SMOOTH LINKS
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(href);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const position =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    20;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });
            }
        );
    });


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );

if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.id;

                    navLinks.forEach(link => {

                        const href =
                            link.getAttribute(
                                "href"
                            );

                        link.classList.toggle(
                            "active",
                            href === `#${id}`
                        );
                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );

    sections.forEach(section => {

        sectionObserver.observe(section);

    });
}


/* =========================================================
   MENU LINK HOVER
========================================================= */

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener(
            "mouseenter",
            () => {

                link.style.setProperty(
                    "--link-scale",
                    "1.04"
                );
            }
        );

        link.addEventListener(
            "mouseleave",
            () => {

                link.style.setProperty(
                    "--link-scale",
                    "1"
                );
            }
        );
    });


/* =========================================================
   RIPPLE BUTTONS
========================================================= */

const rippleElements =
    document.querySelectorAll(
        ".button, .plan-button, .event-card a"
    );

rippleElements.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            const rect =
                button.getBoundingClientRect();

            const ripple =
                document.createElement("span");

            ripple.className =
                "click-ripple";

            const size =
                Math.max(
                    rect.width,
                    rect.height
                );

            ripple.style.width =
                `${size}px`;

            ripple.style.height =
                `${size}px`;

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            button.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 700);
        }
    );
});


/* =========================================================
   EYEBROW ENTRY
========================================================= */

const eyebrow =
    document.querySelector(
        ".hero .eyebrow span:last-child"
    );

if (eyebrow && !reducedMotion) {

    eyebrow.style.opacity = "0";

    eyebrow.animate(
        [
            {
                opacity: 0,
                transform:
                    "translateY(12px)"
            },
            {
                opacity: 1,
                transform:
                    "translateY(0)"
            }
        ],
        {
            delay: 500,
            duration: 900,
            easing:
                "cubic-bezier(.22,1,.36,1)",
            fill: "forwards"
        }
    );
}


/* =========================================================
   SCROLL VELOCITY
========================================================= */

let previousScroll =
    window.scrollY;

let previousScrollTime =
    performance.now();

function updateScrollVelocity() {

    const now =
        performance.now();

    const currentScroll =
        window.scrollY;

    const distance =
        Math.abs(
            currentScroll -
            previousScroll
        );

    const time =
        now -
        previousScrollTime;

    const velocity =
        time > 0
            ? distance / time
            : 0;

    document.documentElement.style.setProperty(
        "--scroll-speed",
        Math.min(
            velocity * 2,
            10
        )
    );

    previousScroll =
        currentScroll;

    previousScrollTime =
        now;
}

window.addEventListener(
    "scroll",
    updateScrollVelocity,
    {
        passive: true
    }
);


/* =========================================================
   PREVENT IMAGE DRAGGING
========================================================= */

document
    .querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "dragstart",
            event => {
                event.preventDefault();
            }
        );
    });


/* =========================================================
   PRELOAD / LOADED
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

        setTimeout(() => {

            document.body.classList.add(
                "motion-ready"
            );

        }, 150);
    }
);


/* =========================================================
   RESIZE RESET
========================================================= */

function resetMobileTransforms() {

    if (window.innerWidth <= 768) {

        if (heroVisual) {

            heroVisual.style.setProperty(
                "--mouse-x",
                "0px"
            );

            heroVisual.style.setProperty(
                "--mouse-y",
                "0px"
            );
        }

        if (heroContent) {

            heroContent.style.setProperty(
                "--mouse-x",
                "0px"
            );

            heroContent.style.setProperty(
                "--mouse-y",
                "0px"
            );
        }
    }
}

window.addEventListener(
    "resize",
    resetMobileTransforms
);

resetMobileTransforms();


/* =========================================================
   MOTION EDITION 2.0 — PARTICLES
========================================================= */

if (heroVisual && !reducedMotion) {

    const particleContainer =
        document.createElement("div");

    particleContainer.className =
        "hero-particles";

    for (let i = 0; i < 24; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "hero-particle";

        particle.style.setProperty(
            "--particle-x",
            `${Math.random() * 100}%`
        );

        particle.style.setProperty(
            "--particle-y",
            `${Math.random() * 100}%`
        );

        particle.style.setProperty(
            "--particle-delay",
            `${Math.random() * 4}s`
        );

        particle.style.setProperty(
            "--particle-duration",
            `${3 + Math.random() * 5}s`
        );

        particleContainer.appendChild(
            particle
        );
    }

    heroVisual.appendChild(
        particleContainer
    );
}


/* =========================================================
   HUD ELEMENTS
========================================================= */

if (heroVisual) {

    const hudOne =
        document.createElement("div");

    hudOne.className =
        "hero-hud hud-one";

    hudOne.innerHTML = `
        <strong>KF / 026</strong>
        <span>CREATIVE SYSTEM</span>
    `;


    const hudTwo =
        document.createElement("div");

    hudTwo.className =
        "hero-hud hud-two";

    hudTwo.innerHTML = `
        <strong>REC 01</strong>
        <span>CONTENT ACTIVE</span>
    `;


    const hudThree =
        document.createElement("div");

    hudThree.className =
        "hero-hud hud-three";

    hudThree.innerHTML = `
        <strong>98.7%</strong>
        <span>VISUAL IMPACT</span>
    `;


    heroVisual.appendChild(hudOne);
    heroVisual.appendChild(hudTwo);
    heroVisual.appendChild(hudThree);
}


/* =========================================================
   GEOMETRIC MICRO ELEMENTS
========================================================= */

if (heroVisual && !reducedMotion) {

    for (let i = 0; i < 7; i++) {

        const shape =
            document.createElement("span");

        shape.className =
            "hero-micro-shape";

        shape.style.setProperty(
            "--shape-x",
            `${10 + Math.random() * 80}%`
        );

        shape.style.setProperty(
            "--shape-y",
            `${10 + Math.random() * 80}%`
        );

        shape.style.setProperty(
            "--shape-delay",
            `${Math.random() * 3}s`
        );

        heroVisual.appendChild(shape);
    }
}


/* =========================================================
   SPOTLIGHT
========================================================= */

if (
    hero &&
    finePointer &&
    !reducedMotion
) {

    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left) /
                    rect.width) *
                100;

            const y =
                ((event.clientY - rect.top) /
                    rect.height) *
                100;

            hero.style.setProperty(
                "--spotlight-x",
                `${x}%`
            );

            hero.style.setProperty(
                "--spotlight-y",
                `${y}%`
            );
        }
    );
}


/* =========================================================
   CARD GLARE
========================================================= */

const glareElements =
    document.querySelectorAll(
        ".service-card, .plan, .event-card, .project, .extra, .main-card"
    );

glareElements.forEach(element => {

    if (
        reducedMotion ||
        !finePointer
    ) {
        return;
    }

    element.addEventListener(
        "mousemove",
        event => {

            const rect =
                element.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left) /
                    rect.width) *
                100;

            const y =
                ((event.clientY - rect.top) /
                    rect.height) *
                100;

            element.style.setProperty(
                "--glare-x",
                `${x}%`
            );

            element.style.setProperty(
                "--glare-y",
                `${y}%`
            );
        }
    );
});


/* =========================================================
   MOTION EDITION 2.0 — DEPTH
========================================================= */

const depthElements =
    document.querySelectorAll(
        ".floating-one, .floating-two, .floating-three, .visual-orbit, .main-card"
    );

if (
    hero &&
    depthElements.length &&
    finePointer &&
    !reducedMotion
) {

    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                    rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                    rect.height -
                0.5;

            depthElements.forEach(
                element => {

                    const depth =
                        Number(
                            element.dataset.depth ||
                            1
                        );

                    element.style.setProperty(
                        "--depth-x",
                        `${x * depth * 18}px`
                    );

                    element.style.setProperty(
                        "--depth-y",
                        `${y * depth * 18}px`
                    );
                }
            );
        }
    );
}


/* =========================================================
   HUD STATUS PULSE
========================================================= */

const hudElements =
    document.querySelectorAll(
        ".hero-hud strong"
    );

if (!reducedMotion) {

    hudElements.forEach(element => {

        element.animate(
            [
                {
                    opacity: 0.45
                },
                {
                    opacity: 1
                },
                {
                    opacity: 0.45
                }
            ],
            {
                duration: 2200,
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );
    });
}


/* =========================================================
   LIVE PULSE
========================================================= */

const liveIndicators =
    document.querySelectorAll(".live i");

if (!reducedMotion) {

    liveIndicators.forEach(element => {

        element.animate(
            [
                {
                    transform: "scale(1)",
                    opacity: 1
                },
                {
                    transform: "scale(1.5)",
                    opacity: 0.4
                },
                {
                    transform: "scale(1)",
                    opacity: 1
                }
            ],
            {
                duration: 1400,
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );
    });
}


/* =========================================================
   MARQUEE HOVER
========================================================= */

document
    .querySelectorAll(".marquee")
    .forEach(marquee => {

        marquee.addEventListener(
            "mouseenter",
            () => {

                marquee.classList.add(
                    "marquee-hover"
                );
            }
        );

        marquee.addEventListener(
            "mouseleave",
            () => {

                marquee.classList.remove(
                    "marquee-hover"
                );
            }
        );
    });


/* =========================================================
   HERO HOVER
========================================================= */

if (hero) {

    hero.addEventListener(
        "mouseenter",
        () => {

            hero.classList.add(
                "hero-is-hovered"
            );
        }
    );

    hero.addEventListener(
        "mouseleave",
        () => {

            hero.classList.remove(
                "hero-is-hovered"
            );
        }
    );
}


/* =========================================================
   PROJECT FOCUS
========================================================= */

const projects =
    document.querySelectorAll(".project");

projects.forEach(project => {

    project.addEventListener(
        "mouseenter",
        () => {

            projects.forEach(other => {

                if (other !== project) {

                    other.classList.add(
                        "project-dimmed"
                    );
                }
            });
        }
    );

    project.addEventListener(
        "mouseleave",
        () => {

            projects.forEach(other => {

                other.classList.remove(
                    "project-dimmed"
                );
            });
        }
    );
});


/* =========================================================
   SERVICE FOCUS
========================================================= */

const serviceCards =
    document.querySelectorAll(
        ".service-card"
    );

serviceCards.forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            serviceCards.forEach(other => {

                if (other !== card) {

                    other.classList.add(
                        "service-dimmed"
                    );
                }
            });
        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            serviceCards.forEach(other => {

                other.classList.remove(
                    "service-dimmed"
                );
            });
        }
    );
});


/* =========================================================
   CURSOR EXPAND
========================================================= */

if (cursor) {

    document
        .querySelectorAll(
            ".project, .service-card, .plan, .event-card"
        )
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursor.classList.add(
                        "cursor-expand"
                    );
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {

                    cursor.classList.remove(
                        "cursor-expand"
                    );
                }
            );
        });
}


/* =========================================================
   PLAN HOVER
========================================================= */

document
    .querySelectorAll(".plan")
    .forEach(plan => {

        plan.addEventListener(
            "mouseenter",
            () => {

                plan.classList.add(
                    "plan-hover"
                );
            }
        );

        plan.addEventListener(
            "mouseleave",
            () => {

                plan.classList.remove(
                    "plan-hover"
                );
            }
        );
    });


/* =========================================================
   TYPING EFFECT
========================================================= */

const typingElements =
    document.querySelectorAll(
        "[data-typing]"
    );

typingElements.forEach(element => {

    if (reducedMotion) {
        return;
    }

    const text =
        element.dataset.typing ||
        element.textContent;

    element.textContent = "";

    let index = 0;

    function typeCharacter() {

        if (index >= text.length) {
            return;
        }

        element.textContent +=
            text[index];

        index++;

        setTimeout(
            typeCharacter,
            55
        );
    }

    setTimeout(
        typeCharacter,
        700
    );
});


/* =========================================================
   STATISTIC NUMBERS
========================================================= */

const statNumbers =
    document.querySelectorAll(
        ".stat-number"
    );

statNumbers.forEach(element => {

    const original =
        element.textContent.trim();

    const match =
        original.match(
            /([0-9]+)(.*)/
        );

    if (!match) {
        return;
    }

    const target =
        Number(match[1]);

    const suffix =
        match[2];

    if (reducedMotion) {

        element.textContent =
            `${target}${suffix}`;

        return;
    }

    let startTime = null;

    function animateStat(timestamp) {

        if (!startTime) {
            startTime = timestamp;
        }

        const progress =
            Math.min(
                (timestamp - startTime) / 1400,
                1
            );

        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );

        const value =
            Math.floor(
                target * eased
            );

        element.textContent =
            `${value}${suffix}`;

        if (progress < 1) {

            requestAnimationFrame(
                animateStat
            );

        } else {

            element.textContent =
                `${target}${suffix}`;
        }
    }

    if ("IntersectionObserver" in window) {

        const statObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        requestAnimationFrame(
                            animateStat
                        );

                        statObserver.unobserve(
                            entry.target
                        );
                    });

                },
                {
                    threshold: 0.5
                }
            );

        statObserver.observe(element);

    } else {

        requestAnimationFrame(
            animateStat
        );
    }
});


/* =========================================================
   PRIMARY BUTTON GLOW
========================================================= */

const primaryButtons =
    document.querySelectorAll(
        ".btn-primary, .button-primary, .hero-button"
    );

primaryButtons.forEach(button => {

    button.addEventListener(
        "mouseenter",
        () => {

            button.classList.add(
                "button-glowing"
            );
        }
    );

    button.addEventListener(
        "mouseleave",
        () => {

            button.classList.remove(
                "button-glowing"
            );
        }
    );
});


/* =========================================================
   CONTACT FORM VALIDATION
========================================================= */

const forms =
    document.querySelectorAll("form");

forms.forEach(form => {

    form.addEventListener(
        "submit",
        event => {

            let hasError = false;

            const requiredFields =
                form.querySelectorAll(
                    "[required]"
                );

            requiredFields.forEach(field => {

                const value =
                    field.value.trim();

                if (!value) {

                    hasError = true;

                    field.classList.add(
                        "field-error"
                    );

                } else {

                    field.classList.remove(
                        "field-error"
                    );
                }
            });


            if (hasError) {

                event.preventDefault();

                const firstError =
                    form.querySelector(
                        ".field-error"
                    );

                if (firstError) {

                    firstError.focus();
                }
            }
        }
    );
});


/* =========================================================
   INPUT FOCUS
========================================================= */

document
    .querySelectorAll(
        "input, textarea, select"
    )
    .forEach(input => {

        input.addEventListener(
            "focus",
            () => {

                if (
                    input.parentElement
                ) {

                    input.parentElement.classList.add(
                        "input-focused"
                    );
                }
            }
        );


        input.addEventListener(
            "blur",
            () => {

                if (
                    input.parentElement
                ) {

                    input.parentElement.classList.remove(
                        "input-focused"
                    );
                }
            }
        );
    });


/* =========================================================
   MOBILE DETECTION
========================================================= */

const isMobile =
    window.matchMedia(
        "(max-width: 768px)"
    ).matches;

if (isMobile) {

    document.body.classList.add(
        "mobile-motion"
    );
}


/* =========================================================
   LIGHT MOTION
========================================================= */

if (reducedMotion) {

    document.body.classList.add(
        "motion-light"
    );

    if (cursor) {
        cursor.style.display = "none";
    }

    if (cursorDot) {
        cursorDot.style.display = "none";
    }

    if (hero) {

        hero.style.setProperty(
            "--spotlight-x",
            "50%"
        );

        hero.style.setProperty(
            "--spotlight-y",
            "50%"
        );
    }

    if (heroVisual) {

        heroVisual.style.setProperty(
            "--mouse-x",
            "0px"
        );

        heroVisual.style.setProperty(
            "--mouse-y",
            "0px"
        );
    }

    if (heroContent) {

        heroContent.style.setProperty(
            "--mouse-x",
            "0px"
        );

        heroContent.style.setProperty(
            "--mouse-y",
            "0px"
        );
    }
}


/* =========================================================
   ORIENTATION CHANGE
========================================================= */

window.addEventListener(
    "orientationchange",
    () => {

        setTimeout(() => {

            window.dispatchEvent(
                new Event("resize")
            );

        }, 300);
    }
);


/* =========================================================
   VISIBILITY CHANGE
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        document.body.classList.toggle(
            "page-hidden",
            document.hidden
        );
    }
);


/* =========================================================
   HERO OBSERVER
========================================================= */

if (
    hero &&
    "IntersectionObserver" in window
) {

    const heroObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    hero.classList.toggle(
                        "hero-out",
                        !entry.isIntersecting
                    );
                });

            },
            {
                threshold: 0.05
            }
        );

    heroObserver.observe(hero);
}


/* =========================================================
   FINALIZAÇÃO
========================================================= */

document.documentElement.classList.add(
    "js-enabled"
);

setTimeout(() => {

    document.body.classList.add(
        "js-loaded"
    );

}, 100);


/* =========================================================
   CURSOR READY
========================================================= */

window.addEventListener(
    "mousemove",
    () => {

        document.body.classList.add(
            "cursor-ready"
        );

    },
    {
        once: true,
        passive: true
    }
);


/* =========================================================
   ESC — FECHAR MENU
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            menu &&
            menu.classList.contains("open")
        ) {

            menuBtn.click();
        }
    }
);


/* =========================================================
   FINAL
========================================================= */

console.log(
    "KAUAN FERREIRA — Motion Edition carregado."
);

console.log(
    "Sistema de animações iniciado."
);