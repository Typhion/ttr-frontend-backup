import {Box} from "@mui/material";
import Friendlist from "./Friendlist.tsx";

export default function Friends() {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Friendlist/>
        </Box>
    )
}