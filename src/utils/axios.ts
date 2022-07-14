import axios,{AxiosResponse,AxiosRequestConfig} from "axios"
import qs from "qs"

const  config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Origin":"*",
        'X-Requested-With': 'XMLHttpRequest',
    },
    timeout:3000,
    baseURL:"/api",
}

const $axios = axios.create(config);

$axios.interceptors.request.use((params:AxiosRequestConfig) => {
    return params;
},err => {
    return Promise.reject(err);
})

$axios.interceptors.response.use((res) => {
    if(res.status != 200){
       res.data = {
           message:showResState(res.status),
           status: 2
       }
    };
    return res;
},error => {
    return {
        data:{
            message:"系统错误",
            status: 3
        }
    }
})

interface backMessage {
    message:string;
    data:object;
    status:number;
}

function showResState(state:number) {
    let message = '';
    // 这里只做部分常见的示例，具体根据需要进行配置
    switch (state) {
        case 400:
            message = '请求错误(400)'
            break
        case 401:
            message = '未授权，请重新登录(401)'
            break
        case 403:
            message = '拒绝访问(403)'
            break
        case 404:
            message = '请求出错(404)'
            break
        case 500:
            message = '服务器错误(500)'
            break
        case 501:
            message = '服务未实现(501)'
            break
        case 502:
            message = '网络错误(502)'
            break
        case 503:
            message = '服务不可用(503)'
            break
        default:
            message = `连接出错(${state})!`
    }
    return `${message}，请检查网络或联系网站管理员！`
}

export default {
    request(url:string,data:any,config:any){
        return new Promise((resolve,reject) => {
            $axios.post(url,qs.stringify(data),config).then(res => {
                let  result:backMessage = res.data;
                // 没有登陆
                if(result.status == 4){
                    resolve({
                        err:true
                    });
                }else if (result.status == 1){
                    resolve({
                        err:false,
                        data:result.data
                    });
                }else{
                    resolve({
                        err:result.message,
                    });
                }
            }).catch(err => {
                reject({
                    err:err
                });
            })
        })
    },
    get(url:string,config?:any){
        return new Promise((resolve,reject) => {
            $axios.get(url,config).then(res => {
                // 没有登陆
                resolve(res.data)
            }).catch(err => {
                reject({
                    err:err
                });
            })
        })
    },
}
