import {Alert, Box, IconButton, List, ListItem, ListItemText, Typography} from "@mui/material";
import {useFriendlist} from "../../hooks/useFriendlist.ts";
import Loader from "../general/Loader.tsx";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import {useRemoveFriend} from "../../hooks/useRemoveFriend.ts";
import {useFriendRequestList} from "../../hooks/useFriendRequestList.ts";
import {useAcceptFriend} from "../../hooks/useAcceptFriend.ts";

export default function Friendlist() {
    const {isLoading: isLoading, isError: isError, data: friendlist, refetch} = useFriendlist();
    const {isLoading: isReqLoading, isError: isReqError, data: friendReqList} = useFriendRequestList();

    const removeFriend = useRemoveFriend(() => {
            refetch();
        }
    );
    const acceptFriend = useAcceptFriend(() => {
            refetch();
        }
    );

    const handleRemoveFriend = (friendId: string) => {
        removeFriend.mutate(friendId);
    }
    const handleAcceptFriend = (friendId: string) => {
        acceptFriend.mutate(friendId);
    }

    if (isLoading || isReqLoading) return <Loader>Loading friends...</Loader>;

    if (isError || isReqError) {
        return <Alert severity="error">Unable to load friends.</Alert>;
    }

    return (
        <Box sx={{
            mt: 3,
        }}>
            <Box sx={{mt: 3}}>
                <Typography variant="h6">Your friend requests</Typography>
                {!friendReqList || friendReqList.length === 0 ? (
                    <Typography>You have no friend requests.</Typography>
                ) : (
                    <List>
                        {friendReqList.map((friend, index) => (
                            <ListItem key={index} sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <ListItemText primary={friend.username}/>
                                <IconButton onClick={() => handleAcceptFriend(friend.id)} edge="end" aria-label="delete"
                                            sx={{color: 'green'}}>
                                    <DoneIcon/>
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
            <Box sx={{mt: 3}}>
                <Typography variant="h6">Your friends</Typography>
                {!friendlist || friendlist.length === 0 ? (
                    <Typography>You should try adding some friends!</Typography>
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
        </Box>
    )
}