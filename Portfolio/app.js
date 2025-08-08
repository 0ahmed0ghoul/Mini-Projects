const hover__div = document.querySelector(".hover__div");
const menu = document.querySelector(".menu");
const linkes = [...document.querySelectorAll("li")];
const pic = document.querySelector(".pic");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`;


class Particle {
  constructor(x, y, effect) {
    this.originX = x;
    this.originY = y;
    this.effect= effect;
    this.x = Math.floor(x);
    this.y = Math.floor(y);
    this.ctx = this.effect.ctx;
    this.ctx.fillStyle = "white";
    this.vx = 0;
    this.vy = 0;
    this.ease = 0.05;
    this.friction = 0.9;
    this.dx = 0;
    this.dy = 0;
    this.distance = 0;
    this.force = 0;
    this.angle = 0;
    this.size = Math.floor(Math.random() * 3) ; // Values: 1 or 2
    this.draw();
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.x,this.y, this.size, this.size); 
  }
  update() {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;
    this.force = -this.effect.mouse.radius / this.distance *8;

    if (this.distance < this.effect.mouse.radius) {
      this.force = (this.effect.mouse.radius - this.distance) / this.effect.mouse.radius;
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += Math.cos(this.angle) * this.force;
      this.vy += Math.sin(this.angle) * this.force;
    } 
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx + (this.originX - this.x) * this.ease;
    this.y += this.vy + (this.originY - this.y) * this.ease;
    
    this.draw();
  }
}

class Effect{
    constructor(width, height, context) {
        this.width = width;
        this.height = height;
        this.ctx = context;
        this.particlesArray = [];
        this.gap =20;
        this.mouse = {
            x: undefined,
            y: undefined,
            radius: 3000,
        };
        window.addEventListener("mousemove", (e) => {
          this.mouse.x = e.clientX  * window.devicePixelRatio;
          this.mouse.y = e.pageY * window.devicePixelRatio;
      });
      window.addEventListener("resize", (e) => {
        canvas.width = window.innerWidth* Window.devicePixelRatio;
        this.width = canvas.width;
        this.height = canvas.height;
        canvas.height = window.innerHeight* Window.devicePixelRatio;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        // this.gap  = window.innerWidth/100;
        this.particlesArray = [];
        this.init();
         
      });
      this.init();
    }    
    init(){
        for(let x = 0; x < this.width;x+= this.gap){
            for(let y = 0; y < this.height; y+=this.gap){
                this.particlesArray.push(new Particle(x, y,this));
            }
        }

    }
    update(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        for(let i = 0; i < this.particlesArray.length; i++){
            this.particlesArray[i].update();
        }
    }
}

let effect = new Effect(canvas.width, canvas.height, ctx);
function animate() {effect.update();requestAnimationFrame(animate);}
animate();

let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 400);
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50);
            });
        }, 2000);

        setTimeout(() => {
            intro.style.top = '-100vh';
        }, 2300);
    });
    setTimeout(() => {
      pic.style.animation = 'appear 1.2s ease-out forwards';
  }, 2300);
}
);

const randomLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

menu.addEventListener("mouseenter", (e) => {hover__div.classList.add("active");});
menu.addEventListener("mouseleave", (e) => {hover__div.classList.remove("active");});

class Link {
  constructor(el, idx) {
    this.el = el;
    this.idx = idx;
    this.originalString = el.innerText;
    this.randomString = this.el.innerText.split("");
    this.frame = 0;
    this.addHoverEvent();
  }
  addHoverEvent() {
    this.el.addEventListener("mouseenter", (e) => {
      hover__div.style.transform = `translateY(${this.idx * 48}px) `; //translateY(${this.idx* 100}px)
      this.animate();
    });
    this.el.addEventListener("mouseleave", (e) => {
      this.frame = 0;
      this.el.innerText = this.originalString;
    });
  }
  animate() {
    if (this.frame < 30) {
      if (this.frame % 3 == 0) {
        for (let i = 0; i < this.randomString.length; i++) {
          this.randomString[i] =
            randomLetters[Math.floor(Math.random() * randomLetters.length)];
        }
        this.el.innerText = this.randomString.join("");
      }
      this.frame++;
      requestAnimationFrame(this.animate.bind(this));
    }else{
        this.el.innerText = this.originalString;
        this.frame = 0;
    }
  }
}

linkes.forEach((el, idx) => {new Link(el, idx);});
