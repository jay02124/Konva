const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const studentRoutes = require('./routes/student.routes');
const templateRoutes = require('./routes/template.routes');
const patternRoutes = require('./routes/pattern.routes');
const shapeRoutes = require('./routes/shape.routes');
const uploadRoutes = require('./routes/upload.routes');
const connectDB = require('./config/database');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

connectDB()

app.use('/api/students', studentRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/patterns', patternRoutes);
app.use('/api/shapes', shapeRoutes);
app.use('/api/uploads', uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));