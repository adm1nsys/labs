$(document).ready(function() {
    $("#getWeather").on('click', function() {
        createTable();
        getWeather();
    });
    $("#getPosition").on('click', getPosition);
});

function createTable() {
    $("#weatherTable").remove();

    var table = $('<table id="weatherTable"><thead><tr></tr></thead><tbody></tbody></table>');
    var headerRow = table.find("thead tr");

    headerRow.append("<th>Date and Time</th>");

    $("input[name='hourly[]']:checked").each(function() {
        var paramName = $(this).parent().text().trim();
        headerRow.append("<th>" + paramName + "</th>");
    });

    $("#content").append(table);
}

function getWeather() {
    var params = $("#settingsForm").serialize();

    $.ajax({
        method: 'GET',
        url: 'https://api.open-meteo.com/v1/forecast',
        data: params,
        dataType: 'json',
        success: function (data) {
            console.log("Полученные данные о погоде:", data);
            updateTable(data);
        },
        error: function (error) {
            console.error("Ошибка запроса к API погоды:", error);
        }
    });
}

function updateTable(data) {
    if (!data.hourly || !data.hourly.time) return;

    var tableBody = $("#weatherTable tbody");
    data.hourly.time.forEach((time, index) => {
        var row = $("<tr></tr>");
        row.append("<td>" + time + "</td>");

        $("input[name='hourly[]']:checked").each(function() {
            var parameter = $(this).val();
            var value = data.hourly[parameter][index];
            row.append("<td>" + (value != null ? value : 'N/A') + "</td>");
        });

        tableBody.append(row);
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
