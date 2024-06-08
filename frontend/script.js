$(document).ready(function() {
  const url = "http://localhost:3000/";

  // Check if the server is running with status endpoint
  $.get(`${url}status`, function(data) {
    console.log(data);
  });

  // Ensure that the Socket.IO library is loaded before this line
  const socket = io.connect(url);

  // Wait until the DOM is fully loaded
  $(document).ready(function() {
    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Real-time Data',
          data: [],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false,
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'second'
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Listen for new_data events
    socket.on('new_data', function(data) {
      const time = new Date(data.timeStamp);
      const value = data.value;

      // Add new data to chart
      chart.data.labels.push(time);
      chart.data.datasets[0].data.push(value);

      // Remove old data if too many points
      if (chart.data.labels.length > 20) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
      }

      chart.update();
    });
  });
});
