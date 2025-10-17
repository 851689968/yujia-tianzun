# 租车管理系统 (Car Rental Management System)

基于 Node.js + Express 的租车管理系统后端API

## 技术栈

- **Node.js**: JavaScript 运行环境
- **Express**: Web 应用框架
- **Body-Parser**: 请求体解析中间件
- **CORS**: 跨域资源共享中间件
- **UUID**: 生成唯一标识符

## 功能特性

### 车辆管理
- 添加、查询、更新、删除车辆信息
- 查询可用车辆
- 按品牌、状态、价格筛选车辆

### 客户管理
- 注册、查询、更新、删除客户信息
- 查询客户租赁历史
- 会员等级管理

### 租赁管理
- 创建租赁订单
- 查询租赁订单
- 更新订单状态
- 完成租赁（还车）
- 取消订单
- 自动计算租金和逾期费用

## 安装和运行

### 安装依赖
```bash
npm install
```

### 启动服务器
```bash
# 生产环境
npm start

# 开发环境（支持热重载）
npm run dev
```

服务器默认运行在 `http://localhost:3000`

## API 文档

### 基础信息
- **基础URL**: `http://localhost:3000/api`
- **数据格式**: JSON
- **字符编码**: UTF-8

### 车辆管理 API

#### 获取所有车辆
```
GET /api/cars
```

查询参数:
- `status`: 车辆状态 (available, rented, maintenance)
- `brand`: 品牌
- `minRate`: 最低日租金
- `maxRate`: 最高日租金

#### 获取可用车辆
```
GET /api/cars/available
```

#### 获取车辆详情
```
GET /api/cars/:id
```

#### 添加车辆
```
POST /api/cars
```

请求体:
```json
{
  "brand": "大众",
  "model": "帕萨特",
  "year": 2023,
  "color": "黑色",
  "plateNumber": "京A12345",
  "dailyRate": 300,
  "mileage": 5000,
  "fuelType": "gasoline",
  "transmission": "automatic",
  "seats": 5,
  "features": ["导航系统", "倒车影像", "自动空调"]
}
```

#### 更新车辆
```
PUT /api/cars/:id
```

#### 删除车辆
```
DELETE /api/cars/:id
```

### 客户管理 API

#### 获取所有客户
```
GET /api/customers
```

查询参数:
- `memberLevel`: 会员等级 (regular, silver, gold, platinum)
- `phone`: 电话号码

#### 获取客户详情
```
GET /api/customers/:id
```

#### 获取客户租赁历史
```
GET /api/customers/:id/rentals
```

#### 注册客户
```
POST /api/customers
```

请求体:
```json
{
  "name": "张三",
  "phone": "13800138000",
  "email": "zhangsan@example.com",
  "idCard": "110101199001011234",
  "driverLicense": "C1234567890",
  "address": "北京市朝阳区",
  "memberLevel": "regular"
}
```

#### 更新客户信息
```
PUT /api/customers/:id
```

#### 删除客户
```
DELETE /api/customers/:id
```

### 租赁管理 API

#### 获取所有租赁订单
```
GET /api/rentals
```

查询参数:
- `status`: 订单状态 (pending, active, completed, cancelled)
- `customerId`: 客户ID
- `carId`: 车辆ID

#### 获取租赁订单详情
```
GET /api/rentals/:id
```

#### 创建租赁订单
```
POST /api/rentals
```

请求体:
```json
{
  "carId": "1",
  "customerId": "1",
  "startDate": "2024-01-01",
  "endDate": "2024-01-05",
  "pickupLocation": "北京朝阳门店",
  "returnLocation": "北京朝阳门店",
  "notes": "需要婴儿座椅"
}
```

#### 更新订单状态
```
PATCH /api/rentals/:id/status
```

请求体:
```json
{
  "status": "active"
}
```

#### 完成租赁（还车）
```
POST /api/rentals/:id/complete
```

#### 取消订单
```
POST /api/rentals/:id/cancel
```

#### 删除订单
```
DELETE /api/rentals/:id
```

## 数据模型

### 车辆 (Car)
```javascript
{
  id: String,              // 唯一标识符
  brand: String,           // 品牌
  model: String,           // 型号
  year: Number,            // 年份
  color: String,           // 颜色
  plateNumber: String,     // 车牌号
  dailyRate: Number,       // 日租金
  status: String,          // 状态 (available/rented/maintenance)
  mileage: Number,         // 里程数
  fuelType: String,        // 燃料类型
  transmission: String,    // 变速器类型
  seats: Number,           // 座位数
  features: Array,         // 特色功能
  createdAt: Date,         // 创建时间
  updatedAt: Date          // 更新时间
}
```

### 客户 (Customer)
```javascript
{
  id: String,              // 唯一标识符
  name: String,            // 姓名
  phone: String,           // 电话
  email: String,           // 邮箱
  idCard: String,          // 身份证号
  driverLicense: String,   // 驾照号
  address: String,         // 地址
  memberLevel: String,     // 会员等级
  registrationDate: Date,  // 注册日期
  createdAt: Date,         // 创建时间
  updatedAt: Date          // 更新时间
}
```

### 租赁订单 (Rental)
```javascript
{
  id: String,              // 唯一标识符
  carId: String,           // 车辆ID
  customerId: String,      // 客户ID
  startDate: Date,         // 租赁开始日期
  endDate: Date,           // 租赁结束日期
  actualEndDate: Date,     // 实际归还日期
  totalDays: Number,       // 租赁天数
  dailyRate: Number,       // 日租金
  totalAmount: Number,     // 总金额
  deposit: Number,         // 押金
  status: String,          // 状态 (pending/active/completed/cancelled)
  pickupLocation: String,  // 取车地点
  returnLocation: String,  // 还车地点
  notes: String,           // 备注
  createdAt: Date,         // 创建时间
  updatedAt: Date          // 更新时间
}
```

## 响应格式

### 成功响应
```json
{
  "success": true,
  "message": "操作成功",
  "data": {}
}
```

### 错误响应
```json
{
  "success": false,
  "message": "错误信息",
  "error": "详细错误"
}
```

## 注意事项

- 当前版本使用内存存储，重启服务器后数据会丢失
- 生产环境建议使用 MySQL、MongoDB 等数据库
- 建议添加身份认证和授权机制
- 建议添加日志记录功能
- 建议添加数据备份机制

## 示例数据

系统启动时会自动加载示例数据：
- 3辆示例车辆（大众帕萨特、本田雅阁、特斯拉 Model 3）
- 1个示例客户（张三）

## 后续优化建议

1. 集成数据库（MySQL/MongoDB）
2. 添加用户认证（JWT）
3. 添加权限管理
4. 添加日志系统
5. 添加单元测试
6. 添加API文档工具（Swagger）
7. 添加数据验证中间件
8. 实现分页功能
9. 添加搜索功能
10. 实现文件上传（车辆图片、证件等）

## 许可证

ISC