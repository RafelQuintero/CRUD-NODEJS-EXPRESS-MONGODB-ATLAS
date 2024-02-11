const momgoose = require('mongoose');

const fs = require('fs'); // modulo que se utiliza para interactuar con archivos , como leer escribir archivos

const PokeModel = require('../models/pokemon.model.js');

const { Console, error } = require('console');
const { json } = require('express');
const { resolveObjectURL } = require('buffer');

//const subirImagen = require('../Middleware/Storege');

//const connection = require('../dbconnection/connection'); ELIMINAMOS ESTE ARCHIVO Y LO PASAMOS A APP.JS

module.exports = {
	findPokemon: async (req, res) => {
		const { id } = req.params;

		try {
			const data =
				id === undefined
					? await PokeModel.find()
					: await PokeModel.findById(id);

			res.status(200).json({ status: true, losPokemones: data });
		} catch (error) {
			res.status(500), json({ status: false, error: menssage.error });
		}
	},

	//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

	postPokemon: async (req, res) => {
		const { nombre, habilidad, habilidad_oculta, color, especie, fecha } =
			req.body;

		const validacion = validar(
			nombre,
			habilidad,
			habilidad_oculta,
			color,
			especie,
			fecha,
			req.file,
			'y',
		);

		try {
			if (validacion == '') {
				const creado = await PokeModel.create({
					nombre: nombre,
					habilidad: habilidad,
					habilidad_oculta: habilidad_oculta,
					color: color,
					especie: especie,
					fecha: fecha,
					imagen: '/uploads/' + req.file.filename,
				});

				return res.status(200).json({ status: true, NuevoPokemon: creado });
			} else {
				return res.status(400).json({ status: false, error: menssage.error });
			}
		} catch (error) {
			return res.status(500), json({ status: false, error: menssage.error });
		}
	},

	//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

	//::::::::::::::::::::::::::::::::::::::::::::

	putPokemon: async (req, res) => {
		try {
			/////////////////////////////
			const { id } = req.params;
			console.log({ id: id });
			const { nombre, habilidad, habilidad_oculta, color, especie, fecha } =
				req.body;

			let imagen = ' ';
			let valores = {
				nombre,
				habilidad,
				habilidad_oculta,
				color,
				especie,
				fecha,
			};
			console.log({ peticiones: valores });

			if (req.file != null) {
				imagen = '/uploads/' + req.file.filename;

				valores = {
					nombre,
					habilidad,
					habilidad_oculta,
					color,
					especie,
					fecha,
					imagen,
				};
			}

			console.log(valores);

			//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

			const validacion = validar(
				nombre,
				habilidad,
				habilidad_oculta,
				color,
				especie,
				fecha,
			);
			console.log(id);
			console.log(valores);
			console.log(validacion);

			//////////////////////////////

			//:::::::::::::::::::::::::::::::
			if (id == undefined) {
				return res
					.status(400)
					.json({ status: false, menssage: 'Definer el id correctamente' });

				//::::::::::;;;;;;;;
			}
			if (validacion !== ' ') {
				await PokeModel.updateOne(
					{
						_id: id,
					},
					{
						$set: valores,
					},
				);
				return res
					.status(200)
					.json({ status: true, menssage: 'Pokemon actualizado' });
			} else {
				return res.status(400).json({ status: false, errors: validacion });
			}
		} catch (error) {
			return res.status(500).json({ status: false, errors: [error.menssage] });
		}
	},

	deletePokemon: async (req, res) => {
		const { id } = req.params;
		try {
			id == undefined
				? res
						.status(400)
						.json({ status: false, menssage: 'Definer el id correctamente' })
				: await PokeModel.deleteOne({ _id: id });

			res.status(200).json({ status: true, menssage: 'Eliminado el pokemon' });
		} catch (error) {
			res.status(500).json({ status: false, error: [error.menssage] });
		}
	},
};

//Funcion para validar la informacion que se mando por la peticion(req)

const validar = (
	nombre,
	habilidad,
	habilidad_oculta,
	color,
	especie,
	fecha,
	imagen,
	sevalida,
) => {
	let errores = [];

	if (nombre === undefined || nombre.trim() === '') {
		errores.push({ error: 'El nombre es requerido y no debe estar vacio' });
	}
	if (habilidad === undefined || habilidad.trim() === '') {
		errores.push({ error: 'La habilidades  es requerida ' });
	}

	if (habilidad_oculta === undefined || habilidad_oculta.trim() === '') {
		errores.push({ error: 'La habilidades_oculta es requerida ' });
	}

	if (color === undefined || color.trim() === '') {
		errores.push({ error: 'El color es requerido ' });
	}

	if (especie === undefined || especie.trim() === '') {
		errores.push('La especie  es requerida ');
	}

	if (fecha === undefined || fecha.trim() === '' || isNaN(Date.parse(fecha))) {
		errores.push('La fecha  es requerido y debe ser valida');
	}
	if (sevalida === 'y' && imagen === undefined) {
		errores.push('Selecione una   imagen en formato jpg, o  jpeg, o  png ');
	} else {
		if (errores != '') {
			fs.unlinkSync('./public/uploads/' + imagen.filename);
		}
	}
	return errores;
};

//:::::::Fin de la validacion::::

//;;;;;;;;;;;; inicio de validarput para utilizarla en la peticion put

//;;;;;;;;;;;; Fi  de validarput para utilizarla en la peticoin put
