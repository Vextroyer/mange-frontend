import Cookies from "js-cookie";

export interface LoginResponse {
    token: string;
}

export async function login(Username: string, Password: string): Promise<LoginResponse> {
    try {
        const response = await fetch("http://localhost:5050/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Username: Username, Password: Password }),
        });

        if (!response.ok) {
            const errorMsg = `Error ${response.status}: ${response.statusText}`;
            throw new Error(errorMsg); // Manejo de errores HTTP
        }

        const data = await response.json();

        if (!data || typeof data.token !== "string") {
            throw new Error("Invalid Token.");
        }

        Cookies.set("token", data.token, {
            expires: 1, // Duración de 1 día
            secure: process.env.NODE_ENV === "production", // HTTPS en producción
            sameSite: "Strict", // Protección contra CSRF
        });

        return data;

    } catch (error) {
        console.error("Error sending data:", error);
        alert("Error connecting to the server");
        throw error; // Throw the error to be handled by the code above
    }
}