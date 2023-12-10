const spriteSheet = new Image();
spriteSheet.src = '../assets/imgs/sprite.png';
export default class Player {
    constructor() {
        // --------------------
        this.position = {
            x: 100,
            y: 100
        }
        // --------------------
        this.velocidad = {
            x: 0,
            y: 4
        }
        // --------------------
        this.ancho = 40;
        this.alto = 110;
        // --------------------
        this.gravedad = 0.5;
        // --------------------
        document.addEventListener('keydown', this.presionarTecla.bind(this));
        document.addEventListener('keyup', this.soltarTecla.bind(this));
        this.teclaAvanzar = false;
        this.teclaRetroceder = false;
        // --------------------
        this.scrollOffset = 0;
        // --------------------
        this.image = spriteSheet;
        this.frames = 1;
        this.animationSpeed = 0.04; // Factor de escala para ralentizar la animación
        this.numFramesPerRow = 6; // Número de frames por fila en el spritesheet
    }

    dibujar() {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'green';

        // Calcula el índice de fila y columna
        const rowIndex = Math.floor(this.frames / this.numFramesPerRow);
        const colIndex = Math.floor(this.frames % this.numFramesPerRow);
        // --------------------
        // Guarda el estado actual del contexto
        ctx.save();

        // INVIERTO DIRECCION
        if (this.teclaRetroceder) {
            // Si te estás moviendo hacia la izquierda, invierte la imagen horizontalmente
            ctx.translate(this.position.x + this.ancho, 0); // Mueve el origen a la derecha del personaje
            ctx.scale(-1, 1); // Invierte la imagen horizontalmente
        }

        // Dibuja el frame actual
        ctx.drawImage(
            this.image,
            179 * colIndex, 270 * rowIndex, 188, 270,
            this.teclaRetroceder ? -this.ancho : this.position.x, this.position.y, this.ancho, this.alto
        );
        // Restaura el estado original del contexto
        ctx.restore();
    }

    actualizar() {
        // Si se está moviendo a la derecha y la tecla está presionada
        if (this.teclaAvanzar) {
            // Aumenta el contador de frames con el factor de escala
            this.frames += this.animationSpeed;

            // Si alcanza el límite de frames, reinicia
            if (this.frames > 5) {
                this.frames = 0;
            }
        } else if (this.teclaRetroceder) {
            // Si se está moviendo a la izquierda y la tecla está presionada
            // Agrega lógica similar a la anterior para la animación en sentido opuesto
            this.frames += this.animationSpeed;

            if (this.frames > 5) {
                this.frames = 0;
            }
        } else {
            // Si no se está moviendo a la derecha ni a la izquierda, detén la animación
            this.frames = 0;
        }

        // --------------------
        this.dibujar();
        this.position.x += this.velocidad.x;
        this.position.y += this.velocidad.y;
        // LIMITE SUELO
        if (this.position.y + this.alto + this.velocidad.y <= 760) {
            this.velocidad.y += this.gravedad;
        } else {
            // this.velocidad.y = 0;
            // console.log('PERDISTE');
        }
        // LIMITE IZQUIERDA
        if (this.position.x <= 50) {
            this.position.x = 50;
        }
        //LIMITE DERECHA
        if (this.position.x >= 300) {
            this.position.x = 300;
        }

    }
    presionarTecla(Event) {
        const tecla = Event.key;

        switch (tecla) {
            case 'ArrowLeft': // Izquierda
                this.velocidad.x = -4; // Ajustar la velocidad en lugar de la posición
                this.teclaRetroceder = true;
                break;
            case 'ArrowRight': // Derecha
                this.velocidad.x = 4; // Ajustar la velocidad en lugar de la posición
                this.teclaAvanzar = true;
                this.scrollOffset += 5;
                console.log(this.scrollOffset);
                break;
            case 'ArrowUp': // Arriba
                this.velocidad.y = -20;
                break;
            case 'ArrowDown': // Abajo
                this.velocidad.y = 4;
                break;
        }
    }
    soltarTecla(Event) {
        const tecla = Event.key;

        switch (tecla) {
            case 'ArrowLeft': // Izquierda
                this.velocidad.x = 0; // Ajustar la velocidad en lugar de la posición
                this.teclaRetroceder = false;
                console.log('izquierda');
                break;
            case 'ArrowRight': // Derecha
                this.velocidad.x = 0; // Ajustar la velocidad en lugar de la posición
                this.teclaAvanzar = false;
                console.log('derecha');
                break;
        }
    }

}
