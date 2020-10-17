import axios from "axios";
import router from "../router";
import Element from "element-ui";

let config = {
    baseURL: "http://47.113.95.146:9000/api", // api的base_url
    timeout: 3 * 60 * 1000, // 请求超时时间
    withCredentials: true,
    headers: {
        "content-type": " application/json;charset=UTF-8"
    }
};
const service = axios.create(config);
service.interceptors.response.use(response => {
    if (response.data.code === -1) {
        router.replace({
            path: "/login"
        });
    }
    if (response.data.code === -2) {
        Element.Message.warning({
            message: response.data.message,
            type: "warning"
        });
    }
    return Promise.resolve(response);
});

export default service;
