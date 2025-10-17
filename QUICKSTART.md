# 快速启动指南 (Quick Start Guide)

## 前置要求

- Node.js 14.x 或更高版本
- npm 6.x 或更高版本

## 安装步骤

### 1. 克隆仓库
```bash
git clone https://github.com/851689968/yujia-tianzun.git
cd yujia-tianzun
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动服务器
```bash
# 生产环境
npm start

# 开发环境（支持热重载）
npm run dev
```

服务器将在 http://localhost:3000 启动

### 4. 测试 API

访问根路径查看 API 信息：
```bash
curl http://localhost:3000
```

响应示例：
```json
{
  "message": "欢迎使用租车管理系统 API",
  "version": "1.0.0",
  "endpoints": {
    "cars": "/api/cars",
    "customers": "/api/customers",
    "rentals": "/api/rentals"
  }
}
```

## 示例数据

系统启动时会自动加载以下示例数据：

### 车辆 (3辆)
- 大众帕萨特 (京A12345) - ¥300/天
- 本田雅阁 (京B67890) - ¥280/天
- 特斯拉 Model 3 (京C11111) - ¥500/天

### 客户 (1位)
- 张三 - 金卡会员

## 基本操作示例

### 查看所有可用车辆
```bash
curl http://localhost:3000/api/cars/available
```

### 创建租赁订单
```bash
curl -X POST http://localhost:3000/api/rentals \
  -H "Content-Type: application/json" \
  -d '{
    "carId": "1",
    "customerId": "1",
    "startDate": "2025-10-20",
    "endDate": "2025-10-25",
    "pickupLocation": "北京朝阳门店",
    "returnLocation": "北京朝阳门店"
  }'
```

### 注册新客户
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
    "memberLevel": "regular"
  }'
```

## 更多示例

查看 [API-EXAMPLES.md](./API-EXAMPLES.md) 获取完整的 API 使用示例。

查看 [README.md](./README.md) 获取详细的 API 文档。

## 常见问题

### 端口被占用
如果端口 3000 被占用，可以设置环境变量：
```bash
PORT=8080 npm start
```

### 数据丢失
当前版本使用内存存储，重启服务器后数据会丢失。如需持久化，请参考 README.md 中的后续优化建议。

## 目录结构

```
yujia-tianzun/
├── controllers/          # 业务逻辑控制器
│   ├── carController.js
│   ├── customerController.js
│   └── rentalController.js
├── models/              # 数据模型
│   ├── Car.js
│   ├── Customer.js
│   └── Rental.js
├── routes/              # API 路由
│   ├── cars.js
│   ├── customers.js
│   └── rentals.js
├── data/                # 数据存储
│   └── storage.js
├── server.js            # 主服务器文件
├── package.json         # 项目配置
├── README.md            # 详细文档
├── API-EXAMPLES.md      # API 示例
└── QUICKSTART.md        # 快速启动指南（本文件）
```

## 开发建议

1. 使用 `npm run dev` 进行开发，支持代码热重载
2. 使用 Postman 或类似工具测试 API
3. 查看控制台日志了解请求处理情况
4. 参考数据模型文件了解数据结构和验证规则

## 下一步

1. 浏览 API 文档了解所有可用端点
2. 尝试创建、查询、更新和删除操作
3. 测试完整的租车流程
4. 根据需要扩展功能

## 技术支持

如有问题，请查看：
- [README.md](./README.md) - 完整文档
- [API-EXAMPLES.md](./API-EXAMPLES.md) - API 使用示例
- 项目源代码中的注释

祝使用愉快！🚗
