

import axios from 'axios';

import { showAllPost_Api } from '../../../endpoints/common';
export const showAllPostFuntion=async()=>{

try {
   const responce = await  axios.create({
      baseURL:'http://meta-media.in/api/post',
      withCredentials : true,
  }).get(showAllPost_Api)
   return responce.data
} catch (error) {
    console.log('Error fro the sow all post get file',error);
}
}