/* =========================================================
   KAUAN FERREIRA
   SCRIPT PREMIUM — MOTION EDITION
   ========================================================= */

"use strict";

/* =========================================================
   ELEMENTOS PRINCIPAIS
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
   SCROLL + HEADER + PROGRESSO
========================================================= */

let ticking = false;

function handleScroll() {

    const scrollY = window.scrollY;

    if (header) {
        header.classList.toggle(
            "scrolled",
            scrollY > 40
        );
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
            `scaleX(${percentage})`;
    }

    if (!reducedMotion) {

        const hero = document.querySelector(".hero");

        if (hero) {

            const heroVisual =
                document.querySelector(".hero-visual");

            const heroContent =
                document.querySelector(".hero-content");

            const amount =
                Math.min(scrollY * 0.08, 70);

            if (heroVisual) {

                heroVisual.style.setProperty(
                    "--scroll-offset",
                    `${amount}px`
                );
            }

            if (heroContent) {

                heroContent.style.setProperty(
                    "--scroll-offset",
                    `${amount * 0.35}px`
                );
            }
        }
    }

    ticking = false;
}

window.addEventListener(
    "scroll",
    () => {

        if (!ticking) {

            window.requestAnimationFrame(
                handleScroll
            );

            ticking = true;
        }
    },
    {
        passive: true
    }
);

handleScroll();


/* =========================================================
   MENU MOBILE
========================================================= */

if (menuBtn && menu) {

    menuBtn.addEventListener(
        "click",
        () => {

            const isOpen =
                menu.classList.toggle("open");

            menuBtn.classList.toggle(
                "active",
                isOpen
            );

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.classList.toggle(
                "no-scroll",
                isOpen
            );
        }
    );

    menu.querySelectorAll("a").forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    menu.classList.remove(
                        "open"
                    );

                    menuBtn.classList.remove(
                        "active"
                    );

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    document.body.classList.remove(
                        "no-scroll"
                    );
                }
            );
        }
    );
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
                    setTimeout(() => entry.target.classList.add("done"), 1300);

                    revealObserver.unobserve(
                        entry.target
                    );
                });

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -70px 0px"
            }
        );

    revealElements.forEach(
        element => {

            revealObserver.observe(element);
        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add("in");
        }
    );
}


/* =========================================================
   CONTADORES
========================================================= */

const counters =
    document.querySelectorAll("[data-count]");

function animateCounter(element) {

    const target =
        Number(element.dataset.count);

    if (!Number.isFinite(target)) {
        return;
    }

    const duration = 1600;
    const startTime = performance.now();

    function update(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progressValue =
            Math.min(
                elapsed / duration,
                1
            );

        const eased =
            1 -
            Math.pow(
                1 - progressValue,
                3
            );

        const current =
            Math.floor(
                target * eased
            );

        element.textContent =
            `+${current}`;

        if (progressValue < 1) {

            requestAnimationFrame(update);

        } else {

            element.textContent =
                `+${target}`;
        }
    }

    requestAnimationFrame(update);
}

if ("IntersectionObserver" in window) {

    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    animateCounter(
                        entry.target
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

    counters.forEach(
        counter => {

            counterObserver.observe(counter);
        }
    );

} else {

    counters.forEach(
        counter => {

            counter.textContent =
                `+${counter.dataset.count}`;
        }
    );
}


/* =========================================================
   CURSOR PREMIUM
========================================================= */

if (
    cursor &&
    cursorDot &&
    finePointer &&
    !reducedMotion
) {

    let mouseX =
        window.innerWidth / 2;

    let mouseY =
        window.innerHeight / 2;

    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;
        },
        {
            passive: true
        }
    );

    function animateCursor() {

        cursorX +=
            (mouseX - cursorX) * 0.14;

        cursorY +=
            (mouseY - cursorY) * 0.14;

        cursor.style.left =
            `${cursorX}px`;

        cursor.style.top =
            `${cursorY}px`;

        requestAnimationFrame(
            animateCursor
        );
    }

    animateCursor();


    const interactiveElements =
        document.querySelectorAll(
            `
            a,
            button,
            .project,
            .service-card,
            .plan,
            .event-card,
            .extra,
            .process-step
            `
        );

    interactiveElements.forEach(
        element => {

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
        }
    );
}


