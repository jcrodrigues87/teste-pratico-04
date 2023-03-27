import Fastify from 'fastify'
import cors from '@fastify/cors'
import { fornecedorRota } from './routes/fornecedor'



async function bootstrap() {
    const fastify = Fastify({
        logger: true, //função para mostrar os log do que esta ocorrendo
    })

    await fastify.register(cors, {
        origin: true //Permitir qual aplicação acessar nossa aplicação
    })

    fastify.register(fornecedorRota)


    await fastify.listen({port: 3333}) //Porta de conexão

}

bootstrap()