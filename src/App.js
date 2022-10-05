import React, { useState } from "react";
const api = {
  key: "80cdc5d285ef9ce1a1f6f2232c012928",
  baseUrl: "http://api.openweathermap.org/data/2.5/",
};
function App() {

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = e =>{
    if(e.key === 'Enter'){
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res)=>res.json())
        .then((result)=>{
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  }

  const dateBuilder = (b) =>{
    let months = ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Itul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"];
    let days = ["Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba","Yakshanba"];
    let day = days[b.getDay()];
    let date = b.getDate();
    let month =  months[b.getMonth()];
    let year = b.getFullYear();

    return `${day} ${date} ${month} ${year}`
  };
  return (
    <div className={
      (typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app cold' : "app") : 'app'
    }>
      <main>
        <div className="search-box">
          <input 
          type="text" 
          className="search-bar" 
          placeholder="Search..." 
          onChange={(e)=>setQuery(e.target.value)}
          value={query} 
          onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ?(
          <div className="location-box">
            <div className="location">{weather.name},{weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="weather-box">
              <div className="tem">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
        </div>
        ):("")}
        
      </main>
    </div>
    );
}

export default App;
