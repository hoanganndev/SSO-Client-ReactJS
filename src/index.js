import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Connect redux with react
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Weather from "./components/Weather/Weather";
import Code from "./components/Code/Code";
import "./index.scss";
import store from "./redux/store"; // Redux store
import reportWebVitals from "./reportWebVitals";
import AppRoute from "./routes/AppRoute";
import Home from "./components/Home/Home";
import PrivateRoute from "./routes/PrivateRoute";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        {/* <React.StrictMode> */}
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppRoute />}>
                    <Route path="/" index element={<Home />} />
                    <Route
                        path="weather"
                        element={
                            <PrivateRoute>
                                <Weather />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route path="code" element={<Code />}></Route>
            </Routes>
        </BrowserRouter>
        {/* </React.StrictMode> */}
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
