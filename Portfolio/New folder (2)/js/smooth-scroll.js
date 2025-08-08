function lerp(start = 0, end = 0, t = 0) {
    return start * (1 - t) + end * t ;
}
class smoothScroll {
    constructor(el,images) {
        this.el = el;

        this.images = images;
        this.currentY = 0;
        this.targetY = 0;
        this.setup() 
        this.onWindowResize();
        this.animate();
    }
    setup() {
        document.body.style.height = `${this.el.offsetHeight}px`;
        window.addEventListener('scroll', () => {
            this.targetY = window.scrollY;
        });
    }
    onWindowResize() {
        window.addEventListener('resize', () => {
            document.body.style.height = `${this.el.offsetHeight}px`;
        });

    }
    animate() {
        this.currentY = lerp(this.currentY, this.targetY, 0.1);
        this.el.style.transform = `translate3d(0, -${this.currentY}px, 0)`;
        for (let i = 0; i < this.images.length; i++) {
            let { top, height } = this.images[i].parentElement.getBoundingClientRect();
            let offset = (top - (window.innerHeight * 0.5 - height * 0.5)) * 0.15;
            let clipOffset = Math.max(0, Math.min(50, offset));
            this.images[i].style.clipPath = `polygon(${clipOffset}% 0, ${100 - clipOffset}% 0, ${100 - clipOffset}% 100%, ${clipOffset}% 100%)`;
        }
        this.images.forEach((img) => {
            img.style.transform = `translate3d(0, ${this.currentY * 0.5}px, 0)`;
        });
        this.images.forEach((img) => {
            img.style.opacity = `${1 - this.currentY / 1000}`;
        });
        requestAnimationFrame(this.animate.bind(this));
    }

}

export {smoothScroll};