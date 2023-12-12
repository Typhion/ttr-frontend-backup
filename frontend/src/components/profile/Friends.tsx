import {Box, Typography} from "@mui/material";
import Friendlist from "./Friendlist.tsx";
import AddFriend from "./AddFriend.tsx";

export default function Friends() {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Typography variant="h6">Friends</Typography>
            <AddFriend/>
            <Friendlist/>
        </Box>
    )
}