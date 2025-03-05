const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 50,
    height: 50,
    color: 'pink', // Representing vulva
    speed: 5
};

let bullets = [];
let enemies = [];
let enemySpeed = 1;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = 'white'; // Representing cum
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

function drawEnemies() {
    ctx.fillStyle = 'blue'; // Representing penises
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();
    drawEnemies();

    bullets.forEach(bullet => {
        bullet.y -= 5; // Move bullet upwards
    });
    bullets = bullets.filter(bullet => bullet.y > 0); // Remove bullets that are off-screen

    enemies.forEach(enemy => {
        enemy.y += enemySpeed; // Move enemies downwards
    });
    enemies = enemies.filter(enemy => enemy.y < canvas.height); // Remove off-screen enemies

    requestAnimationFrame(update);
}

function spawnEnemies() {
    for (let i = 0; i < 5; i++) {
        enemies.push({
            x: Math.random() * (canvas.width - 50),
            y: 0,
            width: 50,
            height: 50
        });
    }
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

setInterval(spawnEnemies, 2000); // Spawn enemies every 2 seconds
update();
