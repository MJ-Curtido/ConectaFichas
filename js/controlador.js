//El equipo 1 es de las fichas azules, y el 2 de las fichas color frito

//Variables locales
let tipo = NUMFILA + "x" + NUMCOLUM, conecta = NUMWIN, gravedad, contMove = 0, numEquipo = Math.round(Math.random() * 2 + 0.5), victoria = false;
let divContador, btn, btnJugar, tabla;
let cadenaContador = "", contador, duracion, horaAux = '00', minAux = '00', segAux = '00', hora = 0, min = 0, seg = 0;
let servicioJuego = new ServicioJuego(), servicioHistorial = new ServicioHistorial();

//Cuando carga la partida
function main() {
    tabla = document.querySelector('#tabla');
    btnJugar = document.querySelector('#btnJugar');
    divContador = document.querySelector('#divContador');
    btn = document.querySelector('#btnEscondido');
    divTurnoFicha = document.querySelector('#divTurnoFicha');

    divContador.innerHTML = `<p id="contador">${horaAux}:${minAux}:${segAux}</p>`;

    //Comprobar si es un 3 en raya para quitar la gravedad
    if (NUMCOLUM <= 3 && NUMFILA <= 3) {
        gravedad = false;
    }
    else {
        gravedad = true;
    }

    //Creo la tabla dinámicamente según lo grande que sea el tablero
    crearTabla();

    //Lleno el servicio con lo que hay dentro del localStorage
    servicioHistorial.llenarServicio();

    if(numEquipo == 1) {
        divTurnoFicha.innerHTML = 'Turno de: <img src="../img/OAzulRelleno.png" class="fichaTurno">';
    }
    else {
        divTurnoFicha.innerHTML = 'Turno de: <img src="../img/OColorFritoRelleno.png" class="fichaTurno">';
    }

    tabla.addEventListener('click', activarCronometro);
    tabla.addEventListener('click', (e) => {tirarFicha(e)});
    btn.addEventListener('click', recargarPag);
}

//Evento para que se reinicie la tabla y se vuelva a jugar
function recargarPag() {
    window.location.reload();
}

//coloca ficha
function tirarFicha(e) {
    if (e.target.className == 'colum' && servicioJuego.obtenerFicha((e.target.parentNode.id.slice(1)), e.target.id.slice(2)) == 0 && !victoria) {
        //Elimino el evento del cronómetro para que no se recargue
        tabla.removeEventListener('click', activarCronometro);

        contMove++;

        //Pillo la fila y la columna para colocar la ficha
        columna = e.target.id.slice(2);
        fila = e.target.parentNode.id.slice(1);
        servicioJuego.colocarFicha(fila, columna, numEquipo, gravedad);

        //Actualizo la tabla
        crearTabla();

        if (servicioJuego.comprobarVictoriaEmpate(numEquipo) != 0) { //Si ha ganado
            //Paro el contador
            clearInterval(contador);

            duracion = `${horaAux}:${minAux}:${segAux}`;

            victoria = true;

            divTurnoFicha.id = 'divTurnoFichaEscondido';

            if (servicioJuego.comprobarVictoriaEmpate(numEquipo) == 1) {
                //Añado la partida al servicio
                servicioHistorial.anadirPartida(new Partida(tipo, conecta, numEquipo, duracion, contMove));

                setTimeout(() => {
                    if (numEquipo == 1) {
                        alert('Ha ganado el jugador azul :)');
                    }
                    else {
                        alert('Ha ganado el jugador color frito :)');
                    }
                }, 70);
            }
            else {
                servicioHistorial.anadirPartida(new Partida(tipo, conecta, 0, duracion, contMove));

                setTimeout(() => {
                    alert('Habéis quedado empate!');
                }, 70);
            }

            btn.id = 'btn';
        }
        else {//Si continúa el juego
            //Cambio el jugador
            if (numEquipo == 1) {
                numEquipo = 2;
                divTurnoFicha.innerHTML = 'Turno de: <img src="../img/OColorFritoRelleno.png" class="fichaTurno">';
            }
            else {
                numEquipo = 1;
                divTurnoFicha.innerHTML = 'Turno de: <img src="../img/OAzulRelleno.png" class="fichaTurno">';
            }
        }
    }
}

function crearTabla() {
    if(tabla.hasChildNodes()){
        tabla.innerHTML = '';
    }

    tablero = servicioJuego.obtenerTablero();

    for(let i = 0; i < tablero.length; i++){
        fila = document.createElement('tr');
        fila.id = `f${i}`;
        tabla.appendChild(fila);

        for(let j = 0; j < tablero[i].length; j++){
            columna = document.createElement('td');
            columna.className = "colum";
            columna.id = `c${i}${j}`;
            columna.innerHTML = this.obtenerValorTablero(servicioJuego.obtenerFicha(i, j));
            fila.appendChild(columna);
        }
    }
}

function obtenerValorTablero(valor) {
    let valorTablero;

    if(valor == 0){
        valorTablero = '';
    }
    else {
        if(valor == 1) {
            valorTablero = '<img src="../img/OAzulRelleno.png" class="fichas">';
        }
        else {
            valorTablero = '<img src="../img/OColorFritoRelleno.png" class="fichas">';
        }
    }

    return valorTablero;
}

function activarCronometro(e) {
    if(e.target.tagName == 'TD' && e.target.innerHTML == ''){
        contador = setInterval(() => {
            seg++;
            if (seg>59){min++;seg=0;}
            if (min>59){hora++;min=0;}
            if (hora>24){hora=0;}

            if (seg<10){segAux="0"+seg;}else{segAux=seg;}
            if (min<10){minAux="0"+min;}else{minAux=min;}
            if (hora<10){horaAux="0"+hora;}else{horaAux=hora;}

            divContador.innerHTML = `<p id="contador">${horaAux}:${minAux}:${segAux}</p>`;
        }, 1000);
    }
}

window.addEventListener('load', main);