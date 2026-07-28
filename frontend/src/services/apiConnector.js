import axios from 'axios'

export const apiInstance = axios.create({});

export const apiConnector = (method,url , bodyData, headers, params)=>{
        console.log(method,url,bodyData)
        return (
              apiInstance({
                   method:`${method}`,
                   url:`${url}`,
                   data:bodyData? bodyData : null,
                   headers:headers ? headers :null ,
                   params:params ? params :null,
                   withCredentials:true
              })
        )
};
