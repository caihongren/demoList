import axios from 'axios'

//设置环境变量 确认默认请求地址

// if (process.env.NODE_ENV == 'development') {

//     axios.defaults.baseURL = 'http://yfzx.whty.com.cn/prod-api'
// } else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = 'http://127.0.0.1:8088'
// } else if (process.env.NODE_ENV == 'production') {

//     axios.defaults.baseURL = 'http://ekt.suzhou.edu.cn'

// }


axios.defaults.timeout = 35000;
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

const doUrl = url => {
    // debugger
    const rules = [{
        target: 'http://whty.tyjulink.com/', //上线后访问地址
        // target: "http://10.8.3.125:8080/spc-admin/reserveCard", // 要访问的接口域名测试
        pathRewrite: 'api',
    }, ]
    let match = null;
    for (let index = 0; index < rules.length; index++) {
        const rule = rules[index];
        match = url.match(new RegExp(rule.pathRewrite, 'i'));
        debugger
        if (match) {
            return url.replace(match[0], rule.target)
        }

    }
    if (!match) return url
}

//请求拦截器
axios.interceptors.request.use(
    config => {

        // config.url = doUrl(config.url)
        config.url = process.env.NODE_ENV == 'production' ? doUrl(config.url) : config.url;


        return config
    }, error => {
        return Promise.reject(error)
    })
//响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    //服务器状态码不是200
    error => {

        console.log(error.response ? error.response : "error.response不存在" + JSON.stringify(error));
        if (error.response.status) {
            
            switch (error.response.status) {
                //未登录
                //跳转到登陆页面
                case 401:
                    console.log('未登录')
                    break;
                case 403:
                    console.log('token过期');
                    break;
                    case 404:
                    console.log('连接失败');
                    break;
                default:
                    console.log('服务链接错误')
            }
            return Promise.reject(error.response ? error.response : "error.response不存在");
        } else {
            return Promise.reject(error.response ? error.response : "error.response不存在");
        }
    },



)
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params,
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

/** 
 * post方法，对应post请求 
 * 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */


/** 
 * post方法，对应post请求   更换请求头
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function postwww(url, params) {
//    debugger
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
// export function postwww(url, params) {
//     return new Promise((resolve, reject) => {
//         axios.get(url, {params:params})
//             .then(res => {
//                 resolve(res.data)
//             })
//             .catch(err => {
//                 reject(err.data)
//             })
//     })
// }







