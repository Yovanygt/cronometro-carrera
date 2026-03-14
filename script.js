let inicio = 0;
let intervalo = null;

let participantes = [];
let contador = 1;

let corriendo = false;


// INICIAR CRONOMETRO
function iniciarCronometro(){

    if(corriendo){
        return;
    }

    corriendo = true;

    inicio = Date.now();

    intervalo = setInterval(() => {

        let ahora = Date.now();
        let diferencia = ahora - inicio;

        let minutos = Math.floor(diferencia / 60000);
        let segundos = Math.floor((diferencia % 60000) / 1000);
        let milisegundos = diferencia % 1000;

        document.getElementById("tiempo").textContent =
        `${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}.${String(milisegundos).padStart(3,'0')}`;

    },10);

}


// REGISTRAR LLEGADA
function registrarLlegada(){

    if(!corriendo){
        return;
    }

    let ahora = Date.now();
    let tiempoLlegada = ahora - inicio;

    participantes.push({
        numero: contador,
        tiempo: tiempoLlegada
    });

    contador++;

    mostrarResultados();

}


// MOSTRAR RESULTADOS
function mostrarResultados(){

    let tabla = document.getElementById("tablaResultados");

    tabla.innerHTML = "";

    if(participantes.length === 0){
        return;
    }

    let tiempoPrimero = participantes[0].tiempo;

    participantes.forEach((p,index)=>{

        let diferencia = p.tiempo - tiempoPrimero;

        let fila = `
        <tr>
        <td>${index + 1}</td>
        <td>Competidor ${p.numero}</td>
        <td>${(p.tiempo/1000).toFixed(3)} s</td>
        <td>${(diferencia/1000).toFixed(3)} s</td>
        </tr>
        `;

        tabla.innerHTML += fila;

    });

}


// REINICIAR
function reiniciar(){

    clearInterval(intervalo);

    inicio = 0;

    participantes = [];

    contador = 1;

    corriendo = false;

    document.getElementById("tiempo").textContent = "00:00.000";

    document.getElementById("tablaResultados").innerHTML = "";

}