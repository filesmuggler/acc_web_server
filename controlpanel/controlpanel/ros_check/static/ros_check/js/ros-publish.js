// Publishing a Topic
// ------------------
/*
var testInt = new ROSLIB.Topic({
    ros: ros,
    name: '/django_test',
    messageType: 'std_msgs/String'
});

var int = new ROSLIB.Message({
    data: "Hello from django"
});

testInt.publish(int);

*/
// Publishing a Topic
// ------------------
/*
var testInt = new ROSLIB.Topic({
    ros: ros,
    name: '/shit',
    messageType: 'sth_asyouwish/carParam'
});

var ant = new ROSLIB.Message({
    
        ros_servo_pwm_dutycycle : 10,
        ros_h_bridge_pwm : 11,
        ros_h_bridge_in1 : true,
        ros_h_bridge_in2 : false
    
});

testInt.publish(ant);*/