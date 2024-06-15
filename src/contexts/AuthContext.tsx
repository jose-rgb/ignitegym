import { ReactNode, createContext } from "react";
import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
    user: UserDTO;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    return(
        <AuthContext.Provider value={{
            user: {
              id: '1',
              name: 'José Ricardo',
              email: 'catce.2020111tads0360@aluno.ifpi.edu.br',
              avatar: 'jose.png'
            }
          }}>
            {children}
        </AuthContext.Provider>
    );
}