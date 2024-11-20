const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Login para SuperAdmin
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario con el rol 'SuperAdmin'
    const user = await User.findOne({ email, role: 'SuperAdmin' });
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    // Comparar las contraseñas
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send('Contraseña incorrecta');
    }

    // Generar token JWT
    const token = jwt.sign({ userId: user._id, role: user.role }, 'SECRET_KEY', { expiresIn: '1h' });
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error("Error durante el login:", error);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;
