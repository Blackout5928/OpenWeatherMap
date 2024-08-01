import React, {useEffect, useState, useRef} from 'react'
import './Weather.css'
import searchIcon from '../assets/search-icon.png'
import cloud from '../assets/cloudy.png'
import sun from '../assets/png/003-sun.png'
import moon from '../assets/png/005-moon.png'
import moonCloud from '../assets/png/004-moon-night.png'
import humidity from '../assets/humidity.png'
import cloudthunder from '../assets/png/006-cloud-2.png'
import wind from '../assets/wind.png'
import brokencloude from '../assets/png/002-cloud-1.png'
import showerain from '../assets/png/007-shower.png'
import storm from '../assets/png/001-cloud.png'
import show from '../assets/png/008-snowflakes.png'

const Weather = () => {

    const inputRef = useRef()

    const [weatherDatas, setWeatherData] = useState(false);

    const allIcons = {
        "01d": sun,
        "01n": moon,
        "02d": cloud,
        "02n": moonCloud,
        "03d": cloudthunder,
        "03n": cloudthunder,
        "04d": brokencloude,
        "04n": brokencloude,
        "09d": showerain,
        "09n": showerain,
        "10d": storm,
        "10n": storm,
        "13d": show,
        "13n": show,
    }

    const search = async (city)=> {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&unit=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity : data.main.humidity,
                windSpeed : data.wind.speed,
                temperature : Math.floor(data.main.temp),
                location : data.name,
                icon : icon
            })
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        search("Philippines");
    },[])


    return (
        <div className='weather'>
            <div className='searchBar'>
                <input ref={inputRef} type="text" placeholder='Search'/>
                <img src={searchIcon} alt="" className='searchIcon' onClick={()=>search(inputRef.current.value)}/>
            </div>
            <img src={weatherDatas.icon} alt="" className='cloudImg'/>
            <p className='temperature'>{weatherDatas.temperature} °C</p>
            <p className='location'>{weatherDatas.location}</p>
            <div className='weatherData'>
                <div className='col'>
                    <img src={humidity} alt="" className='humidityImg'/>
                    <div>
                        <p>{weatherDatas.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className='col'>
                    <img src={wind} alt="" className='windImg'/>
                    <div>
                        <p>{weatherDatas.windSpeed} Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather