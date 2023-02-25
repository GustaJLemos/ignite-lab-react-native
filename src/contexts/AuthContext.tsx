import { UserDto } from "@dtos/UserDto";
import { api } from "@services/api";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser";
import { createContext, useEffect, useState } from "react";

export type AuthContextDataProps = {
  user: UserDto;
  updateUserProfile: (userUpdated: UserDto) => Promise<void>;
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

  async function updateUserProfile(userUpdated: UserDto) {
    try {
      setUser(userUpdated);

      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  async function storageUserAndTokenSave(userData: UserDto, token: string) {
    try {
      setIsLoadingStorageData(true);

      await storageUserSave(userData);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  async function userAndTokenUpdate(userData: UserDto, token: string) {
    // anexando o token no header das nossas requisições
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser(userData);
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });

      if(data.user && data.token) {

        await storageUserAndTokenSave(data.user, data.token);

        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  async function signOut() {
    setIsLoadingStorageData(true);
    try {
      setUser({} as UserDto);
      await storageUserRemove();

      await storageAuthTokenRemove();
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingStorageData(true);
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();
      
      if(token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, isLoadingStorageData, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}