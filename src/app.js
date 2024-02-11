const router = require('./routes/pokemon.route'); // importamos las rutas

const connection = require('./dbconnection/connection');

const express = require('express');

const cors = require('cors');

const app = express(); // app toma todas la fncionalidad de express

const port = process.env.port || 9000; // puerto por defecto

const { parse } = require('dotenv');

app.use(express.urlencoded({ extended: false })); // para que express pueda leer archivos estaticos

connection(); // llamamos a la funcion que conecta con la base de datos

app.use(cors()); // para que express pueda leer json y evitar el error de cors en el navegador al hacer peticiones desde el front end a la api rest de nodejs

app.use(express.json()); // para que express pueda leer json

app.use(express.static('public')); // para que express pueda leer archivos estaticos para que  pueda acceder a imagens que se ccargaran	 en el front end desde el back end en la ruta /public y se pueda acceder a ellas desde el front end. Ejemplo: http://localhost:9000/public/imagen.jpg

app.use('/api', router); // le decimos a express que use las rutas que definimos en el archivo pokemon.route.js

app.get('/', (req, res) => {
	res.send('WILCOME TO MY  API  <input type="text" /> <button> ok</b>'); // mensaje en consola cuando se inicia el servidor en el puerto 9000 y se ingresa a la ruta /
});

app.use((req, res) => {
	res.status(404).json({ ststus: false, error: '404,  Not Found' }); // si no se encuentra la ruta, se envia un mensaje de error
	console.log('ruta no conseguida estatus 404');
}); // para que express pueda leer archivos estaticos

//remplazando lo de arriba

app.listen(port, () => {
	// iniciamos el servidor en el puerto 9000
	console.log(` Servidor corriendo en el puerto: ${port}  `); // mensaje en consola
});

//---------------------------------------------
//middlewares
//app.use(express.json()); // para que express pueda leer json

//:::::::::::::::::::::::::::::::::::::::::::::
