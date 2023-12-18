import axios from 'axios';
import {ApplicationUserPageDto} from "../model/AdminService.ts";
const mantleUrl = import.meta.env.VITE_MANTLE_URL

export type Page = {
    pageNumber: number,
    size: number,
    nameFilter: string
}

export const getUserList = async (page: Page): Promise<ApplicationUserPageDto> => {
    const result = await axios.get(`${mantleUrl}/applicationUser/admin/users?page=${page.pageNumber}&size=${page.size}&nameFilter=${page.nameFilter}`);
    return result.data;
}