import { UserDto } from "@dtos/UserDto";
import { createContext, useState } from "react";

export type AuthContextDataProps = {
  user: UserDto;
}

type AuthContextProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({
    id: '1',
    nome: 'jorge',
    email: 'horge@gmail.com',
    avatar: 'gustavo.png'
  }); 

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}