var car_message = new ROSLIB.Topic({
    ros: ros,
    name: '/car1manual/carParam',
    messageType: 'car_message/carParam'
});

var ros_servo_pwm_dutycycle_var = 1500;
var ros_h_bridge_pwm_dutycyle_var = 100;
var ros_h_bridge_in1_var = true;
var ros_h_bridge_in2_var = true;

$(document.body).keydown(function (evt) {
    if (evt.keyCode == 87) {
        // var setup
        ros_h_bridge_in1_var = true;
        ros_h_bridge_in2_var = false;

        // up
        $(".up-arrow").removeClass('key-up');
        var message_car_param = new ROSLIB.Message({
            ros_servo_pwm_dutycycle: ros_servo_pwm_dutycycle_var,
            ros_h_bridge_pwm_dutycyle: ros_h_bridge_pwm_dutycyle_var,
            ros_h_bridge_in1: ros_h_bridge_in1_var,
            ros_h_bridge_in2: ros_h_bridge_in2_var
        });
        car_message.publish(message_car_param);
    }
    else if (evt.keyCode == 83) {
        // vars setup
        ros_h_bridge_in1_var = false;
        ros_h_bridge_in2_var = true;

        // down
        $(".down-arrow").removeClass('key-up');
        var message_car_param = new ROSLIB.Message({
            ros_servo_pwm_dutycycle: ros_servo_pwm_dutycycle_var,
            ros_h_bridge_pwm_dutycyle: ros_h_bridge_pwm_dutycyle_var,
            ros_h_bridge_in1: ros_h_bridge_in1_var,
            ros_h_bridge_in2: ros_h_bridge_in2_var
        });
        car_message.publish(message_car_param);
    }
    else if (evt.keyCode == 65) {
        // vars setup
        ros_servo_pwm_dutycycle_var = ros_servo_pwm_dutycycle_var - 50;
        if (ros_servo_pwm_dutycycle_var < 500)
        {
            ros_servo_pwm_dutycycle_var = ros_servo_pwm_dutycycle_var + 50
        }

        // left
        $(".left-arrow").removeClass('key-up');
        var message_car_param = new ROSLIB.Message({
            ros_servo_pwm_dutycycle: ros_servo_pwm_dutycycle_var,
            ros_h_bridge_pwm_dutycyle: ros_h_bridge_pwm_dutycyle_var,
            ros_h_bridge_in1: ros_h_bridge_in1_var,
            ros_h_bridge_in2: ros_h_bridge_in2_var
        });
        car_message.publish(message_car_param);
    }
    else if (evt.keyCode == 68) {
        // vars setup
        ros_servo_pwm_dutycycle_var = ros_servo_pwm_dutycycle_var + 50;
        if (ros_servo_pwm_dutycycle_var > 2500)
        {
            ros_servo_pwm_dutycycle_var = ros_servo_pwm_dutycycle_var - 50
        }

        // right
        $(".right-arrow").removeClass('key-up');
        var message_car_param = new ROSLIB.Message({
            ros_servo_pwm_dutycycle: ros_servo_pwm_dutycycle_var,
            ros_h_bridge_pwm_dutycyle: ros_h_bridge_pwm_dutycyle_var,
            ros_h_bridge_in1: ros_h_bridge_in1_var,
            ros_h_bridge_in2: ros_h_bridge_in2_var
        });
        car_message.publish(message_car_param);
    }
    else if (evt.keyCode == 107){
        // vars setup
        ros_h_bridge_pwm_dutycyle_var = ros_h_bridge_pwm_dutycyle_var + 10;
        if (ros_h_bridge_pwm_dutycyle_var >= 100)
        {
            ros_h_bridge_pwm_dutycyle_var = 100
        }

        // + speed
        $(".right-arrow").removeClass('key-up');
        var message_car_param = new ROSLIB.Message({
            ros_servo_pwm_dutycycle: ros_servo_pwm_dutycycle_var,
            ros_h_bridge_pwm_dutycyle: ros_h_bridge_pwm_dutycyle_var,
            ros_h_bridge_in1: ros_h_bridge_in1_var,
            ros_h_bridge_in2: ros_h_bridge_in2_var
        });
        car_message.publish(message_car_param);
    }
    else if (evt.keyCode == 109){
        // vars setup
        ros_h_bridge_pwm_dutycyle_var = ros_h_bridge_pwm_dutycyle_var - 10;
        if (ros_h_bridge_pwm_dutycyle_var <= 0)
        {
            ros_h_bridge_pwm_dutycyle_var = 0
        }
        
        // - speed
        $(".right-arrow").removeClass('key-up');
        var message_car_param = new ROSLIB.Message({
            ros_servo_pwm_dutycycle: ros_servo_pwm_dutycycle_var,
            ros_h_bridge_pwm_dutycyle: ros_h_bridge_pwm_dutycyle_var,
            ros_h_bridge_in1: ros_h_bridge_in1_var,
            ros_h_bridge_in2: ros_h_bridge_in2_var
        });
        car_message.publish(message_car_param);
    }
});

$(document.body).keyup(function (evt) {
    if (evt.keyCode == 87 || evt.keyCode == 83) {
        ros_h_bridge_in1_var = false;
        ros_h_bridge_in2_var = false;

        var message_car_param = new ROSLIB.Message({
            ros_servo_pwm_dutycycle: ros_servo_pwm_dutycycle_var,
            ros_h_bridge_pwm_dutycyle: ros_h_bridge_pwm_dutycyle_var,
            ros_h_bridge_in1: ros_h_bridge_in1_var,
            ros_h_bridge_in2: ros_h_bridge_in2_var
        });
        car_message.publish(message_car_param);
    }
});

$(document.body).keyup(function (evt) {
    if (evt.keyCode == 87) {
        // up
        $(".up-arrow").addClass('key-up');
    }
    else if (evt.keyCode == 83) {
        // down
        $(".down-arrow").addClass('key-up');
    }
    else if (evt.keyCode == 65) {
        // left
        $(".left-arrow").addClass('key-up');
    }
    else if (evt.keyCode == 68) {
        // right
        $(".right-arrow").addClass('key-up');
    }
});

function setCar() {
    var radioButtons = document.getElementsByName('optradio');
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            var address_value = radioButtons[i].value;
            var car_address = document.getElementById("car-address");
            car_address.innerHTML = address_value;
        }
    }
}