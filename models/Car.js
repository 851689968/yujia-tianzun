const { v4: uuidv4 } = require('uuid');

class Car {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.brand = data.brand; // 品牌
    this.model = data.model; // 型号
    this.year = data.year; // 年份
    this.color = data.color; // 颜色
    this.plateNumber = data.plateNumber; // 车牌号
    this.dailyRate = data.dailyRate; // 日租金
    this.status = data.status || 'available'; // 状态: available, rented, maintenance
    this.mileage = data.mileage || 0; // 里程数
    this.fuelType = data.fuelType; // 燃料类型: gasoline, diesel, electric, hybrid
    this.transmission = data.transmission || 'automatic'; // 变速器: automatic, manual
    this.seats = data.seats || 5; // 座位数
    this.features = data.features || []; // 特色功能
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  validate() {
    const errors = [];
    
    if (!this.brand || this.brand.trim() === '') {
      errors.push('品牌不能为空');
    }
    
    if (!this.model || this.model.trim() === '') {
      errors.push('型号不能为空');
    }
    
    if (!this.year || this.year < 1900 || this.year > new Date().getFullYear() + 1) {
      errors.push('年份无效');
    }
    
    if (!this.plateNumber || this.plateNumber.trim() === '') {
      errors.push('车牌号不能为空');
    }
    
    if (!this.dailyRate || this.dailyRate <= 0) {
      errors.push('日租金必须大于0');
    }
    
    if (!['available', 'rented', 'maintenance'].includes(this.status)) {
      errors.push('状态无效');
    }
    
    return errors;
  }

  toJSON() {
    return {
      id: this.id,
      brand: this.brand,
      model: this.model,
      year: this.year,
      color: this.color,
      plateNumber: this.plateNumber,
      dailyRate: this.dailyRate,
      status: this.status,
      mileage: this.mileage,
      fuelType: this.fuelType,
      transmission: this.transmission,
      seats: this.seats,
      features: this.features,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Car;
