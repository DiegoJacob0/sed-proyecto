const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt'); // Asegúrate de tener esto
const jwt = require('jsonwebtoken');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { name, email, password, role, phone, address } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send('Este correo ya está registrado');
  }

  // Verificar que la contraseña esté presente
  if (!password) {
    return res.status(400).send('La contraseña es obligatoria');
  }

  // Encriptar la contraseña (salt = 10)
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el salt
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Guardar la contraseña encriptada
      role, // Asignar el rol (cliente, admin, superadmin)
      phone,
      address
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
  } catch (error) {
    console.error("Error al encriptar la contraseña:", error);
    res.status(500).send('Error al encriptar la contraseña');
  }
});

// Ruta para obtener todos los usuarios (si es necesario para administración)
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Buscar todos los usuarios
    res.status(200).json(users); // Enviar respuesta con los usuarios
  } catch (error) {
    res.status(500).send('Error al obtener los usuarios');
  }
});

// Ruta para editar un usuario
router.put('/edit/:id', async (req, res) => {
  const { name, phone, address } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, phone, address }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send('Error al actualizar el usuario');
  }
});

// Ruta para eliminar un usuario
router.delete('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send('Usuario eliminado');
  } catch (error) {
    res.status(500).send('Error al eliminar el usuario');
  }
});

module.exports = router;
