import axios from "./fetch";
import util from "../utils/cookieUtil";

export default {
    sign(params) {
        return axios.post("/sign", JSON.stringify(params));
    },
    articleList(params) {
        return axios.post("/article/list", JSON.stringify(params))
    },
    articleDetail(params) {
        return axios.post("/article/detail", JSON.stringify(params))
    },
    articleSave(params) {
        return axios.post("/article/save", JSON.stringify(params), {
            headers: {
                'Authorization': util.getCookie("token")
            }
        })
    },
    articleDel(params) {
        return axios.post("/article/del", JSON.stringify(params), {
            headers: {
                'Authorization': util.getCookie("token")
            }
        })
    },
    articleTypeList() {
        return axios.get("/article_type/list")
    },
    articleTypeSave(params) {
        return axios.post("/article_type/save", JSON.stringify(params), {
            headers: {
                'Authorization': util.getCookie("token")
            }
        })
    },
    articleTypeDel(params) {
        return axios.post("/article_type/del", JSON.stringify(params), {
            headers: {
                'Authorization': util.getCookie("token")
            }
        })
    },
    userDetail() {
        return axios.get("/user/detail")
    },
    isAdmin() {
        return axios.get("/is_admin", {
            headers: {
                'Authorization': util.getCookie("token")
            }
        })
    }
};
