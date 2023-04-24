
<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import ImovelCard from '../components/imovelCard.vue'
  import { api } from '../baseConfig'
  interface Cover {
    url: string,
    formats: object
  }
  interface Apartment {
    id: number,
    photos: Cover,
    description: string,
    value: number,
    rented: boolean,
    address: string,
  }
  let apartments = ref<Apartment[]>();
    onMounted( async () => {
    const data  = await api.get("/apartments", {
      params: {
        populate: "photos"
      }
    })
    apartments = data.data.data
    console.log('data', apartments);
  })
  
</script>


<template>
  <div class="flex-fill">
    <nav class="navlink d-flex justify-content-center">
      <div >
        <RouterLink to="/" ><img src="../assets/logoAluga.png" width="100"
            height="70"></RouterLink>
        
      </div>  
  
      <div class="navlink">
        <a href="comprar.html"> Comprar</a>
      </div>
      <div class="navlink">
        <RouterLink to="/alugar">Alugar</RouterLink>
      </div>
      <div class="navlink">
        <RouterLink to="/reserva">Fazer Reserva</RouterLink>
      </div>
  
  
      <div class="linkbotao">
        <RouterLink to="/anunciar"><button type="button" class="btn btn-dark">Anunciar</button></RouterLink>
        
        <RouterLink to="/login">
          <button type="button" class="btn btn-danger"><i class="bi bi-person-fill"></i>
            Entrar</button>
        </RouterLink>
  
  
      </div>
    </nav>


    <div class=" flex-column justify-content-center flex-fill">
      <div >
          <ImovelCard  v-for="apartment in apartments" :key="apartment.id"
          :id="apartment.id"
          :cover="apartment.attributes.photos.url"
          :description="apartment.attributes.description"
          :value="apartment.attributes.value"
          :photos="apartment.attributes.photos?.data?.attributes.url"
          :address="apartment.attributes.address"
          >
        </ImovelCard>
      </div>
    </div>
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