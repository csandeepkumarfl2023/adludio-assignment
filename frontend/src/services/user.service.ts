import axios from  './axios.service'

export const createUserService = async(data: any) => {
   try{
       let response = await axios.post('/user', data)
       return response.data
   }catch(err){
       console.log(err)
   }
};