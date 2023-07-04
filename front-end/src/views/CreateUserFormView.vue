<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { reactive, ref } from 'vue';
import { api } from '@/service/http';
import { userAuth } from '@/stores/userAuthStore';
import { useRouter } from "vue-router";

const validated = ref(false)
const form = reactive({
    username: "",
    password: "",
    email: "",
    role: 'Authenticated',
    password2: "",
});
const validationMessage = ref("")
const auth = userAuth();

const router = useRouter();
// function verificar(){
//   if(form.password != form.password2){
//     validationMessage.value = "Senhas diferentes"
//     return true;
//   }else{
//     validationMessage.value = ""
//     return false;
//   }
// }

async function createUser() {
    try {
        const parsedData = {
            username: form.username,
            password: form.password,
            email: form.email,
            role: form.role,
            confirmed: true,
            blocked: false,
        }
        console.log('data', parsedData);
        if (form.password != form.password2) {
            alert("Senhas diferentes!");
            return
        }
        const { data } = await api.post("/auth/local/register", parsedData);
        auth.setToken(data.jwt);
        auth.setuser(data.user);
        router.push({path: '/'});

    } catch (error) {
        console.log(error);
    }
}
</script>


<template>
  <div class=" flex-fill">
    <div class="container w-75">
      <h3>Criar Conta</h3>
      <div class="alert alert-danger" v-if="validationMessage" role="alert">
          {{validationMessage}}
      </div>
      <form class="form-floating mb-3 m-3 was-validated needs-validation" @submit.prevent="createUser()" :class="{ 'was-validated': validated}" novalidate>
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
        <button  type="submit" class="botao btn btn-danger w-100">Se Inscrever</button>
      </form>
    </div>
  </div>  
</template>

