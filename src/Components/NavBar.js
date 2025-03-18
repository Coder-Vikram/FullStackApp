import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const NavBar = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    const handleLogout = () => {
        navigate("/Logout");
    };

    return (
        <Navbar bg="light" className="mb-4" style={{ height: "3.75rem" }}>
            <Container>
                <h2>
                    <Link to="/" className="link-dark">ChatApp</Link>
                </h2>
                {user ? (
                    <span className="text-warning">Logged in as {user.name}</span>
                ) : (
                    <span className="text-warning">Not logged in</span>
                )}
                <Nav>
                    <div>
                        {user ? (
                            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                        ) : (
                            <>
                                <button className="btn btn-primary" onClick={() => navigate('/Login')}>Login</button>
                                <button className="btn btn-primary" onClick={() => navigate('/Register')}>Register</button>
                            </>
                        )}
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;