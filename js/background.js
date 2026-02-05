class Wave {
    constructor(canv, color, amplitude, wavelength, speed) {
        this.canv = canv;
        this.ctx = canv.getContext('2d');
        this.color = color;
        this.amplitude = amplitude;
        this.wavelength = wavelength;
        this.speed = speed;
        this.increment = Math.random() * 100; // Random starting phase
    }

    draw(time) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;

        // Move wave over time
        this.increment += this.speed;

        this.ctx.moveTo(0, this.canv.height);

        for (let i = 0; i <= this.canv.width; i += 10) {
            // Sine wave formula: y = amplitude * sin(frequency * x + phase)
            const y = this.canv.height / 2 +
                Math.sin(i * this.wavelength + this.increment) * this.amplitude * Math.sin(this.increment * 0.1);
            // The second sin creates a "breathing" amplitude effect
            this.ctx.lineTo(i, y);
        }

        this.ctx.lineTo(this.canv.width, this.canv.height);
        this.ctx.lineTo(0, this.canv.height);
        this.ctx.closePath();
        this.ctx.fill();
    }
}

class BackgroundAnimation {
    constructor() {
        this.canvas = document.getElementById('bg-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.waves = [];

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.initWaves();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initWaves() {
        // Brand Colors with very low opacity for subtle background
        const colors = [
            'rgba(26, 35, 50, 0.5)',   // Marine (Base)
            'rgba(230, 57, 70, 0.05)', // Red
            'rgba(247, 127, 0, 0.05)', // Orange
            'rgba(252, 191, 73, 0.05)', // Yellow
            'rgba(56, 189, 248, 0.05)'  // Light Blue (Subtle Premium Accent)
        ];

        this.waves.push(new Wave(this.canvas, colors[0], 100, 0.005, 0.002));
        this.waves.push(new Wave(this.canvas, colors[1], 150, 0.003, 0.005));
        this.waves.push(new Wave(this.canvas, colors[2], 200, 0.002, 0.003));
        this.waves.push(new Wave(this.canvas, colors[3], 250, 0.004, -0.002));
        this.waves.push(new Wave(this.canvas, colors[4], 300, 0.003, 0.004)); // Light Blue Wave
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw each wave
        this.waves.forEach(wave => wave.draw());

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BackgroundAnimation();
});
