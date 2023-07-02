<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import { userAuth } from './stores/userAuthStore';
  const user = userAuth();
  function logout(){
    user.clear();
  }

  window.addEventListener('scroll', function() {
    var nav = document.getElementById('meu-nav');
    var navHeight = nav.offsetHeight;
    var scrollTop = document.documentElement.scrollTop;

    if (scrollTop > navHeight) {
      nav.classList.add('nav-scroll');
    } else {
      nav.classList.remove('nav-scroll');
    }
  });

</script>

<template>
  <nav id="meu-nav" class="navbar navbar-expand-lg bg-body-tertiary flex-fill justify-content-evenly fixed-top mb-3">
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
    <div v-if="user.user" class="navlink">
      <RouterLink to="/myImovels">Meus Imóveis</RouterLink>
    </div>

    <div v-if="user.user" class="linkbotao">
      <RouterLink to="/perfil">
        <button type="button" class="btn btn-red">
          <img src="@/assets/user.png" width="30" height="30" alt="img de usuario logado">
        </button>
        <div>
          <p>Bem vindo, {{ user.user.username }} <button type="button" @click="logout()" id="logout"><i class="bi-box-arrow-right" ></i></button></p>
          
        </div>
      </RouterLink>
    </div>
    <div v-else class="linkbotao">
      <RouterLink to="/login">
        <button type="button" class="btn btn-danger"><i class="bi bi-person-fill"></i>
          Entrar</button>
      </RouterLink>
    </div>
  </nav>
  <div class="routes">
    <RouterView />
  </div>
  


  
</template>

<style scoped>
  #meu-nav {
    background-color: transparent; /* Cor de fundo inicialmente transparente */
    transition: background-color 0.3s ease; /* Transição suave para a mudança de cor */
  }
  .routes{
    margin-top: 80px;
  }

  #meu-nav.nav-scroll {
    background-color: #f5f5f5; /* Cor de fundo quando a página é rolada para baixo */
  }
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
