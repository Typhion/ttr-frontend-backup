import axios from 'axios'
const mantleUrl = import.meta.env.VITE_MANTLE_URL
export function addAccessTokenToAuthHeader(token: string | undefined) {
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    else {
        removeAccessTokenFromAuthHeader()
    }
}

export function removeAccessTokenFromAuthHeader() {
    delete axios.defaults.headers.common['Authorization']
}

export const createAccount = async () => {
    await axios.post(`${mantleUrl}/applicationUser/create`);
}
