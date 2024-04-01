new Vue({
    el: '#app',
    data: {
        latitude: '',
        longitude: '',
        pastDays: 0,
        futureDays: 0,
        weatherData: [],
        options: [
            { value: 'temperature_2m', text: 'Temperature (2m)' },
            { value: 'relative_humidity_2m', text: 'Relative Humidity (2m)' },
            { value: 'rain', text: 'Rain' },
            { value: 'cloudcover', text: 'Cloud Cover' },
            { value: 'windspeed_10m', text: 'Wind Speed (10m)' }
        ],
        selectedOptions: ['temperature_2m', 'relative_humidity_2m', 'rain', 'cloudcover', 'windspeed_10m']
    },
    methods: {
        getWeather() {
            const hourlyParams = this.selectedOptions.join(',');
            const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&hourly=${hourlyParams}&start=-${this.pastDays}d&end=+${this.futureDays}d`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    this.weatherData = [];
                    if (data.hourly && data.hourly.time) {
                        for (let i = 0; i < data.hourly.time.length; i++) {
                            const time = data.hourly.time[i];
                            this.weatherData.push({
                                time: time,
                                temperature: data.hourly.temperature_2m ? data.hourly.temperature_2m[i] + ' °C' : 'N/A',
                                humidity: data.hourly.relative_humidity_2m ? data.hourly.relative_humidity_2m[i] + ' %' : 'N/A',
                                rain: data.hourly.rain ? data.hourly.rain[i] + ' mm' : 'N/A',
                                cloudCover: data.hourly.cloudcover ? data.hourly.cloudcover[i] + ' %' : 'N/A',
                                windSpeed: data.hourly.windspeed_10m ? data.hourly.windspeed_10m[i] + ' km/h' : 'N/A',
                            });
                        }
                    }
                })
                .catch(error => console.error('Error fetching weather data:', error));
        },
        getPosition() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(position => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                }, error => console.error("Error getting the position:", error));
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        },
        isSelected(option) {
            return this.selectedOptions.includes(option);
        }
    }
});