/* =========================================================
   BOTÕES MAGNÉTICOS
========================================================= */

const magneticButtons =
    document.querySelectorAll(".magnetic");

if (
    finePointer &&
    !reducedMotion
) {

    magneticButtons.forEach(
        button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    button.style.transform =
                        `
                        translate(
                            ${x * 0.12}px,
                            ${y * 0.12}px
                        )
                        `;
                }
            );

            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform = "";
                }
            );
        }
    );
}


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
    finePointer &&
    !reducedMotion
) {

    let heroMouseX = 0;
    let heroMouseY = 0;

    let currentHeroX = 0;
    let currentHeroY = 0;

    let heroAnimation = false;

    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();

            heroMouseX =
                (
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5
                );

            heroMouseY =
                (
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5
                );

            if (!heroAnimation) {

                heroAnimation = true;

                requestAnimationFrame(
                    animateHero
                );
            }
        },
        {
            passive: true
        }
    );

    function animateHero() {

        currentHeroX +=
            (heroMouseX - currentHeroX) *
            0.08;

        currentHeroY +=
            (heroMouseY - currentHeroY) *
            0.08;

        heroVisual.style.setProperty(
            "--mouse-x",
            `${currentHeroX * 18}px`
        );

        heroVisual.style.setProperty(
            "--mouse-y",
            `${currentHeroY * 18}px`
        );

        if (heroContent) {

            heroContent.style.setProperty(
                "--mouse-x",
                `${currentHeroX * -8}px`
            );

            heroContent.style.setProperty(
                "--mouse-y",
                `${currentHeroY * -8}px`
            );
        }

        if (
            Math.abs(heroMouseX - currentHeroX) > 0.001 ||
            Math.abs(heroMouseY - currentHeroY) > 0.001
        ) {

            requestAnimationFrame(
                animateHero
            );

        } else {

            heroAnimation = false;
        }
    }
}


/* =========================================================
   TILT PREMIUM DOS CARDS
========================================================= */

if (
    finePointer &&
    !reducedMotion
) {

    const tiltCards =
        document.querySelectorAll(
            ".service-card, .project, .plan, .event-card, .extra"
        );

    tiltCards.forEach(
        card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) /
                            centerY) *
                        -5;

                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        5;

                    card.style.transform =
                        `
                        perspective(900px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-4px)
                        `;
                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";
                }
            );
        }
    );
}


/* =========================================================
   MARQUEE
========================================================= */

const marqueeTrack =
    document.querySelector(".marquee-track");

if (
    marqueeTrack &&
    !reducedMotion
) {

    marqueeTrack.animate(
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
}


/* =========================================================
   PARALLAX DAS SEÇÕES
========================================================= */

if (
    !reducedMotion &&
    finePointer
) {

    const parallaxElements =
        document.querySelectorAll(
            `
            .statement-content,
            .section-intro,
            .events-heading,
            .extras-heading,
            .process-heading
            `
        );

    let parallaxRAF = null;

    function updateSectionParallax() {

        const viewportCenter =
            window.innerHeight / 2;

        parallaxElements.forEach(
            element => {

                const rect =
                    element.getBoundingClientRect();

                const elementCenter =
                    rect.top +
                    rect.height / 2;

                const distance =
                    elementCenter -
                    viewportCenter;

                const movement =
                    distance * -0.025;

                element.style.setProperty(
                    "--parallax-y",
                    `${movement}px`
                );
            }
        );

        parallaxRAF = null;
    }

    window.addEventListener(
        "scroll",
        () => {

            if (!parallaxRAF) {

                parallaxRAF =
                    requestAnimationFrame(
                        updateSectionParallax
                    );
            }
        },
        {
            passive: true
        }
    );

    updateSectionParallax();
}


/* =========================================================
   LINKS SUAVES
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target
                            .getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight -
                        20;

                    window.scrollTo({
                        top:
                            targetPosition,
                        behavior:
                            "smooth"
                    });
                }
            );
        }
    );


/* =========================================================
   NAVEGAÇÃO ATIVA
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
    "IntersectionObserver" in window &&
    sections.length
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        navLinks.forEach(
                            link => {

                                link.classList.remove(
                                    "active"
                                );

                                if (
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${entry.target.id}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );
                                }
                            }
                        );
                    }
                );
            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );

    sections.forEach(
        section => {

            sectionObserver.observe(
                section
            );
        }
    );
}


/* =========================================================
   HOVER NOS LINKS DO MENU
========================================================= */

if (
    finePointer &&
    !reducedMotion
) {

    navLinks.forEach(
        link => {

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
        }
    );
}


/* =========================================================
   RIPPLE NOS BOTÕES
========================================================= */

if (!reducedMotion) {

    const buttons =
        document.querySelectorAll(
            `
            .button,
            .plan-button,
            .event-card a
            `
        );

    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const ripple =
                        document.createElement(
                            "span"
                        );

                    ripple.className =
                        "click-ripple";

                    ripple.style.left =
                        `${event.clientX - rect.left}px`;

                    ripple.style.top =
                        `${event.clientY - rect.top}px`;

                    button.appendChild(
                        ripple
                    );

                    setTimeout(
                        () => {

                            ripple.remove();

                        },
                        700
                    );
                }
            );
        }
    );
}


