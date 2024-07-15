// Función para mostrar los juegos del carrito
function mostrarCarrito() {
    // Obtener el carrito del almacenamiento local
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Seleccionar el elemento donde se mostrará el carrito
    const carritoElemento = document.getElementById('carrito');

    // Limpiar el contenido anterior del carrito
    carritoElemento.innerHTML = '';

    // Iterar sobre los juegos en el carrito y mostrarlos
    carrito.forEach((juego, index) => {
        const li = document.createElement('li');
        li.textContent = `${juego.nombre} - $${juego.precio}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => {
            eliminarDelCarrito(index);
            mostrarCarrito(); // Actualizar el carrito después de eliminar un juego
        });

        li.appendChild(botonEliminar);
        carritoElemento.appendChild(li);
    });
}

// Función para eliminar un juego del carrito
function eliminarDelCarrito(index) {
    // Obtener el carrito del almacenamiento local
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Eliminar el juego del carrito
    carrito.splice(index, 1);

    // Guardar el carrito actualizado en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Llamar a la función para mostrar el carrito cuando se cargue la página
document.addEventListener('DOMContentLoaded', mostrarCarrito);