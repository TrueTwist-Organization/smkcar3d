import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'smk car_secret_key_2026';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// DB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/luxury_cars')
  .then(() => console.log('SMK Car Engine Connected... (MongoDB Status: ONLINE)'))
  .catch(err => console.error('Engine Stalled: ', err));

// Models
const carSchema = new mongoose.Schema({
  name: String,
  brand: String,
  type: String,
  price: String,
  description: String,
  images: [String],
  glbModel: String,
  specifications: {
    engine: String,
    horsepower: String,
    topSpeed: String,
    acceleration: String
  },
  features: [String]
});

const Car = mongoose.model('Car', carSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
});

const User = mongoose.model('User', userSchema);

// Multer Storage for uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// JWT Middleware
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is invalid' });
  }
};

// Routes - Auth
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: 'User does not exist' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
});

// Seed Initial Admin (for testing)
app.post('/api/auth/seed', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);
  const newUser = new User({ username: 'admin', password: hashedPassword });
  await newUser.save();
  res.send('Admin Seeded (User: admin, Pass: admin123)');
});

// Routes - Cars
app.get('/api/cars', async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

app.post('/api/cars', auth, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'glb', maxCount: 1 }]), async (req, res) => {
  const { name, brand, type, price, description, specs } = req.body;
  const carSpecs = JSON.parse(specs);
  
  const newCar = new Car({
    name, brand, type, price, description,
    specifications: carSpecs,
    images: req.files['images']?.map(f => f.path),
    glbModel: req.files['glb']?.[0]?.path
  });
  
  await newCar.save();
  res.json(newCar);
});

app.put('/api/cars/:id', auth, async (req, res) => {
  const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedCar);
});

app.delete('/api/cars/:id', auth, async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Vehicle removed from stable' });
});

app.listen(PORT, () => console.log(`Backend cruising on http://localhost:${PORT}`));
