import axios from 'axios';

 axios.interceptors.response.use(function (response) {
            console.log("intercept responseddd:",response.status)
       return response;
          }, function (error) {
            console.log("error",error.response)
            return Promise.reject(error);
          });