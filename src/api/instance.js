import axios from 'axios'
import Qs from 'qs';

let userInfo = {}
if (localStorage.getItem('userInfo')) {
    userInfo = JSON.parse(localStorage.getItem('userInfo'))
}

const instance = axios.create({
    // baseURL: 'http://fc.php800.cn/api',
    timeout: 10000,
    headers: {
        phone: userInfo ? userInfo.phone : '',
        token: userInfo ? userInfo.token : ''
    },
    transformRequest: [function (data) {
        let params
        if (data instanceof FormData || data instanceof URLSearchParams) {
            params = data
        } else {
            params = Qs.stringify(data)
        }
        return params
    }]
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    let userInfo = {}
    if (localStorage.getItem('userInfo')) {
        userInfo = JSON.parse(localStorage.getItem('userInfo'))
        config.headers.phone = userInfo.phone
        config.headers.token = userInfo.token
    }
    // 在发送请求之前做些什么
    if (config.url.startsWith('#')) {
        config.baseURL = config.url.substring(1)
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    let data
    if (response.status === 200) {
        data = response.data
        return data
    }
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    error.txt = '请求失败'
    return Promise.reject(error);
});

export default instance