/* =========================================================
   EFEITO DE ENTRADA NO EYEBROW
========================================================= */

if (
    !reducedMotion &&
    window.innerWidth > 768
) {

    const eyebrow =
        document.querySelector(
            ".hero .eyebrow span:last-child"
        );

    if (eyebrow) {

        eyebrow.style.opacity = "0";

        setTimeout(
            () => {

                eyebrow.style.opacity = "1";

                eyebrow.animate(
                    [
                        {
                            opacity: 0,
                            transform:
                                "translateY(8px)"
                        },
                        {
                            opacity: 1,
                            transform:
                                "translateY(0)"
                        }
                    ],
                    {
                        duration: 900,
                        easing:
                            "cubic-bezier(.16,1,.3,1)",
                        fill: "forwards"
                    }
                );

            },
            500
        );
    }
}


/* =========================================================
   SCROLL VELOCITY
========================================================= */

if (!reducedMotion) {

    let lastScroll =
        window.scrollY;

    let scrollVelocity = 0;

    let velocityRAF = null;

    function updateScrollVelocity() {

        const current =
            window.scrollY;

        scrollVelocity =
            current -
            lastScroll;

        lastScroll =
            current;

        document.documentElement.style.setProperty(
            "--scroll-speed",
            `${Math.min(
                Math.abs(scrollVelocity),
                20
            )}`
        );

        velocityRAF = null;
    }

    window.addEventListener(
        "scroll",
        () => {

            if (!velocityRAF) {

                velocityRAF =
                    requestAnimationFrame(
                        updateScrollVelocity
                    );
            }
        },
        {
            passive: true
        }
    );
}


/* =========================================================
   IMPEDIR ARRASTAR IMAGENS
========================================================= */

document
    .querySelectorAll("img")
    .forEach(
        image => {

            image.addEventListener(
                "dragstart",
                event => {

                    event.preventDefault();
                }
            );
        }
    );


/* =========================================================
   PRELOAD VISUAL
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

        setTimeout(
            () => {

                document.body.classList.add(
                    "motion-ready"
                );

            },
            150
        );
    }
);


/* =========================================================
   RESET AO REDIMENSIONAR
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth <= 768) {

            if (heroVisual) {
                heroVisual.style.transform =
                    "";
            }

            if (heroContent) {
                heroContent.style.transform =
                    "";
            }
        }
    },
    {
        passive: true
    }
);


/* =========================================================
   MOTION EDITION 2.0
   CYBER HERO SYSTEM
========================================================= */

