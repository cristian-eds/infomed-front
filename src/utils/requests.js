
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

export const requestConfigFormData = (method,dataToformData) => {

    const token = localStorage.getItem("token");

    const config = {
        method,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: createFormData(dataToformData)
    }

    return config;
}

export const createFormData = (data) => {

    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
        formData.append(key,data[key])
    });

    return formData;
}

export const API_URL = import.meta.env.VITE_API_BASE_URL;