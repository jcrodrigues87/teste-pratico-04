<template>


  <div id="cadastro">
    <q-card bordered style="width: 950px;">
      <q-btn color="light-blue-5" label="Prestador" style="width: 950px; margin-bottom: 15px;"/>
      <div class id="cadastro1">
        <q-input v-model="cnpjFormatado" label="CNPJ" style="width: 300px;" color="info" mask="##.###.###/####-##"/>
        <q-input v-model="prestador_obj.razaoSocial" label="Razão Social" style="width: 600px; margin-left: 20px;" color="info"/>    
      </div>

      <div class id="cadastro1">
        <q-input v-model="dataFormatada" label="Data de Abertura" style="width: 300px;" color="info"  mask="##/##/####"/> {{ formatarObj() }}      
        <q-input v-model="telefoneFormatado" label="Telefone" style="width: 250px; margin-left: 20px;" color="info" mask="(##)#####-####"/>
        <q-input v-model="prestador_obj.email" label="Email" style="width: 350px; margin-left: 20px;" color="info"/>
      </div>

    </q-card>

    <q-card bordered style="width: 950px; margin-top: 5px;">
      <q-btn color="light-blue-5" label="Endereço" style="width: 950px; margin-bottom: 15px;"/>
      <div id="cadastro1">
        <q-input v-model="prestador_obj.endereco.cep" label="CEP" style="width: 200px; " color="info" mask="########"/> {{ buscarEndereco(prestador_obj.endereco.cep) }} 
        <q-input v-model="prestador_obj.endereco.logradouro" label="Logradouro" style="width: 200px; " color="info"/>
        <q-input v-model="prestador_obj.endereco.numero" label="Número" style="width: 200px; " color="info"/> 
        <q-input v-model="prestador_obj.endereco.complemento" label="Complemento" style="width: 200px; " color="info"/>    
      </div>

      <div id="cadastro1" style="margin-bottom: 1px;">
        <q-input v-model="prestador_obj.endereco.bairro" label="Bairro" style="width: 200px; " color="info"/>
        <q-input v-model="prestador_obj.endereco.cidade" label="Cidade" style="width: 200px; " color="info"/>
        <q-input v-model="prestador_obj.endereco.uf" label="UF" style="width: 200px; " color="info"/>
        <q-input v-model="prestador_obj.endereco.pais" label="País" style="width: 200px; " color="info"/>  
      </div>    

    </q-card>

    <div id="addContato" style="margin-top: 5px;">      
      <q-card bordered style="width: 950px;">
        <q-btn color="light-blue-5" label="Contatos" style="width: 950px; margin-bottom: 10px;"/>
          <q-input v-model="contato_obj.nome" label="Nome" style="width: 900px; margin-left: 25px;" color="info"/>
          <q-input v-model="contato_obj.email" label="Email" style="width: 900px; margin-left: 25px;" color="info"/>
          <q-input v-model="contato_obj.departamento" label="Departamento" style="width: 900px; margin-left: 25px;" color="info" />
          
          <q-btn @click="incluirContato" color="light-blue-5" label="Incluir Contato"  icon-right="add" style=" margin-right: auto; margin-top: 1px; width: 950px;"/>          
      </q-card>
      <q-btn @click="cadastrar" color="light-blue-5" label="SALVAR CADASTRO" style=" margin-left: auto; margin-top: 40px; width: 950px;"/> 

    </div>

  </div>
 
</template>
<script>

import Prestador from '@/service/prestador'
import Endereco from '@/service/endereco'

