import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//Função para alimentar o banco para teste
async function main() {
    const fornecedor = await prisma.fornecedor.create({
        data: {
            razao: 'Guilherme',        
            cnpj: '34952024000165',         
            dataAbertura: '2020-01-01T00:00:00.201Z', 
            telefone: '37999999999',     
            email: 'guilherme@gmail.com',        
            cep: '37925000',          
            endereco: 'Jose Almada',     
            numero: 20,       
            cidade: 'Piumhi',       
            estado: 'MG',
            nomeContato: 'Guilherme Cintra',
            departamentoContato: 'TI',
            emailContato: 'ti@gmail.com'
        }
    })
}

main()