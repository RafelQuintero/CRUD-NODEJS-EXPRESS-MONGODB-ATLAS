const mongoose = require('mongoose');

const { Schema } = mongoose;

const PokeSchema = new Schema(
	{
		nombre: { type: String },

		habilidad: { type: String },

		habilidad_oculta: { type: String },

		color: { type: String },

		especie: { type: String },

		fecha: { type: Date },

		imagen: { type: String },
	},
	{ versionKey: false },
);

PokeModel = mongoose.model('pokedes', PokeSchema);

module.exports = PokeModel;
