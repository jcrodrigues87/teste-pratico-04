import { http } from './config';

export default {

  listar(){

    return http.get('/buscartodos')
  },
  cadastrar(prestador){

    return http.post('/cadastrar', prestador)
  }

}