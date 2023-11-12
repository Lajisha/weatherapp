import React, { useState } from 'react'
import './WeatherApp.css'
import search from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.webp'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const WeatherApp = () => {


  // do api_key set up


  const [wicon,setWicon]=useState(cloud);

  const searchfn =async ()=>{
    const element = document.getElementsByClassName("city")
    if(element[0].value==='')
    {
      return 0;
    }
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
    
    let response = await fetch(url);
    let data= await response.json();
    const humidity = document.getElementsByClassName("hum-percentage")
    const wind = document.getElementsByClassName("wind-rate")
    const temperature= document.getElementsByClassName("weather-temp")
    const location=document.getElementsByClassName("weather-location")
    const icon=document.getElementsByClassName("icon")

    humidity[0].innerHTML = data.main.humidity+"%";
    wind[0].innerHTML = Math.floor(data.wind.speed)+"km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp)+"°C";
    location[0].innerHTML = data.name;
    icon[0].innerHTML = data.weather[0].icon;

    if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n" )
    {
      setWicon(clear);
    }
    else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
      setWicon(cloud);
    }
    else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n" || data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
      setWicon(drizzle);
    }
    else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n" || data.weather[0].icon=="10d" || data.weather[0].icon==="10n"){
      setWicon(rain);
    }
    else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
      setWicon(snow);
    }
    else{
      setWicon(clear);
    }
  }


  return (
    <div class="container">
        <div className="top">
            <input className="city" type="text" placeholder='search' />
            <div className="search" onClick={searchfn}>
                <img className='searchimg' src={search} alt="" />
            </div>
        </div>
        <div className="weather-img">
            <img className='cloudimg' src={wicon} alt="" />
        </div>
        <div className="weather-temp">24°C</div>
        <div className="weather-location">INDIA</div>
        <div className="data-container">
          <div className="elementone">
            <img src={humidity} alt="" />
            <div className="data">
              <div className="hum-percentage">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="elementtwo">
            <img src={wind} alt="" />
            <div className="data">
              <div className="wind-rate">18 km/hr</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
        {/* <div className="icon">abc</div> */}
    </div>
  )
}

export default WeatherApp