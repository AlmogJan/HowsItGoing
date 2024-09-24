import axios from "axios";

export const httpService = {
    get,
    post,
    put,
    remove,
}

async function get<T>(url: string): Promise<T> {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data as T;
        } catch (err) {
            console.error("ERROR!@#", err);
            throw new Error("Unauthorized");
        }
    }
    throw new Error("Unauthorized");
}

async function post<T, X>(url: string, body: T): Promise<X> {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await axios.post(url, body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data as X;
        } catch (err) {
            console.error(err);
            throw new Error("Error posting data");
        }
    }
    throw new Error("Unauthorized");
}

async function put<T, X>(url: string, body: T): Promise<X> {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await axios.put(url, body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data as X;
        } catch (err) {
            console.error(err);
            throw new Error("Error updating data");
        }
    }
    throw new Error("Unauthorized");
}

async function remove<T>(url: string): Promise<T> {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data as T;
        } catch (err) {
            console.error(err);
            throw new Error("Error deleting data");
        }
    }
    throw new Error("Unauthorized");
}
