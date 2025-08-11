import { apiProcessor } from "../../utils/axiosHelper";
const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

export const registerUser = (obj) => {
    return apiProcessor({
        method: 'POST',
        url: `${apiUrl}/auth/register`,
        data: obj,
    })
}

export const loginUser = async (obj) => {
    return apiProcessor({
        method: 'POST',
        url: `${apiUrl}/auth/login`,
        data: obj,
    })
}

export const getUserDetail = async () => {
    return apiProcessor({
        method: 'GET',
        url: `${apiUrl}/auth/user`,
        isPrivate: true,
    })
}

export const verifyEmail = async (token, email) => {
    return apiProcessor({
        method: 'GET',
        url: `${apiUrl}/verify-email?t=${token}&email=${email}`,
        isPrivate: false,
    })
}

export const resendEmail = async (email) => {
    return apiProcessor({
        method: 'GET',
        url: `${apiUrl}/resend-email?email=${email}`,
        isPrivate: false,
    })
}

export const forgotPassword = async (obj) => {
    return apiProcessor({
        method: 'POST',
        url: `${apiUrl}/auth/forgot-password`,
        data: obj,
        isPrivate: false,
    })
}

export const resetPassword = async (obj) => {
    return apiProcessor({
        method: 'POST',
        url: `${apiUrl}/auth/reset-password`,
        data: obj,
        isPrivate: false,
    })
}