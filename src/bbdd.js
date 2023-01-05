const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.mongodb_atlas_uri)
    .then(() => console.log('Conectado a Mongodb atlas'))
    .catch((error) => console.error(error));
