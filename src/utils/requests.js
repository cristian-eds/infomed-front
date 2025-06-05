
export const requestConfig = (method,data) => {

    const token = localStorage.getItem("token");

    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    if(method !== "GET" && data) {
        config.body = JSON.stringify(data);
    } 

    return config;
}

export const API_URL = import.meta.env.VITE_API_BASE_URL;