const url = 'https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=59.9&lon=10.7';
const body = document.querySelector('body');

async function getWeatherData() {
    const res = await fetch(url);
    const data = await res.json(); 
    return data.properties.timeseries;
}

async function showData() {
    const weather = await getWeatherData();
    let currentDay = convertStringToDate(weather[0].time).date;
    let temps = [];

    for (let i = 0; i < weather.length; i++) {
        const tempApiCall = weather[i].data.instant.details.air_temperature;
        let dateObject = convertStringToDate(weather[i].time);
        if(dateObject.date == currentDay) {
            temps.push(tempApiCall);
        } else {
            createWeatherDiv(
                "dateID" + dateObject.date, 
                dateObject.date,
                dateObject.month, 
                dateObject.day, 
                dateObject.hour,
                temps );
            temps = [];
            currentDay = dateObject.date;
        }
    }
}

function createWeatherDiv(id, date, month, day, hour, temp) {
    const weatherDivTemplate = 
        `<div class="weather">
            <div class="date">
                <h3 class="dayOfMonth">
                    <!--Put the day of the month-->
                    ${date + ". " + month}
                </h3>
                <h3 class="dayOfWeek">
                    <!-- Put the ay of the week -->
                    ${day}
                </h3>
            </div>
            <div class="temp" id=${id}>
                <!-- Temperatures for the day -->
            </div>
        </div>`;
    const weatherDiv = document.createElement('div');
    weatherDiv.innerHTML = weatherDivTemplate;
    body.appendChild(weatherDiv);

    // Add themperatures to each day
    const temperatureDiv = document.getElementById(id);
    temp.forEach(element => {
        const temperature = document.createElement('div');
        temperature.innerHTML = element + "°C";
        temperature.className = "temps";
        temperatureDiv.appendChild(temperature);
    });

}


// Converts the String containing the date to a date object
function convertStringToDate(dateString) {
    let dateObject = new Date(dateString);
    let date = dateObject.getDate();
    let day = dateObject.getDay();
    let month = dateObject.getMonth();
    let hour = dateObject.getHours();

    // Converts the results from getDay()
    // to the days of the week in string format
    switch (day) {
        case 0:
            day = "Søndag";
            break;
        case 1:
            day = "Mandag";
            break;
        case 2:
            day = "Tirsdag";
            break;
        case 3:
            day = "Onsdag";
            break;
        case 4:
            day = "Torsdag";
            break;
        case 5:
            day = "Fredag";
            break;
        case 6:
            day = "Lørdag";
            break;
        default:
            day = "Date not processed correctly";
            break;
    }

    // Converts the results from getMonth()
    // to month in string format
    switch (month) {
        case 0:
            month = "Januar";
            break;
        case 1:
            month = "Februar";
            break;
        case 2:
            month = "Mars";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "Mai";
            break;
        case 5:
            month = "Juni";
            break;
        case 6:
            month = "Juli";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "Oktober";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "Desember";
            break;
        default:
            month = "Month not processed correctly";
            break;
    }

    return {date, day, month, hour};
}