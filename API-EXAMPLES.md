# API 使用示例 (API Usage Examples)

本文档提供了使用 curl 命令测试 API 的示例。

## 车辆管理示例

### 1. 获取所有车辆
```bash
curl http://localhost:3000/api/cars
```

### 2. 获取可用车辆
```bash
curl http://localhost:3000/api/cars/available
```

### 3. 按条件筛选车辆
```bash
# 筛选可用车辆
curl "http://localhost:3000/api/cars?status=available"

# 筛选大众品牌
curl "http://localhost:3000/api/cars?brand=大众"

# 筛选日租金在200-400之间的车辆
curl "http://localhost:3000/api/cars?minRate=200&maxRate=400"
```

### 4. 获取特定车辆详情
```bash
curl http://localhost:3000/api/cars/1
```

### 5. 添加新车辆
```bash
curl -X POST http://localhost:3000/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "奔驰",
    "model": "E300L",
    "year": 2024,
    "color": "银色",
    "plateNumber": "京D88888",
    "dailyRate": 600,
    "mileage": 500,
    "fuelType": "gasoline",
    "transmission": "automatic",
    "seats": 5,
    "features": ["真皮座椅", "柏林之声音响", "自适应巡航"]
  }'
```

### 6. 更新车辆信息
```bash
curl -X PUT http://localhost:3000/api/cars/1 \
  -H "Content-Type: application/json" \
  -d '{
    "dailyRate": 350,
    "mileage": 6000
  }'
```

### 7. 删除车辆
```bash
curl -X DELETE http://localhost:3000/api/cars/1
```

## 客户管理示例

### 1. 获取所有客户
```bash
curl http://localhost:3000/api/customers
```

### 2. 按条件筛选客户
```bash
# 筛选金卡会员
curl "http://localhost:3000/api/customers?memberLevel=gold"

# 按电话查询
curl "http://localhost:3000/api/customers?phone=13800138000"
```

### 3. 获取特定客户详情
```bash
curl http://localhost:3000/api/customers/1
```

### 4. 注册新客户
```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "李四",
    "phone": "13900139000",
    "email": "lisi@example.com",
    "idCard": "110101199101011234",
    "driverLicense": "C9876543210",
    "address": "上海市浦东新区",
    "memberLevel": "silver"
  }'
```

### 5. 更新客户信息
```bash
curl -X PUT http://localhost:3000/api/customers/1 \
  -H "Content-Type: application/json" \
  -d '{
    "memberLevel": "platinum",
    "address": "北京市海淀区"
  }'
```

### 6. 获取客户租赁历史
```bash
curl http://localhost:3000/api/customers/1/rentals
```

### 7. 删除客户
```bash
curl -X DELETE http://localhost:3000/api/customers/1
```

## 租赁管理示例

### 1. 获取所有租赁订单
```bash
curl http://localhost:3000/api/rentals
```

### 2. 按条件筛选订单
```bash
# 筛选进行中的订单
curl "http://localhost:3000/api/rentals?status=active"

# 筛选特定客户的订单
curl "http://localhost:3000/api/rentals?customerId=1"

# 筛选特定车辆的订单
curl "http://localhost:3000/api/rentals?carId=1"
```

### 3. 获取特定订单详情
```bash
curl http://localhost:3000/api/rentals/62ce231f-469c-416f-97cb-b0b3ce5909e4
```

### 4. 创建租赁订单
```bash
curl -X POST http://localhost:3000/api/rentals \
  -H "Content-Type: application/json" \
  -d '{
    "carId": "1",
    "customerId": "1",
    "startDate": "2025-10-20",
    "endDate": "2025-10-25",
    "pickupLocation": "北京朝阳门店",
    "returnLocation": "北京朝阳门店",
    "notes": "需要婴儿座椅"
  }'
```

### 5. 更新订单状态
```bash
# 将订单状态改为进行中
curl -X PATCH http://localhost:3000/api/rentals/62ce231f-469c-416f-97cb-b0b3ce5909e4/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "active"
  }'
```

### 6. 完成租赁（还车）
```bash
curl -X POST http://localhost:3000/api/rentals/62ce231f-469c-416f-97cb-b0b3ce5909e4/complete
```

### 7. 取消订单
```bash
curl -X POST http://localhost:3000/api/rentals/62ce231f-469c-416f-97cb-b0b3ce5909e4/cancel
```

### 8. 删除订单
```bash
curl -X DELETE http://localhost:3000/api/rentals/62ce231f-469c-416f-97cb-b0b3ce5909e4
```

## 完整业务流程示例

### 场景：客户租车完整流程

```bash
# 1. 查看可用车辆
curl http://localhost:3000/api/cars/available

# 2. 查看特定车辆详情
curl http://localhost:3000/api/cars/2

# 3. 创建租赁订单
curl -X POST http://localhost:3000/api/rentals \
  -H "Content-Type: application/json" \
  -d '{
    "carId": "2",
    "customerId": "1",
    "startDate": "2025-10-18",
    "endDate": "2025-10-20",
    "pickupLocation": "北京朝阳门店",
    "returnLocation": "北京朝阳门店"
  }'

# 4. 将订单状态改为进行中（客户已取车）
curl -X PATCH http://localhost:3000/api/rentals/{租赁订单ID}/status \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'

# 5. 完成租赁（客户还车）
curl -X POST http://localhost:3000/api/rentals/{租赁订单ID}/complete

# 6. 查看客户的租赁历史
curl http://localhost:3000/api/customers/1/rentals
```

## 使用 Postman 测试

您也可以使用 Postman 等 API 测试工具：

1. 创建新的 Collection
2. 添加请求，设置正确的 HTTP 方法和 URL
3. 对于 POST/PUT/PATCH 请求，在 Body 选项卡中选择 "raw" 和 "JSON" 格式
4. 粘贴 JSON 数据
5. 点击 Send 发送请求

## 错误处理示例

### 1. 尝试租用不可用的车辆
```bash
curl -X POST http://localhost:3000/api/rentals \
  -H "Content-Type: application/json" \
  -d '{
    "carId": "1",
    "customerId": "1",
    "startDate": "2025-10-18",
    "endDate": "2025-10-20"
  }'

# 如果车辆已被租用，将返回：
# {"success": false, "message": "该车辆当前不可租赁"}
```

### 2. 提交无效数据
```bash
curl -X POST http://localhost:3000/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "",
    "model": "测试",
    "year": 1800,
    "dailyRate": -100
  }'

# 将返回验证错误列表
```

### 3. 访问不存在的资源
```bash
curl http://localhost:3000/api/cars/999

# 将返回：
# {"success": false, "message": "车辆不存在"}
```

## 使用 JavaScript 调用 API

### 使用 fetch
```javascript
// 获取所有车辆
fetch('http://localhost:3000/api/cars')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// 创建租赁订单
fetch('http://localhost:3000/api/rentals', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    carId: '1',
    customerId: '1',
    startDate: '2025-10-20',
    endDate: '2025-10-25',
    pickupLocation: '北京朝阳门店',
    returnLocation: '北京朝阳门店'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### 使用 axios
```javascript
const axios = require('axios');

// 获取所有车辆
axios.get('http://localhost:3000/api/cars')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));

// 创建租赁订单
axios.post('http://localhost:3000/api/rentals', {
  carId: '1',
  customerId: '1',
  startDate: '2025-10-20',
  endDate: '2025-10-25',
  pickupLocation: '北京朝阳门店',
  returnLocation: '北京朝阳门店'
})
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));
```
