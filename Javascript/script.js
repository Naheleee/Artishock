const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".sections");
const gradientSymbols = document.querySelectorAll(".gradient-symbol1, .gradient-symbol2");

gradientSymbols.forEach((symbol) => {
    const gradientSquares = symbol.querySelectorAll("span");
    gradientSquares.forEach((square, index) => {
        const position = gradientSquares.length > 1
            ? index / (gradientSquares.length - 1) * 100
            : 0;
        square.style.setProperty("--gradient-position", `${position}%`);
    });
});

const updateActiveLink = () => {
    const viewportCenter = window.innerHeight / 2;
    const activeSection = Array.from(sections).find((section) => {
        const {
            top,
            bottom
        } = section.getBoundingClientRect();
        return top <= viewportCenter && bottom > viewportCenter;
    });

    if (!activeSection) return;

    navLinks.forEach((link) => {
        const isActive = link.hash === `#${activeSection.id}`;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
};

window.addEventListener("scroll", updateActiveLink, {
    passive: true
});
window.addEventListener("resize", updateActiveLink);
updateActiveLink();