import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Logout = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    useEffect(() => {
        localStorage.removeItem("User");
        setUser(null);
        navigate("/Login");
    }, [navigate, setUser]);

    return null;
};

export default Logout;