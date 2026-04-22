const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Routes
app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Yatara Backend API is running',
		docs: '/api/auth or /api/bookings',
	});
});

app.get('/health', (req, res) => {
	res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/api/vehicles', require('./routes/vehicleRoutes'));

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));