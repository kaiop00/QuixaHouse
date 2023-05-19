
<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { onBeforeMount, onMounted, reactive, ref } from 'vue';
  import ImovelCard from '@/components/imovelCard.vue'
  import { api } from '@/service/http'
  import type { Apartment } from '@/Entity/Apartments';
  import { coverURL } from '@/service/uploadUtil';
  // interface Cover {
  //   data: {
  //     attributes:{
  //       url: string,
  //       formats: object
  //     }
  //   }
  // }
  // interface Apartment {
  //   id: number,
  //   photos: Cover,
  //   description: string,
  //   value: number,
  //   rented: boolean,
  //   address: string,
  //   Type: string,
  // }
  let apartments = ref<Apartment[]>([]);
    
  // onMounted( async () => {
  //   await api.get("/apartments", {
  //     params: {
  //       populate: "photos"
  //     }
  //   }).then(response => apartments = response.data.data)
  //   console.log('apartments', apartments);
  // })
  
  onBeforeMount(async () => {
    const { data } = await api.get("/apartments", {
      params: {
        populate: "photos"
      }
    })
    console.log('apartaments', data);
    apartments.value = data.data;   
  })
  
</script>


<template>
  <div class="album py-5 bg-body-tertiary">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="apartment in apartments">
          <ImovelCard
            :id="apartment.id"
            :description="apartment.attributes.description"
            :value="apartment.attributes.value"
            :photos="coverURL(apartment.attributes.photos.data.attributes.url)"
            :address="apartment.attributes.address"
          />
        </div>
      </div>
    </div>
  </div>







  <!-- <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div class="card-body">
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small class="text-body-secondary">9 mins</small>
              </div>
            </div>
          </div> -->


  <!-- <div class="flex-fill">
    <div class=" flex-column justify-content-center flex-fill">
        <div v-for="apartment in apartments">
          <ImovelCard
            :id="apartment.id"
            :description="apartment.attributes.description"
            :value="apartment.attributes.value"
            :photos="coverURL(apartment.attributes.photos.data.attributes.url)"
            :address="apartment.attributes.address"
          >
          </ImovelCard>
        </div>
    </div>
  </div> -->
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