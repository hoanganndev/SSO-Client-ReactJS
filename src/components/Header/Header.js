import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { doLogout } from "../../redux/actions/accountActions";
import "./Header.scss";

const Header = () => {
    const dispatch = useDispatch();
    const userAccount = useSelector(state => state.account.userInfo);
    const handleLogin = () => {
        // Redirect to SSO login
        window.location.href = `${process.env.REACT_APP_BACKEND_SSO_LOGIN}?serviceURL=${process.env.REACT_APP_CURRENT_PROJECT_URL}`;
    };
    const handleLogout = () => {
        dispatch(doLogout());
    };
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to="/">
                                Home
                            </NavLink>
                            <NavLink className="nav-link" to="/about">
                                About
                            </NavLink>
                        </Nav>
                        {userAccount && userAccount.access_token && (
                            <Nav>
                                <Nav.Link href="#">
                                    <span>Welcome! </span>
                                    <span>
                                        {userAccount.username
                                            ? userAccount.username
                                            : ""}
                                    </span>
                                </Nav.Link>
                            </Nav>
                        )}
                        <Nav>
                            <NavDropdown
                                title="Settings"
                                id="basic-nav-dropdown"
                            >
                                {userAccount && userAccount.access_token ? (
                                    <NavDropdown.Item
                                        onClick={() => handleLogout()}
                                    >
                                        Logout
                                    </NavDropdown.Item>
                                ) : (
                                    <NavDropdown.Item
                                        onClick={() => handleLogin()}
                                    >
                                        Login
                                    </NavDropdown.Item>
                                )}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
