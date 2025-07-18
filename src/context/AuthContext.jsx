import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { requestConfig } from "../utils/requests";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const url = 'http://192.168.0.112:8080/';

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("");


    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const payload = jwtDecode(token);
                if (payload.exp > Date.now() / 1000) {
                    setUser(payload.sub);
                    setRole(payload.role);
                }
            } else {
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.error(error);
        }

    }, [setUser])

    const login = async (userData) => {
        setLoading(true);
        const config = requestConfig("POST", userData);
        try {
            const res = await fetch(url + 'auth/login', config)
                .then(res => res.json());

            if (res.token) {
                localStorage.setItem("token", res.token);
                var payload = jwtDecode(res.token);
                setRole(payload.role);
                setUser(userData.email);
            } else {
                return res;
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const register = async (userData) => {
        setLoading(true);
        const config = requestConfig("POST", userData);

        try {
            const res = await fetch(url + 'users', config)
                .then(res => res.json());

            return res;

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        setUser(null);
        setRole(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ user, role, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}