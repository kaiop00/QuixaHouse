<script setup lang="ts"> 
    import { onMounted, reactive } from "vue";
    import { useRouter } from "vue-router";
    import { api } from "../service/http";
    import { RouterLink} from 'vue-router'
    import { userAuth } from '../stores/userAuthStore'

    const auth = userAuth();
    const user = reactive({
        email:"",
        password:""
    });
    const router = useRouter();
    async function login(){
        try {
            const { data } = await api.post("/auth/local/", {
                identifier: user.email,
                password: user.password,
            });
            auth.setToken(data.jwt);
            auth.setuser(data.user);
            
            router.push({path: '/'});
            // if(data) {
            //     router.push({path: "/"});
            //     return true;
            // }
            // return false;
        } catch (error) {
            alert("Usuário ou senha incorretos");
        }
    }
</script>


<template >
  <div class="container">
    <div class=" d-flex justify-content-center ">
        <h3>Entre agora mesmo!</h3>
    </div>
    <main class="form-signin w-50 m-auto">
      <form class="form-floating formulario mb-3 m-3 was-validated " @submit.prevent="login()" novalidate>
        <div class="form-floating mb-3">
          <input type="email" class="form-control  inputEmail" id="floatingInput" v-model="user.email" placeholder="name@example.com" required>
          <label for="floatingInput">Email</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control inputPassword" id="floatingPassword"  v-model="user.password" placeholder="Password" required
            minlength="6
            value=">
          <label for="floatingPassword">Password</label>
        </div>
        
        <br>
        <div>
          <button type="submit" class="btn btn-danger w-100">Entrar</button>
        </div>
        <div>
          <p4>Não tem uma conta?</p4>
          <RouterLink to="/inscrever">Inscreva-se</RouterLink>
        </div>
      </form>
    </main>
  </div>
  






  <!-- <div class="flex-fill">
    <div class=" container ">
      
      <div class=" d-flex justify-content-center ">
        <h3>Entre agora mesmo!</h3>
      </div>
      <form class="form-floating formulario mb-3 m-3 was-validated " @submit.prevent="login()" novalidate>
        <div class="form-floating mb-3">
          <input type="email" class="form-control  inputEmail" id="floatingInput" v-model="user.email" placeholder="name@example.com" required>
          <label for="floatingInput">Email</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control inputPassword" id="floatingPassword"  v-model="user.password" placeholder="Password" required
            minlength="6
            value=">
          <label for="floatingPassword">Password</label>
        </div>
        
        <br>
        <div>
          <button type="submit" class="btn btn-danger w-100">Entrar</button>
        </div>
        <div>
          <p4>Não tem uma conta?</p4>
          <RouterLink to="/inscrever">Inscreva-se</RouterLink>
        </div>
      </form>
    </div>
  </div> -->
</template>
