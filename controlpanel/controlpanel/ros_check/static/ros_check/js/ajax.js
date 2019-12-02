/**
 * Ajax handling of buttons 
 */

/**
 * Home section
 */

// start docker button
$(document).ready(function () {
    $("#start-docker-btn").submit(function (event) {
        var pwd = $("#pwd").val();
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "docker_start",
            data: { 'password': pwd },
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',  //Default
            processData: true,

            success: function (data) {
                dashboard = document.getElementById("acc-dashboard-docker");
                // check if operation was a success
                var op_fail = data.includes("incorrect password attempt");
                if (op_fail) {
                    // red cross
                    $("#docker-status-unknown-icon").hide();
                    $("#docker-status-ok-icon").hide();
                    $("#docker-status-alert-icon").show();
                }
                else {
                    // green check
                    $("#docker-status-unknown-icon").hide();
                    $("#docker-status-alert-icon").hide();
                    $("#docker-status-ok-icon").show();
                }
                const isScrolledToBottom = dashboard.scrollHeight - dashboard.clientHeight <= dashboard.scrollTop + 1
                const newElement = document.createElement("div");
                var d = new Date();
                newElement.textContent = format('< ', d.getHours(), ':', d.getMinutes(), ':', d.getSeconds(), ' >$ ', data)

                if (op_fail) {
                    newElement.classList.add("acc-alert-message")
                }
                dashboard.appendChild(newElement)
                if (isScrolledToBottom) {
                    dashboard.scrollTop = dashboard.scrollHeight - dashboard.clientHeight
                }
            }
        });
        return false;
    });
});

// start ros button
$(document).ready(function () {
    $("#start-ros-btn").submit(function (event) {
        var pwd = $("#pwd").val();
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "ros_start",
            data: { 'password': pwd },
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',  //Default
            processData: true,

            success: function (data) {
                dashboard = document.getElementById("acc-dashboard-ros");
                // check if operation was a success
                var op_fail = data.includes("incorrect password attempt");
                if (op_fail) {
                    // red cross
                    $("#ros-status-unknown-icon").hide();
                    $("#ros-status-ok-icon").hide();
                    $("#ros-status-alert-icon").show();
                }
                else {
                    // green check
                    $("#ros-status-unknown-icon").hide();
                    $("#ros-status-alert-icon").hide();
                    $("#ros-status-ok-icon").show();
                }
                const isScrolledToBottom = dashboard.scrollHeight - dashboard.clientHeight <= dashboard.scrollTop + 1
                const newElement = document.createElement("div");
                var d = new Date();
                newElement.textContent = format('< ', d.getHours(), ':', d.getMinutes(), ':', d.getSeconds(), ' >$ ', data)

                if (op_fail) {
                    newElement.classList.add("acc-alert-message")
                }
                dashboard.appendChild(newElement)
                if (isScrolledToBottom) {
                    dashboard.scrollTop = dashboard.scrollHeight - dashboard.clientHeight
                }
            }
        });
        return false;
    });
});

