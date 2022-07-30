import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { doLogin } from "../../redux/actions/accountActions";

const Code = () => {
    const navigate = useNavigate();
    const disPatch = useDispatch();
    const firstRunRef = useRef(false); //Prevent rendering more than once
    const message = useSelector(state => state.account.errMessage);
    const userAccount = useSelector(state => state.account.userInfo);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const ssoToken = searchParams.get("ssoToken");
        if (ssoToken && firstRunRef.current === false) {
            firstRunRef.current = true;
            disPatch(doLogin(ssoToken));
        }
    }, []);

    useEffect(() => {
        if (userAccount && userAccount.access_token) {
            navigate("/");
        }
    }, [userAccount]);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-3">
                        {message && (
                            <span>
                                <div>
                                    <b>{message}</b>{" "}
                                </div>
                                <span>
                                    Please do login again. click here to &nbsp;
                                </span>
                                <a
                                    href={`${process.env.REACT_APP_BACKEND_SSO_LOGIN}?serviceURL=${process.env.REACT_APP_CURRENT_PROJECT_URL}`}
                                >
                                    Login
                                </a>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Code;
