<script setup lang="ts">
import type { Apartment } from '@/Entity/Apartments';
import { api } from '@/service/http';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router'
import { coverURL } from '@/service/uploadUtil';

const route = useRoute()
const id = Number(route.params.id)
const imovel = ref<Apartment>({} as Apartment)  



onBeforeMount( async () => {
    const { data } = await api.get(`/apartments/${id}`, {
      params: {
        populate: "photos"
      }
    })
    console.log('apartaments', data);
    imovel.value = data.data;  
})

</script>

<template>
    
    <div class="row justify-content-center">
        <div class="col-lg-8 col-sm-12">
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img :src="coverURL(imovel.attributes.photos.data.attributes.url)" class="w-100 rounded-start">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{{imovel.attributes.Type}}</h5>
                            <hr>
                            <div class="text-start">
                                <p class="card-text">Descrição: {{imovel.attributes.description}}</p>
                                <p class="card-text">Endereço: {{imovel.attributes.address}}</p>
                                <p class="card-text"><strong>Preço: <small class="text-danger">{{imovel.attributes.value}}</small></strong></p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    
</template>