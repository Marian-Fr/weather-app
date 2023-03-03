function displayTemperature(response){
    console.log(response.data)
    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=response.data.city;
    let temperatureElement= document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(response.data.temperature.current);
    let descriptionElement=document.querySelector("#description");
    descriptionElement.innerHTML=response.data.condition.description;
    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.temperature.humidity;
    let windElement=document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed)
}

let apiKey="2e8483398ocdfb8e6befab4eb2at6740";
let city="Lisbon"
let apiUrl='https://api.shecodes.io/weather/v1/current?query=Lisbon&key=2e8483398ocdfb8e6befab4eb2at6740'
console.log(apiUrl)
axios(apiUrl).then(displayTemperature)