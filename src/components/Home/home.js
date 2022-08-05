import React from "react";

const home = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 mt-3 ">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            🌵 Đăng nhập sử dụng session với passport.js
                            (NodeJS)
                        </li>
                        <li className="list-group-item">
                            🌵 Sử dụng access_token, refresh_token và cookies để
                            đăng nhập (ReactJS)
                        </li>
                        <li className="list-group-item">
                            🌵 Đăng nhập với tài khoảng google/facebook{" "}
                        </li>
                        <li className="list-group-item">
                            🌵 Sử dụng hệ cơ sở dữ liệu quan hệ
                            SQL(MySql,Postgres)
                        </li>
                        <li className="list-group-item">
                            🌵 Xây dựng service sử dụng access_token để xác thực
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default home;
