import axios from "axios"
const baseUrl = `http://localhost:3001`

export const getApartments = () => {
    return axios.get(`${baseUrl}/apartment`)
}

export const getById= (id) => {
    return axios.get(`${baseUrl}/apartment/${id}`)
}
export const getByCityId= (id) => {
    return axios.get(`${baseUrl}/apartment/getByCityId/${id}`)
}
export const priceSmallEq= (price) => {
    console.log("node");
    
    return axios.get(`${baseUrl}/apartment/priceSmallEq/${price}`)
}
export const getCities= () => {
    return axios.get(`${baseUrl}/city`)
}
export const getCategories= () => {
    return axios.get(`${baseUrl}/category`)
}
export const register= (newAdvertiser) => {
    return axios.post(`${baseUrl}/advertiser/register`, newAdvertiser)
}
export const login= (advertiser) => {
    return axios.post(`${baseUrl}/advertiser/login`, advertiser)
}
export const addApartment= (newApartment) => {
    const h = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    console.log(newApartment);
    
    return axios.post(`${baseUrl}/apartment` ,newApartment, {headers: h })
}
export const getByAdvertiserId= (id) => {
    return axios.get(`${baseUrl}/apartment/getByAdvertiserId/${id}`)
}
export const removeApartment= (id) => {
    const h = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return axios.delete(`${baseUrl}/apartment/${id}`,{headers: h })
}
export const updateApartment= (id,updateApart) => {
    const h = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return axios.patch(`${baseUrl}/apartment/${id}`,updateApart,{headers: h })
}
// export const getById = (id) => {
//     return axios.get(`${baseUrl}/article/${id}`)
// }