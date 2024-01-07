import axios from "axios";
const mantleUrl = import.meta.env.VITE_MANTLE_URL

export const getUserCredits = async (): Promise<number> => {
    const result = await axios.get(`${mantleUrl}/applicationUser/user/credits`);
    return result.data;
}