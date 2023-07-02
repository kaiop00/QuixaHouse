<script setup lang="ts">
import { coverURL} from '@/service/uploadUtil'

defineProps<{
  id: number,
  photos?: string,
  description: string,
  value: number,
  street: string,
  district: string,
  number: number,
}>()
</script>

<template>
  
  <div class="card shadow-sm">
    <router-link :to="'/imovels/' + id">
      <img class="bd-placeholder-img card-img-top" width="100%" height="225" :src="photos"   />
      <div class="card-body">
        <p class="card-text">{{ description }}</p>
        <div>
          <p>Valor: R${{ value }}</p>
        </div>
        <div class="d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-md bg-danger">Alugar</button>
        </div>
      </div>
    </router-link>
  </div>

  



    
</template>
<style scoped>
  p{
    text-decoration: none;
    color: black;
  }
  button {
    color: white;
  }
</style>