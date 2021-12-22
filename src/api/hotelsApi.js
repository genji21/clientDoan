import axiosClient from './axiosClient'
import {urlApi} from '../const/index'
const hotelApi = {
    getHotel(filter){
        const {page,limit,rank,rating ,location,type} = filter
        const url = `${urlApi}/hotels/?page=${page}&limit=${limit}&rank=${rank}&rating=${rating}&location=${location}&type=${type}`
        return axiosClient.get(url)
    },
    getidHotel(id){
        const url = `${urlApi}/hotels/${id}`
        return axiosClient.get(url)
    },
    searchotel(search){
        const url = `${urlApi}/hotels/search`
        return axiosClient.post(url,{search})
    
    }
}
export default hotelApi
