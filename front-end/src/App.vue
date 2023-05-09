<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { userAuth } from './stores/userAuthStore';
const user = userAuth();
function logout(){
  user.clear();
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary flex-fill justify-content-evenly">
      <div>
        <RouterLink to="/" ><img src="./assets/logoAluga.png" width="100"
            height="70"></RouterLink>
        
      </div>  

      <div class="navlink">
        <a href="comprar.html"> Comprar</a>
      </div>
      <div class="navlink">
        <RouterLink to="/alugar">Alugar</RouterLink>
      </div>
      <div class="navlink">
        <RouterLink to="/reserva">Fazer Reserva</RouterLink>
      </div>

      <div  v-if="user.user" class="linkbotao">
        <RouterLink to="/login">
          <button type="button" class="btn btn-red">
            <img src="@/assets/user.png" width="30" height="30" alt="img de usuario logado">
          </button>
          <div>
            <p>Bem vindo, {{ user.user.username }} <button type="button" @click="logout()" id="logout"><i class="bi-box-arrow-right" ></i></button></p>
            
          </div>
        </RouterLink>
      </div>
      <div v-else class="linkbotao">
        <RouterLink to="/anunciar"><button type="button" class="btn btn-dark">Anunciar</button></RouterLink>
        
        <RouterLink to="/login">
          <button type="button" class="btn btn-danger"><i class="bi bi-person-fill"></i>
            Entrar</button>
        </RouterLink>
      </div>
    </nav>

  <RouterView />
</template>

<style scoped>
  .navlink a {
    text-decoration: none;
    color: rgb(15, 20, 25);
  }
  a {
    text-decoration: none;
  }
  .navlink a:hover {
    text-decoration: underline;
    
    border-radius: 5px;
  }
  p{
    color: black;
  }
  #logout{
    background-color: red;
    justify-content: center;
  }
#logout{
  padding: 2%;
}
  
</style>
