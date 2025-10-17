const { v4: uuidv4 } = require('uuid');

class Rental {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.carId = data.carId; // 车辆ID
    this.customerId = data.customerId; // 客户ID
    this.startDate = data.startDate; // 租赁开始日期
    this.endDate = data.endDate; // 租赁结束日期
    this.actualEndDate = data.actualEndDate || null; // 实际归还日期
    this.totalDays = data.totalDays || 0; // 租赁天数
    this.dailyRate = data.dailyRate; // 日租金
    this.totalAmount = data.totalAmount || 0; // 总金额
    this.deposit = data.deposit || 0; // 押金
    this.status = data.status || 'pending'; // 状态: pending, active, completed, cancelled
    this.pickupLocation = data.pickupLocation; // 取车地点
    this.returnLocation = data.returnLocation; // 还车地点
    this.notes = data.notes || ''; // 备注
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  validate() {
    const errors = [];
    
    if (!this.carId || this.carId.trim() === '') {
      errors.push('车辆ID不能为空');
    }
    
    if (!this.customerId || this.customerId.trim() === '') {
      errors.push('客户ID不能为空');
    }
    
    if (!this.startDate) {
      errors.push('租赁开始日期不能为空');
    }
    
    if (!this.endDate) {
      errors.push('租赁结束日期不能为空');
    }
    
    if (this.startDate && this.endDate && new Date(this.startDate) >= new Date(this.endDate)) {
      errors.push('结束日期必须晚于开始日期');
    }
    
    if (!this.dailyRate || this.dailyRate <= 0) {
      errors.push('日租金必须大于0');
    }
    
    if (!['pending', 'active', 'completed', 'cancelled'].includes(this.status)) {
      errors.push('状态无效');
    }
    
    return errors;
  }

  calculateTotal() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      this.totalDays = days > 0 ? days : 1;
      this.totalAmount = this.totalDays * this.dailyRate;
    }
  }

  toJSON() {
    return {
      id: this.id,
      carId: this.carId,
      customerId: this.customerId,
      startDate: this.startDate,
      endDate: this.endDate,
      actualEndDate: this.actualEndDate,
      totalDays: this.totalDays,
      dailyRate: this.dailyRate,
      totalAmount: this.totalAmount,
      deposit: this.deposit,
      status: this.status,
      pickupLocation: this.pickupLocation,
      returnLocation: this.returnLocation,
      notes: this.notes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Rental;
