import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import axiosClient from "../../setup/axios";
import "./WeatherState.scss";
const WeatherState = props => {
    const [weatherData, setWeatherData] = useState([]);
    const getWeatherByLocation = async locationId => {
        // 1236594 . woeid
        let res = await axiosClient.post(
            `${process.env.REACT_APP_SERVICE_BACKEND}/weather-api/v1/get-weather-data`,
            {
                url: `api/location/${locationId}`,
            }
        );
        if (res && res.title) {
            setWeatherData(res.consolidated_weather);
        }
    };

    const allWeatherState = {
        Snow: "sn",
        Thunderstorm: "t",
        "Heavy Cloud": "hc",
        "Light Cloud": "lc",
        Clear: "c",
    };

    const getImageUrl = weatherState => {
        const fetchState = allWeatherState[weatherState];
        return `${process.env.REACT_APP_SERVICE_BACKEND}/static/img/weather/${fetchState}.svg`;
    };

    useEffect(() => {
        getWeatherByLocation(props.cityState ? props.cityState : "1236594");
    }, [props.cityState]);

    return (
        <div className="weather-container">
            {weatherData && weatherData.length > 0 && (
                <Carousel variant="dark">
                    {weatherData.map((item, index) => {
                        return (
                            <Carousel.Item key={`item-${index}`}>
                                <img
                                    className="d-block w-100"
                                    src={getImageUrl(item.weather_state_name)}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>{item.weather_state_name} </h3>
                                    <p>
                                        {item.max_temp}&#8451; -{" "}
                                        <span style={{ color: "#70757a" }}>
                                            {item.min_temp}&#8451;
                                        </span>
                                    </p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            )}
        </div>
    );
};

export default WeatherState;
