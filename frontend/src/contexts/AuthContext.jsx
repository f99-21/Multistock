import { createContext, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const login = async (email, password) => {

        try {

            const response = await api.post(
                "/login",
                {
                    email,
                    password
                }
            );

            return response.data;

        } catch (error) {

            console.log(error);

            return {
                success:false
            };

        }

    };

    return (
        <AuthContext.Provider value={{ login }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);