const mongoose = require('mongoose');

// Crear el esquema para el coche
const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true }
});

// Crear y exportar el modelo del coche
const Car = mongoose.model('Car', carSchema);
module.exports = Car;
