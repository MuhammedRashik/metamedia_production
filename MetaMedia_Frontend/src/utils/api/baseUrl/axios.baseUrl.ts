
import axios from 'axios'

export const USER_URL = 'https://meta-media.in/api/user'; 

export const AUTH_URL = 'https://meta-media.in/api/auth'; 

export const POST_URL = 'https://meta-media.in/api/post'; 

export const STORY_URL = 'https://meta-media.in/api/story';

export const HIGHLIGHT_URL = 'https://meta-media.in/api/highlight'; 

export const CHAT_URL = 'https://meta-media.in/api/chat'; 

export const ADMIN_URL = 'https://meta-media.in/api/admin'; 

export const META_URL= "http://localhost:3006/api/meta"

export const axiosPrivet = axios.create({
    baseURL:AUTH_URL,
    headers: {'Content-Type' : 'application/json'},
    withCredentials : true,
})

