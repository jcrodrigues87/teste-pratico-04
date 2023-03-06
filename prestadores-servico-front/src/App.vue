<template>  

  <nav>    
    <router-link to="/">
      <q-btn label="Página Inicial" color="blue" icon="home" flat="false"/>
    </router-link>

    <router-link to="/consulta">
      <q-btn label="Consulta" color="blue" icon="search" />
    </router-link>

    <router-link to="/cadastro">
      <q-btn label="Cadastro" color="blue" icon="person_add" />
    </router-link>
  </nav>
  <router-view/>
  
</template>

<script>

export default {

  data(){

    return{

     

    }

  },

  mounted(){
    
  }
  
}
</script>

<style lang="scss">
#app {  
  text-align: center;
  
}

nav {
  padding: 30px;
 
}
</style>