if (!reducedMotion) {

    /* =====================================================
       PARTÍCULAS DO HERO
    ===================================================== */

    const heroVisualLayer =
        document.querySelector(
            ".hero-visual"
        );

    if (heroVisualLayer) {

        const particleLayer =
            document.createElement(
                "div"
            );

        particleLayer.className =
            "hero-particle-layer";

        particleLayer.setAttribute(
            "aria-hidden",
            "true"
        );

        heroVisualLayer.appendChild(
            particleLayer
        );


        for (let i = 0; i < 24; i++) {

            const particle =
                document.createElement(
                    "span"
                );

            particle.className =
                "hero-particle";

            particle.style.setProperty(
                "--particle-x",
                `${8 + Math.random() * 84}%`
            );

            particle.style.setProperty(
                "--particle-y",
                `${5 + Math.random() * 90}%`
            );

            particle.style.setProperty(
                "--particle-size",
                `${1 + Math.random() * 3}px`
            );

            particle.style.setProperty(
                "--particle-delay",
                `${Math.random() * 5}s`
            );

            particle.style.setProperty(
                "--particle-duration",
                `${3 + Math.random() * 5}s`
            );

            particle.style.setProperty(
                "--particle-depth",
                `${0.4 + Math.random() * 1.2}`
            );

            particleLayer.appendChild(
                particle
            );
        }


        /* =================================================
           HUDs AUTOMÁTICOS
        ================================================= */

        const hudData = [

            {
                className:
                    "hud-one",

                code:
                    "KF / 026",

                label:
                    "CREATIVE SYSTEM"
            },

            {
                className:
                    "hud-two",

                code:
                    "REC 01",

                label:
                    "CONTENT ACTIVE"
            },

            {
                className:
                    "hud-three",

                code:
                    "98.7%",

                label:
                    "VISUAL IMPACT"
            }
        ];


        hudData.forEach(
            data => {

                const hud =
                    document.createElement(
                        "div"
                    );

                hud.className =
                    `hero-hud ${data.className}`;

                hud.setAttribute(
                    "aria-hidden",
                    "true"
                );

                hud.innerHTML = `
                    <span class="hud-status"></span>

                    <div>
                        <strong>
                            ${data.code}
                        </strong>

                        <small>
                            ${data.label}
                        </small>
                    </div>
                `;

                heroVisualLayer.appendChild(
                    hud
                );
            }
        );


        /* =================================================
           MICRO ELEMENTOS GEOMÉTRICOS
        ================================================= */

        for (let i = 0; i < 7; i++) {

            const shape =
                document.createElement(
                    "span"
                );

            shape.className =
                "hero-geometry";

            shape.setAttribute(
                "aria-hidden",
                "true"
            );

            shape.style.setProperty(
                "--geo-x",
                `${5 + Math.random() * 90}%`
            );

            shape.style.setProperty(
                "--geo-y",
                `${5 + Math.random() * 88}%`
            );

            shape.style.setProperty(
                "--geo-delay",
                `${Math.random() * 4}s`
            );

            shape.style.setProperty(
                "--geo-duration",
                `${6 + Math.random() * 6}s`
            );

            heroVisualLayer.appendChild(
                shape
            );
        }
    }


    /* =====================================================
       SPOTLIGHT QUE SEGUE O MOUSE
    ===================================================== */

    if (
        hero &&
        finePointer
    ) {

        let spotlightRAF = null;

        let spotlightX = 50;
        let spotlightY = 50;

        let targetSpotlightX = 50;
        let targetSpotlightY = 50;


        hero.addEventListener(
            "mousemove",
            event => {

                const rect =
                    hero.getBoundingClientRect();

                targetSpotlightX =
                    (
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width
                    ) * 100;

                targetSpotlightY =
                    (
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height
                    ) * 100;


                if (!spotlightRAF) {

                    spotlightRAF =
                        requestAnimationFrame(
                            updateSpotlight
                        );
                }
            },
            {
                passive: true
            }
        );


        function updateSpotlight() {

            spotlightX +=
                (
                    targetSpotlightX -
                    spotlightX
                ) * 0.12;

            spotlightY +=
                (
                    targetSpotlightY -
                    spotlightY
                ) * 0.12;


            hero.style.setProperty(
                "--spotlight-x",
                `${spotlightX}%`
            );

            hero.style.setProperty(
                "--spotlight-y",
                `${spotlightY}%`
            );


            spotlightRAF = null;


            if (
                Math.abs(
                    targetSpotlightX -
                    spotlightX
                ) > 0.1 ||

                Math.abs(
                    targetSpotlightY -
                    spotlightY
                ) > 0.1
            ) {

                spotlightRAF =
                    requestAnimationFrame(
                        updateSpotlight
                    );
            }
        }
    }


    /* =====================================================
       GLARE DINÂMICO NOS CARDS
    ===================================================== */

    if (finePointer) {

        const interactiveCards =
            document.querySelectorAll(
                `
                .service-card,
                .plan,
                .event-card,
                .project,
                .extra,
                .main-card
                `
            );


        interactiveCards.forEach(
            card => {

                card.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            card.getBoundingClientRect();

                        const x =
                            (
                                (
                                    event.clientX -
                                    rect.left
                                ) /
                                rect.width
                            ) * 100;

                        const y =
                            (
                                (
                                    event.clientY -
                                    rect.top
                                ) /
                                rect.height
                            ) * 100;


                        card.style.setProperty(
                            "--glare-x",
                            `${x}%`
                        );

                        card.style.setProperty(
                            "--glare-y",
                            `${y}%`
                        );
                    },
                    {
                        passive: true
                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.setProperty(
                            "--glare-x",
                            "50%"
                        );

                        card.style.setProperty(
                            "--glare-y",
                            "50%"
                        );
                    }
                );
            }
        );
    }
}

