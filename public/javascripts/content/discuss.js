// Socket
let socket = io();

// Elements
let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');

// User ID if they haven't signed in
let rnd = Math.round(Math.random() * 1000000);

// Form listener
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        /**
         * @param {string} event Chat event
         * @param {string} message Message
         * @param {number} rnd User ID if user isn't logged in
         * @param {string} CurrentUser Current user 
         */

        socket.emit('chat message', input.value, rnd, data.item(0).innerHTML);

        // Reset input form after send message
        input.value = '';
    }

    // Stop user from typing messages
    input.readOnly = true;
    input.placeholder = "Wait for 5 seconds to type messages again";

    // Allow user to type again in 5 seconds
    setTimeout(() => {
        input.readOnly = false;
        input.placeholder = "";
    }, 5000);
});

// Handle socket
socket.on('chat message', (msg, textAlign, user) => {
    let item = document.createElement('li');
    item.style.textAlign = textAlign;
    item.innerHTML = `<p>${msg}</p><div class="username">${user}</div>`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

// Event listeners
document.getElementById("refress").addEventListener("click", () => location.reload());
document.getElementById("back").addEventListener("click", () => location.replace(`/reader/${encodeURIComponent(data.item(1).innerHTML)}`));
