import express from 'express';

const server = express();

server.get('/', (req, res) => {
    res.send('ok')
})

server.listen(5500, () => console.log('server is listening ot port 5000...'));