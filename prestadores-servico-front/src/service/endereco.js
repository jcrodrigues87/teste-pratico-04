import { api } from './config';
import { http1 } from './config';

export default{

  buscarEndereco(cep){

    return api.get(cep + '/json')
  },

  cadastrar(endereco){

    return http1.post('/cadastrar', endereco)
  },

  listar(){

    return http1.get('/buscartodos')
  }

}