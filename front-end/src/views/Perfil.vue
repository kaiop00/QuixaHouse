<script setup lang="ts">
import { reactive, ref } from 'vue';
import { api } from '@/service/http';
import { userAuth } from '@/stores/userAuthStore';
import { useRouter } from "vue-router";
import { coverURL } from '@/service/uploadUtil';

const auth = userAuth();
const cover = ref<File>({} as File)
let enable = ref<boolean>(true);
const form = reactive({
    id: auth.user.id,
    username: auth.user.username? auth.user.username : "",
    password: "",
    email: auth.user.email? auth.user.email : "",
    role: 'Authenticated',
    password2: "",
    cover: auth.user.cover
});
function handleEdit(){

  enable.value = !enable.value;
}
async function updateUser() {
  
  const parsedData = {
      username: form.username,
      email: form.email,
      password: form.password,
      cover: cover.value
  }
  const body = new FormData();
  body.append('files.cover', cover.value);
  body.append('data', JSON.stringify(parsedData));  
  try {
        
        if (form.password != form.password2) {
            alert("Senhas diferentes!");
            return
        }
        const { data } = await api.put(`/users/${form.id}`, parsedData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth.token}`
        }}
        );
        console.log('data', data)
        auth.updateUser(form.email, form.password)
        console.log('coverMe', coverMe());
        enable.value = true

    } catch (error) {
        console.log(error);
    }
}
async function deleteuser() {
  try {
    await api.delete(`/users/${form.id}`,{
          headers: {
            Authorization: `Bearer ${auth.token}`
        }}
    );
    router.push("/inscrever")

    } catch (error) {
        console.log(error);
    }
}
async function coverMe(){
    try {
      const { data } = await api.get("/users/me", {
        params: {
          populate: "cover"
        },
        headers:{
          Authorization: `Bearer ${auth.token}`,
        }
      })
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

const router = useRouter();

</script>


<template>
  <div class=" flex-fill">
    <section class="container w-75">
        
        <div class="form-floating mb-3 m-3">
          
          <div class="flex-fill">
            <h2>Meu Perfil</h2>
            <br>
          </div>
          <div class="forms">
          <div class="form-floating mb-3 w-50">
            <input type="username" :readonly="enable" class="form-control" id="floatingInput" v-model="form.username" placeholder="Digite seu nome" required  >
            <label for="floatingInput">Username: </label>
          </div>
          <div class="form-floating mb-3 w-50">
            <input type="email" :readonly="enable" class="form-control" id="floatingInput" placeholder="Digite seu email" v-model="form.email" required >
            <label for="floatingInput">Email: </label>
          </div>
          <div class="form-floating mb-3 w-50">  
            <input type="password" id="floatingInput" :readonly="enable" v-model="form.password" class="form-control">
            <label for="floatingInput" class="form-label">Nova Senha: </label>
            
          </div>
          <div class="form-floating mb-3 w-50">  
            <input id="floatingInput" type="password" :readonly="enable" v-model="form.password2" class="form-control" >
            <label for="floatingInput" class="form-label">Repita a nova senha: </label>
            
          </div>
          <div class="d-flex">
            <button @click="handleEdit()" >Editar meu Perfil</button>
            <button @click="updateUser()" v-if="!enable">Salvar</button>
            <button @click="deleteuser()">Excluir meu Perfil</button>
          </div>
        </div>
        
          
        </div>
    </section>
  </div>  
</template>


<style scoped>
.forms{
  padding-left: 35%;
  padding-top: 1%;
}
</style>

