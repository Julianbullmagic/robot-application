const socket = io("/");

let isAlreadyCalling = false;
let getCalled = false;

const { RTCPeerConnection, RTCSessionDescription } = window;

const peerConnection = new RTCPeerConnection();

let forwardbutton=document.getElementById("forward").onmousedown=function() {
  socket.emit("forward", "forward");
};
let backwardbutton=document.getElementById("backward").onmousedown=function() {
  socket.emit("backward", "backward");
};
let strafeleftbutton=document.getElementById("strafeleft").onmousedown=function() {
  socket.emit("strafe left", "strafe left");
};
let straferightbutton=document.getElementById("straferight").onmousedown=function() {
  socket.emit("strafe right", "strafe right");
};
let rotateleftbutton=document.getElementById("rotateleft").onmousedown=function() {
  socket.emit("rotate left", "rotate left");
};
let rotaterightbutton=document.getElementById("rotateright").onmousedown=function() {
  socket.emit("rotate right", "rotate right");
};

forwardbutton.onmouseup=function() {
  socket.emit("stop forward", "stop forward");
};
backwardbutton.onmouseup=function() {
  socket.emit("stop backward", "stop backward");
};
strafeleftbutton.onmouseup=function() {
  socket.emit("stop strafe left", "stop strafe left");
};
straferightbutton.onmouseup=function() {
  socket.emit("stop strafe right", "stop strafe right");
};
rotateleftbutton.onomouseup=function() {
  socket.emit("stop rotate left", "stop rotate left");
};
rotaterightbutton.onmouseup=function() {
  socket.emit("stop rotate right", "stop rotate right");
};


async function callUser(socketId) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

    socket.emit("call-user", {
        offer,
        to: socketId,
    });
}

function unselectUser() {
    const alreadySelectedUser = document.querySelectorAll(
        ".active-user.active-user--selected"
    );

    alreadySelectedUser.forEach((element) => {
        element.setAttribute("class", "active-user");
    });
}

function createUserItems(socketId) {
    const userContainer = document.createElement("div");

    const username = document.createElement("p");

    userContainer.setAttribute("class", "active-user");
    userContainer.setAttribute("id", socketId);
    username.setAttribute("class", "username");
    username.innerHTML = `user : ${socketId}`;

    userContainer.appendChild(username);

    userContainer.addEventListener("click", () => {
        unselectUser();
        userContainer.setAttribute(
            "class",
            "active-user active-user--selected"
        );
        const talkingWithInfo = document.getElementById("talking-with-info");
        talkingWithInfo.innerHTML = `talking to : ${socketId} user`;
        callUser(socketId);
    });

    return userContainer;
}

function updateUserList(users) {
    const activeUserContainer = document.getElementById(
        "active-user-container"
    );

    users.forEach((socketId) => {
        const userExist = document.getElementById(socketId);

        if (!userExist) {
            const userContainer = createUserItems(socketId);

            activeUserContainer.appendChild(userContainer);
        }
    });
}

socket.on("update-user-list", ({ users }) => {
    updateUserList(users);
});

socket.on("remove-user", ({ socketId }) => {
    const user = document.getElementById(socketId);

    if (user) {
        user.remove();
    }
});

socket.on("call-made", async (data) => {
    if (getCalled) {
        const confirmed = confirm(
            `User with ${data.socket} id is calling you!! Do you accept?`
        );

        if (!confirmed) {
            socket.emit("reject-call", {
                from: data.socket,
            });

            return;
        }
    }

    await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.offer)
    );

    const answer = await peerConnection.createAnswer();

    await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

    socket.emit("make-answer", {
        answer,
        to: data.socket,
    });

    getCalled = true;
});

socket.on("answer-made", async (data) => {
    await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.answer)
    );

    if (!isAlreadyCalling) {
        callUser(data.socket);
        isAlreadyCalling = true;
    }
});

socket.on("call-rejected", (data) => {
    alert(`User with ${data.socket} id rejected your call`);
    unselectUser();
});

peerConnection.ontrack = function ({ streams: [stream] }) {
    const remoteVideo = document.getElementById("remote-video");

    if (remoteVideo) {
        remoteVideo.srcObject = stream;
    }
};

navigator.getUserMedia(
    { video: true, audio: true },
    (stream) => {
        const localVideo = document.getElementById("local-video");

        if (localVideo) {
            localVideo.srcObject = stream;
        }

        stream
            .getTracks()
            .forEach((track) => peerConnection.addTrack(track, stream));
    },
    (error) => {
        console.log(error.message);
    }
);
