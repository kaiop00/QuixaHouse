import axios from 'axios'

export const baseURL = "http://localhost:1330"

export const api = axios.create({
    baseURL: `${baseURL}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
})