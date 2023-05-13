// let response=fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${44.34}&lon=${10.99}&appid=031c6399dbaac9b2fcec13c89f758401`,
// {
//     method:'GET',
//     headers:{
//         Accept:'application/json'
//     } 
// }).then((res)=>{res.json()}
// ).then((data)=>{console.log(data);}).catch((err)=>{console.log(err.message);})
let curLocationBtn=document.querySelector('.CurlocationBtn')

async function Getweather(){
   

let searchBtn=document.querySelector('.fa-magnifying-glass')
//search using Geocoder api using city name
async function getUsingCity(){
    let cityInput=document.querySelector('.cityInput').value
    let errorMessage=document.querySelector('.errormessage')
    if(cityInput==''||null){
        errorMessage.innerHTML=`please enter a city name`
        return
    }
    try{
        let GetCityweather=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=031c6399dbaac9b2fcec13c89f758401`)
        let cityData=await GetCityweather.json()
        displayWeather(cityData)
        console.log(cityData);
        errorMessage.innerHTML=``
    }catch(err){
        let weatherimage=document.querySelector('.WeatherImage')
        let cityName=document.querySelector('.cityName')
        let weatherDescr=document.querySelector('.weather-descr')
        let tempDisplay=document.querySelector('.tempdisplay')
        let humidity=document.querySelector('.humidity')
        let windSpeed=document.querySelector('.wind-speed')
        if(err){
            errorMessage.innerHTML=`not a city`
            weatherimage.src=``
            cityName.innerHTML=``
            weatherDescr.innerHTML=``
            tempDisplay.innerHTML=``
            humidity.innerHTML=``
            windSpeed.innerHTML=``
            return
        }
       
    }

}
      searchBtn.addEventListener('click',getUsingCity)  
        // displayWeather('01n')
        

        //fetch data using current location
        async function getCoords(){
    let location = navigator.geolocation.getCurrentPosition((position)=>{
                let{longitude,latitude}=position.coords
                let lat=latitude.toFixed(2)
                let long=longitude.toFixed(2)
               FetchData(lat,long)
               
            })
           
        }
        
        

        curLocationBtn.addEventListener('click',getCoords)
        

        async function FetchData(lat,long){
            let WeatherFetch=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=031c6399dbaac9b2fcec13c89f758401`,
            {
                method:'GET',
                headers:{
                    Accept:'application/json'
                } 
            } )

                let data=await WeatherFetch.json()
                console.log(data);
                displayWeather(data)
        }
}

Getweather()

//Displays weather elements on screen
function displayWeather(weatherArray){
    let weatherimage=document.querySelector('.WeatherImage')
    let cityName=document.querySelector('.cityName')
    let weatherDescr=document.querySelector('.weather-descr')
    let tempDisplay=document.querySelector('.tempdisplay')
    let humidity=document.querySelector('.humidity')
    let windSpeed=document.querySelector('.wind-speed')
    cityName.innerHTML=`${weatherArray.name}<i class="fa-sharp fa-solid fa-location-dot"></i>`
    weatherimage.src=`https://openweathermap.org/img/wn/${weatherArray.weather[0].icon}@2x.png`
    weatherDescr.innerHTML=`${weatherArray.weather[0].description}`
    tempDisplay.innerHTML=`${Math.ceil(weatherArray.main.temp-273.15)}°C`
    humidity.innerHTML=`<i class="fa-solid fa-droplet"></i> ${weatherArray.main.humidity}% <br>
    humidity`
    windSpeed.innerHTML=`<i class="fa-solid fa-wind"></i>${Math.ceil(weatherArray.wind.speed*3.6) } km/h <br>
    Wind speed`
}

//toggle dark light mode
let toggleRight=document.querySelector('.righttoggle')
let toggleLeft=document.querySelector('.lefttoggle')
let toggleCircle=document.querySelector('.togglecircle')
let toggleWrapper=document.querySelector('.tooglebuttonwrapper')

let background=window.getComputedStyle(document.documentElement).getPropertyValue('--div-background-color')
let timeOfDay=document.querySelector('.time-of-day')

// toggleRight.addEventListener('click',)
function Moveleft(){
    toggleCircle.style.transform=`translateX(${0}%)`
    toggleWrapper.style.backgroundColor=`#d2d2d2`
    document.documentElement.style.setProperty('--background-color','#00b4ff')
    document.documentElement.style.setProperty('--main-text-color','#fff')
   document.documentElement.style.setProperty('--info-display-bg','#00b4ff')
   document.documentElement.style.setProperty('--input-bg','#fff')
   document.documentElement.style.setProperty('--input-text-color','#000')
   timeOfDay.src=`sun-svgrepo-com.svg`
}
function Moveright(){
    toggleCircle.style.transform=`translateX(${100}%)`
    toggleWrapper.style.backgroundColor=`#20096d`
   document.documentElement.style.setProperty('--background-color','#1b1b1b')
   document.documentElement.style.setProperty('--main-text-color','#00b4ff')
   document.documentElement.style.setProperty('--info-display-bg','#1b1b1b')
   document.documentElement.style.setProperty('--input-bg','#333')
   document.documentElement.style.setProperty('--input-text-color','#fff')
   timeOfDay.src=`moon-svgrepo-com.svg`
    
    console.log('right-clicked');
}
