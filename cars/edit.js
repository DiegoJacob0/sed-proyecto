// Obtener todos los coches de la base de datos y mostrarlos en la lista
async function getCars() {
  try {
    const response = await fetch('/cars');
    const cars = await response.json();

    const carList = document.getElementById('carList');
    carList.innerHTML = ''; // Limpiar lista antes de mostrar

    // Mostrar todos los coches en la lista
    cars.forEach(car => {
      const carItem = document.createElement('li');
      carItem.textContent = `${car.brand} ${car.model} - ${car.year} - $${car.price}`;
      
      // Agregar un botón para eliminar el coche
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.addEventListener('click', () => deleteCar(car._id));

      carItem.appendChild(deleteButton);
      carList.appendChild(carItem);
    });
  } catch (error) {
    console.error('Error al obtener los coches:', error);
  }
}

// Función para agregar un coche
async function addCar() {
  const carInput = document.getElementById('carInput');
  const carDetails = carInput.value.trim();

  if (!carDetails) {
    alert('Por favor ingrese los detalles del coche.');
    return;
  }

  // Crear un coche con información básica (puedes agregar más campos si quieres)
  const carData = {
    brand: carDetails, // Aquí se puede adaptar para recibir más detalles como el modelo, precio, etc.
    model: 'Modelo Desconocido',
    year: '2024',
    price: '30000'
  };

  try {
    const response = await fetch('/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carData)
    });

    if (response.ok) {
      getCars(); // Actualizar la lista después de agregar el coche
      carInput.value = ''; // Limpiar el input
    } else {
      alert('Error al agregar el coche');
    }
  } catch (error) {
    console.error('Error al agregar el coche:', error);
  }
}

// Función para eliminar un coche
async function deleteCar(carId) {
  try {
    const response = await fetch(`/cars/${carId}`, { method: 'DELETE' });

    if (response.ok) {
      getCars(); // Actualizar la lista después de eliminar el coche
    } else {
      alert('Error al eliminar el coche');
    }
  } catch (error) {
    console.error('Error al eliminar el coche:', error);
  }
}

// Cargar los coches cuando se carga la página
document.addEventListener('DOMContentLoaded', getCars);
