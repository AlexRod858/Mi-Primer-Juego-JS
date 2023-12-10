const puerta = new Image();
puerta.src = "../assets/imgs/puerta.png";

export default class Meta {
    constructor(plataforma) {
        // La posición de la meta se establece en la parte superior de la última plataforma
        this.position = {
            x: plataforma.position.x + plataforma.ancho - 100,
            y: plataforma.position.y - 170
        };
        this.ancho = 100;
        this.alto = 170;
        this.image = puerta;
    }

    dibujar() {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'yellow';
        ctx.drawImage(this.image, this.position.x, this.position.y, this.ancho, this.alto);
    }

    actualizar() {
        this.dibujar();
    }
}