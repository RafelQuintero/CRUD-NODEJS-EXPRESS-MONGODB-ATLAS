const mongoose = require('mongoose');

require('dotenv').config(); //  const connection = () => {
module.exports = () => {
  mongoose
    .connect(
      process.env.URI_MONGODBATLAS,

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(console.log('conectado a la base de datos'))
    .catch((error) => console.timeLog({ message: error }));
};
