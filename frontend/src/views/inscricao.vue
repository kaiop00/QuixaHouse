<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios'
import router from '@/router';

const validated = ref(false)
const form = ref({
  username:"",
  email: "",
  password: "",
  password2: "",
})
const validationMessage = ref("")


function verificar(event: MouseEvent ){
  event.preventDefault()
  event.stopPropagation()
  if(form.value.password != form.value.password2){
    validationMessage.value = "Senhas diferentes"
    return true;
  }else{
    validationMessage.value = ""
    return false;
  }
}
</script>


<template>
  <div class=" flex-fill">
    <nav class="navlink d-flex justify-content-between">
      <div class="flex-fill">
        <RouterLink to="/" ><img src="../assets/logoAluga.png" width="100" height="70"></RouterLink>
      </div> 
      <div class="linkbotao flex-fill">
        <RouterLink to="/login">
          <button type="button" class="btn btn-danger">Voltar</button>
        </RouterLink>
      </div>
    </nav>

    <div class="container w-75">
      <h3>Criar Conta</h3>
      <div class="alert alert-danger" v-if="validationMessage" role="alert">
          {{validationMessage}}
      </div>
      <form class="form-floating mb-3 m-3 was-validated needs-validation" :class="{ 'was-validated': validated}" novalidate>
        <div class="form-floating mb-3 sucesso">
          <input type="name" class="form-control" id="floatingInput" placeholder="a" v-model="form.username" required>
          <label for="floatingInput">Nome:</label>
          <div class="invalid-feedback">
            Insira um Nome valido.
          </div>
        </div>
        <div class="form-floating mb-3 sucesso">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="form.email" required>
          <label for="floatingInput">Email:</label>
          <div class="invalid-feedback">
            Insira um Email valido.
          </div>
        </div>
        <div class="form-floating mb-3 sucesso">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="form.password" required minlength="6">
          <label for="floatingPassword" class="form-label">Senha:</label>
          <div class="invalid-feedback">
            A senha deve conter no mínimo 6 caracteres
          </div>
        </div>
        <div class="form-floating mb-3 sucesso">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="form.password2" required>
          <label for="floatingPassword">Confirmar Senha:</label>
          <div class="invalid-feedback">
            Confirmar Senha
          </div>
        </div>
        <button @click="verificar" type="submit" class="botao btn btn-danger w-100">Se Inscrever</button>
      </form>
    </div>
  </div>  
</template>

