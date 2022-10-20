class ServicioHistorial {
    constructor() {
        this.historial = [];
    }

    getHistorial() {
        return [...this.historial];
    }

    obtenerPartida(num) {
        return this.historial[num];
    }

    anadirPartida(partida) {
        this.historial.push(partida);

        this.anadirALocal(partida.getTipo(), partida.getConecta(), partida.getEquipoGanador(), partida.getDuracion(), partida.getNumMove())
    }

    obtenerNumPartidas() {
        return this.historial.length;
    }

    anadirALocal(tipo, conecta, numEquipo, duracion, contMove) {
        let value = JSON.stringify({"tipo": tipo, "conecta": conecta, "numEquipoGanadors": numEquipo, "duracion": duracion, "contMove": contMove});
        localStorage.setItem(`Partida${this.obtenerNumPartidas()}`, value);
    }

    llenarServicio() {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            
            let string = localStorage.getItem(key);
            let value = JSON.parse(string);
    
            this.anadirPartida(new Partida(value.tipo, value.conecta, value.numEquipo, value.duracion, value.contMove));
        }
    }
}