//check connected cars to the network button
$(document).ready(function () {
    $("#fleet-check-btn").submit(function (event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: "car_fetch",
            beforeSend: function () {
                //TODO : LOADING IMAGE
            },
            success: function (data) {
                var cars = data;
                cars = cars.split(" ");               
                var tableDiv = $("<div class='table-responsive'>");

                $('#fleet-table').append(tableDiv);

                var table = $("<table class='table table-striped table-bordered table-hover table-condensed small'>");

                tableDiv.append(table);

                ///
                /// Table head
                ///
                html = "<thead>" +
                    "    <tr>" +
                    "        <th><strong>Car's name</strong></th>" +
                    "        <th><strong>IP address</strong></th>" +
                    "        <th><strong>Ready to be driven</strong></th>" +
                    "        <th><strong>Blink car</strong></th>" +
                    "     </tr>" +
                    "</thead>";

                var tableHead = $(html);
                table.append(tableHead);

                ///
                /// Table data
                ///
                var gridRowCount = cars.length/2;
                var carIpIndex = 1;
                var carNameIndex = 0;
                for (var rowCount = 0; rowCount < gridRowCount; rowCount++) {
                    html = "<tr>";
                    html = html + "<th scope='row'>" + cars[carNameIndex] + "</th>";   
                    for (var fieldCount = 1; fieldCount < 2; fieldCount++) {
                        var test = cars[carNameIndex] + "-id";
                        html = html + "<td>" + cars[carIpIndex] + "</td>";
                        html = html + "<td>Yes</td>";
                        html = html + "<td><form method='post' class='disabled' id='" + test + "'>";
                        html = html + "<input class='btn btn-outline-primary' type='submit' value='Blink'/>";
                        html = html +  "</td></form>";   
                    }
                    html = html + "</tr>";
                    table.append($(html));
                    carNameIndex = carNameIndex + 2;
                    carIpIndex = carIpIndex + 2;
                }
                carIpIndex = 1;
            },
        });
        return false;
    });
});

/**
 * Fleet section
 */

/**
 * Individal control section
 */

$(document).ready(function () {
    $("#car-search-btn").submit(function (event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: "car_search",
            success: function (data) {

                car_list_radio = document.getElementById("car-list");
                car_list = [];
                const newElement = document.createElement("div");
                if (data === null) {
                    newElement.innerHTML = "ym, go get coffee";
                    car_list.appendChild(newElement);
                }
                else {
                    data = data.split(" ")
                    for (i = 0; i < data.length; i++) {
                        const radioBtn = document.createElement("div");
                        radioBtn.innerHTML = "<input type='radio' class='form-check-input' name='optradio' value='" + data[i] + "'>" + data[i] + "</input>";
                        car_list_radio.appendChild(radioBtn)
                    }

                }



            }
        });
        return false;
    });
});


// periodic fetch data
$(document).ready(function () {
    // run the first time; all subsequent calls will take care of themselves
    dash_docker = document.getElementById("acc-dashboard-docker");
    dash_ros = document.getElementById("acc-dashboard-ros");
    setTimeout(function () {
        //fetchDashboardStatus(dash_docker, "fetch_docker");
        //fetchDashboardStatus(dash_ros, "fetch_ros");

    }, 1000);
});

// fetch data periodically
// TODO: obsolete function, move to archive
function fetchDashboardStatusPeriodic(dashboard, url) {
    $.ajax({
        url: url,
        type: "GET",
        success: function (data) {
            const isScrolledToBottom = dashboard.scrollHeight - dashboard.clientHeight <= dashboard.scrollTop + 1
            const newElement = document.createElement("div");
            var d = new Date();
            newElement.textContent = format('< ', d.getHours(), ':', d.getMinutes(), ':', d.getSeconds(), ' >$ ', data)
            dashboard.appendChild(newElement)
            if (isScrolledToBottom) {
                dashboard.scrollTop = dashboard.scrollHeight - dashboard.clientHeight
            }
        }
    });
    setTimeout(function () {
        fetchDashboardStatus(dashboard, url);
    }, 1000);
}

// fetch data once
// TODO: obsolete function, move to archive
function fetchDashboardStatus(dashboard, url) {
    $.ajax({
        url: url,
        type: "GET",
        success: function (data) {

            const isScrolledToBottom = dashboard.scrollHeight - dashboard.clientHeight <= dashboard.scrollTop + 1
            const newElement = document.createElement("div");
            var d = new Date();
            newElement.textContent = format('< ', d.getHours(), ':', d.getMinutes(), ':', d.getSeconds(), ' >$ ', data)
            dashboard.appendChild(newElement)
            if (isScrolledToBottom) {
                dashboard.scrollTop = dashboard.scrollHeight - dashboard.clientHeight
            }

        }
    });
}

function format() {
    return Array.prototype.slice.call(arguments).join('')
}



