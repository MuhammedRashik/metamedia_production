import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
const axiosFormDataInstance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    console.log("I AM AXIOS REQ");
    
    const accessToken = localStorage.getItem('accesstoken')    
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
},
error => {
  return Promise.reject(error);
}
);

axiosFormDataInstance.interceptors.request.use(
  config => {
    console.log("I AM AXIOSFORM REQ");

    const accessToken = localStorage.getItem('accesstoken')
    console.log(accessToken,"axiosFormDataInstance");
    
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
},
error => {
  return Promise.reject(error);
}
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("Axiox hhhh");
    console.log("I AM AXIOS REs");
        
    console.log(error.response.data.errMessage,"error.responseerror.response");
    
    const originalRequest = error.config;
    if(error.response.status === 403 ){
      localStorage.removeItem('accesstoken')
    }
    if (error.response.status === 401 && !originalRequest._retry) {      
      originalRequest._retry = true;
      try {
        const route:any = 'https://meta-media.in/api/auth/refresh'
        const refreshResponse = await axios.post(route);        
        const newAccessToken = refreshResponse.data.token;
        console.log("New Accesstoken ==>", newAccessToken);
        localStorage.setItem('accesstoken', newAccessToken); // Update in storage
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
    } catch (err) {
        console.log(err);
        console.log(window.location.href ,"window.location.href window.location.href window.location.href ");
        
        window.location.href = '/login';
        console.error('Refresh token failed:', err);
    }
    }
    return Promise.reject(error);
  }
);

    // For Images


axiosFormDataInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("I AM AXIOSFORM REQ");

    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const route:any = 'https://meta-media.in/api/auth/refresh'
        const refreshResponse = await axios.post(route);        
        const newAccessToken = refreshResponse.data.token;
        console.log("New Accesstoken ==>" , newAccessToken);
        localStorage.setItem('accesstoken', newAccessToken); // Update in storage
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosFormDataInstance(originalRequest);
      } catch (err) {
        console.log(err);        
        // await handleLogout()
        console.error('Refresh token failed:', err);
      }
    }
    return Promise.reject(error);
  }
);

export {
  axiosFormDataInstance,
  axiosInstance
} 

