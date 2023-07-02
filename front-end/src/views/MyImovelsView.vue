
<script setup lang="ts">
  import { RouterLink, useRouter } from 'vue-router';
  import { onBeforeMount, onMounted, reactive, ref } from 'vue';
  import ImovelDetail from '@/components/imovelDetail.vue'
  import { api } from '@/service/http'
  import type { Cover, Imovel } from '@/Entity/Imovel';
  import { coverURL } from '@/service/uploadUtil';
  import { userAuth } from '@/stores/userAuthStore';
  
  // interface Cover {
  //   data: {
  //     attributes:{
  //       url: string,
  //       formats: object
  //     }
  //   }
  // }
  interface MyImovel {
    id: number,
    photos?: Cover,
    description: string,
    value: number,
    street: string,
    district: string,
    number: number,
    Type: string,
  }
  const user = userAuth()
  const router = useRouter();
  let myImovels = ref<MyImovel[]>([]);
  let allImovels = ref<Imovel[]>([])
  let showModal = ref(false);
  // onMounted( async () => {
  //   await api.get("/apartments", {
  //     params: {
  //       populate: "photos"
  //     }
  //   }).then(response => apartments = response.data.data)
  //   console.log('apartments', apartments);
  // })
  
  onBeforeMount(async () => {
    allImovelsGet();
    myImovelsGet();

  })
  function saveModalChanges() {
      // Lógica para salvar as alterações do modal
      console.log('Alterações do modal salvas!');
      showModal.value = false;
    }
  async function allImovelsGet (){
    const { data } = await api.get("/apartments", {
      params: {
        populate: "photos"
      }
    })
    allImovels.value = data.data;   
  }
  async function myImovelsGet (){
    const { data } = await api.get("/users/me", {
        headers:{
          Authorization: `Bearer ${user.token}`,
        },
        params:{
          populate: "imovels"
        }
      })
    allImovels.value.forEach(imovel => {
      if (data.imovels.find(myimovel => myimovel.id === imovel.id)) {
        myImovels.value.push({
          id: imovel.id,
          ...imovel.attributes
        })
      }
    });
  }
  async function deleteImovel(id: number) {
    try {
        await api.delete(`/apartments/${id}`,{
            headers: {
                Authorization: `Bearer ${user.token}`
            }}
        );
        setTimeout(function() {
          window.location.reload();
        }, 400);
        } catch (error) {
            console.log(error);
        }
    }
    console.log('myImovel', myImovels);
</script>


<template>
   <div v-if="myImovels.length >0">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-sm-12">
            <div class="card mb-3" v-for="imovel in myImovels">
                <ImovelDetail
                  :id="imovel.id"
                  :photos="coverURL(imovel.photos?.data?.attributes.url)"
                  :description="imovel.description"
                  :value= "imovel.value"
                  :street="imovel.street"
                  :district="imovel.district"
                  :number="imovel.value"
                  :Type="imovel.Type"
                />
                <div>
                  <!-- <RouterLink :to="{path: "/anuncio/edit/", query: {id: imovel.id}}">
                    <button type="button" class="btn btn-primary">Editar</button>
                  </RouterLink>
                   -->
                  <button type="button" @click="deleteImovel(imovel.id)" class="btn btn-danger">
                      <i class="bi bi-trash"></i>
                  </button>
              </div>
            </div>
        </div>
      </div>
   </div>
   <div v-else>
    <h2>Você não tem nenhum Anúncio publicado!</h2>
   </div>
    <div>
      <button type="button" class="btn btn-success" >Criar Anúncio</button>
    </div>
</template>

<style scoped>
  .navlink a {
    text-decoration: none;
    color: rgb(15, 20, 25);
    margin-right: 150px;
  }
  .navlink a:hover {
    text-decoration: underline;
    
    border-radius: 5px;
  }

</style>