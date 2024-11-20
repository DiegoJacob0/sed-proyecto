// app.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');  // Rutas generales de usuarios
const rouAdmin = require('./routes/rouAdmin'); // Rutas para admin
const rouSuper = require('./routes/rouSuper'); // Rutas para superadmin
const rouClient = require('./routes/rouClient'); // Rutas para cliente
const carRoutes = require('./routes/car'); // Agregar esta línea para las rutas de coches

const app = express();

// Conexión a MongoDB
mongoose.connect('mongodb://localhost/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log("Error de conexión", err));

// Configuración de middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas generales
app.use('/users', userRoutes);

// Rutas específicas por rol
app.use('/admin', rouAdmin);
app.use('/superadmin', rouSuper);
app.use('/client', rouClient);

// Rutas para los coches
app.use('/cars', carRoutes); // Añadir esta línea para las rutas de coches

// Servir archivos estáticos (HTML, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'views')));

// Puerto donde se ejecutará el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
