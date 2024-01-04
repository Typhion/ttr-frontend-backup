import {Box, Typography, Card, CardContent, Divider} from "@mui/material";
import Friendlist from "./Friendlist.tsx";
import AddFriend from "./AddFriend.tsx";

export default function Friends() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Card sx={{border: '1px solid black', borderRadius: '5px'}}>
                <CardContent>
                    <Typography variant="h5">Friends</Typography>
                    <Divider sx={{ my: 2 }} />
                    <AddFriend/>
                    <Friendlist/>
                </CardContent>
            </Card>
        </Box>
    )
}