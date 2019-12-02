// Subscribing to a Topic
// ----------------------

rostopic_name = "/imu/data_raw"

var listener = new ROSLIB.Topic({
  ros: ros,
  name: rostopic_name,
  messageType: 'sensor_msgs/Imu'
});

var run_once;

var layout = {
  autosize: false,
  width: 600,
  height: 500,
  margin: {
    l: 50,
    r: 50,
    b: 100,
    t: 100,
    pad: 4
  },
};

listener.subscribe(function (message) {
  ax = message.linear_acceleration.x;
  ay = message.linear_acceleration.y;
  az = message.linear_acceleration.z;

  gx = message.angular_velocity.x;
  gy = message.angular_velocity.y;
  gz = message.angular_velocity.z;

  if (!run_once && message) {
    run_once = true;
    document.getElementById("data1-loading-div").outerHTML = "";

    Plotly.plot('imu-gyro', [{
      y: [gx],
      name: 'Gx',
      type: 'line'
    }], layout);

    Plotly.plot('imu-gyro', [{
      y: [gy],
      name: 'Gy',
      type: 'scatter'
    }], layout);

    Plotly.plot('imu-gyro', [{
      y: [gz],
      name: 'Gz',
      type: 'scatter'
    }], layout);

    Plotly.plot('imu-acc', [{
      y: [ax],
      name: 'Ax',
      type: 'line'
    }], layout);

    Plotly.plot('imu-acc', [{
      y: [ay],
      name: 'Ay',
      type: 'scatter'
    }], layout);

    Plotly.plot('imu-acc', [{
      y: [az],
      name: 'Az',
      type: 'scatter'
    }], layout);
  }

  setInterval(function () {
    Plotly.extendTraces('imu-gyro', { y: [[gx], [gy], [gz]] }, [0, 1, 2]);
    Plotly.extendTraces('imu-acc', { y: [[ax], [ay], [az]] }, [0, 1, 2]);
  }, 1000);
  //$("#ros-listen").append(message.data+'_');
});