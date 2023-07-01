import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { api } from '@/service/http'
import './assets/main.css'
import type { AxiosError, AxiosResponse } from 'axios'
import type { StrapiError } from './Entity/StrapiError'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

api.interceptors.response.use((response: AxiosResponse) => response, function (error: AxiosError<StrapiError>) {
    if (error.response && error.response.status !== 400) {
      console.log(error)
      router.replace({
        name: 'error',
        query: {
          status: error.response.status,
          msg: error.response.data.error.message
        }
      })
    } else {
      return Promise.reject(error)
    }
  });
