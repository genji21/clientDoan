import axiosClient  from "./axiosClient";
import {urlApi} from '../const/index'
import axios from "axios";

const userApi = {
    register(data) {
        const url =  `${urlApi}/users/register`
        return axiosClient.post(url,data)
    },
    login(data){
        const url = `${urlApi}/users/login`
        return axiosClient.post(url,data)
    },
    getInfor(token){
        const url = `${urlApi}/users/infor`
        return axiosClient.get(url,{headers: {Authorization: token}})
    },
    getHistory(token,id){
        const url = `${urlApi}/users/history?id=${id}`
        return axiosClient.get(url,{headers: {Authorization: token}})
    },
    updateInfor(data,token){
        const url = `${urlApi}/users/update`
        return axiosClient.patch(url,data,{headers: {Authorization: token}})
    },
    resetPassword(data,token){
        const url = `${urlApi}/users/reset`
        return axiosClient.post(url,data,{headers:{
            Authorization:token
        }})
    }
}
export default userApi
