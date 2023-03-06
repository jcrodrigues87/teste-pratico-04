<template>

  <div class="menu-prestador" v-for="prestador of prestadores" :key="prestador.cnpj"> 
            
    <q-btn color="light-blue-5" label="" style="width: 700px">

      {{prestador.razaoSocial}}

      <q-menu persistent >
        <q-list style="width: 700px">
          
          <div id="dados-result">
            <q-item clickable style="min-width: 100px">
              <q-item-section>CNPJ: {{prestador.cnpj.slice(0,2) + "." + prestador.cnpj.slice(2,5) + "." + prestador.cnpj.slice(5,8) + "/" + prestador.cnpj.slice(8,12) + "-" + prestador.cnpj.slice(12,14)}}</q-item-section>            
            </q-item>   

            <q-item clickable style="min-width: 100px">
              <q-item-section>RAZÃO SOCIAL: {{prestador.razaoSocial}}</q-item-section>            
            </q-item>
          </div>

          <div id="dados-result">
            <q-item clickable style="min-width: 100px">
              <q-item-section>DATA DE ABERTURA: {{prestador.dataAbertura[2] + " / " + prestador.dataAbertura[1] + " / " + prestador.dataAbertura[0]}}</q-item-section>            
            </q-item>

            <q-item clickable style="min-width: 100px">
              <q-item-section>TELEFONE: {{"(" + prestador.telefone.slice(0,2) + ") " + prestador.telefone.slice(2,7) + "-" + prestador.telefone.slice(7,11)}}</q-item-section>            
            </q-item>

            <q-item clickable style="min-width: 100px">
              <q-item-section>E-MAIL: {{prestador.email}}</q-item-section>            
            </q-item>
          </div>  

          <q-separator color="blue-3" inset size="5px" width="auto" style="margin-top: 2px;"/>
          
          <div id="dados-result">
            <q-item clickable style="min-width: 100px">
              <q-item-section>LOGRADOURO: {{prestador.endereco.logradouro}}</q-item-section>            
            </q-item>

            <q-item clickable style="min-width: 100px">
              <q-item-section>NUMERO: {{prestador.endereco.numero}}</q-item-section>            
            </q-item>

            <q-item clickable style="min-width: 100px">
              <q-item-section>BAIRRO: {{prestador.endereco.bairro}}</q-item-section>            
            </q-item>
          </div>

          <div id="dados-result">
            <q-item clickable style="min-width: 100px">
              <q-item-section>CIDADE: {{prestador.endereco.cidade}}</q-item-section>            
            </q-item>

            <q-item clickable style="min-width: 100px">
              <q-item-section>UF: {{prestador.endereco.uf}}</q-item-section>            
            </q-item>

            <q-item clickable style="min-width: 100px">
              <q-item-section>PAÍS: {{prestador.endereco.pais}}</q-item-section>            
            </q-item>

            <q-item clickable style="min-width: 100px">
              <q-item-section>CEP: {{prestador.endereco.cep}}</q-item-section>            
            </q-item>
          </div>

          <q-separator color="blue-3" inset size="5px" width="auto" style="margin-top: 2px;"/>

          {{ this.contatoPorCnpj(prestador.cnpj) }}
          
          <div id="dados-result" v-for="contato of contatos" :key="contato.email">
            <q-item clickable style="min-width: 100px">
              <q-item-section>NOME: {{ contato.nome }}</q-item-section>            
            </q-item>

            <q-item clickable style="min-width: 100px">
              <q-item-section>EMAIL: {{ contato.email }}</q-item-section>            
            </q-item>

            <q-item clickable style="min-width: 100px">
              <q-item-section>DEPARTAMENTO: {{ contato.departamento }}</q-item-section>            
            </q-item>

          </div>
        
        </q-list>
      </q-menu>
    </q-btn>
  </div>

</template>
<script>

import Prestador from '@/service/prestador'
import Endereco from '@/service/endereco'
import Contato from '@/service/contato'

export default {
  name: 'ConsultaPrestador',
  components: {
    
  },

  data(){

    return{
      prestadores: [
       
      ],

      contatos: [

      ]

    }
  },

  mounted(){
    Prestador.listar().then(resposta => {

      console.log(resposta.data)
      this.prestadores = resposta.data              
     
    }),

    
    Endereco.listar().then(resposta=> {

      console.log(resposta.data)
    })

    

  },
  
  methods: {
    
    contatoPorCnpj(cnpj){
      Contato.listarPorCnpj(cnpj).then(resposta=> {
        console.log(resposta.data)
        this.contatos = resposta.data
      })
    }

  }
}
</script>
<style scoped>

#dados-result{
  display: flex;
  flex-direction: row;
}

</style>