const express = require('express');

const controller = require(`../controllers/pokemon.contorller`);

const subirImagen = require('../Middleware/Storege.js');

const router = express.Router();

//ruta para  mosrar todos los pokemones que estan en la collection pokdes de la base de datos pokemon
const Pokefind = 'findAll';
router.get(`/${Pokefind}`, controller.findPokemon);

const PokefindId = 'findAll/:id';
router.get(`/${PokefindId}`, controller.findPokemon);

//rurta de insertar un nuevo pokemon a la coleccion pokedes de la base de datos pokemon
// /api/insert
const Pokecreate = 'insert';

router.post(
	`/${Pokecreate}`,
	subirImagen.single('imagen'),
	controller.postPokemon,
);

//:::::::::::::::::::::::::::::
//Ruta de actuaizar un pokemon, de la coleccion pokedes de la base de datos pokemon

const PokeUpdate = 'update/:id';
router.put(
	`/${PokeUpdate}`,
	subirImagen.single('imagen'),
	controller.putPokemon,
);

//::::::::::::::::::::::::::
const Pokedelete = 'delete/:id';
router.delete(`/${Pokedelete}`, controller.deletePokemon);
//:::::::::

module.exports = router;
