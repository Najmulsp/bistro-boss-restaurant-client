import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../pages/authentication/AuthProvider";
 const axiosSecure = axios.create({
    baseURL : 'http://localhost:5000'
})



const useAxiosSecure = () => {
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext);
    axiosSecure.interceptors.request.use(function (config) {
        // Do something before request is sent
        const token = localStorage.getItem('access-token')
        // console.log(token)
        config.headers.authorization = `Bearer ${token}`
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });

      // Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response.status;
    // console.log('from response status', status)
    if(status === 401 || status === 403){
      await logout()
      navigate('/login')
    }
    return Promise.reject(error);
  });



    return axiosSecure
};

export default useAxiosSecure;