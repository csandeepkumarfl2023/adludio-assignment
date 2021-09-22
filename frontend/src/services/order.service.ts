import axios from  './axios.service'

export const createOrderService = async(data: any) => {
   try{
       let response = await axios.post('/order', data)
       return response
   }catch(err){
       console.log(err)
   }
};

export const getAllOrdersService = async(userId: any) => {
    try{
        let response = await axios.get(`/order?userId=${userId}`)
        return response
    }catch(err){
        console.log(err)
    }
 };