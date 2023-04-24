<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../baseConfig'
import { coverURL} from '../mixing/uploadUtil'

interface Cover {
  alternativeText: string,
  url: string
}
interface Apartment {
  id: number,
  photos: Cover,
  description: string,
  value: number,
  rented: boolean,
  address: string,
}
const route = useRoute()
const id = route.params.id
let apartment = ref<Apartment>()
onMounted( async () => {
  const response = await api.get(`/apartments/${id}`, {
    params: {
      populate: "photos",
    }
  })
  apartment = response.data.data
  console.log('apartment', apartment)
})
</script>

<template>
  <div class="row align-items-center d-flex flex-fill" v-if="apartment !== null">
    <div class="col">
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img  :src="coverURL(apartment?.attributes.photos.data.attributes.url)" class="w-75 rounded-start" >
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{apartment?.attributes.description}}</h5>
                        <hr>
                        <div class="card-subtitle">{{ apartment?.attributes.address }}</div>
                        <div class="text-start">
                            <p class="card-text"><strong>Preço: <small class="text-danger">{{apartment?.attributes.value}}</small></strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
  <div v-else>
    <h1>Carregando</h1>
  </div>
</template>