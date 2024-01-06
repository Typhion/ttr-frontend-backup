import {Box, Typography, Card, CardContent, Divider} from "@mui/material";
import Friendlist from "./Friendlist.tsx";
import AddFriend from "./AddFriend.tsx";

interface FriendsProps {
    setCurrentTab: (number: number) => void;
}

export default function Friends({setCurrentTab}: FriendsProps) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Card sx={{border: '1px solid black', borderRadius: '5px'}}>
                <CardContent>
                    <Typography variant="h5">Friends</Typography>
                    <Divider sx={{ my: 2 }} />
                    <AddFriend/>
                    <Friendlist setCurrentTab={setCurrentTab}/>
                </CardContent>
            </Card>
        </Box>
    )
}