import { ref, computed, reactive, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/service/http';
import type { User } from '@/Entity/User';

export const userAuth = defineStore('auth', () => {
  let token = ref(localStorage.getItem('token') ||'')
  let user = ref(JSON.parse(localStorage.getItem('user')))
  // const role = ref( localStorage.getItem('role') ||'')
  // // const isAdmin = computed(() => role.value == "admin")
  // const isAuthenticated = computed(() => token.value ? true : false)
  function setToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
    token.value = tokenValue;
  }
  function setuser(userValue: User) {
    localStorage.setItem('user', JSON.stringify(userValue));
    user.value = userValue;
  }
  async function validate(){
    try {
      const { data } = await api.get("/users/me", {
        headers:{
          Authorization: `Bearer ${token.value}`,
        }
      })
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function updateUser(email: string, password: string){
    try {
      const { data } = await api.post("/auth/local/", {
        identifier: email,
        password: password,
      });
      console.log('data', data);
      setToken(data.jwt);
      setuser(data.user);
    } catch (error) {
      console.log(error);
    }
  }

  function clear(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    user.value = ""
    token.value = ""
  }
  return {
    setToken,
    setuser,
    token,
    user,
    validate,
    clear,
    updateUser
  }
})
