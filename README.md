## Descripción
*BaseServidorNode, es un proyecto en cual están las bases de un servidor con Node.js, un servidor con Node.js utilizando peticiones con rutas diferentes y por último un servidor Node.js utilizando el framework Express.js*

---

## Instalación

*Deberás clonar el repositorio en tu computadora y, por consola estando en el mismo nivel que el archivo package.json, ejecutar npm install*

---

## Contenido 

*Encontrarás en la carpeta principal:*
- imagenes:  *carpeta destinada a tener imagenes.* 
- json:  *carpeta destinada a guardar archivos .json.*
- 1_httpPuro.mjs: *archivo en donde se implementa un servidor utilizando Node.js.*
- 2_httpConRouting.mjs: *archivo en donde se implementa un servidor con Node.js e implementando rutas*
- 3_httpExpress.mjs: *archivo en donde se implementa un servidor con Node.js y Express.js.*

## Ejecución

---

  Por consola ejecutar: 

  * npm run httpnode **-->** *para levantar el servidor http con Node.js*
  * npm run httpnoderouting **-->** *para levantar el servidor http con Node.js utilizando rutas*
  * npm run httpexpress **-->** *para levantar el servidor http con Node.js y Expres.js*

---

## Pruebas

*Podrás utiliza cualquier multiplataforma cliente REST, o en el navegador con la ruta " http://localhost:3001/ " (En el caso del navegador para peticiones GET)* 


|httpnode   |httpnoderouting    |httpExpress    |método|
|-----------|:------------------|:--------------|:-----|
|http://localhost:3001/|http://localhost:3001/routingA|http://localhost:3001/|GET|
|http://localhost:3001/opcionA| http://localhost:3001/routingB|http://localhost:3001/archivoJson|GET|
|http://localhost:3001/opcionB||http://localhost:3001/datosParams/2121-Pepe|GET|
|http://localhost:3001/opcionC||http://localhost:3001/datosQuery?id=21&nombre=Pepe&edad=55|GET|
||http://localhost:3001/routingPostA|http://localhost:3001/datosBody|POST|

## Desarrollador: 

## **" Mi nombre es Ismael "** 
![*](imagenes/1686271781190.jpg)

[ir a mi linkedin](https://www.linkedin.com/in/ismael-diaz-3b440b27a, "Linkedin del desarrollador")

