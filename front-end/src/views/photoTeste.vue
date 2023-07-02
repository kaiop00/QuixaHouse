
<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { reactive, ref } from 'vue';
  import { useNotificationStore } from '@/stores/notificationStores';
  import { api } from '@/service/http';
  import { userAuth } from '@/stores/userAuthStore';
  import router from '@/router';
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
    users_permissions_user: string,
  }
  const user = userAuth()
  const props = defineProps<{ id?: number}>()
  const alertVisible = ref(false)
  const alertMessage = ref('')
  const alertFeedback = ref(false)
  const form = ref<Imovel>({} as Imovel)
  // const form = reactive({
  //   photos: {} as File,
  //   description: "asdasdas",
  //   value: 200,
  //   street: "asdasd",
  //   Type: "Casa",
  //   district: "asdasdas",
  //   number: 300,
  //   cellphone: 88981336680,
  //   operation: "Alugar",
  //   users_permissions_user: user.user.id,
  // })
  const photos = ref<File>({} as File)
  // async function create(){
    // const formData = new FormData()

    // formData.append('file', cover.value);
    // console.log('formData', formData);
    // await api.post("/upload/", {
    //   body: cover.value
      
    // })
    // .then((response)=>{
    //   console.log(response);
    //   const imageId = response.data[0]

    //   api.post("/apartments",{
    //     ...form,
    //     photos:imageId})
    //     .then((response)=>{
    //       showPositiveAlert('Manga Criado com sucesso')
    //   }).catch((error)=>{
    //     showNegativeAlert(`${error}`)
    //     })
    // }).catch((error)=>{
    //   showNegativeAlert(`${error}`)
    // })
  //   const formData = new FormData();
  //   formData.append('file', cover.value);
  //   await api.post('/upload', formData)
  //     .then(response => {
  //       console.log('Arquivo enviado com sucesso:', response.data);
  //       // Realizar ações adicionais após o upload do arquivo...
  //     })
  //     .catch(error => {
  //       console.error('Erro ao enviar o arquivo:', error);
  //     });
  // }
  
  async function create() {
    const body = new FormData()
    body.append('file.photo', photos.value)
    
    try {
        // const photos = cover.value
        console.log('body', body);  
        const response = await api.post('http://localhost:1337/upload/',body,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        console.log('response', response.data);
        showPositiveAlert('Manga Criado com sucesso')
        useNotificationStore().add("Anúncio criado com sucesso")
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


</script>


<template>
  <div class="flex-fill">
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

.img-card {
height: 250px;
width:250px;
}
.btnmsg{
border-radius: 25px;
}

.card{
max-width:300px;
}
.botaoanuncio{
    padding-left: 70px;
}
</style>



