import React, { useEffect, useState } from "react";
import axios from "axios";
import { TiWeatherSunny, TiWeatherStormy, TiWeatherShower, TiWeatherDownpour, TiWeatherSnow, TiWeatherCloudy } from "react-icons/ti";
import { BsCloudFog } from "react-icons/bs";

const api = {
    key: "4ce2d69a9a47b36734f7d73ad75c6785",
    base: "https://api.openweathermap.org/data/2.5/",
};

function Weather({ setCold }) {

    const city = "seoul";
    const url = `${api.base}weather?q=${city}&appid=${api.key}`;
    const [weather, setWeather] = useState({
        id: 0,
    });

    useEffect(() => {
        // 날씨 가져오기
        axios.get(url).then((responseData) => {
            const data = responseData.data;
            setWeather({
                id: data.weather[0].id,
            });
        });
    }, [url]);

    function selectIcon() {
        let iconId = weather.id === 800 ? 0 : (parseInt(weather.id) / 100).toFixed(0);

        if (iconId === 0) return <TiWeatherSunny size="2rem" />;
        else if (iconId === 2) return <TiWeatherStormy size="2rem" />;
        else if (iconId === 3) return <TiWeatherShower size="2rem" />;
        else if (iconId === 5) return <TiWeatherDownpour size="2rem" />;
        else if (iconId === 6) return <TiWeatherSnow size="2rem" />;
        else if (iconId === 7) return <BsCloudFog size="2rem" />;
        else if (iconId === 8) return <TiWeatherCloudy size="2rem" />;
        else return <TiWeatherSunny size="2rem" />;
    }
    return (
        <div className="weathericon">{selectIcon()}</div>
    );
}
export default Weather;