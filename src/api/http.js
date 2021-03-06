import axios from 'axios';

axios.interceptors.response.use((res)=>{
    return res.data||res
})
axios.interceptors.request.use((config) => {
    // 获取jwt
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
        // 追加请求头信息
        config.headers["Authorization"] = jwt;
    }
    // 返回配置
    return config;
});
export default axios