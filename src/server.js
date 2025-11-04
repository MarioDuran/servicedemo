import express from 'express';
import postRoutes from './routes/postRoutes.js'
import cors from 'cors';

const app = express();
const port = 10000;

app.use(express.json());
app.use(cors());

app.listen(port);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.use('/api/posts', postRoutes);

console.log('server on port', port)