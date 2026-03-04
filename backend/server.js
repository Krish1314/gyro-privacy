import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'gyro-privacy-super-secret-key-123!';

app.use(cors());
app.use(express.json());

// Mock user for demonstration
const MOCK_USER = {
    username: 'demo',
    password: 'password123'
};

// Login Route: Authenticate and return JWT
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === MOCK_USER.username && password === MOCK_USER.password) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '12h' });
        return res.json({ token, message: 'Login successful' });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
});

// Middleware to protect routes with JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // Expect format: Bearer <token>
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
        req.user = user;
        next();
    });
};

// Protected Data Route
app.get('/api/protected-data', authenticateToken, (req, res) => {
    res.json({
        message: 'Top Secret Dashboard unlocked!',
        data: [
            { id: 1, title: 'Project Q4 Strategy', content: 'Launch the privacy screen feature to all premium users.' },
            { id: 2, title: 'Financial Overview', content: 'ARR grew by 150% this quarter.' },
            { id: 3, title: 'Confidential Client List', content: 'Acme Corp, Globex, Initech.' }
        ]
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend listening on port ${PORT}`);
});
