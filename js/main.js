// ----------------------------------
// ----------------------------------
import Player from './classes/Player.js';
import Platform from './classes/Platform.js';
import Meta from './classes/Meta.js';
//initialize canvas
const canvas = document.getElementById('canvas');
canvas.width = 1080;
canvas.height = 760;
const ctx = canvas.getContext('2d');
// ----------------------------------
// ----------------------------------
//Creo instancia
const Jugador = new Player();
// ---------------------------------------------
// ---------------------------------------------
// --------------- S U E L O -------------------
const platforms = [];
const anchoPlataforma = 180;
const espacioEntrePlataformas = 0;
const numPlataformas = 50; // Puedes ajustar este valor según la cantidad de plataformas que necesites
const huecos = [8, 10, 15, 16, 21, 22, 26, 29, 32, 34, 36, 39, 40, 42, 45, 48]; // Índices de plataformas que serán huecos


for (let i = 0; i < numPlataformas; i++) {
    if (huecos.includes(i)) {
        // Si el índice está en la lista de huecos, no agregamos una plataforma
        continue;
    }

    const posX = i * (anchoPlataforma + espacioEntrePlataformas);
    const plataforma = new Platform(posX, canvas.height - 60);
    platforms.push(plataforma);
}
// ----------------------------------
// ----------------------------------
// ----------------------------------
const fondo = new Image();
fondo.src = "../assets/imgs/fondo.jpg";
const luna = new Image();
luna.src = "../assets/imgs/luna.png";
let lunaPosX = 450;  // Inicializa la posición x de la luna
let lunaPosY = -350
// const meta = new Meta(platforms[2]);
// ----------------------------------
// ----------------------------------
// ----------------------------------
// ----------------------------------
function draw() {
    // ---------
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ---------
    juego();
}
// --------------------------------------
// --------------------------------------
// --------------------------------------
function juego() {
    // Dibujar el fondo
    ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);
    // Dibujar la luna
    ctx.drawImage(luna, lunaPosX, lunaPosY, canvas.width, canvas.height);
    Jugador.actualizar();

    // Dibujar las plataformas
    for (const plat of platforms) {
        plat.actualizar();
    }

    // Después de haber creado y dibujado todas las plataformas
    const ultimaPlataforma = platforms[platforms.length - 1];
    const meta = new Meta(ultimaPlataforma);
    // -------------------------------------------
    Jugador.presionarTecla(Event);
    Jugador.soltarTecla(Event);
    // -------------------------------------------
    // Mover la luna
    if (Jugador.teclaAvanzar == true && Jugador.position.x >= 300) {
        lunaPosX -= 0.5;
    }
    // -------------------------------------------
    colisionPlat();
    colisionPuerta(meta);
    // -------------------------------------------
    // Dibujar la meta después de actualizar todo
    meta.actualizar();
    // -------------------------------------------
    // Verificar condiciones de victoria o derrota
    if (Jugador.position.x >= 380) {
        console.log('GANADOR');
    } else if (Jugador.position.y > canvas.height) {
        console.log('PERDEDOR');
        reiniciar();
    }
}
// -------------------------------------------
// -------------------------------------------
// -------------------------------------------
function reiniciar() {
    // Restablece la posición inicial del jugador
    Jugador.position.x = 100;
    Jugador.position.y = 100;
    Jugador.velocidad.x = 4;
    Jugador.velocidad.y = 0;
    // Restablece el estado de las plataformas
    for (let i = 0; i < numPlataformas; i++) {
        if (huecos.includes(i)) {
            // Si el índice está en la lista de huecos, no agregamos una plataforma
            continue;
        }
        const posX = i * (anchoPlataforma + espacioEntrePlataformas);
        const plataforma = new Platform(posX, canvas.height - 60);
        platforms.push(plataforma);
    }
    // Restablece posición de la luna
    lunaPosX = 450;
    // Limpia el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dibuja todo nuevamente
    juego();
}
// -------------------------------------------
// -------------------------------------------
// -------------------------------------------
function colisionPlat() {
    for (const plat of platforms) {
        if (
            Jugador.position.y + Jugador.alto >= plat.position.y &&
            Jugador.position.y <= plat.position.y + plat.alto &&
            Jugador.position.x + Jugador.ancho >= plat.position.x &&
            Jugador.position.x <= plat.position.x + plat.ancho
        ) {
            Jugador.position.y = plat.position.y - Jugador.alto;
            Jugador.velocidad.y = 0; // Detener el movimiento hacia abajo del jugador
        }
        //Colisión horizontal
        if (
            Jugador.position.x <= plat.position.x + plat.ancho &&
            Jugador.position.x >= plat.position.x &&
            Jugador.position.y <= plat.position.y + plat.alto &&
            Jugador.position.y + Jugador.alto > plat.position.y
        ) {
            Jugador.position.x = plat.position.x + plat.ancho;
            Jugador.velocidad.x = 0;
        }
        if (
            Jugador.position.x + Jugador.ancho >= plat.position.x &&
            Jugador.position.x + Jugador.ancho <= plat.position.x &&
            Jugador.position.y <= plat.position.y + plat.alto &&
            Jugador.position.y + Jugador.alto >= plat.position.y
        ) {
            Jugador.position.x = plat.position.x - Jugador.ancho;
            Jugador.velocidad.x = 0;
        }
        // ------------------ M O V E R  P L A T A F O R M A S -------------------------
        if (Jugador.teclaAvanzar == true && Jugador.position.x >= 300) {

            plat.position.x -= 4;
            // Plataforma2.position.x -= 4;
        }
    }
}
// ------------------------------------------
// -------------------------------------------
// -------------------------------------------
// -------------------------------------------
function colisionPuerta(puerta) {
    if (
        Jugador.position.y + Jugador.alto >= puerta.position.y &&
        Jugador.position.y <= puerta.position.y + puerta.alto &&
        Jugador.position.x + Jugador.ancho >= puerta.position.x &&
        Jugador.position.x <= puerta.position.x + puerta.ancho
    ) {
        Jugador.position.y = puerta.position.y - Jugador.alto;
        Jugador.velocidad.y = 0; // Detener el movimiento hacia abajo del jugador
        console.log('GANASTE');
        fondo.src = "../assets/imgs/fondo2.jpg";
        luna.src = "../assets/imgs/luna2.png";
        luna.PosY= -450;
        reiniciar();
    }
    //Colisión horizontal
    if (
        Jugador.position.x <= puerta.position.x + puerta.ancho &&
        Jugador.position.x >= puerta.position.x &&
        Jugador.position.y <= puerta.position.y + puerta.alto &&
        Jugador.position.y + Jugador.alto > puerta.position.y
    ) {
        Jugador.position.x = puerta.position.x + puerta.ancho;
        Jugador.velocidad.x = 0;
        console.log('GANASTE');
        fondo.src = "../assets/imgs/fondo2.jpg";
        luna.src = "../assets/imgs/luna2.png";
        luna.PosY= -450;
        reiniciar();

    }
    if (
        Jugador.position.x + Jugador.ancho >= puerta.position.x &&
        Jugador.position.x + Jugador.ancho <= puerta.position.x &&
        Jugador.position.y <= puerta.position.y + puerta.alto &&
        Jugador.position.y + Jugador.alto >= puerta.position.y
    ) {
        Jugador.position.x = puerta.position.x - Jugador.ancho;
        Jugador.velocidad.x = 0;
        console.log('GANASTE');
        fondo.src = "../assets/imgs/fondo2.jpg";
        luna.src = "../assets/imgs/luna2.png";
        luna.PosY= -450;
        reiniciar();
    }
}
// ------------------------------------------
// -------------------------------------------
// -------------------------------------------
// -------------------------------------------
draw();