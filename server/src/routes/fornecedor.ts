import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"

export async function fornecedorRota(fastify: FastifyInstance) {
    fastify.get('/fornecedor/listagem', async () => {

        const data = await prisma.fornecedor.findMany()

        return { data }
    })

    fastify.get('/fornecedor/:id', async (request, reply) => {

        const getFornecedor = z.object({
            id: z.string()
        })


        const {id} = getFornecedor.parse(request.params)

        const data = await prisma.fornecedor.findUnique({
            where:{
                id,
            }
        })

        return { data }
    })

    fastify.post('/fornecedor', async (request, reply) => {

        const criarFornecedorBody = z.object({
            razao: z.string(),
            cnpj: z.string(),
            telefone: z.string(),
            email: z.string(),
            cep: z.string(),
            endereco: z.string(),
            numero: z.string(),
            cidade: z.string(),
            estado: z.string(),
            nomeContato: z.string(),
            emailContato: z.string(),
            departamentoContato: z.string(),
            nomeContato1: z.string(),
            emailContato1: z.string(),
            departamentoContato1: z.string(),
        })


        const {razao,
                cnpj,
                telefone,
                email,
                cep,
                endereco,
                numero,
                cidade,
                estado,
                nomeContato,
                emailContato,
                departamentoContato,
                nomeContato1,
                emailContato1,
                departamentoContato1} = criarFornecedorBody.parse(request.body)

        let fornecedor = await prisma.fornecedor.findUnique({
            where:{
                email: email
            }
        })

        if (!fornecedor){
            fornecedor = await prisma.fornecedor.create({
                data: {
                    razao : razao,
                    cnpj: cnpj,
                    telefone: telefone,
                    email: email,
                    cep: cep,
                    endereco: endereco,
                    numero: numero,
                    cidade: cidade,
                    estado: estado,
                    nomeContato: nomeContato,
                    emailContato: emailContato,
                    departamentoContato: departamentoContato,
                    nomeContato1: nomeContato1,
                    emailContato1: emailContato1,
                    departamentoContato1: departamentoContato1,
                }
            })
            return reply.status(201).send({retorno: 'OK'})
        } else {
            return reply.status(400).send({retorno: 'Email já cadastrado!'})
        }     
    })
}