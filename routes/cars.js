const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Get all cars
router.get('/', carController.getAllCars);

// Get available cars
router.get('/available', carController.getAvailableCars);

// Get car by ID
router.get('/:id', carController.getCarById);

// Create new car
router.post('/', carController.createCar);

// Update car
router.put('/:id', carController.updateCar);

// Delete car
router.delete('/:id', carController.deleteCar);

module.exports = router;
