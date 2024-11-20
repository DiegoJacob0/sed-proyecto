const express = require('express');
const router = express.Router();
const Car = require('../models/car');  // Importamos el modelo de coche

// Ruta para agregar un coche
router.post('/add', async (req, res) => {
  try {
    const { brand, model, year, price } = req.body;

    const newCar = new Car({
      brand,
      model,
      year,
      price
    });

    await newCar.save();  // Guardar el coche en la base de datos
    res.status(201).json({ message: 'Coche agregado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar el coche.' });
  }
});

// Ruta para obtener todos los coches
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();  // Obtener todos los coches
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los coches.' });
  }
});

// Ruta para eliminar un coche
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('ID del coche a eliminar:', id); // Verificación del ID recibido

    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: 'Coche no encontrado.' });
    }

    await car.remove();  // Eliminar el coche
    res.status(200).json({ message: 'Coche eliminado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el coche.' });
  }
});

module.exports = router;