export default {
  
  name: 'CadastroPrestador',

  data(){

    const currentDate = new Date();
    
    return{

      contato_obj:{
        nome: '',
        email: '',
        departamento: ''
      },

      contato_objt_new:{},      
      
      dataCorrente: currentDate,
      incluir: false,
      dataFormatada: '',
      cnpjFormatado: '',
      telefoneFormatado: '',
      
      prestador_obj: {

        cnpj: '',
        razaoSocial: '',
        dataAbertura: '',
        telefone: '',
        email: '',
        endereco: Endereco,
        contato: []
         
      },
      
    }
  },
  
  mounted(){   
    
  },  

  methods: {

    formatarObj(){

      var formataData = this.dataFormatada.split('/')    
      this.prestador_obj.dataAbertura = formataData[2] + "-" + formataData[1] + "-" + formataData[0]

      this.prestador_obj.cnpj = this.cnpjFormatado.slice(0,2) +  this.cnpjFormatado.slice(3,6) +  this.cnpjFormatado.slice(7,10)
      + this.cnpjFormatado.slice(11,15) + this.cnpjFormatado.slice(16,18)

      this.prestador_obj.telefone = this.telefoneFormatado.slice(1,3) + this.telefoneFormatado.slice(4,9) + this.telefoneFormatado.slice(10,14)      
    },

    cadastrar(){

    if( this.dataFormatada <= this.dataCorrente || this.dataFormatada > '00/00/0000'){      
      var dataOk = true          
    } else{
      alert("Data Inválida!")
    }

    if(this.prestador_obj.contato.length == 0){
      alert("Você deve incluir pelo menos 1 contato!")
    }

    if(this.prestador_obj.endereco.cep == undefined || null || ''){

      var enderecoOk = true
    }else{

      alert('Complete o cadastro ENDEREÇO')
    }

      if(dataOk && enderecoOk == true){
        
        Prestador.cadastrar(this.prestador_obj)    

        this.cnpjFormatado = ''
        this.prestador_obj.razaoSocial = ''
        this.dataFormatada = ''
        this.telefoneFormatado = ''
        this.prestador_obj.email = ''

        this.prestador_obj.endereco.cep = '',
        this.prestador_obj.endereco.complemento = '',
        this.prestador_obj.endereco.bairro = '',
        this.prestador_obj.endereco.cidade = '',
        this.prestador_obj.endereco.uf = '',
        this.prestador_obj.endereco.pais = '',
        this.prestador_obj.endereco.numero = '',
        this.prestador_obj.endereco.logradouro = ''
      }
    },

    buscarEndereco(cepapi){      

    if(cepapi!==undefined){
      if(cepapi.length == 8){
      Endereco.buscarEndereco(cepapi).then(resposta =>{
      console.log(resposta.data)
      if(resposta.data.logradouro != ''){
      this.prestador_obj.endereco.logradouro = resposta.data.logradouro
      }
      if(resposta.data.localidade != ''){
      this.prestador_obj.endereco.cidade = resposta.data.localidade
      }
      if(resposta.data.bairro != ''){
      this.prestador_obj.endereco.bairro = resposta.data.bairro
      }
      if(resposta.data.uf != ''){
      this.prestador_obj.endereco.uf = resposta.data.uf
      }
      if(resposta.data.complemento != ''){
      this.prestador_obj.endereco.complemento = resposta.data.complemento
      }
      })
      }  
    }
    
    },

    incluirContato(){

      if((this.contato_obj.departamento && this.contato_obj.email && this.contato_obj.departamento) != '' ){

        this.contato_objt_new = Object.assign({}, this.contato_obj) 
        this.prestador_obj.contato.push(this.contato_objt_new)
        alert("Contado incluido com sucesso!")
        this.contato_obj.departamento = ''
        this.contato_obj.email = ''
        this.contato_obj.nome = ''
      }else{
        alert('Você deve preenche todos os campos de "CONTATOS"')
      }               
          
    }

  }
}

</script>
<style scoped>

#cadastro{

display: flex;
flex-direction: column;
width: 1000px;
align-items: center;
margin: auto;
}
#cadastro1{
display: flex;
flex-direction: row;
width: 900px;
justify-content: space-between;
margin-left: 25px;
}
#cadastro4{
display: flex;
flex-direction: row;
width: 900px;
justify-content: space-between;
}

</style>