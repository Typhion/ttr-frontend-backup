import {Alert, Box, IconButton, List, ListItem, ListItemText, Typography} from "@mui/material";
import {useFriendlist} from "../../hooks/useFriendlist.ts";
import Loader from "../general/Loader.tsx";
import CloseIcon from '@mui/icons-material/Close';
import {useRemoveFriend} from "../../hooks/useRemoveFriend.ts";

export default function Friendlist() {
    const {isLoading: isLoading, isError: isError, data: friendlist, refetch} = useFriendlist();

    const removeFriend = useRemoveFriend(() => {
            refetch();
        }
    );

    const handleRemoveFriend = (friendId: string) => {
        removeFriend.mutate(friendId);
    }

    if (isLoading) return <Loader>Loading friends...</Loader>;

    if (isError) {
        return <Alert severity="error">Unable to load friends.</Alert>;
    }

    return (
        <Box>
            {!friendlist || friendlist.length === 0 ? (
                <Typography sx={{mt: 2}}>You should try adding some friends!</Typography>
            ) : (
                <List>
                    {friendlist.map((friend, index) => (
                        <ListItem key={index} sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <ListItemText primary={friend.username}/>
                            <IconButton onClick={() => handleRemoveFriend(friend.id)} edge="end" aria-label="delete"
                                        sx={{color: 'red'}}>
                                <CloseIcon/>
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    )
}