import app from './server';
import dotenv from 'dotenv';
dotenv.config();
import 'dotenv/config';

const PORT = 5000;

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
