const NUMFILA = 6;
const NUMCOLUM = 7;
const NUMWIN = 4;

class ServicioJuego {
    constructor() {
        this.tablero = [];

        for (let i = 0; i < NUMFILA; i++) {
            let arrayCeldas = [];

            for (let j = 0; j < NUMCOLUM; j++) {
                arrayCeldas.push(0);
            }

            this.tablero.push(arrayCeldas);
        }
    }

    obtenerTablero() {
        return [...this.tablero];
    }

    obtenerFicha(fila, colum) {
        return this.tablero[fila][colum];
    }

    setValorFicha(fila, colum, valor) {
        this.tablero[fila][colum] = valor;
    }

    colocarFicha(fila, columna, numEquipo, gravedad) {
        if (gravedad) {
            let tocado = false;
            let filaGravedad;

            for (let i = 0; i < this.tablero.length && !tocado; i++) {
                if (this.obtenerFicha(i, columna) != 0) {
                    filaGravedad = (i - 1);

                    this.setValorFicha(filaGravedad, columna, numEquipo);

                    tocado = true;
                }
                else {
                    if (i == (this.tablero.length - 1)) {
                        filaGravedad = i;
        
                        this.setValorFicha(filaGravedad, columna, numEquipo);
        
                        tocado = true;
                    }
                }
            }
        }
        else {
            this.setValorFicha(fila, columna, numEquipo);
        }
    }

    comprobarVictoriaEmpate(equipo) {
        let estado = 0;
        let cont = 0;
        let completo = true;

        //Comprobación horizontal
        for (let i = 0; i < this.tablero.length && estado == 0; i++) {
            cont = 0;
            for (let j = 0; j < this.tablero[i].length && estado == 0; j++) {
                if (this.obtenerFicha(i, j) == equipo) {
                    cont++;
                }
                else {
                    cont = 0;
                }

                if (cont == NUMWIN) {
                    estado = 1;
                }
            }
        }

        if (estado == 0) {
            //Comprobación vertical
            for (let i = 0; i < this.tablero.length && estado == 0; i++) {
                for (let j = 0; j < this.tablero[i].length && estado == 0; j++) {
                    cont = 0;

                    for (let iAux = 0; iAux < this.tablero.length && estado == 0; iAux++) {
                        if (this.obtenerFicha(iAux, j) == equipo) {
                            cont++;
                        }
                        else {
                            cont = 0;
                        }
        
                        if (cont == NUMWIN) {
                            estado = 1;
                        }
                    }
                }
            }
        }

        if (estado == 0) {
            //Comprobación diagonal empezando arriba derecha
            let jAux = 0;
            for (let i = 0; i < this.tablero.length && estado == 0; i++) {
                

                for (let j = this.tablero[i].length - 1; j >= 0 && estado == 0; j--) {
                    cont = 0;
                    jAux = j;
                    for (let iAux = i; iAux < this.tablero.length; iAux++) {
                        if (jAux <= (this.tablero[i].length - 1)) {
                            if (this.obtenerFicha(iAux, jAux) == equipo) {
                                cont++;
                            }
                            else {
                                cont = 0;
                            }
            
                            if (cont == NUMWIN) {
                                estado = 1;
                            }

                            jAux++;
                        }
                    }
                }
            }
        }

        if (estado == 0) {
            //Comprobación diagonal empezando arriba izquierda
            let jAux = 0;
            for (let i = 0; i < this.tablero.length && estado == 0; i++) {
                for (let j = 0; j < this.tablero[i].length && estado == 0; j++) {
                    cont = 0;
                    jAux = j;
                    for (let iAux = i; iAux < this.tablero.length; iAux++) {
                        if (jAux >= 0) {
                            if (this.obtenerFicha(iAux, jAux) == equipo) {
                                cont++;
                            }
                            else {
                                cont = 0;
                            }
            
                            if (cont == NUMWIN) {
                                estado = 1;
                            }

                            jAux--;
                        }
                    }
                }
            }
        }

        if (estado == 0) {
            //Comprobación empate
            for (let i = 0; i < this.tablero.length && completo; i++) {
                for (let j = 0; j < this.tablero[i].length && completo; j++) {
                    if (this.obtenerFicha(i, j) == 0) {
                        completo = false;
                    }
                }
            }

            if (completo) {
                estado = 2;
            }
        }

        return estado;
    }
}