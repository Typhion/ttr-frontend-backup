import axios from "axios";
const mantleUrl = import.meta.env.VITE_MANTLE_URL
export const createLobby = async (): Promise<String> => {
    const result = await axios.post(`${mantleUrl}/lobby/create`);
    return result.data;
}
