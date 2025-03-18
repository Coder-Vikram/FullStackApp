import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../Utils/Services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [registerError, setRegisterError] = useState();
    const [isRegisterLoading, setisRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
    });

    console.log("User", user);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const registerUser = useCallback(async (values) => {
        setisRegisterLoading(true);
        setRegisterError(null); // Clear previous error
        const response = await postRequest(`${baseUrl}/users/register`, values);

        setisRegisterLoading(false);

        if (response.error) {
            console.error("Registration error:", response.message);
            return setRegisterError(response.message); // Set error message
        }

        console.log("Registration successful:", response);
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};