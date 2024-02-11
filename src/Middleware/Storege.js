//la funcion validarImagen se encarga de validar la imagen que se va a guardar en la base de datos
//multer  es el modulo que se encarga de guardar la imagen en la carpeta public/uploads

const multer = require('multer');

const guardar = multer.diskStorage({
	///funcion  de como debo guardar el archivo de la imagen
	destination: (req, file, cb) => {
		//propiedad que me dice en que carpeta guardo la imagen en el srvidor
		cb(null, './public/uploads');
	},

	filename: (req, file, cb) => {
		// esta proiedad me dice el nombre que debe lleva el archivo imagen  que es guardado en la capeta en el servidor , la cual sera la fecha actual, dada en milesegundos; garcias  a la funcion Date.now() + la funcion (file.originalname.split('.').pop()) par obtener el ". extension"  la cual sera concatenada en parametro "cb" de fifename.
		if (file !== null) {
			const ext = file.originalname.split('.').pop();
			cb(null, Date.now() + '.' + ext);
		}
	},
});
//Creamos el filtro para validar el tipo de archivo

const filtro = (req, file, cb) => {
	if (
		file &&
		(file.mimetype === 'image/jpg' ||
			file.mimetype === 'image/jpeg' ||
			file.mimetype === 'image/png')
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const subirImagen = multer({ storage: guardar, fileFilter: filtro });

module.exports = subirImagen;
