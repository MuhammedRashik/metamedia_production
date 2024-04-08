import axios from 'axios'
import {getLatAndLong_Api} from '../../../endpoints/common'
export const getLatAndLogFuntion=async(data:string)=>{
console.log(data,'THIS');
const bakendData={
    id:data
}

    const response = await  axios.create({
        baseURL:'http://meta-media.in/api/post',
        withCredentials : true,
    }).post(getLatAndLong_Api,bakendData );

    return response.data


}
