const { v4: uuidv4 } = require('uuid');

class Customer {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.name = data.name; // 姓名
    this.phone = data.phone; // 电话
    this.email = data.email; // 邮箱
    this.idCard = data.idCard; // 身份证号
    this.driverLicense = data.driverLicense; // 驾照号
    this.address = data.address; // 地址
    this.memberLevel = data.memberLevel || 'regular'; // 会员等级: regular, silver, gold, platinum
    this.registrationDate = data.registrationDate || new Date().toISOString();
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  validate() {
    const errors = [];
    
    if (!this.name || this.name.trim() === '') {
      errors.push('姓名不能为空');
    }
    
    if (!this.phone || !/^1[3-9]\d{9}$/.test(this.phone)) {
      errors.push('手机号格式无效');
    }
    
    if (this.email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email)) {
      errors.push('邮箱格式无效');
    }
    
    if (!this.idCard || !/^\d{17}[\dXx]$/.test(this.idCard)) {
      errors.push('身份证号格式无效');
    }
    
    if (!this.driverLicense || this.driverLicense.trim() === '') {
      errors.push('驾照号不能为空');
    }
    
    if (!['regular', 'silver', 'gold', 'platinum'].includes(this.memberLevel)) {
      errors.push('会员等级无效');
    }
    
    return errors;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      email: this.email,
      idCard: this.idCard,
      driverLicense: this.driverLicense,
      address: this.address,
      memberLevel: this.memberLevel,
      registrationDate: this.registrationDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Customer;
