$(document).ready(function() {
    $("#getWeather").on('click', getWeather);
    $("#getPosition").on('click', getPosition);
});

console.log("Закройте консоль пожалуйста")

function getWeather() {
    var params = $("#settingsForm").serialize() + "&timezone=auto";

    $.ajax({
        method: 'GET',
        url: 'https://api.open-meteo.com/v1/forecast',
        data: params,
        dataType: 'json',
        timeout: 5000,
        success: function (data) {
            console.log(data);

            let weatherTableBody = $("#weatherTable tbody");
            weatherTableBody.empty();

            if(data.hourly && data.hourly.time) {
                data.hourly.time.forEach((time, index) => {
                    let row = `<tr><td>${time}</td>`;

                    row += addDataToRow('temperature_2m', data, index);
                    row += addDataToRow('relative_humidity_2m', data, index);
                    row += addDataToRow('rain', data, index);
                    row += addDataToRow('cloud_cover', data, index);
                    row += addDataToRow('wind_speed_10m', data, index);

                    row += `</tr>`;
                    weatherTableBody.append(row);
                });
            }
        },
        error: function (error) {
            console.error("Ошибка запроса к API погоды:", error);
        }
    });
}

function addDataToRow(parameter, data, index) {
    if ($(`input[name='hourly[]'][value='${parameter}']`).is(':checked')) {
        let value = data.hourly[parameter] ? data.hourly[parameter][index] : 'N/A';
        return `<td>${value !== 'N/A' ? value : 'N/A'}</td>`;
    } else {
        return `<td>N/A</td>`;
    }
}

function getPosition() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    function success(pos) {
        var crd = pos.coords;

        console.log("Ваше текущее местоположение:");
        console.log(`Широта: ${crd.latitude}`);
        console.log(`Долгота: ${crd.longitude}`);
        console.log(`Плюс-минус ${crd.accuracy} метров.`);

        $('#latitude').val(crd.latitude);
        $('#longitude').val(crd.longitude);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}
