import axios from  './axios.service'

export const createCreateMenuService = async(data: any) => {
   try{
       let response = await axios.post('/cart_menu', data)
       return response
   }catch(err){
       console.log(err)
   }
};

export const getAllCartMenuService = async(userId: any) => {
    try{
        let response = await axios.get(`/cart_menu?userId=${userId}`)
        return response
    }catch(err){
        console.log(err)
    }
 };

 export const deleteCartMenuService = async(cartMenuId: any) => {
    try{
        let response = await axios.delete(`/cart_menu/${cartMenuId}`)
        return response
    }catch(err){
        console.log(err)
    }
 };