import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useFetch } from './hooks/useFetch';

// {"coord":{"lon":-79.4163,"lat":43.7001},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":277,"feels_like":275.73,"temp_min":274.98,"temp_max":278.81,"pressure":1024,"humidity":74},"visibility":10000,"wind":{"speed":1.54,"deg":70},"clouds":{"all":0},"dt":1669243159,"sys":{"type":2,"id":2043365,"country":"CA","sunrise":1669206132,"sunset":1669239980},"timezone":-18000,"id":6167865,"name":"Toronto","cod":200}
interface Weather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

function App(this: any) {
  const rawQueryStr = window.location.search.match(/(?<=city=)\w+/);
  const city = rawQueryStr ? rawQueryStr[0] : "Toronto";

  console.log(city);
  const{data, loading} = useFetch<Weather>(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=30aa5ab91e2a6b5a127733648e5000e4`); 

  return (
    <div className="App">
      
      <section className="vh-100" style={{backgroundColor: "#f5f6f7"}}>
        <div className="container py-5 h-100">
        
        <div className="row d-flex justify-content-center align-items-center h-100">
          
          <div className="col-md-10 col-lg-8 col-xl-6">
          <div className="btn-group dropup mb-3">
            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Choose City
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" type="button" id="toronto" onClick={() => window.location.href=`/?city=toronto`}>Toronto</button></li>
              <li><button className="dropdown-item" type="button" id="seoul"onClick={() => window.location.href=`/?city=seoul`}>Seoul</button></li>
              <li><button className="dropdown-item" type="button" id="paris" onClick={() => window.location.href=`/?city=paris`}>Paris</button></li>
            </ul>
          </div>

            <div className="card bg-dark text-white" style={{borderRadius: "40px"}}>
              <div className="bg-image" style={{borderRadius: "35px"}}>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp"
                className="card-img" alt="weather" />
                <div className="mask" style={{backgroundColor: "rgba(190, 216, 232, .5)"}}></div>
              </div>
              <div className="card-img-overlay text-dark p-5">
                <h4 className="mb-0">{(loading)? <div>Loading...</div> : <div>{data.name}</div>} {(loading)? <div>Loading...</div> : <div>{data.sys.country}</div>}</h4>
                <p className="display-2 my-3">{(loading)? <div>Loading...</div> : <div>{(data.main.temp - 273.15).toFixed(2)}°C</div>}</p>
                <p className="mb-2">Feels Like: {(loading)? <div>Loading...</div> : <strong>{(data.main.feels_like - 273.15).toFixed(2)}°C</strong>}</p>
                <h5>{(loading)? <div>Loading...</div> : <div>{data.weather[0].description}</div>}</h5>
                <p className="mb-2">Humidity: {(loading)? <div>Loading...</div> : <strong>{data.main.humidity}%</strong>}</p>
                <p className="mb-2">Wind: {(loading)? <div>Loading...</div> : <strong>{data.wind.speed}km/h</strong>}</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App

