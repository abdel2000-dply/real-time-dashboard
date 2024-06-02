// script.js

$(document).ready(function() {
  url = "http://localhost:3000/";
  $.get(url, function(data) {
    console.log(data);
  });
  // Ensure that the Socket.IO library is loaded before this line
  const socket = io.connect(url);
  socket.on('message', function(data) {
    $('#message').append('<li>' + data + '</li>')
  });
});