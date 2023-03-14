function formatDate(timestamp){
  let date=new Date(timestamp)
let hours= date.getHours();
if(hours < 10)
hours=`0${hours}`;
let minutes=date.getMinutes();
if(minutes < 10)
minutes=`0${minutes}`;
let days= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
console.log(days)
let day=days[date.getDay()];
return `${day} ${hours}:${minutes}`


}
 function displayForecast(response) {
  console.log(response.data.daily)
  let forecastElement=document.querySelector("#forecast")
  let forecastHTML=`<div class="row">`;
  let days=["Tue","Wed","Thu", "Fri"]
  days.forEach(function(day){
    forecastHTML=forecastHTML + `
<div class="col-3">
    <div class="weather-forecast-date">
    ${day}
</div>
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png" alt="" width="36" />
    <div class="weather-forecast-temperature">
        <span class="weather-forecast-max">
            18° |
        </span>
        <span class="weather-forecast-min">
          12°
        </span>
  
    </div>
</div>
`;

  })
  
forecastHTML=forecastHTML +`</div>`
  forecastElement.innerHTML= forecastHTML
 }
 function getForecast(coordinates){
  let apiKey="2e8483398ocdfb8e6befab4eb2at6740";
  let apiUrl=`https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`
 console.log(apiUrl)
 axios.get(apiUrl).then(displayForecast)
 }

function displayTemperature(response){
    console.log(response.data)
    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=response.data.city;
    let temperatureElement= document.querySelector("#temperature");
    celsiusTemperature=response.data.temperature.current
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
    let descriptionElement=document.querySelector("#description");
    descriptionElement.innerHTML=response.data.condition.description;
    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.temperature.humidity;
    let windElement=document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed)
     let dateElement=document.querySelector("#date");
     dateElement.innerHTML=formatDate(response.data.time *1000);
    ;
    let iconElement=document.querySelector("#icon");
    iconElement.setAttribute("src" ,`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute("alt",response.data.condition.description);

    getForecast(response.data.coordinates);
    
}
function search(city){
let apiKey="2e8483398ocdfb8e6befab4eb2at6740";
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);

}
function handleSumbit(event){
  event.preventDefault();
  let cityInputElement=document.querySelector("#city-input")
  search(cityInputElement.value);
}
    
function showFahrenheitTemperature(event){
  event.preventDefault();
  celsiusLinkElement.classList.remove("active")
  fahrenheitLinkElement.classList.add("active")
  let fahrenheitTemperature=(celsiusTemperature * 9)/5 + 32;
let temperatureElement=document.querySelector("#temperature");
temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}
function showCelsiusTemperature(event){
  celsiusLinkElement.classList.add("active")
  fahrenheitLinkElement.classList.remove("active")
let temperatureElement=document.querySelector("#temperature");
temperatureElement.innerHTML=Math.round(celsiusTemperature);
}


let celsiusTemperature=null;

let form=document.querySelector("#search-form");
form.addEventListener("submit", handleSumbit)

let fahrenheitLinkElement=document.querySelector("#fahrenheit-link")
fahrenheitLinkElement.addEventListener("click",showFahrenheitTemperature)

let celsiusLinkElement=document.querySelector("#celsius-link")
celsiusLinkElement.addEventListener("click",showCelsiusTemperature)


search("Lisbon")
