
import axios from 'axios'

export const USER_URL = 'http://meta-media.in/api/user'; 

export const AUTH_URL = 'http://meta-media.in/api/auth'; 

export const POST_URL = 'http://meta-media.in/api/post'; 

export const STORY_URL = 'http://meta-media.in/api/story';

export const HIGHLIGHT_URL = 'http://meta-media.in/api/highlight'; 

export const CHAT_URL = 'http://meta-media.in/api/chat'; 

export const ADMIN_URL = 'http://meta-media.in/api/admin'; 


export const axiosPrivet = axios.create({
    baseURL:AUTH_URL,
    headers: {'Content-Type' : 'application/json'},
    withCredentials : true,
})

