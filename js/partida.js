class Partida {
    constructor(tipo, conecta, equipo, tiempo, movimientos) {
        this.tipo = tipo;
        this.conecta = conecta;
        this.equipoGanador = equipo;
        this.duracion = tiempo;
        this.numMove = movimientos;
    }

    getTipo() {
        return this.tipo;
    }

    setTipo(tipo) {
        this.tipo = tipo;
    }

    getConecta() {
        return this.conecta;
    }

    setConecta(conecta) {
        this.conecta = conecta;
    }
    
    getEquipoGanador() {
        return this.equipoGanador;
    }

    setEquipoGanador(equipo) {
        this.equipoGanador = equipo;
    }

    getDuracion() {
        return this.duracion;
    }

    setDuracion(tiempo) {
        this.duracion = tiempo;
    }

    getNumMove() {
        return this.numMove;
    }

    setNumMove(movimientos) {
        this.numMove = movimientos;
    }
}