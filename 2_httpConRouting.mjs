
import http from 'node:http';
import get from 'node:http2';

const PORT = process.env.PORT ?? 3001;

const procesandoRequest = (req, res) => {

    const { method, url } = req; // extraigo de la request el médoto y la url de la petición.
    switch (method) {
        case 'GET':
            switch (url) {
                case '/routingA':
                    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                    return res.end('logrando hacer con GET una petición a la ruta routingA');
                case '/routingB':
                    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                    return res.end('logrando hacer con GET una petición a la ruta routingB');
                default:
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    return res.end('<h1>404</h1>');
            };
        case 'POST':
            switch (url) {
                case '/routingPostA': {
                    let body = '';
                    req.on('data', (dato) => { // req.on crea un evento de data, y en la callback ingresa el trozo de dato leido y lo va guardando en la variable body.
                        body += dato.toString();
                    });
                    req.on('end', () => { // al finalizar el evento envío los datos.
                        const data = JSON.parse(body);
                        data.timestamp = Date.now();  // se agrega al objeto data la propiedad timestamp y se le asigna el día actual.
                        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify(data));
                    });
                    break;
                }
                default:
                    res.writeHead(404, { 'Content-Type': 'text/plane; charset=utf-8' });
                    return res.end('404 not found!!!!');
            };
    };
};

/* 
import get from 'node:https'
get(options, httpClient).on("err", httpError)
options = a un objeto donde se coloca:
{
    host: "direccion url",
    port: 80, //80=http localhost, 443 = puerto seguro https
    path: "ruta a la que quiero acceder en host"
}
httpClient es la callback en la que voy a escuchar res.on (es como un sniffers)
httpError es la callback que mostrará el error
*/

const servidorRouting = http.createServer(procesandoRequest);

servidorRouting.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto http://localhost: ${PORT} en Routing`);
});