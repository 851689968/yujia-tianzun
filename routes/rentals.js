const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

// Get all rentals
router.get('/', rentalController.getAllRentals);

// Get rental by ID
router.get('/:id', rentalController.getRentalById);

// Create new rental
router.post('/', rentalController.createRental);

// Update rental status
router.patch('/:id/status', rentalController.updateRentalStatus);

// Complete rental (return car)
router.post('/:id/complete', rentalController.completeRental);

// Cancel rental
router.post('/:id/cancel', rentalController.cancelRental);

// Delete rental
router.delete('/:id', rentalController.deleteRental);

module.exports = router;
