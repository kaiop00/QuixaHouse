
  <script setup lang="ts"> 

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import api from "../App.vue";
import { RouterLink} from 'vue-router'

const register_form = ref({
  email:"",
  password:""
});
const router = useRouter();
async function login(){
  console.log(register_form.value.email);
  
   try {
      const response = await api.post("/auth/local/", {
        identifier: register_form.value.email,
        password: register_form.value.password,
      });
      if(response.data) {
        router.push({path: "/home"});
        return true;
      }
      return false;
} catch (error) {
      alert("Usuário ou senha incorretos");
    }
}
</script>


<template >
  <div class="flex-fill">
    <nav class=" justify-content-center ">
      <div>
        <RouterLink to="/" ><img src="../assets/logoAluga.png" alt="Logo da empresa de aluga" width="100" height="70"></RouterLink>
      </div>  
    </nav>

    <div class=" container ">
      
      <div class=" d-flex justify-content-center ">
        <h3>Entre agora mesmo!</h3>
      </div>
      <form class="form-floating formulario mb-3 m-3 was-validated " novalidate>
        <div class="form-floating mb-3">
          <input type="email" class="form-control  inputEmail" id="floatingInput" v-model="register_form.email" placeholder="name@example.com" required>
          <label for="floatingInput">Email</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control inputPassword" id="floatingPassword"  v-model="register_form.password" placeholder="Password" required
            minlength="6
            value=">
          <label for="floatingPassword">Password</label>
        </div>
        
        <br>
        <div>
          <button type="submit" @click="login" value="Enviar" id="btEnviar" class="btn btn-danger w-100">Entrar</button>
        </div>
        <div>
          <p4>Não tem uma conta?</p4>
          <RouterLink to="/inscricao">Inscreva-se</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

