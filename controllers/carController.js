const Car = require('../models/Car');
const storage = require('../data/storage');

// Get all cars
exports.getAllCars = (req, res) => {
  try {
    const { status, brand, minRate, maxRate } = req.query;
    let cars = storage.getAllCars();

    // Apply filters
    if (status) {
      cars = cars.filter(car => car.status === status);
    }
    if (brand) {
      cars = cars.filter(car => car.brand.toLowerCase().includes(brand.toLowerCase()));
    }
    if (minRate) {
      cars = cars.filter(car => car.dailyRate >= parseFloat(minRate));
    }
    if (maxRate) {
      cars = cars.filter(car => car.dailyRate <= parseFloat(maxRate));
    }

    res.json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取车辆列表失败',
      error: error.message
    });
  }
};

// Get car by ID
exports.getCarById = (req, res) => {
  try {
    const car = storage.getCarById(req.params.id);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: '车辆不存在'
      });
    }
    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取车辆信息失败',
      error: error.message
    });
  }
};

// Create new car
exports.createCar = (req, res) => {
  try {
    const car = new Car(req.body);
    const errors = car.validate();
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: '数据验证失败',
        errors: errors
      });
    }

    const savedCar = storage.addCar(car.toJSON());
    res.status(201).json({
      success: true,
      message: '车辆添加成功',
      data: savedCar
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '添加车辆失败',
      error: error.message
    });
  }
};

// Update car
exports.updateCar = (req, res) => {
  try {
    const car = storage.getCarById(req.params.id);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: '车辆不存在'
      });
    }

    const updatedCarData = new Car({ ...car, ...req.body, id: req.params.id });
    const errors = updatedCarData.validate();
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: '数据验证失败',
        errors: errors
      });
    }

    const updatedCar = storage.updateCar(req.params.id, updatedCarData.toJSON());
    res.json({
      success: true,
      message: '车辆更新成功',
      data: updatedCar
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '更新车辆失败',
      error: error.message
    });
  }
};

// Delete car
exports.deleteCar = (req, res) => {
  try {
    const car = storage.getCarById(req.params.id);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: '车辆不存在'
      });
    }

    // Check if car has active rentals
    const activeRentals = storage.getRentalsByCarId(req.params.id)
      .filter(rental => rental.status === 'active' || rental.status === 'pending');
    
    if (activeRentals.length > 0) {
      return res.status(400).json({
        success: false,
        message: '该车辆有进行中的租赁订单，无法删除'
      });
    }

    storage.deleteCar(req.params.id);
    res.json({
      success: true,
      message: '车辆删除成功'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '删除车辆失败',
      error: error.message
    });
  }
};

// Get available cars
exports.getAvailableCars = (req, res) => {
  try {
    const cars = storage.getAllCars().filter(car => car.status === 'available');
    res.json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取可用车辆失败',
      error: error.message
    });
  }
};
