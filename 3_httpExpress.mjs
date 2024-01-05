/*
Express es un framework de marco web rápido, minimalista y sin opiniones para Node.js (anoxtico, da lo mismo si lo usas con una u otra tectonología, cualquier base de dato)
- Manejo de rutas, 
- Manejo de middleware,
*/

import express from "express";
import fs from 'fs';
import { fileURLToPath } from "url";
import archivoJson from "./json/pruebaJson.json" assert {type: 'json'};
import {resolve} from 'path';

const PORT = process.env.PORT ?? 3001;

const app = express(); // esta línea crea una instancia de la aplicación Express, por lo que app se convierte en un objeto con todos los métodos y funcionalidades que posee express.

app.disable('x-powered-by'); // esta línea se utiliza para desactivar la cabezera HTTP 'X-Powered-By', la cual da información sobre la tecnología que se usa en el servidor, es aconsejable utilizarla por seguridad.

app.use(express.json()); // este es un middleware que permite leer datos tipo JSON que vienen en las peticiones, los datos los coloca en req.body. Este middleware se debe colocar antes de cualquier manejo de petición.

app.use((req, res, next) => {
    /*acá se coloca la lógica y código que queremos hacer en el midleware nuestro */
    console.log('estoy procesando el código del midleware');
    next(); // una vez realizado el código se llama a next() lo que hace es salir del midleware.
});

app.get("/", (req, res) => {
    res.status(200).send('<h1>Mi respuesta usando EXPRESS, con una pedición al home</h1>');
});

app.get("/archivoJson", (req, res) => {
    // Esta opción es para no usar assert que está en prueba (BETA).
    /*
    const url = new URL('./json/pruebaJson.json', import.meta.url)  // esta linea crea un nuevo objeto URL en JS, tomando una ruta relativa './json/pruebaJson.json' y la ruta base (url del archivo actual), import.meta.url
    const path = fileURLToPath(url) // esta linea convierte una URL a una ruta de archivo en el sistema de archivos locales
    const json = fs.readFileSync(path, 'utf8');
    */
   // esta es otra opción utilizando el método resolve de path
   /*
   let apa = fs.readFileSync(resolve('./json/pruebaJson.json'), 'utf8');
   res.json(apa);
   */
   res.json(archivoJson);
    
});

app.get('/datosParams/:id-:nombre', (req, res) => { // rutas dinámicas, parametro params que viene como propiedad en req, se puede mandar varios.
    // la url de petición sería como ejemplo: http://localhost:3001/usuario/12-Pepe, donde 12 = id y Pepe = nombre.
    const {id, nombre} = req.params;  // se recuperan esos parámetro que vienen en req.params, los nombres deben ser los mismos que indicamos en la ruta.
    res.status(200).send(`El identificador de: ${nombre} enviado es el número: ${id}`);
});

app.get('/datosQuery', (req, res) => {
    const {id, nombre, edad} = req.query; // otra forma de pasar información, esta vez por medio de la url, como query.
    // ejemplo: http://localhost:3001/datosQuery?id=66&nombre=Pepe&edad=33

    res.status(200).send(`El usuario con id: ${id}, cuyo nombre es: ${nombre}, tiene la edad de: ${edad}`);
})

app.post('/datosBody', (req, res) => {
    const {nombre, edad} = req.body; // req también puede recibir información a través de body en formato json.
    res.status(200).send(`Hemos recibido que ${nombre}, tiene: ${edad} años de edad`);
});


app.use((req, res) => {
    res.status(404).send('<h1>-- 404 --</h1>');
}); // en cualquier caso que no encuentre o haga mach con una ruta, entrará acá y enviará un 404.

/* métodos con el parámetro res

res.end(); termina y envía lo que se le coloca entre los ()
res.send(); envía lo que tiene entre ()
res.json(); envía como archivo json lo que tiene entre ()
res.resend("nombre_plantilla"); es para renderizar una plantilla html y enviarla
res.set(); es para especificar datos de la cabezera
res.redirect(status, "URL_NUEVA"); cuando entra en la petición redirije a URL_NUEVA, y envía el status en general en el conjunto 300

*/

app.listen(3001, () => {
    console.log(`servidor escuchando en el puerto http://localhost: ${PORT} con Express`);
});
