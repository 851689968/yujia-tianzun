const Rental = require('../models/Rental');
const storage = require('../data/storage');

// Get all rentals
exports.getAllRentals = (req, res) => {
  try {
    const { status, customerId, carId } = req.query;
    let rentals = storage.getAllRentals();

    // Apply filters
    if (status) {
      rentals = rentals.filter(rental => rental.status === status);
    }
    if (customerId) {
      rentals = rentals.filter(rental => rental.customerId === customerId);
    }
    if (carId) {
      rentals = rentals.filter(rental => rental.carId === carId);
    }

    res.json({
      success: true,
      count: rentals.length,
      data: rentals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取租赁订单列表失败',
      error: error.message
    });
  }
};

// Get rental by ID
exports.getRentalById = (req, res) => {
  try {
    const rental = storage.getRentalById(req.params.id);
    if (!rental) {
      return res.status(404).json({
        success: false,
        message: '租赁订单不存在'
      });
    }

    // Get related car and customer info
    const car = storage.getCarById(rental.carId);
    const customer = storage.getCustomerById(rental.customerId);

    res.json({
      success: true,
      data: {
        ...rental,
        car: car,
        customer: customer
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取租赁订单信息失败',
      error: error.message
    });
  }
};

// Create new rental
exports.createRental = (req, res) => {
  try {
    // Check if car exists and is available
    const car = storage.getCarById(req.body.carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: '车辆不存在'
      });
    }

    if (car.status !== 'available') {
      return res.status(400).json({
        success: false,
        message: '该车辆当前不可租赁'
      });
    }

    // Check if customer exists
    const customer = storage.getCustomerById(req.body.customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: '客户不存在'
      });
    }

    // Create rental with car's daily rate
    const rentalData = {
      ...req.body,
      dailyRate: car.dailyRate,
      deposit: car.dailyRate * 2 // Default deposit: 2 days of rent
    };

    const rental = new Rental(rentalData);
    rental.calculateTotal();
    
    const errors = rental.validate();
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: '数据验证失败',
        errors: errors
      });
    }

    const savedRental = storage.addRental(rental.toJSON());
    
    // Update car status to rented
    storage.updateCar(req.body.carId, { status: 'rented' });

    res.status(201).json({
      success: true,
      message: '租赁订单创建成功',
      data: savedRental
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '创建租赁订单失败',
      error: error.message
    });
  }
};

// Update rental status
exports.updateRentalStatus = (req, res) => {
  try {
    const rental = storage.getRentalById(req.params.id);
    if (!rental) {
      return res.status(404).json({
        success: false,
        message: '租赁订单不存在'
      });
    }

    const { status } = req.body;
    if (!['pending', 'active', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: '状态无效'
      });
    }

    const updates = { status };

    // If completing rental, set actual end date
    if (status === 'completed') {
      updates.actualEndDate = new Date().toISOString();
      // Make car available again
      storage.updateCar(rental.carId, { status: 'available' });
    }

    // If cancelling rental, make car available
    if (status === 'cancelled') {
      storage.updateCar(rental.carId, { status: 'available' });
    }

    const updatedRental = storage.updateRental(req.params.id, updates);
    res.json({
      success: true,
      message: '租赁订单状态更新成功',
      data: updatedRental
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '更新租赁订单状态失败',
      error: error.message
    });
  }
};

// Complete rental (return car)
exports.completeRental = (req, res) => {
  try {
    const rental = storage.getRentalById(req.params.id);
    if (!rental) {
      return res.status(404).json({
        success: false,
        message: '租赁订单不存在'
      });
    }

    if (rental.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: '只能完成进行中的订单'
      });
    }

    const actualEndDate = new Date().toISOString();
    const updates = {
      status: 'completed',
      actualEndDate: actualEndDate
    };

    // Calculate any additional charges for late return
    const plannedEnd = new Date(rental.endDate);
    const actualEnd = new Date(actualEndDate);
    if (actualEnd > plannedEnd) {
      const extraDays = Math.ceil((actualEnd - plannedEnd) / (1000 * 60 * 60 * 24));
      updates.totalDays = rental.totalDays + extraDays;
      updates.totalAmount = updates.totalDays * rental.dailyRate;
    }

    const updatedRental = storage.updateRental(req.params.id, updates);
    
    // Make car available again
    storage.updateCar(rental.carId, { status: 'available' });

    res.json({
      success: true,
      message: '租赁订单已完成',
      data: updatedRental
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '完成租赁订单失败',
      error: error.message
    });
  }
};

// Cancel rental
exports.cancelRental = (req, res) => {
  try {
    const rental = storage.getRentalById(req.params.id);
    if (!rental) {
      return res.status(404).json({
        success: false,
        message: '租赁订单不存在'
      });
    }

    if (rental.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: '已完成的订单无法取消'
      });
    }

    const updatedRental = storage.updateRental(req.params.id, { status: 'cancelled' });
    
    // Make car available again
    storage.updateCar(rental.carId, { status: 'available' });

    res.json({
      success: true,
      message: '租赁订单已取消',
      data: updatedRental
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '取消租赁订单失败',
      error: error.message
    });
  }
};

// Delete rental
exports.deleteRental = (req, res) => {
  try {
    const rental = storage.getRentalById(req.params.id);
    if (!rental) {
      return res.status(404).json({
        success: false,
        message: '租赁订单不存在'
      });
    }

    if (rental.status === 'active') {
      return res.status(400).json({
        success: false,
        message: '进行中的订单无法删除，请先取消订单'
      });
    }

    storage.deleteRental(req.params.id);
    res.json({
      success: true,
      message: '租赁订单删除成功'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '删除租赁订单失败',
      error: error.message
    });
  }
};
