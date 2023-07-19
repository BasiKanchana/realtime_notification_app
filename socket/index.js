import { Server } from "socket.io";

const io = new Server({
    cors:{
        origin:"http://localhost:3000"
    },
});
 
let onlineUsers = [];

const addNewUser = (username, socketId) => {
    !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ 'username':username, 'socketId':socketId });
};

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
    return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
    console.log('Someone has connected!')
    socket.on("newUser", (username) => {
        console.log(username);
        addNewUser(username, socket.id);
        console.log(onlineUsers);
    });

    socket.on("sendNotification",({ senderName, recieverName, type }) => {
        console.log(senderName);
        const reciever = getUser(recieverName);
        console.log(reciever);
        console.log(reciever.socketId);
        reciever &&
        io.to(reciever.socketId).emit("getNotification",{
            'senderName':senderName,
            'type':type,
        });
    });

    socket.on("disconnect" , () => {
         removeUser(socket.id);
    });

});
io.listen(5000);
console.log("node server is listening");