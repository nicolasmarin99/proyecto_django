import { enviarDatos } from "./operaciones.js";

// Función para agregar un juego al carrito
function agregarAlCarrito(nombre, precio, imagen, descripcion, cantidad) {
    // Verifica si el usuario está autenticado
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
        alert("Para añadir juegos al carrito, debes iniciar sesión.");
        return;
    }

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push({ nombre, precio, imagen, descripcion, cantidad });
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Obtener los juegos y crear las tarjetas
const obtenerJuegos = async () => {
    try {
        const response = await fetch("https://listo-para-subir-api-videojuegos.onrender.com/juegos");
        const data = await response.json();
        return data.juegos;
    } catch (error) {
        console.log(`El error es: ${error}`);
    }
}

// Función para crear las tarjetas de los juegos
const crearTarjetas = (juegosArray) => {
    let juegoRow = document.getElementById("juegoRow");

    juegosArray.map((juego) => {
        const { name, precio, img: imagen, descripcion, cantidad } = juego;

        const divRow = document.createElement("div");
        divRow.classList.add("col-xl-3", "col-lg-3", "col-md-3", "col-sm-12", "col-xs-12", "mt-2", "mb-2");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = imagen;
        img.classList.add("card-img-top");

        const divBody = document.createElement("div");
        divBody.classList.add("card-body");

        const titulo = document.createElement("h5");
        titulo.classList.add("card-title");
        titulo.textContent = name;

        const subTitulo = document.createElement("p");
        subTitulo.classList.add("card-text");
        subTitulo.textContent = precio;

        const btnMostrar = document.createElement("button");
        btnMostrar.classList.add("btn", "btn-danger");
        btnMostrar.textContent = "Mostrar detalles";
        btnMostrar.addEventListener("click", () => {
            localStorage.setItem('detalleJuego', JSON.stringify({ name, precio, imagen, descripcion, cantidad }));
            window.location.href = '/playstation/juego/';
        });

        const btnComprar = document.createElement("button");
        btnComprar.classList.add("btn", "btn-danger");
        btnComprar.textContent = "Añadir al carrito";
        btnComprar.style.marginTop = "2rem";
        btnComprar.addEventListener("click", () => {
            agregarAlCarrito(name, precio, imagen, descripcion, cantidad);
        });

        divRow.appendChild(card);
        card.appendChild(img);
        card.appendChild(divBody);
        divBody.appendChild(titulo);
        divBody.appendChild(subTitulo);
        divBody.appendChild(btnMostrar);
        divBody.appendChild(btnComprar);
        juegoRow.appendChild(divRow);
    });
}

// Llamar a la función para obtener y crear las tarjetas
obtenerJuegos()
    .then((juegos) => {
        crearTarjetas(juegos);
    })
    .catch((error) => {
        console.log(error);
    });