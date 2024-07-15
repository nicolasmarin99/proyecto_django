// juego.js

document.addEventListener('DOMContentLoaded', () => {
    // Obtener los detalles del juego desde localStorage
    const detalleJuego = JSON.parse(localStorage.getItem('detalleJuego'));

    if (detalleJuego) {
        const { name, precio, imagen, descripcion, cantidad } = detalleJuego;

        // Actualizar los elementos en la página con los detalles del juego
        document.getElementById('imagePage').src = imagen;
        document.getElementById('titlePage').textContent = name;
        document.getElementById('precioPage').textContent = `Precio: ${precio}`;
        document.getElementById('descPage').textContent = `Descripción: ${descripcion}`;
        document.getElementById('cantPage').textContent = `Cantidad: ${cantidad}`;
    } else {
        console.log('No se encontraron detalles del juego en localStorage.');
    }
});