import axios from "axios"

export const apiProcessor = async ({ method, url, data, isPrivate }) => {
    try {
        let response = await axios({
            method: method,
            url: url,
            data: data,
            headers: isPrivate ? {
                Authorization: 'Bearer ' + localStorage.getItem("accessToken"),
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