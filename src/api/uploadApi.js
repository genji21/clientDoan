import axiosClient  from "./axiosClient";
import {urlApi} from '../const/index'
const upLoadApi = {
    uploadAvatar(file,token){
        const url = `${urlApi}/api/upload_avatar`
        return axiosClient.post(url,file,{headers: {Authorization: token}})
    }
}
export default upLoadApi