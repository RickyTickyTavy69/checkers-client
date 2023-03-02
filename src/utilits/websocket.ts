const socket = new WebSocket('ws://localhost:5666');

socket.onopen = () => {
    const username = localStorage.getItem("username");
    const connectionObj = JSON.stringify(
        {
            method: "connection",
            message: "new user",
            id: "666",
            username,
        }
    );
    socket.send(connectionObj);
}

socket.onmessage = (event) => {
    console.log('a message from server', event.data);
}

export default socket;