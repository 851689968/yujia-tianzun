const Customer = require('../models/Customer');
const storage = require('../data/storage');

// Get all customers
exports.getAllCustomers = (req, res) => {
  try {
    const { memberLevel, phone } = req.query;
    let customers = storage.getAllCustomers();

    // Apply filters
    if (memberLevel) {
      customers = customers.filter(customer => customer.memberLevel === memberLevel);
    }
    if (phone) {
      customers = customers.filter(customer => customer.phone.includes(phone));
    }

    res.json({
      success: true,
      count: customers.length,
      data: customers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取客户列表失败',
      error: error.message
    });
  }
};

// Get customer by ID
exports.getCustomerById = (req, res) => {
  try {
    const customer = storage.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: '客户不存在'
      });
    }
    res.json({
      success: true,
      data: customer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取客户信息失败',
      error: error.message
    });
  }
};

// Create new customer
exports.createCustomer = (req, res) => {
  try {
    const customer = new Customer(req.body);
    const errors = customer.validate();
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: '数据验证失败',
        errors: errors
      });
    }

    // Check if phone or idCard already exists
    const existingCustomer = storage.getAllCustomers().find(
      c => c.phone === customer.phone || c.idCard === customer.idCard
    );

    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: '该手机号或身份证号已被注册'
      });
    }

    const savedCustomer = storage.addCustomer(customer.toJSON());
    res.status(201).json({
      success: true,
      message: '客户注册成功',
      data: savedCustomer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '注册客户失败',
      error: error.message
    });
  }
};

// Update customer
exports.updateCustomer = (req, res) => {
  try {
    const customer = storage.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: '客户不存在'
      });
    }

    const updatedCustomerData = new Customer({ ...customer, ...req.body, id: req.params.id });
    const errors = updatedCustomerData.validate();
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: '数据验证失败',
        errors: errors
      });
    }

    const updatedCustomer = storage.updateCustomer(req.params.id, updatedCustomerData.toJSON());
    res.json({
      success: true,
      message: '客户信息更新成功',
      data: updatedCustomer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '更新客户信息失败',
      error: error.message
    });
  }
};

// Delete customer
exports.deleteCustomer = (req, res) => {
  try {
    const customer = storage.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: '客户不存在'
      });
    }

    // Check if customer has active rentals
    const activeRentals = storage.getRentalsByCustomerId(req.params.id)
      .filter(rental => rental.status === 'active' || rental.status === 'pending');
    
    if (activeRentals.length > 0) {
      return res.status(400).json({
        success: false,
        message: '该客户有进行中的租赁订单，无法删除'
      });
    }

    storage.deleteCustomer(req.params.id);
    res.json({
      success: true,
      message: '客户删除成功'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '删除客户失败',
      error: error.message
    });
  }
};

// Get customer rental history
exports.getCustomerRentals = (req, res) => {
  try {
    const customer = storage.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: '客户不存在'
      });
    }

    const rentals = storage.getRentalsByCustomerId(req.params.id);
    res.json({
      success: true,
      count: rentals.length,
      data: rentals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取客户租赁记录失败',
      error: error.message
    });
  }
};
