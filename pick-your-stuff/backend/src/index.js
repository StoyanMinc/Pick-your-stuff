import express from 'express';
import { config } from 'dotenv';

import connectDB from './db/connect.js';
import router from './router.js';

config();

const port = process.env.PORT || 3000;

const server = express();

server.use(express.json());

server.use('/api', router);

const startServer = async () => {
    try {
        await connectDB();
        server.listen(port, '0.0.0.0', () => console.log('Server running'));

    } catch (error) {
        console.log(`Error starting server: ${error}`);
    }
};

startServer();