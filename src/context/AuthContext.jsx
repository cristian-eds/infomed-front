import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const url = 'http://localhost:8080/';

    const [user, setUser] = useState(null);
    const [loading, setLoading ] = useState(false);

    useEffect(() => {
        try {
            var token = localStorage.getItem("token");
            var payload = jwtDecode(token);
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
        setLoading(true);
        const config = {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const res = await fetch(url+'auth/login', config)
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
        } finally {
            setLoading(false);
        }
    }

    const register = async (userData) => {
        setLoading(true);
        const config = {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await fetch(url+'users', config)
                .then(res => res.json());
            
            if(res.email) {
                login(userData);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ user, loading ,login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}