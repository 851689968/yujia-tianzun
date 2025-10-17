// In-memory storage for demo purposes
// In production, this should be replaced with a database (MySQL, MongoDB, etc.)

class Storage {
  constructor() {
    this.cars = [];
    this.customers = [];
    this.rentals = [];
    this.initializeSampleData();
  }

  initializeSampleData() {
    // Add some sample cars
    this.cars = [
      {
        id: '1',
        brand: '大众',
        model: '帕萨特',
        year: 2023,
        color: '黑色',
        plateNumber: '京A12345',
        dailyRate: 300,
        status: 'available',
        mileage: 5000,
        fuelType: 'gasoline',
        transmission: 'automatic',
        seats: 5,
        features: ['导航系统', '倒车影像', '自动空调'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        brand: '本田',
        model: '雅阁',
        year: 2023,
        color: '白色',
        plateNumber: '京B67890',
        dailyRate: 280,
        status: 'available',
        mileage: 3000,
        fuelType: 'gasoline',
        transmission: 'automatic',
        seats: 5,
        features: ['导航系统', '座椅加热', '天窗'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        brand: '特斯拉',
        model: 'Model 3',
        year: 2024,
        color: '红色',
        plateNumber: '京C11111',
        dailyRate: 500,
        status: 'available',
        mileage: 1000,
        fuelType: 'electric',
        transmission: 'automatic',
        seats: 5,
        features: ['自动驾驶', '全景天窗', '智能语音'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // Add sample customer
    this.customers = [
      {
        id: '1',
        name: '张三',
        phone: '13800138000',
        email: 'zhangsan@example.com',
        idCard: '110101199001011234',
        driverLicense: 'C1234567890',
        address: '北京市朝阳区',
        memberLevel: 'gold',
        registrationDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  // Cars methods
  getAllCars() {
    return this.cars;
  }

  getCarById(id) {
    return this.cars.find(car => car.id === id);
  }

  addCar(car) {
    this.cars.push(car);
    return car;
  }

  updateCar(id, updates) {
    const index = this.cars.findIndex(car => car.id === id);
    if (index !== -1) {
      this.cars[index] = { ...this.cars[index], ...updates, updatedAt: new Date().toISOString() };
      return this.cars[index];
    }
    return null;
  }

  deleteCar(id) {
    const index = this.cars.findIndex(car => car.id === id);
    if (index !== -1) {
      return this.cars.splice(index, 1)[0];
    }
    return null;
  }

  // Customers methods
  getAllCustomers() {
    return this.customers;
  }

  getCustomerById(id) {
    return this.customers.find(customer => customer.id === id);
  }

  addCustomer(customer) {
    this.customers.push(customer);
    return customer;
  }

  updateCustomer(id, updates) {
    const index = this.customers.findIndex(customer => customer.id === id);
    if (index !== -1) {
      this.customers[index] = { ...this.customers[index], ...updates, updatedAt: new Date().toISOString() };
      return this.customers[index];
    }
    return null;
  }

  deleteCustomer(id) {
    const index = this.customers.findIndex(customer => customer.id === id);
    if (index !== -1) {
      return this.customers.splice(index, 1)[0];
    }
    return null;
  }

  // Rentals methods
  getAllRentals() {
    return this.rentals;
  }

  getRentalById(id) {
    return this.rentals.find(rental => rental.id === id);
  }

  getRentalsByCustomerId(customerId) {
    return this.rentals.filter(rental => rental.customerId === customerId);
  }

  getRentalsByCarId(carId) {
    return this.rentals.filter(rental => rental.carId === carId);
  }

  addRental(rental) {
    this.rentals.push(rental);
    return rental;
  }

  updateRental(id, updates) {
    const index = this.rentals.findIndex(rental => rental.id === id);
    if (index !== -1) {
      this.rentals[index] = { ...this.rentals[index], ...updates, updatedAt: new Date().toISOString() };
      return this.rentals[index];
    }
    return null;
  }

  deleteRental(id) {
    const index = this.rentals.findIndex(rental => rental.id === id);
    if (index !== -1) {
      return this.rentals.splice(index, 1)[0];
    }
    return null;
  }
}

// Export singleton instance
module.exports = new Storage();
