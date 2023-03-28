import {PrismaClient} from '@prisma/client'

export const prisma = new PrismaClient({
    log: ['query'] //log de todas as query esta sendo executado
})