<script setup lang="ts">
import { reactive, ref } from 'vue';
import { api } from '../service/http';
import { userAuth } from '../stores/userAuthStore';
import { useRouter } from "vue-router";
import { coverURL } from '../service/uploadUtil';

const auth = userAuth();
const cover = ref<File>({} as File)
const form = reactive({
    id: auth.user.id,
    username: auth.user.username? auth.user.username : "",
    password: "",
    email: auth.user.email? auth.user.email : "",
    role: 'Authenticated',
    password2: "",
    cover: auth.user.cover
});
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
        
        console.log('data', parsedData);
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

    } catch (error) {
        console.log(error);
    }
}
function handleFileUpload(event: Event) {
  const inputEvent = event as InputEvent
  const target = inputEvent.target as HTMLInputElement
  cover.value = target.files?.item(0) as File;
  console.log('cover', cover.value);
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
        
        <form class="form-floating mb-3 m-3" @submit.prevent="updateUser()">
          <!-- <h2>Meu Perfil</h2>
          <img src="../assets/logoAluga.png" class="rounded-circle" width="200" height="200"> -->
          
          <div class="flex-fill">
            <label for="image-input">
              <div v-if="form.cover">
                <img v-bind:src="coverURL(form.cover?.data?.attributes.url)" alt="Imagem" id="preview-image" class="round-image" width="150"/>
              </div>
              <div v-else>
                <img src="../assets/user.png" alt="Imagem" id="preview-image" class="round-image" width="150"/>
              </div>
            </label>
            <br>
            <input type="file" id="image-input" @change="handleFileUpload" accept="image/*"/>
          </div>
          <div class="form-floating mb-3">
            <input type="username" class="form-control" id="floatingInput" v-model="form.username" placeholder="Digite seu nome" required>
            <label for="floatingInput">Username: </label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" placeholder="Digite seu email" v-model="form.email" required>
            <label for="floatingInput">Email: </label>
          </div>
          <div class="form-floating mb-3">  
            <label for="exampleInputPassword2" class="form-label">Nova Senha: </label>
            <input type="password" v-model="form.password" class="form-control" id="exampleInputPassword2">
          </div>
          <div class="form-floating mb-3">  
            <label for="exampleInputPassword2" class="form-label">Repita a nova senha: </label>
            <input type="password" v-model="form.password2" class="form-control" id="exampleInputPassword2">
          </div>
          <button >Editar meu Perfil</button>
          <button type="submit">Salvar</button>
        </form>
    </section>
  </div>  
</template>
