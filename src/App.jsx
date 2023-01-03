import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import videoBg from '../src/assets/video/sky.mp4'

function App() {

  const [data, setdata] = useState({})
  const [longitude, setlongitude] = useState(null)
  const [latitude, setlatitude] = useState(null)
  const [isunit, setisunit] = useState(true)
  let icon = `http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`;

  function changeUnit() {
    setisunit(!isunit)
  }

  function success(pos) {
    const crd = pos.coords;
    setlongitude(crd.longitude)
    setlatitude(crd.latitude)
  }
  navigator.geolocation.getCurrentPosition(success)

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f56324f831195b9d4f46be837828042f&units=${isunit ? "metric" : "imperial"}`)
      .then(res => setdata(res.data));
  }, [isunit, latitude])

  return (
    <div className="App">
      <div className="card">
        <h1 className='card__city'>{data.name}, {data.sys?.country}</h1>
        <div className="card__weather">
          <h2 className='card__temp'>{data.main?.temp} {isunit ? "°C" : "°F"}</h2>
          <div className='card__temp-details'>
            <div className="card__icon-container">
              <img className='card__icon' src={icon} alt="" />
            </div>
            <p className='card__temp-description'>{data.weather?.[0].description}</p>
          </div>
        </div>

        <div className="card__more-info-container">
          <div className="card__more-info">
            <h3 className='card__more-data'>{data.wind?.speed} {isunit ? "m/s" : "mi/h"}</h3> 
            <p className='card__more-label'>Wind Speed</p>
          </div>
          <div className="card__more-info">
            <h3 className='card__more-data'>{data.clouds?.all}%</h3>
            <p className='card__more-label'>Clouds</p>
          </div>
          <div className="card__more-info">
            <h3 className='card__more-data'>{data.main?.pressure} hPa</h3>
            <p className='card__more-label'>Pressure</p>
          </div>
        </div>
        <button onClick={changeUnit}>Change Units</button>
      </div>
      <video src={videoBg} autoPlay loop muted></video>
    </div>
  )
}
export default App

