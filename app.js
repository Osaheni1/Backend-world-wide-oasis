const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const guestRoutes = require('./routes/guestRoutes');
const staffRoutes = require('./routes/staffRoutes');
const cabinRoutes = require('./routes/cabinRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const settingRoutes = require('./routes/settingRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const path = require('path');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
    methods: ['POST', 'GET', 'PATCH', 'DELETE'],
  }),
);
app.options('*', cors());

app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));
app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());

// app.use((req, res, next) => {
//   console.log(req.cookies.jwt);
//   console.log('cookies here');
//   next();
// });

app.use('/api/guests', guestRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/cabins', cabinRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/settings', settingRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
