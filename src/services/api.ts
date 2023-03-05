import { storageAuthTokenGet, storageAuthTokenSave } from '@storage/storageAuthToken';
import { AppError } from '@utils/AppError';
import axios, { AxiosError, AxiosInstance } from 'axios';

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

type PromiseType = {
  onSucess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

const api = axios.create({
  baseURL: 'http://192.168.15.1:3333'
}) as APIInstanceProps;

let failedQueue: PromiseType[] = [];
let isRefreshing = false;

api.registerInterceptTokenManager = signOut => {
  // só colocamos o interceptor na const pra gente conseguir ejetar ele
  const interceptTokenManager = api.interceptors.response.use((response) => {
  
    return response;
  }, async (requestError) => {

    if(requestError?.response?.status === 401) {
      if(requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
        const { refresh_token } = await storageAuthTokenGet();

        if(!refresh_token) {
          signOut();
          return Promise.reject(requestError);
        }

        const originalRequestConfig = requestError.config;

        if(isRefreshing) {
          // aq vai ser onde vamos adicionar as requisições na nossa fila de espera
          return new Promise((resolve, reject) => {
            failedQueue.push({
              onSucess: (token: string) => {
                originalRequestConfig.headers = {'Authorization': `Bearer ${token}`};
                resolve(api(originalRequestConfig));
              },
              onFailure: (error: AxiosError) => {
                reject(error);
              },
            })
          })

        }

        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await api.post('/sessions/refresh-token', { refresh_token });
            storageAuthTokenSave({ token: data.token , refresh_token: data.refresh_token });

            if(originalRequestConfig.data) {
              // verificando se a requisição que deu 401 tinha algum dado junto a ela
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
            }

            originalRequestConfig.headers = {'Authorization': `Bearer ${data.token}`};
            // atualizando o token das próx requisições que vamos fazer
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            failedQueue.forEach(request => {
              request.onSucess(data.token);
            });

            resolve(api(originalRequestConfig));
          } catch (error: any) {
            failedQueue.forEach(request => {
              request.onFailure(error);
            });

            signOut();
            reject(error);
          } finally {
            isRefreshing = false;
            failedQueue = [];
          }
        });
      }

      signOut();
    }

    // se existir, quer dizer q é uma msg de erro tratada vinda do back
    if(requestError.response && requestError.response?.data) {
      return Promise.reject(new AppError(requestError.response?.data?.message));
    } else {
      return Promise.reject(requestError);
      // return Promise.reject(new AppError('Erro no servidor. Tente novamente mais tarde!'));
    }
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
};

// config, temos todas as informações da requisição que está sendo feita.
api.interceptors.request.use((config) => {

  // se eu n der o retorno por ex, eu paro com o fluxo em si de comunicação, pq eu n estou retornando oq eu 
  // quero para a minha requisição por ex, msm coisa no response, se eu n retornar o response, o fluxo da entrega
  // de dados do back para o app n funciona
  return config;
}, (requestError) => {
  // se a requisição tiver algum erro, ele vem aqui, e a gente pode dar tratativa

  // estamos rejeitado a requisição e retornando para o app
  return Promise.reject(requestError)
});

export { api };