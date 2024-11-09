const apiKey = '94c8ec1f80178b433e167b1d849981c9'; 
const weatherContainer = document.getElementById('weather-container');


function getWeather() {
    const location = 'Nur-Sultan'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`; 


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            if (data.cod === 200) { 

            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;

            const weatherInfo = `
            <p>
                Temperature: ${temperature}°C, ${description}
            </p>`;
                weatherContainer.innerHTML = weatherInfo;
        } else {
            displayWeatherError(data); 
        }

        })

        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherContainer.textContent = "Error fetching weather data.";
        });
}




function displayWeatherError(data) {
    console.error("Weather API Error:", data.cod, data.message);
    weatherContainer.textContent = `Weather information not available. Error: ${data.message}`;

}


document.addEventListener('DOMContentLoaded', getWeather); 