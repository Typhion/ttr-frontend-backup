import axios from "axios";

export const getBoardImage = async (uuid: string): Promise<string> => {
    const response = await axios.get<string>(`/board/${uuid}/image`);
    return response.data;
}