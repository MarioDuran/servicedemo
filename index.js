import express from 'express';

const app = express();
const port = 1600;

app.listen(port);

app.get('/', (req, res) => {
    res.send('hello world');
});

console.log('server on port', port)