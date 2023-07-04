
<script setup lang="ts">
  import { RouterLink, useRouter } from 'vue-router';
  import { onBeforeMount, ref } from 'vue';
  import imovelDetail from '@/components/imovelDetail.vue'
  import { api } from '@/service/http'
  import type { Cover, Imovel } from '@/Entity/Imovel';
  import { coverURL } from '@/service/uploadUtil';
  import { userAuth } from '@/stores/userAuthStore';
  
  interface MyImovel {
    id: number,
    photos: Cover,
    description: string,
    value: number,
    street: string,
    district: string,
    number: number,
    Type: string,
  }
  const user = userAuth()
  let myImovels = ref<MyImovel[]>([]);
  let allImovels = ref<Imovel[]>([])
  const route = useRouter();

  onBeforeMount(async () => {
    allImovelsGet();
    myImovelsGet();

  })
  async function allImovelsGet (){
    const { data } = await api.get("/apartments", {
      params: {
        populate: "*"
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
          populate: "*"
        }
      })
    allImovels.value.forEach(imovel => {
      if (data.imovels.find( (myimovel: { id: number; }) => myimovel.id === imovel.id)) {
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
</script>


<template>
  <div class="mb-5 mt-5">
    <!-- <RouterLink :to="{path: '/anuncio/create/'}"> -->
      <button type="button" class="btn btn-primary" @click="route.push('/anuncio/create/')">Criar Anúncio</button>
    <!-- </RouterLink> -->
  </div>
   <div v-if="myImovels.length >0">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-sm-12">
            <div class="card mb-3" v-for="imovel in myImovels">
                <imovelDetail
                  :id="imovel.id"
                  :photos="coverURL(imovel.photos?.data?.attributes.url)"
                  :description="imovel.description"
                  :value= "imovel.value"
                  :street="imovel.street"
                  :district="imovel.district"
                  :number="imovel.number"
                  :Type="imovel.Type"
                  :username="''"
                />
                <div>
                  <RouterLink :to="{path: `/anuncio/edit/${imovel.id}`}">
                    <button type="button" class="btn btn-primary">Editar</button>
                  </RouterLink>
                  
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