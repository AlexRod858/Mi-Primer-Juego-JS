
const suelo = new Image();
suelo.src = "../assets/imgs/suelo.jpg";

export default class Platform {
    constructor(posX, posY) {
        this.position = {
            x: posX,
            y: posY
        }
        this.ancho = 180;
        this.alto = 60;
        this.image = suelo;
    }
    dibujar() {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'brown';
        ctx.drawImage(this.image, this.position.x, this.position.y, this.ancho, this.alto);
        // ctx.fillRect(this.position.x, this.position.y, this.ancho, this.alto);
    }
    actualizar() {
        this.dibujar();
    }

}
