const socket = io.connect('http://localhost:4321');

const name = document.getElementById('name');
const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

let timer;

const stopTypingEmitter = () => {
  socket.emit('stop-typing');
};

const clearFeedback = () => {
  feedback.innerHTML = '';
};

btn.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    name: name.value
  });
  message.value = '';
});

message.addEventListener('input', () => {
  socket.emit('typing', name.value);
});

message.addEventListener('keyup', () => {
  clearTimeout(timer);
  timer = setTimeout(stopTypingEmitter, 700);
});

message.addEventListener('keydown', () => {
  clearTimeout(timer);
});

socket.on('chat', ({ message, name }) => {
  clearFeedback();
  output.innerHTML += `<p><strong>${name}: </strong>${message}</p>`;
});

socket.on('typing', name => {
  feedback.innerHTML = `<p><em>${name} is typing a message... </em></p>`;
});

socket.on('stop-typing', clearFeedback);
