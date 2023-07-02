
<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { onBeforeMount, onMounted, reactive, ref } from 'vue';
  import { useNotificationStore } from '@/stores/notificationStores';
  import { api } from '@/service/http';
  import { userAuth } from '@/stores/userAuthStore';
  import router from '@/router';
import { coverURL } from '@/service/uploadUtil';
  interface Imovel{
    photo: {
      url: string
    },
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
  const props = defineProps<{id?: number}>()
  const alertVisible = ref(false)
  const alertMessage = ref('')
  const alertFeedback = ref(false)
  const form = ref<Imovel>({} as Imovel)
  const photos = ref<File>({} as File)
  console.log('id', props.id)
  onBeforeMount(async () => {
  if(props.id) {
    const result = await api.get(`/apartments/${props.id}`,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`
    }});
    form.value = {
      ...result.data,
      photo:{
        url: coverURL(result?.data?.attributes.url)
      }
    }
  }
})
   
  async function create() {
    const body = new FormData()
    body.append('files.photos', photos.value)
    body.append('data', JSON.stringify(form.value))
    
    try {
        // const photos = cover.value
        console.log('body', body);  
        const response = await api.post("/apartments/", body,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`
        }
        })
        console.log('response', response.data);
        showPositiveAlert('Anúncio criado com sucesso')
        useNotificationStore().add("Anúncio criado com sucesso")
        setTimeout(function() {
          window.location.reload();
        }, 600);
        // router.push("/alugar")

      } catch (error) {
        useNotificationStore().error(`${error}`)
        showNegativeAlert(`${error}`)
      }
  } 

  // onMounted(async () => {
  //   if(props.id) {
  //     const result = await mangaService.getById(props.id)
  //     if(!useErrorUtil().isAppError(result)) {
  //       manga.value = result
  //     } else {
  //       useNotificationStore().error("Alguma coisa deu errado")
  //     }
  //     loading.value = false
  //   }
  // })
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
    console.log('cover', photos.value);
  }
  console.log('form', form.value)

</script>


<template>
  <div class="flex-fill anuncio">
    <div class="container w-50">
      <div class="col-12 alert alert-dismissible fade show"
        :class="{ 'd-none': !alertVisible, 'alert-success': alertFeedback, 'alert-danger': !alertFeedback }" role="alert">
        {{ alertMessage }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <!-- <div v-if="form"> -->
        <form class="form-floating mb-3 m-3 was-validated needs-validation" @submit.prevent="create()" >
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
            <label for="exampleFormControlTextarea1" class="form-label">Descrição Completa do Apartamento:</label>
            <textarea class="form-control" v-model="form.description" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>

          <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">Whatsapp:</span>
            <input type="text" class="form-control" v-model="form.cellphone" aria-label="Text input with dropdown button">
          </div>
          <div class="input-group input-group-sm mb-3">
            
            <span class="input-group-text" id="inputGroup-sizing-sm">Operação:</span>
            <select class="form-select" v-model="form.operation" aria-label="Default select example">
              <option selected>Qual tipo de operação?</option>
              <option value="Alugar">Alugar</option>
              <option value="Reservar">Reservar</option>
              <option value="Vender">Vender</option>
            </select>
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
          <!-- <div class="mb-3">
            <label for="formFileMultiple" class="form-label">Adicione Fotos de Seu Imóvel:</label>
            <input class="form-control" type="file" id="formFileMultiple" multiple>
          </div> -->
          <button v-if="props.id" type="submit" class="botao btn btn-danger w-100">Atualizar</button>
          <button v-else type="submit" class="botao btn btn-danger w-100">Anuncie </button>
        </form>
      </div>
      <!-- <div class="text-center" v-else>
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div> -->
    </div>
  <!-- </div> -->
</template>

<style scoped>

.anuncio {
  margin-top: 100px;
}
</style>



