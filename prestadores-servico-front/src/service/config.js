import axios from 'axios';

export const http = axios.create({

  baseURL:'http://localhost:8080/prestadores'
})

export const http1 = axios.create({

  baseURL:'http://localhost:8080/enderecos'
})

export const api = axios.create({

  baseURL: 'https://viacep.com.br/ws/'
})
export const http2 = axios.create({

  baseURL:'http://localhost:8080/contatos/'
})