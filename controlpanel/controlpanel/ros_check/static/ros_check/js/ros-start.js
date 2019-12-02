// Connecting to ROS
// -----------------

var ros = new ROSLIB.Ros({
    url: 'ws://192.168.1.4:9090'
});

ros.on('connection', function () {
    console.log('Connected to websocket server.');
});

ros.on('error', function (error) {
    console.log('Error connecting to websocket server.');
});

ros.on('close', function () {
    console.log('Connection to websocket server closed.');
});
