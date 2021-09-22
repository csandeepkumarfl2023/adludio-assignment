import axios from  './axios.service'

export const getAllMenuService = async() => {
   try{
       let response = await axios.get('/menu')
       return response.data
   }catch(err){
       console.log(err)
   }
};