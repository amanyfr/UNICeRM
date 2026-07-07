require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 3001;

// ==================== MIDDLEWARE ====================
app.use(cors({
  origin:      process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== HEALTH CHECK ====================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'UNICeRM API is running' });
});

// ==================== ROUTES ====================
app.use('/api/auth',          require('./src/routes/auth.routes'));
app.use('/api/tickets',       require('./src/routes/ticket.routes'));
app.use('/api/customers',     require('./src/routes/customer.routes'));
app.use('/api/chatbot',       require('./src/routes/chatbot.routes'));
app.use('/api/vouchers',      require('./src/routes/voucher.routes'));
app.use('/api/feedbacks',     require('./src/routes/feedback.routes'));
app.use('/api/notifications', require('./src/routes/notification.routes'));

// ==================== 404 HANDLER ====================
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: `Route ${req.method} ${req.path} not found` });
});

// ==================== GLOBAL ERROR HANDLER ====================
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  console.error(err.stack);
  res.status(err.status || 500).json({
    status:  'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`🚀 UNICeRM Backend running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   CORS origin : ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`   Environment : ${process.env.NODE_ENV}`);
});

module.exports = app;
