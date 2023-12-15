import {Box} from "@mui/material";
import UserList from "./UserList.tsx";

export default function Users() {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <UserList/>
        </Box>
    )
}