var jugadoresN = 0;
var jugadores = [];
var turno = 0;
var fichaTurno;
var fichasJuego = [
	{ id: 0, puntos: 2, estado: true },
	{ id: 1, puntos: 2, estado: true },
	{ id: 2, puntos: 2, estado: true },
	{ id: 3, puntos: 2, estado: true },
	{ id: 4, puntos: 3, estado: true },
	{ id: 5, puntos: 3, estado: true },
	{ id: 6, puntos: 3, estado: true },
	{ id: 7, puntos: 5, estado: true },
	{ id: 8, puntos: 5, estado: true },
	{ id: 9, puntos: 10, estado: true }];

function numJug() {
	jugadoresN = document.getElementById('numJugadores').value;
	document.getElementById('jugadores').innerHTML = '';
	jugadores = [];


	if (jugadoresN > 0) {

		const container = document.getElementById("jugadores");
		for (i = 0; i < jugadoresN; i++) {

			container.appendChild(crearSpan("Jugador " + (i + 1) + " : "));

			const input = document.createElement("input");
			input.id = 'jugador' + i;
			input.required = true;
			container.appendChild(input);

			container.appendChild(document.createElement("br"));
		}

		const button = document.createElement("button");
		button.setAttribute("onclick", "guardarJug()");
		button.innerHTML = "Guardar";
		container.appendChild(button);

	} else {

		var span = document.createElement("span");
		var t = document.createTextNode("Cantidad invalida");
		span.appendChild(t);
		container.appendChild(span);

	}
}

function guardarJug() {

	for (i = 0; i < jugadoresN; i++) {
		const jug = {
			nombre: document.getElementById('jugador' + i).value,
			puntos: 0,
			fichas: []
		}
		jugadores.push(jug);
	}

	ocultar('cantJug');
	ocultar('jugadores');

	pintarPuntuacion();
	document.getElementById('juego').style.display = "block";

}

function pintarPuntuacion() {
	const container = document.getElementById("puntuacion");
	container.innerHTML = '';

	for (i = 0; i < jugadores.length; i++) {
		container.appendChild(crearSpan(jugadores[i].nombre + " : "));
		container.appendChild(crearSpan(jugadores[i].puntos + " - "));
		jugadores[i].fichas.forEach((x) => { container.appendChild(crearImg(x.id)) })
		container.appendChild(document.createElement("br"));
	}

}

function crearImg(img) {
	const image = document.createElement("img");
	image.src = "./piezas/" + img + ".png";
	return image;
}

function crearSpan(texto) {
	const span = document.createElement("span");
	const t = document.createTextNode(texto);
	span.appendChild(t);
	return span;
}


function ocultar(div) {
	var x = document.getElementById(div);
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

function inicio() {
	accionTurno();
	document.getElementById('contenido').style.display = "block";
	ocultar('inicio');
}

function obtenerFicha() {
	const fichasTurno = fichasJuego.filter(x => x.estado === true);
	const num = Math.floor(Math.random() * fichasTurno.length);
	return fichasTurno[num];
}

function accionTurno() {
	fichaTurno = obtenerFicha();
	document.getElementById("imgJuego").src = "./piezas/" + fichaTurno.id + ".png";
	document.getElementById("jugador").innerHTML = "Jugador : " + jugadores[turno % jugadores.length].nombre;
}

function logrado() {

	fichasJuego.forEach(x => {
		if (x.id === fichaTurno.id) {
			x.estado = false;
		}
	})

	jugadores[turno % jugadores.length].puntos += fichaTurno.puntos;
	jugadores[turno % jugadores.length].fichas.push(fichaTurno);

	pintarPuntuacion();

	if (fichasJuego.find(x => x.estado === true)) {
		turno++;
		accionTurno();
	} else {
		ocultar('contenido');
	}

}

function fallido() {
	turno++;
	accionTurno();
}

function reiniciar() {
	turno = 0;
	jugadores.forEach(x => {
		x.puntos = 0;
		x.fichas = [];
	});
	fichasJuego.forEach(x => {
		x.estado = true;
	});

	pintarPuntuacion();
	inicio();
	document.getElementById('inicio').style.display = "none";
}