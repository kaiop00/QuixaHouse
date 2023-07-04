
<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { onBeforeMount, onMounted, reactive, ref } from 'vue';
  import { useNotificationStore } from '@/stores/notificationStores';
  import { api } from '@/service/http';
  import { userAuth } from '@/stores/userAuthStore';
  import { coverURL } from '@/service/uploadUtil';
  import { useRoute } from 'vue-router';
import type { Cover } from '@/Entity/Imovel';

  interface Imovel{
    photos?: Cover,
    description: string,
    value: number,
    street: string,
    Type: string,
    district: string,
    number: number,
    cellphone: number,
    operation: string,
  }
  const user = userAuth()
  const route = useRoute();
  const alertVisible = ref(false)
  const alertMessage = ref('')
  const alertFeedback = ref(false)
  let form = ref<Imovel>({} as Imovel)
  const photos = ref<File>({} as File)
  onBeforeMount(async () => {
  if(route.params.id) {
    const result = await api.get(`/apartments/${route.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      params: {
        populate: "photos"
      }});
    form.value = {
      ...result.data.data.attributes,
      id: result.data.data.id,
    }
  }
})
   
  async function create() {
    const body = new FormData()
    body.append('files.photos', photos.value)
    body.append('data', JSON.stringify({
      user: user.user.id,
      ...form.value
    }))
    
    try {
        await api.post("/apartments/", body,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`
          }
        })
        showPositiveAlert('Anúncio criado com sucesso')
        useNotificationStore().add("Anúncio criado com sucesso")
        setTimeout(function() {
          window.location.reload();
        }, 600);

      } catch (error) {
        useNotificationStore().error(`${error}`)
        showNegativeAlert(`${error}`)
      }
  } 
  async function update() {
    const body = new FormData();
    const data = {
      data: {
        description: form.value.description,
        value: form.value.value,
        street: form.value.street,
        Type: form.value.Type,
        district: form.value.district,
        number: form.value.number,
        cellphone: form.value.cellphone,
        operation: form.value.operation,
      }
    };
    if(photos.value.size > 0) {
      body.append('files.photos', photos.value)
      body.append('data', JSON.stringify(form.value))
    }
    try {
          
        if(photos.value.size > 0){
          await api.put(`/apartments/${route.params.id}`, body,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${user.token}`
          }
          })
        }else{
          await api.put(`/apartments/${route.params.id}`, data,
          {
            headers: {
              Authorization: `Bearer ${user.token}`
          }
          })
        }
        showPositiveAlert('Anúncio atualizado com sucesso')
        useNotificationStore().add("Anúncio atualizado com sucesso")
        setTimeout(function() {
          window.location.reload();
        }, 600);

      } catch (error) {
        useNotificationStore().error(`${error}`)
        showNegativeAlert(`${error}`)
      }
  } 

  function showPositiveAlert(message: string) {
    showAlert(true, message)
  }
  function showNegativeAlert(message: string) {
    showAlert(false, message)
  }
  function showAlert(positive: boolean, message: string) {
    alertFeedback.value = positive
    alertMessage.value = message
    alertVisible.value = true
  }
  function handleFileUpload(event: Event) {
    const inputEvent = event as InputEvent
    const target = inputEvent.target as HTMLInputElement
    photos.value = target.files?.item(0) as File;
  }

</script>


<template>
  <div class="flex-fill anuncio">
    <div class="container w-50">
      <div class="col-12 alert alert-dismissible fade show"
        :class="{ 'd-none': !alertVisible, 'alert-success': alertFeedback, 'alert-danger': !alertFeedback }" role="alert">
        {{ alertMessage }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
        <div class="form-floating mb-3 m-3 was-validated needs-validation" >
          <div class="mb-3">
            <label for="coverInput" class="form-label">Adicione Fotos de Seu Imóvel:</label>
            <input type="file" id="coverInput" @change="handleFileUpload" class="form-control">
          </div>
          <div class="form-floating mb-3 sucesso">
            <input type="nome" class="form-control" id="floatingInput" v-model="form.street" >
            <label for="floatingInput">Rua:</label>
            <div class="invalid-feedback">
              Insira uma Rua Válido.
            </div>
          </div>
          
          <div class="form-floating mb-3 sucesso">
            <input type="nome" class="form-control" id="floatingInput" v-model="form.district" >
            <label for="floatingInput">Bairro:</label>
            <div class="invalid-feedback">
              Insira um Bairro válido
            </div>
          </div>
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Número:</span>
            <input type="number" v-model="form.number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Descrição Completa do imóvel:</label>
            <textarea class="form-control" v-model="form.description" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>

          <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">Whatsapp:</span>
            <input type="text" class="form-control" v-model="form.cellphone" aria-label="Text input with dropdown button">
          </div>
          <div class="input-group input-group-sm mb-3">
            
            <span class="input-group-text" id="inputGroup-sizing-sm">Operação:</span>
            <!-- <select class="form-select" v-model="form.operation" aria-label="Default select example">
              <option selected>Qual tipo de operação?</option>
              <option value="Alugar">Alugar</option>
              <option value="Reservar">Reservar</option>
              <option value="Vender">Vender</option>
            </select> -->
            <span class="input-group-text" id="inputGroup-sizing-sm">Valor:</span>
            <input type="number" v-model="form.value" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
          </div>
          <div class="input-group input-group-sm mb-3">
            
            <span class="input-group-text" id="inputGroup-sizing-sm">Tipo do Imóvel:</span>
            <select class="form-select" v-model="form.Type" aria-label="Default select example">
              <option selected>Qual tipo do Imóvel?</option>
              <option value="Casa">Casa</option>
              <option value="Apartamento">Apartamento</option>
            </select>
          </div>
          <button v-if="route.params.id" @click="update()" class="botao btn btn-danger w-100">Atualizar</button>
          <button v-else @click="create()" class="botao btn btn-danger w-100">Anuncie </button>
        </div>
      </div>
    </div>
</template>

<style scoped>

.anuncio {
  margin-top: 100px;
}
</style>



