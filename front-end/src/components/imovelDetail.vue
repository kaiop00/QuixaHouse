<script setup lang="ts">
    defineProps<{
        id: number,
        photos?: string,
        description: string,
        value: number,
        street: string,
        district: string,
        number: number,
        Type: string,
    }>()
</script>


<template>
<div class="row g-0">
    <div class="col-md-4">
        <img :src="photos" class="w-100 rounded-start">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">{{Type}}</h5>
            <hr>
            <div class="text-start">
                <p class="card-text">Descrição: {{description}}</p>
                <p class="card-text">Rua: {{street}} - {{number }} Bairro: {{ district }}</p>
                <p class="card-text"><strong>Preço: <small class="text-danger">{{value}}</small></strong></p>
            </div>
        </div>
    </div>
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