import instance from './instance'

// get 请求
export function get(url, options) {
    return instance({
        url,
        method: 'get',
        params: {
            ...options
        }
    })
}

// post 请求
export function post(url, options) {
    return instance({
        url,
        method: 'post',
        ...options
    })
}

export default {
    get,
    post
}