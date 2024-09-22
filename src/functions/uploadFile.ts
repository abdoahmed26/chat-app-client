/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

const cloud_name = import.meta.env.VITE_CLOUD_NAME

const apiUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`

export const uploadFile = async(file:any)=>{
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'chatapp')

    const res = await axios.post(apiUrl,formData)
    const data = res.data.url
    return data
} 