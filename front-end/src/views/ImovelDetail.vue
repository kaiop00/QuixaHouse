<script setup lang="ts">
import type { Imovel } from '@/Entity/Imovel';
import { api } from '@/service/http';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router'
import { coverURL } from '@/service/uploadUtil';
import { userAuth } from '@/stores/userAuthStore';
import imovelDetail from '@/components/imovelDetail.vue';

const route = useRoute()
const id = Number(route.params.id)
const imovel = ref<Imovel>({} as Imovel)  
const user = userAuth();

onBeforeMount( async () => {
    const { data } = await api.get(`/apartments/${id}`, {
        params: {
            populate: "*"
        },
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    })
    imovel.value = data.data;  
})
    function enviarMensagem(numero: string) {
      let mensagem =`Olá ${imovel.value.attributes.user.data.attributes.username}! Vi o anúncio do seu imóvel, localizado em ${imovel.value.attributes.district}, na Rua ${imovel.value.attributes.street} - ${imovel.value.attributes.number}.
        Ainda está disponível ?`;

      const url = `https://web.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensagem)}`;
      window.open(url);
    }

</script>

<template>
    
    <div class="row justify-content-center">
        <div class="col-lg-8 col-sm-12">
            <div class="card mb-3">
                <imovelDetail
                  :id="imovel.id"
                  :photos="coverURL(imovel.attributes.photos?.data?.attributes.url)"
                  :description="imovel.attributes.description"
                  :value= "imovel.attributes.value"
                  :street="imovel.attributes.street"
                  :district="imovel.attributes.district"
                  :number="imovel.attributes.number"
                  :Type="imovel.attributes.Type"
                  :username="imovel.attributes.user.data.attributes.username"
                />
                <div>
                    <button type="button" class="btn btn-primary" @click="enviarMensagem(String(imovel.attributes.cellphone))">Entrar em Contato</button>
                </div>
            </div>
        </div>
      </div>
    
</template>