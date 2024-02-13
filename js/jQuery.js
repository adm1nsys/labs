$(document).ready(function() {
    $("#getWeather").on('click', getWeather);
    $("#getPosition").on('click', getPosition);
});

function getWeather() {
    // Формируем строку с параметрами, основываясь на состоянии чекбоксов
    var params = $("#settingsForm").serialize() + "&daily=sunrise,sunset,precipitation_sum&timezone=auto";

    $.ajax({
        method: 'GET',
        url: 'https://api.open-meteo.com/v1/forecast',
        data: params,
        dataType: 'json',
        timeout: 5000,
        success: function (data) {
            console.info(data);
            let weatherTableBody = $("#weatherTable tbody");
            weatherTableBody.empty(); // Очистить текущие строки таблицы

            // Проверяем, какие данные доступны и добавляем их в таблицу
            if(data.hourly && data.hourly.time) {
                data.hourly.time.forEach((time, index) => {
                    let row = `<tr><td>${time}</td>`;

                    if ($("input[name='hourly[]'][value='temperature_2m']").is(':checked')) {
                        let temperature = data.hourly.temperature_2m[index];
                        row += `<td>${temperature} °C</td>`;
                    } else {
                        row += `<td>N/A</td>`; // Если данные по температуре не запрошены
                    }

                    if ($("input[name='hourly[]'][value='relative_humidity_2m']").is(':checked')) {
                        let humidity = data.hourly.relative_humidity_2m[index];
                        row += `<td>${humidity} %</td>`;
                    } else {
                        row += `<td>N/A</td>`; // Если данные по влажности не запрошены
                    }

                    row += `</tr>`;
                    weatherTableBody.append(row); // Добавить строку в таблицу
                });
            }
        },
        error: function (error) {
            console.error(error);
        }
    });
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
