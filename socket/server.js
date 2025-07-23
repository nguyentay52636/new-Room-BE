const http = require('http');
const socketIo = require('socket.io');
const app = require('../app');
const { createMessage, updateMessage, deleteMessage } = require('../controllers/messageController');

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
    console.log('🟢 Socket Connected');

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room ${roomId}`);
    });

    socket.on('message:create', async (data) => {
        const message = await createMessage(data);
        io.to(data.roomId).emit('message:new', message);
    });

    socket.on('message:update', async ({ id, noiDungMoi, roomId }) => {
        const updated = await updateMessage(id, noiDungMoi);
        io.to(roomId).emit('message:updated', updated);
    });

    socket.on('message:delete', async ({ id, roomId }) => {
        const deleted = await deleteMessage(id);
        io.to(roomId).emit('message:deleted', deleted);
    });

    socket.on('disconnect', () => console.log('🔴 Socket Disconnected'));
});

const PORT = 8000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
