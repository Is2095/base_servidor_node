
import http from 'node:http' // optiene el módulo HTTP, el cual proporciona funcionalidades para crear servidores y clientes HTTP (node:HTTPS --> para servidores seguros)
import fs from 'node:fs'

const PORT = process.env.PORT ?? 3001 // ??=operador de fusión nula devuelve el 1° elemento si no es null o undefined sino devuelve el 2°

const procesandoRequest = (req, res) => {
    if (req.url === '/') {
        /*
        opción 1°
        setHeader(nombre, value) es un método que permite establecer un solo encabezado a la vez. Llamarlo dos veces con el mismo nombre queda vigente el segundo llamado 
        */
        /*
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('entrando a la página de inicio')
        */
        /*
        opción 2°
        res.writeHead(statusCode[, statusMessage][, headers]): este método permite estableces todos los encabezados a la vez
        */

        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" }); // este encabezado de la respuesta HTTP, es un par clave/valor, que indica el tipo de medio del cuerpo de la respuesta, en este caso es texto plano.
        //charser=utf-8 especifica la codificación de caracteres del cuerpo de la respuesta Unicode UTF-8   
        res.end("entrando a la página de inicio") // finaliza y envía el mensaje
    } else if (req.url === '/opcionA') {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); // en este caso se indica en el tipo de respuesta que va a ser en html
        res.end('<h1>En opcionA la respuesta es en HTML</h1>');
    } else if (req.url === '/opcionB') {
        fs.readFile('./imagenes/fotoPrueba.jpeg', (err, dato) => { // el módulo de sistema de archivo proporciona funcionalidades para interactuar con el sistema de archivos (leerlos en este caso, o escribir, o crear directorios, etc)
            if (err) {
                res.statusCode = 500;
                res.end('<h1> 500 error interno del servidor </h1>')
            } else {
                res.setHeader('Content-Type', 'image/jpeg')
                /* 
                en este caso la respuesta es una imagen por lo que debe especificar que es una imgagen y el tipo de extensión de la misma
                /jpeg: JPEG ó JPG
                /png: PNG
                /gif: GIF
                /svg+xml: SVG
                /webp: Webp
                */
                res.end(dato);
            };
        });
    } else if (req.url === '/opcionC') {
        fs.readFile('./json/pruebaJson.json', 'utf8', (err, datos) => {
            if (err) {
                res.statusCode = 500;
                res.end('<h1> 500 error interno del servidor </h1>');
            } else {
                // Esto es por si necesitamos acceder a los datos del archivo JSON antes de ser enviados.
                // const objetoDatos = JSON.parse(datos) ==>> esto convierte el archivo JSON en un objeto JavaScript, esto permite acceder a las clave/valor.
                // JSON.stringify(objetoDatos) ==> esto convierte una objeto de JavaScript en un archivo JSON.
                res.setHeader('Content-Type', 'application/json'); // con este tipo habilitamos para enviar archivos .json como respuesta
                res.end(datos);
            };
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.end("<h1>¡No encontrado !!!</h1>")
    }
}

const servidor = http.createServer(procesandoRequest);

servidor.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto http://localhost: ${PORT}`)
}); // se inicia el servidor y empieza a escuchar las peticiones, y ahí muestra el mensaje del console.log
