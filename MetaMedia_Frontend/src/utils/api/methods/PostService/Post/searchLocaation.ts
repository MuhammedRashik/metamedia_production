import axios from 'axios'
import {SearchLocation_Api} from '../../../endpoints/common'
export const searchLocationFuntion=async(data:string)=>{
console.log(data,'THIS');
const bakendData={
    data:data
}

    const response = await  axios.create({
        baseURL:'http://meta-media.in/api/post',
        withCredentials : true,
    }).post(SearchLocation_Api,bakendData );

    return response.data


}

