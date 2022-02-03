import orderDays from "./days.js";

const apiKey = 'f9e787b4e8d99be1b9a64771a0735550';
let result;
const weather = document.querySelector('.weather')
const temperature= document.querySelector('.temperature')
const place = document.querySelector('.place');
const hour = document.querySelectorAll('.hour-grid')
const tempHour = document.querySelectorAll('.temperature-hour')
const day = document.querySelectorAll('.day-grid')
const tempDay = document.querySelectorAll('.temperature-day')
const imgLogo = document.querySelector('.img-logo');
const loadingOverlay = document.querySelector('.loading')

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);
        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;
        apiExecution(longitude,latitude);
    }, () => console.log('You have refused the geolocalisation. The app can\'t work.'))
}

function apiExecution(longitude,latitude){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${apiKey}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        result = data;
        weather.textContent = result.current.weather[0].description
        temperature.textContent = `${Math.trunc(result.current.temp)}°`
        place.textContent = result.timezone;

        let now = new Date().getHours();

        // HOURS DURING THE DAY


        for(let i = 0; i < hour.length; i++){
            let hoursIncr = now + i * 3;

            if(hoursIncr > 24){

                hour[i].textContent = `${hoursIncr - 24 } h`

            } else if(hoursIncr === 24){

                hour[i].textContent = `00h`
            }else {
                hour[i].textContent = `${hoursIncr} h`
            }

            
        }
        // TEMPERATURES 

        for(let i = 0; i< tempHour.length;i++){
            tempHour[i].textContent = `${Math.trunc(result.hourly[i * 3].temp)}°`
        }

        // DAYS WITH ONLY 3 LETTERS OF THE DAY

        for(let i = 0; i < orderDays.length;i++){
            day[i].textContent = orderDays[i].slice(0,3)
        }

        // TEMP EACH DAY
        for(let i = 0; i < 7 ;i++){
            tempDay[i].textContent = `${Math.trunc(result.daily[i+1].temp.day)}°`
        }

        if(now >= 6 && now < 21  ){
            imgLogo.src = `../assets/day/${result.current.weather[0].icon}.svg`
        } else{
            imgLogo.src = `../assets/night/${result.current.weather[0].icon}.svg`
        }
        loadingOverlay.classList.add('disappear')
    })
}