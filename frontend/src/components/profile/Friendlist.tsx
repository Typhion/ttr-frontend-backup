import {Alert, Box, IconButton, List, ListItem, ListItemText, Typography} from "@mui/material";
import {useFriendlist} from "../../hooks/useFriendlist.ts";
import Loader from "../general/Loader.tsx";
import CloseIcon from '@mui/icons-material/Close';

export default function Friendlist() {
    const {isLoading: isLoading, isError: isError, data: friendlist} = useFriendlist();

    if (isLoading) return <Loader>Loading Game Details...</Loader>;

    if (isError) {
        return <Alert severity="error">Unable to load this game's details.</Alert>;
    }

    return (
        <Box>
            <Typography variant="h6">Friends</Typography>
            <List>
                {!friendlist || friendlist.length === 0 ? (
                    <Typography sx={{ mt: 2 }}>You should try adding some friends!</Typography>
                ) : (
                    <List>
                        {friendlist.map((friend, index) => (
                            <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <ListItemText primary={friend.username} />
                                <IconButton edge="end" aria-label="delete" sx={{ color: 'red' }}>
                                    <CloseIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                )}
            </List>
        </Box>
    )
}