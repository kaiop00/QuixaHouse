
<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { ref } from 'vue';

  const form = ref({
    rua: "",
    bairro:"",
    
  })


</script>


<template>
  <div class="flex-fill">
    <nav class="navlink d-flex justify-content-between">
      <div class="flex-fill">
        <RouterLink to="/" ><img src="../assets/logoAluga.png" width="100" height="70"></RouterLink>
      </div> 
      <div class="linkbotao flex-fill">
        <RouterLink to="/">
          <button type="button" class="btn btn-danger">Voltar</button>
        </RouterLink>
      </div>
    </nav>
    <div class="container w-50">
      <h3 class="texto d-flex justify-content-center">Anuncie seu Imóvel Agora Mesmo!</h3>
      <form class="form-floating mb-3 m-3 was-validated needs-validation" >
        <div class="form-floating mb-3 sucesso">
          <input type="nome" class="form-control" id="floatingInput"  >
          <label for="floatingInput">Rua:</label>
          <div class="invalid-feedback">
            Insira uma Rua Válido.
          </div>
        </div>
        
        <div class="form-floating mb-3 sucesso">
          <input type="nome" class="form-control" id="floatingInput"  >
          <label for="floatingInput">Bairro:</label>
          <div class="invalid-feedback">
            Insira um Bairro válido
          </div>
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Número:</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">Descrição Completa do Apartamento:</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <div class="input-group mb-3">
          <select class="form-select" aria-label="Default select example">
            <option selected>Qual seu meio de contato?
            </option>
            <option value="1">Telefone</option>
            <option value="2">Email</option>
            <option value="3">Pombo Correio</option>
          </select>
          <input type="text" class="form-control" aria-label="Text input with dropdown button">
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Valor do Aluguel Mensal:</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        </div>

        <div class="mb-3">
          <label for="formFileMultiple" class="form-label">Adicione Fotos de Seu Imóvel:</label>
          <input class="form-control" type="file" id="formFileMultiple" multiple>
        </div>
        <button type="submit" class="botao btn btn-danger w-100">Anuncie </button>
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