/* =========================================================
   MOTION EDITION 2.0 — PROFUNDIDADE DO HERO
========================================================= */

if (
    !reducedMotion &&
    finePointer
) {

    const depthElements =
        document.querySelectorAll(
            `
            .floating-one,
            .floating-two,
            .floating-three,
            .visual-orbit,
            .main-card
            `
        );

    if (depthElements.length) {

        let depthMouseX = 0;
        let depthMouseY = 0;

        let currentDepthX = 0;
        let currentDepthY = 0;

        let depthFrame = null;


        if (hero) {

            hero.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        hero.getBoundingClientRect();

                    depthMouseX =
                        (
                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width -
                            0.5
                        );

                    depthMouseY =
                        (
                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height -
                            0.5
                        );


                    if (!depthFrame) {

                        depthFrame =
                            requestAnimationFrame(
                                animateDepth
                            );
                    }
                },
                {
                    passive: true
                }
            );
        }


        function animateDepth() {

            currentDepthX +=
                (
                    depthMouseX -
                    currentDepthX
                ) * 0.07;

            currentDepthY +=
                (
                    depthMouseY -
                    currentDepthY
                ) * 0.07;


            depthElements.forEach(
                (element, index) => {

                    const depth =
                        1 +
                        index * 0.35;

                    const x =
                        currentDepthX *
                        12 *
                        depth;

                    const y =
                        currentDepthY *
                        10 *
                        depth;


                    element.style.setProperty(
                        "--depth-x",
                        `${x}px`
                    );

                    element.style.setProperty(
                        "--depth-y",
                        `${y}px`
                    );
                }
            );


            depthFrame = null;


            if (
                Math.abs(
                    depthMouseX -
                    currentDepthX
                ) > 0.001 ||

                Math.abs(
                    depthMouseY -
                    currentDepthY
                ) > 0.001
            ) {

                depthFrame =
                    requestAnimationFrame(
                        animateDepth
                    );
            }
        }
    }
}


/* =========================================================
   PULSO DOS INDICADORES HUD
========================================================= */

if (!reducedMotion) {

    const hudIndicators =
        document.querySelectorAll(
            ".hud-status"
        );

    hudIndicators.forEach(
        (indicator, index) => {

            indicator.animate(
                [
                    {
                        opacity: 0.35,
                        transform:
                            "scale(0.8)"
                    },

                    {
                        opacity: 1,
                        transform:
                            "scale(1.15)"
                    },

                    {
                        opacity: 0.35,
                        transform:
                            "scale(0.8)"
                    }
                ],
                {
                    duration:
                        1600 +
                        index * 250,

                    delay:
                        index * 300,

                    iterations:
                        Infinity,

                    easing:
                        "ease-in-out"
                }
            );
        }
    );
}


/* =========================================================
   EFEITO LIVE
========================================================= */

const liveIndicators =
    document.querySelectorAll(
        ".live i"
    );

if (
    liveIndicators.length &&
    !reducedMotion
) {

    liveIndicators.forEach(
        indicator => {

            indicator.animate(
                [
                    {
                        opacity: 0.3,
                        transform:
                            "scale(0.7)"
                    },

                    {
                        opacity: 1,
                        transform:
                            "scale(1.2)"
                    },

                    {
                        opacity: 0.3,
                        transform:
                            "scale(0.7)"
                    }
                ],
                {
                    duration: 1800,
                    iterations: Infinity,
                    easing: "ease-in-out"
                }
            );
        }
    );
}


/* =========================================================
   MARQUEE — HOVER
========================================================= */

