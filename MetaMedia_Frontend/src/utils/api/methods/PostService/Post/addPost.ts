
import axios from 'axios'
import {AddPost_Api} from '../../../endpoints/common'

export const AddPostFuntion = async ( data : any) => {
    try {
        const formData = new FormData();
const {userId,description,likes,comments,media,location,postCropSize,postType,reports,shareCount,showComment,showLikes,tags}:any=data.data
        



formData.append('userId',userId)
formData.append('description',description)
formData.append('likes',likes)
formData.append('comments',comments)
if(postType=='image'){

    media.forEach((file:any) => {
        formData.append(`images`, file);
    });
}else{
   
     formData.append(`images`, media);
    
}


formData.append('location',location)
formData.append('postCropSize',postCropSize)
formData.append('postType',postType)
formData.append('reports',reports)
formData.append('shareCount',shareCount)
formData.append('showComment',showComment)
formData.append('showLikes',showLikes)
formData.append('tags',tags)


console.log(data,'this is data');



console.log(userId,'ths is is id');   
        const response = await  axios.create({
            baseURL:'https://meta-media.in/api/post',
            headers: {'Content-Type' : 'multipart/form-data'},
            withCredentials : true,
        }).post(AddPost_Api, formData);

        console.log('this is responce..',response);
        

        return response.data;

    } catch (err) {
        console.log('hello form error',err);
        
        return err;
    }
}




