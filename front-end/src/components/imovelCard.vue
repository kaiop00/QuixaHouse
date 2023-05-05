<script setup lang="ts">
import { coverURL} from '@/service/uploadUtil'

defineProps<{
  id: number,
  photos: string,
  description: string,
  value: string,
  address: string,
}>()
</script>

<template>
    <div class="col-lg-12 col-md-4 col-sm-1">
      <router-link :to="'/imovels/' + id">
      <div class="card shadow-sm d-flex flex-row">
        <div class="col-md-4">
          <img class="bd-placeholder-img card-img-top w-75" :src="photos"   />
        </div>
        <div class="card-body text-center">
            <h5 class="card-title">{{description}}</h5>
            <div class="card-subtitle mb-2 text-muted">{{address }}</div>
            <h6 class="card-subtitle mb-2 text-muted">Preço: {{value}}</h6>
        </div>  
      </div>
      </router-link>
    </div>
</template>