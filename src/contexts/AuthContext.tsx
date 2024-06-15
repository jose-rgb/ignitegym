import { ReactNode, createContext, useState } from "react";
import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => void;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState({
        id: '1',
        name: 'José Ricardo',
        email: 'catce.2020111tads0360@aluno.ifpi.edu.br',
        avatar: 'jose.png'
    });

    function signIn(email: string, password: string) {
        setUser({
            id: '',
            name: '',
            email,
            avatar: '',
        });
    }

    return(
        <AuthContext.Provider value={{ user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}