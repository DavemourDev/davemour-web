document.addEventListener('DOMContentLoaded', function() {

    const canvas = document.querySelector('#background>canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Shape {
        constructor(x, y, dx, dy, size, color, rotation) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.size = size;
            this.color = color;
            this.rotation = rotation;
        }

        update() {
            if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;
            this.rotation += 0.01; // Increment the rotation for animation
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.fillStyle = this.color;
        }
    }

    class Circle extends Shape {
        draw() {
            super.draw();
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    class Square extends Shape {
        draw() {
            super.draw();
            ctx.beginPath();
            ctx.rect(-this.size, -this.size, this.size * 2, this.size * 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    class Triangle extends Shape {
        draw() {
            super.draw();
            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.lineTo(-this.size, this.size);
            ctx.lineTo(this.size, this.size);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    const shapesArray = [];

    function init() {

        const SPEED = 1.25;
        const SIZE = 50;
        const NUM_PARTICLES = 50;

        for (let i = 0; i < NUM_PARTICLES; i++) {
            const size = Math.random() * SIZE + 5;
            const x = Math.random() * (canvas.width - size * 2) + size;
            const y = Math.random() * (canvas.height - size * 2) + size;
            const dx = (Math.random() - 0.5) * SPEED;
            const dy = (Math.random() - 0.5) * SPEED;
            const color = `hsla(${Math.random() * 360}, 50%, 75%, 25%)`;
            const rotation = Math.random() * Math.PI * 2; // Random initial rotation
            const type = Math.floor(Math.random() * 3);

            if (type === 0) {
                shapesArray.push(new Circle(x, y, dx, dy, size, color, rotation));
            } else if (type === 1) {
                shapesArray.push(new Square(x, y, dx, dy, size, color, rotation));
            } else {
                shapesArray.push(new Triangle(x, y, dx, dy, size, color, rotation));
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        shapesArray.forEach(shape => {
            shape.update();
            shape.draw();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    init();
    animate();
});