const marquee =
    document.querySelector(
        ".marquee"
    );

if (
    marquee &&
    marqueeTrack
) {

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
}


/* =========================================================
   HOVER GERAL NO HERO
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
   EFEITO DE FOCO NOS PROJETOS
========================================================= */

if (
    !reducedMotion &&
    finePointer
) {

    const projects =
        document.querySelectorAll(
            ".project"
        );


    projects.forEach(
        project => {

            project.addEventListener(
                "mouseenter",
                () => {

                    projects.forEach(
                        other => {

                            if (
                                other !==
                                project
                            ) {

                                other.classList.add(
                                    "project-dimmed"
                                );
                            }
                        }
                    );
                }
            );


            project.addEventListener(
                "mouseleave",
                () => {

                    projects.forEach(
                        other => {

                            other.classList.remove(
                                "project-dimmed"
                            );
                        }
                    );
                }
            );
        }
    );
}


/* =========================================================
   EFEITO DE FOCO NOS SERVIÇOS
========================================================= */

if (
    !reducedMotion &&
    finePointer
) {

    const services =
        document.querySelectorAll(
            ".service-card"
        );


    services.forEach(
        service => {

            service.addEventListener(
                "mouseenter",
                () => {

                    services.forEach(
                        other => {

                            if (
                                other !==
                                service
                            ) {

                                other.classList.add(
                                    "service-dimmed"
                                );
                            }
                        }
                    );
                }
            );


            service.addEventListener(
                "mouseleave",
                () => {

                    services.forEach(
                        other => {

                            other.classList.remove(
                                "service-dimmed"
                            );
                        }
                    );
                }
            );
        }
    );
}


/* =========================================================
   CURSOR — TEXTO DE AÇÃO
========================================================= */

if (
    cursor &&
    finePointer &&
    !reducedMotion
) {

    const cursorTargets =
        document.querySelectorAll(
            `
            .project,
            .service-card,
            .plan,
            .event-card
            `
        );


    cursorTargets.forEach(
        element => {

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
        }
    );
}


/* =========================================================
   HOVER DOS PLANOS
========================================================= */

if (
    !reducedMotion &&
    finePointer
) {

    const plans =
        document.querySelectorAll(
            ".plan"
        );


    plans.forEach(
        plan => {

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
        }
    );
}


/* =========================================================
   EFEITO DE TEXTO DIGITANDO
========================================================= */

const typingElements =
    document.querySelectorAll(
        "[data-typing]"
    );


if (
    typingElements.length &&
    !reducedMotion
) {

    typingElements.forEach(
        element => {

            const text =
                element.dataset.typing;

            if (!text) {
                return;
            }

            element.textContent = "";

            let index = 0;

            function typeCharacter() {

                if (
                    index >=
                    text.length
                ) {

                    return;
                }

                element.textContent +=
                    text.charAt(index);

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
        }
    );
}


/* =========================================================
   NÚMEROS / ESTATÍSTICAS COM EFEITO
========================================================= */

const statisticNumbers =
    document.querySelectorAll(
        ".stat-number"
    );


if (
    statisticNumbers.length &&
    "IntersectionObserver" in window
) {

    const statisticObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        const element =
                            entry.target;

                        const finalValue =
                            element.textContent;

                        const numericValue =
                            parseFloat(
                                finalValue.replace(
                                    /[^0-9.]/g,
                                    ""
                                )
                            );

                        if (
                            Number.isNaN(
                                numericValue
                            )
                        ) {
                            return;
                        }

                        const suffix =
                            finalValue.replace(
                                /[0-9.]/g,
                                ""
                            );

                        let start =
                            0;

                        const duration =
                            1400;

                        const startTime =
                            performance.now();


                        function count(
                            currentTime
                        ) {

                            const progressValue =
                                Math.min(
                                    (
                                        currentTime -
                                        startTime
                                    ) /
                                    duration,
                                    1
                                );


                            const eased =
                                1 -
                                Math.pow(
                                    1 -
                                    progressValue,
                                    3
                                );


                            start =
                                numericValue *
                                eased;


                            element.textContent =
                                `${Math.floor(
                                    start
                                )}${suffix}`;


                            if (
                                progressValue <
                                1
                            ) {

                                requestAnimationFrame(
                                    count
                                );

                            } else {

                                element.textContent =
                                    finalValue;
                            }
                        }


                        requestAnimationFrame(
                            count
                        );


                        statisticObserver.unobserve(
                            element
                        );
                    }
                );
            },
            {
                threshold: 0.6
            }
        );


    statisticNumbers.forEach(
        number => {

            statisticObserver.observe(
                number
            );
        }
    );
}


