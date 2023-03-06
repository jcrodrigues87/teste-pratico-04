import { http2 } from './config';

export default {

  listarPorCnpj(cnpj){

    return http2.get(cnpj)
  }

}