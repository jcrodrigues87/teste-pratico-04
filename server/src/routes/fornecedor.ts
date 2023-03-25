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
            },
            include:{
                contatos:{
                    select:{
                        nome: true,
                        departamento: true,
                        email: true,
                    }
                }
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
            numero: z.number(),
            cidade: z.string(),
            estado: z.string(),
        })


        const {razao,
                cnpj,
                telefone,
                email,
                cep,
                endereco,
                numero,
                cidade,
                estado} = criarFornecedorBody.parse(request.body)

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

                    contatos: {
                        create:[{
                            nome: 'teste2',
                            email: 'teste3@teste.com.br',
                            departamento: 'GUARITA'
                        },
                        {
                            nome: 'teste3',
                            email: 'teste3@teste.com.br',
                            departamento: 'ADM'
                        }]
                    }
                }
            })
            return reply.status(201).send({retorno: 'OK'})
        } else {
            return reply.status(400).send({retorno: 'Email já cadastrado!'})
        }     
    })
}