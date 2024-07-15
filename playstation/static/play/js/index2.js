// index2.js
import { enviarDatos } from "./operaciones.js";

// Función para agregar un juego al carrito
function agregarAlCarrito(nombre, precio, imagen, descripcion, cantidad) {
    // Obtener el carrito del almacenamiento local o inicializar uno vacío
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Agregar el juego al carrito
    carrito.push({ nombre, precio, imagen, descripcion, cantidad });

    // Guardar el carrito actualizado en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Obtener los juegos y crear las tarjetas
const obtenerJuegos = async () => {
    try {
        const response = await fetch("https://listo-para-subir-api-videojuegos.onrender.com/juegos");
        const data = await response.json();
        return data.juegos; // Devolver solo el array de juegos
    } catch (error) {
        console.log(`el error es: ${error}`);
    }
}


// Función para crear las tarjetas de los juegos
const crearTarjetas = (juegosArray) => {
    let juegoRow = document.getElementById("juegoRow");

    juegosArray.map((juego) => {
        const { name, precio, img: imagen, descripcion, cantidad } = juego;

        const divRow = document.createElement("div");
        divRow.classList.add("col-xl-3");
        divRow.classList.add("col-lg-3");
        divRow.classList.add("col-md-3");
        divRow.classList.add("col-sm-12");
        divRow.classList.add("col-xs-12");
        divRow.classList.add("mt-2");
        divRow.classList.add("mb-2");

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

        const btnMostrar = document.createElement("button")
        btnMostrar.classList.add("btn");
        btnMostrar.classList.add("btn-danger");
        btnMostrar.textContent = "mostrar detalles";
        btnMostrar.addEventListener("click", () => {
            enviarDatos(name, precio, imagen, descripcion, cantidad);
        })

        const btnComprar = document.createElement("button")
        btnComprar.classList.add("btn");
        btnComprar.classList.add("btn-danger");
        btnComprar.textContent = "añadir al carrito";
        btnComprar.style.marginTop = "2rem"
        btnComprar.addEventListener("click", () => {
            agregarAlCarrito(name, precio, imagen);
        });

        divRow.appendChild(card);

        card.appendChild(img);
        card.appendChild(divBody);

        divBody.appendChild(titulo);
        divBody.appendChild(subTitulo);
        divBody.appendChild(btnMostrar);
        divBody.appendChild(btnComprar);

        juegoRow.appendChild(divRow);
    })
}


// Llamar a la función para obtener y crear las tarjetas
obtenerJuegos()
    .then((juegos) => {
        crearTarjetas(juegos);
    })
    .catch((error) => {
        console.log(error);
    });
