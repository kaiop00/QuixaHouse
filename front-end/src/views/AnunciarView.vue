
<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { reactive, ref } from 'vue';
  import { useNotificationStore } from '@/stores/notificationStores';
  import { api } from '@/service/http';
  import { userAuth } from '@/stores/userAuthStore';
  import router from '@/router';
  interface Imovel{
    photo: string,
    description: string,
    value: number,
    street: string,
    type: string,
    district: string,
    number: number,
    cellphone: number,
    operation: string,
    users_permissions_user: string,
  }
  const user = userAuth()
  const props = defineProps<{ id?: number}>()
  const imovel = ref<Imovel>({} as Imovel)
  const form = reactive({
    photos: File,
    description: "",
    value: 0,
    street: "",
    type: "",
    district: "",
    number: 0,
    cellphone: 0,
    operation: "",
    users_permissions_user: user.user.id,
  })
  const cover = ref<File>()
  async function create(){
    const formData = new FormData()

    formData.append('files', cover.value);

    api.post("/upload", formData)
    .then((response)=>{

      const imageId = response.data[0]

      api.post("/apartments",{
        ...form,
        photos:imageId})
        .then((response)=>{
        //handle success
      }).catch((error)=>{
          //handle error
        })
    }).catch((error)=>{
        //handle error
    })
  }
  // async function create() {
  //     try {
  //       const photos = cover.value
  //       const body = new FormData();
        
        
  //       console.log('cover', cover);
  //       if(cover.value?.name) {  
  //         console.log('cover', cover.value.name);
          
  //       }
  //       body.append('files.photos', cover.value);
  //       body.append('data', JSON.stringify(form))
  //       console.log('body', body);  
  //       await api.post("/apartments/", body,{
  //         headers: {
  //           Authorization: `Bearer ${user.token}`
  //         }
  //       })
  //       useNotificationStore().add("Anúncio criado com sucesso")
  //       router.push("/alugar")

  //     } catch (error) {
  //       useNotificationStore().error(`${error}`)
  //     }
  // } 

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
  function handleFileUpload(event: Event) {
    const inputEvent = event as InputEvent
    const target = inputEvent.target as HTMLInputElement
    cover.value = target.files?.item(0) as File
    console.log('cover', cover);
  }


</script>


<template>
  <div class="flex-fill">
    <div class="container w-50">
      <form class="form-floating mb-3 m-3 was-validated needs-validation" @submit.prevent="create()" >
        <div class="mb-3">
          <label for="coverInput" class="form-label">Adicione Fotos de Seu Imóvel:</label>
          <input type="file" id="coverInput" accept="image/*" @change="handleFileUpload" class="form-control">
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
            <select class="form-select" v-model="form.operation" aria-label="Default select example">
            <option selected>Qual tipo de operação?</option>
            <option value="alugar">Alugar</option>
            <option value="reservar">Reservar</option>
            <option value="vender">Vender</option>
          </select>
          <span class="input-group-text" id="inputGroup-sizing-sm">Valor:</span>
          <input type="number" v-model="form.value" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        </div>

        <!-- <div class="mb-3">
          <label for="formFileMultiple" class="form-label">Adicione Fotos de Seu Imóvel:</label>
          <input class="form-control" type="file" id="formFileMultiple" multiple>
        </div> -->
        <button v-if="props.id" type="submit" class="botao btn btn-danger w-100">Atualizar</button>
        <button v-else type="submit" class="botao btn btn-danger w-100">Anuncie </button>
      </form>
    </div>
  </div>
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



