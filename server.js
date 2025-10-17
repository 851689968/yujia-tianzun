const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const carRoutes = require('./routes/cars');
const customerRoutes = require('./routes/customers');
const rentalRoutes = require('./routes/rentals');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/cars', carRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/rentals', rentalRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '欢迎使用租车管理系统 API',
    version: '1.0.0',
    endpoints: {
      cars: '/api/cars',
      customers: '/api/customers',
      rentals: '/api/rentals'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || '服务器内部错误',
      status: err.status || 500
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: '接口不存在',
      status: 404
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`租车管理系统服务器运行在端口 ${PORT}`);
  console.log(`访问 http://localhost:${PORT} 查看 API 信息`);
});

module.exports = app;
