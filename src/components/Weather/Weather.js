import { useState } from "react";
import WeatherState from "./WeatherState";

const Weather = () => {
    const [cityState, setCityState] = useState("1236594");
    const handleSelect = e => {
        setCityState(e.target.value);
    };
    return (
        <div className="container">
            <div className="mt-3">
                <select onChange={e => handleSelect(e)} className="mx-3">
                    <option value="1236594">Hà Nội</option>
                    <option value="1252431">Hồ Chí Minh</option>
                </select>
                <WeatherState cityState={cityState} />
            </div>
        </div>
    );
};

export default Weather;
