<script setup lang="ts">

</script>

<template>
    <div class="btn-group btn-group-lg p-1 d-flex flex-row justify-content-center" role="group"
        aria-label="Large button group">
        <button type="button" class="btn btn-danger">Anunciar</button>
    </div>
   

    <div class="card mb-3" style="max-width: 750px;">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="apt1.webp" class="img-card" alt="apartamento 1">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">RS 800<span>/mês</span></h5>
                          <p class="card-text">STUDIO COM VARANDA GOURMET NA BELA VISTA APTO tipo Studio, com 40 m2 área útil. Próximo ao Shopping Frei Caneca, Mackenzie, FGV, Hospital Sírio Libanês, Hospital 9 de Julho, etc...</p>
                          <p class="card-text"><small class="text-muted">Rua Paim, Bela Vista </small></p>
                          <a href="">Ver mais detalhes</a>
                          <button type="button" class="btnmsg btn btn-outline-dark">Mensagem</button>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="card mb-3" style="max-width: 750px;">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="apt2.jpg" class="img-card" alt="apartamento 2">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">RS 2.000<span>/mês</span></h5>
                          <p class="card-text">Galpão, 2.300 m², Fortaleza, Paupina, grande Messejana. Acesso fácil, na entrada da cidade, menos de 1 km do Quarto Anel Viário, 100 mts da BR-116. Crossdocking, cabe até 2 caminhões...</p>
                          <p class="card-text"><small class="text-muted">Rua Guarani, Paupina</small></p>
                          <a href="">Ver mais detalhes</a>
                          <button type="button" class="btnmsg btn btn-outline-dark">Mensagem</button>
                        </div>
                      </div>
                    </div>                
                  </div>
                  <div class="botaoanuncio">
                  <button type="button" class="btn btn-danger w-75 ">Efetuar Reserva</button>
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