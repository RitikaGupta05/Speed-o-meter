import axios from "axios";
// import { checkStatus, parseJSON } from "./responseHandler";

const apicaller =  async(url, method = 'post', body) => {
    const content_type = method === 'get' ? 'text/plain' : 'application/json'
    return axios(`${url}`, {
            method,
            data: body ? JSON.stringify(body) : null,
            headers:{
                'Content-Type': `${content_type};charset=UTF-8`,
                
            } 
        });
};


export default apicaller