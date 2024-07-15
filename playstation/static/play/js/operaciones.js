export const enviarDatos = (name, precio, imagen, descripcion, cantidad) => {
    const rutaArchivoHtml = 'playstation/templates/playstation/juego.html'

    fetch(rutaArchivoHtml)
        .then(response => response.text())
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const imagePage = doc.getElementById('imagePage');
            imagePage.src = imagen

            const titlePage = doc.getElementById('titlePage');
            titlePage.textContent = name

            const precioPage = doc.getElementById('precioPage');
            precioPage.textContent = precio

            const descPage = doc.getElementById('descPage');
            descPage.textContent = descripcion

            const cantPage = doc.getElementById('cantPage');
            cantPage.textContent = cantidad

            const nuevoHTML = new XMLSerializer().serializeToString(doc);
            document.body.innerHTML = nuevoHTML;

        })
        .catch((error) => {
            console.error(`error al cargar los datos: ${error}`)
        })
}

export const mostrarDetallesJuego = () => {
    const juego = JSON.parse(localStorage.getItem('detalleJuego'));

    if (juego) {
        document.getElementById('imagePage').src = juego.imagen;
        document.getElementById('titlePage').textContent = juego.name;
        document.getElementById('precioPage').textContent = juego.precio;
        document.getElementById('descPage').textContent = juego.descripcion;
        document.getElementById('cantPage').textContent = juego.cantidad;
    }
}