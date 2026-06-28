import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import type { User } from "../types/user";

interface AuthContextType {

    user: User | null;

    token: string | null;

    login: (accessToken: string, user: User, refreshToken?: string) => void;

    logout: () => void;

}

const AuthContext = createContext<AuthContextType>(

    {} as AuthContextType

);

export const AuthProvider = ({

    children

}: any) => {

    const [user, setUser] =

        useState<User | null>(null);

    const [token, setToken] =

        useState<string | null>(null);

    useEffect(() => {

        const storedToken =

            localStorage.getItem("token");

        const storedUser =

            localStorage.getItem("user");

        if (storedToken && storedUser) {

            setToken(storedToken);

            setUser(JSON.parse(storedUser));

        }

    }, []);

    const login = (
    accessToken: string,
    user: User,
    refreshToken?: string
) => {

    localStorage.setItem("token", accessToken);

    if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
    }

    localStorage.setItem("user", JSON.stringify(user));

    setToken(accessToken);
    setUser(user);
};

    const logout = () => {

        localStorage.clear();

        setUser(null);

        setToken(null);

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                token,

                login,

                logout

            }}

        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () =>

    useContext(AuthContext);