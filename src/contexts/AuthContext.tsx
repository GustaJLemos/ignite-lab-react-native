import { UserDto } from "@dtos/UserDto";
import { api } from "@services/api";
import { storageAuthTokenSave } from "@storage/storageAuthToken";
import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser";
import { createContext, useEffect, useState } from "react";

export type AuthContextDataProps = {
  user: UserDto;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingStorageData: boolean;
  signOut: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDto>({} as UserDto); 

  const [isLoadingStorageData, setIsLoadingStorageData] = useState(true);

  async function storageUserAndToken(userData: UserDto, token: string) {
    try {
      setIsLoadingStorageData(true);

      // anexando o token no header das nossas requisições
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await storageUserSave(userData);
      await storageAuthTokenSave(token);
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });

      if(data.user && data.token) {
        storageUserAndToken(data.user, data.token);
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    setIsLoadingStorageData(true);
    try {
      setUser({} as UserDto);
      await storageUserRemove();
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  async function getUserData() {
    try {
      const userLogged = await storageUserGet()
      
      if(userLogged) {
        setUser(userLogged);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, isLoadingStorageData, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}