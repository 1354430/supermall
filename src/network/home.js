import { request } from "./request";

export function getHomeMultidata() {
    return request({
        url: "./home/multidata"
    })
}

// 发送商品信息请求
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}