import { AppError } from '@utils/AppError';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.1:3333'
});

// config, temos todas as informações da requisição que está sendo feita.
api.interceptors.request.use((config) => {

  // se eu n der o retorno por ex, eu paro com o fluxo em si de comunicação, pq eu n estou retornando oq eu 
  // quero para a minha requisição por ex, msm coisa no response, se eu n retornar o response, o fluxo da entrega
  // de dados do back para o app n funciona
  return config;
}, (error) => {
  // se a requisição tiver algum erro, ele vem aqui, e a gente pode dar tratativa

  // estamos rejeitado a requisição e retornando para o app
  return Promise.reject(error)
});

api.interceptors.response.use((response) => {
  
  return response;
}, (error) => {
  // se existir, quer dizer q é uma msg de erro tratada vinda do back
  if(error.response && error.response?.data) {
    return Promise.reject(new AppError(error.response?.data?.message));
  } else {
    return Promise.reject(error);
    // return Promise.reject(new AppError('Erro no servidor. Tente novamente mais tarde!'));
  }
});

export { api };