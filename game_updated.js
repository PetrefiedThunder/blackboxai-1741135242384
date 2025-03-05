const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5
};

let bullets = [];

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = 'red';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();

    bullets.forEach(bullet => {
        bullet.y -= 5; // Move bullet upwards
    });
    bullets = bullets.filter(bullet => bullet.y > 0); // Remove bullets that are off-screen

    requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        player.x -= player.speed;
    } else if (event.key === 'ArrowRight') {
        player.x += player.speed;
    }
    // Shooting bullets
    if (event.key === ' ') {
        bullets.push({ x: player.x + player.width / 2 - 2.5, y: player.y, width: 5, height: 10 });
    }
});

update();
