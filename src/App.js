import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Header from "./components/Header/Header";
import { doGetAccount } from "./redux/actions/accountActions";

function App() {
    const dispatch = useDispatch();
    const firstRenderRef = useRef(false);
    const userAccount = useSelector(state => state.account.userInfo);
    const isLoading = useSelector(state => state.account.isLoading);
    const style = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    };

    useEffect(() => {
        if (
            userAccount &&
            !userAccount.access_token &&
            firstRenderRef.current === false
        ) {
            dispatch(doGetAccount());
            firstRenderRef.current = true;
        }
    }, []);

    return (
        <>
            {isLoading === true ? (
                <div className="container">
                    <div style={style}>
                        <HashLoader
                            color={"#36d7b7"}
                            loading={true}
                            size={100}
                        />
                    </div>
                </div>
            ) : (
                <div className="App">
                    <Header />
                </div>
            )}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default App;
