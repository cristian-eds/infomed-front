import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const url = 'http://localhost:8080/auth/login';

    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            var token = localStorage.getItem("token");
            var payload = jwtDecode(token);
            console.log(payload.exp);
            console.log(Date.now() / 1000)
            if (token && payload.exp > Date.now() / 1000) {
                setUser(payload.sub);
            } else {
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.error(error);
        }

    }, [setUser])

    const login = async (userData) => {
        const config = {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const res = await fetch(url, config)
                .then(res => res.json());

            if (res.token) {
                setUser(userData.login);
                localStorage.setItem("token", res.token);
                setUser(userData.email);
            } else {
                return res;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}