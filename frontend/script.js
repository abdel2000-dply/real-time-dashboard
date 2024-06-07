// script.js

$(document).ready(function() {
  url = "http://localhost:3000/";
  // Check if the server is running with status endpoint
  $.get(`${url}status`, function(data) {
    console.log(data);
  });
  // Ensure that the Socket.IO library is loaded before this line.
  const socket = io.connect(url);
  // Listen for new_data events
  socket.on('new_data', function(data) {
    $('#data').append('<li>' + data.timeStamp + ': ' + data.value + '</li>')
  });
});