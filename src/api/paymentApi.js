import axiosClient  from "./axiosClient";
import {urlApi} from '../const/index'
const paymentApi = {
    createPayment(data) {
        const url =  `${urlApi}/order/createPayment`
        return axiosClient.post(url,data)
    },
   
}
export default paymentApi