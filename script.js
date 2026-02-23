const peer = new Peer();

const myIdspan = document.querySelector(".Myid");
const connectBtn = document.querySelector(".ConnectBtn");
const friendId = document.querySelector(".friendID");
const messageBox = document.querySelector(".messageBox");
const sendBtn = document.querySelector(".sendBtn");
const messages = document.querySelector(".messages");

let connection;

// sender side
peer.on("open", function (id) {
    myIdspan.innerText = id;
});

connectBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const connectId = friendId.value;
    connection = peer.connect(connectId);
    connection.on("open", function () {
        console.log("friend connected successfully");
    });
    connection.on("data", function (data) {
        messages.innerHTML += `<p style="color:red">${data}</p>`;
    });
});

sendBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const message = messageBox.value;
    connection.send(message);
    console.log("message sent");
    messages.innerHTML += `<p style="color:white">${message}</p>`;
    messageBox.value = "";
});

// receiver side
peer.on("connection", function (conn) {
    connection = conn;
    console.log("friend connected", connection);

    connection.on("data", function (data) {
        messages.innerHTML += `<p style="color:red">${data}</p>`;
    });
});