/* =========================================================
   EFEITO DE BRILHO NO BOTÃO PRINCIPAL
========================================================= */

const primaryButtons =
    document.querySelectorAll(
        `
        .btn-primary,
        .button-primary,
        .hero-button
        `
    );


if (
    primaryButtons.length &&
    !reducedMotion
) {

    primaryButtons.forEach(
        button => {

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
        }
    );
}


/* =========================================================
   FORMULÁRIO DE CONTATO
========================================================= */

const contactForm =
    document.querySelector(
        "form"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            const requiredFields =
                contactForm.querySelectorAll(
                    "[required]"
                );

            let valid = true;


            requiredFields.forEach(
                field => {

                    if (
                        !field.value.trim()
                    ) {

                        valid = false;

                        field.classList.add(
                            "field-error"
                        );

                    } else {

                        field.classList.remove(
                            "field-error"
                        );
                    }
                }
            );


            if (!valid) {

                event.preventDefault();

                const firstError =
                    contactForm.querySelector(
                        ".field-error"
                    );

                if (firstError) {

                    firstError.focus();
                }
            }
        }
    );
}


/* =========================================================
   INPUTS — EFEITO PREMIUM
========================================================= */

const inputs =
    document.querySelectorAll(
        `
        input,
        textarea,
        select
        `
    );


if (
    inputs.length &&
    !reducedMotion
) {

    inputs.forEach(
        input => {

            input.addEventListener(
                "focus",
                () => {

                    input.parentElement?.classList.add(
                        "input-focused"
                    );
                }
            );


            input.addEventListener(
                "blur",
                () => {

                    input.parentElement?.classList.remove(
                        "input-focused"
                    );
                }
            );
        }
    );
}


/* =========================================================
   DETECÇÃO DE MOBILE
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
   MOBILE — DESATIVAR EFEITOS PESADOS
========================================================= */

if (
    isMobile ||
    reducedMotion
) {

    document.body.classList.add(
        "motion-light"
    );


    if (cursor) {
        cursor.style.display =
            "none";
    }


    if (cursorDot) {
        cursorDot.style.display =
            "none";
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
}


/* =========================================================
   ORIENTAÇÃO DO DISPOSITIVO
========================================================= */

window.addEventListener(
    "orientationchange",
    () => {

        setTimeout(
            () => {

                window.dispatchEvent(
                    new Event("resize")
                );

            },
            300
        );
    },
    {
        passive: true
    }
);


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            document.body.classList.add(
                "page-hidden"
            );

        } else {

            document.body.classList.remove(
                "page-hidden"
            );
        }
    }
);


/* =========================================================
   PERFORMANCE — PAUSAR ANIMAÇÕES PESADAS
========================================================= */

if (
    !reducedMotion &&
    "IntersectionObserver" in window
) {

    const heroObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            document.body.classList.remove(
                                "hero-out"
                            );

                        } else {

                            document.body.classList.add(
                                "hero-out"
                            );
                        }
                    }
                );
            },
            {
                threshold: 0.05
            }
        );


    if (hero) {

        heroObserver.observe(
            hero
        );
    }
}


/* =========================================================
   FINALIZAÇÃO
========================================================= */

document.documentElement.classList.add(
    "js-enabled"
);


setTimeout(
    () => {

        document.body.classList.add(
            "js-loaded"
        );

    },
    100
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c KAUAN FERREIRA ",
    `
    background: #07111f;
    color: #45b8ff;
    padding: 8px 14px;
    border-radius: 6px;
    font-weight: 800;
    `
);

console.log(
    "%c MOTION EDITION 2.0 ATIVO ",
    `
    color: #45b8ff;
    font-weight: 700;
    `
);

/* Correções v2 */
window.addEventListener("mousemove", () => document.body.classList.add("cursor-ready"), { once: true, passive: true });
document.addEventListener("keydown", e => {
    if (e.key === "Escape" && menu && menu.classList.contains("open")) menuBtn.click();
});