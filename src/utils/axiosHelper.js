import axios from "axios"

export const apiProcessor = async ({ method, url, data, isPrivate, contentType = "application/json" }) => {
    try {
        let response = await axios({
            method: method,
            url: url,
            data: data,
            headers: isPrivate ? {
                Authorization: 'Bearer ' + sessionStorage.getItem("accessToken"),
                "Content-Type": contentType
            } : {},
        })

        return response.data
    } catch (error) {
        return {
            status: false,
            message: error?.response?.data?.message || error.message
        }
    }
}