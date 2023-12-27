import {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid, ListItem, ListItemButton, ListItemText,
    TextField, Typography,
} from "@mui/material";

import * as z from 'zod';
import {useSendInviteMail} from "../../hooks/lobbyHooks/useSendInviteMail.ts";
import {useFriendlistNotInLobby} from "../../hooks/lobbyHooks/useFriendlistNotInLobby.ts";
import {useSendInviteFriends} from "../../hooks/lobbyHooks/useSendInviteFriends.ts";

interface InviteFriendDialogProps {
    isOpen: boolean;
    onClose: () => void;
    lobbyId: string;
}

const emailSchema = z.string().email();
export default function InviteFriendDialog({
                                               isOpen,
                                               onClose,
                                               lobbyId
                                           }: InviteFriendDialogProps) {
    const {data: friendlist, refetch} = useFriendlistNotInLobby(lobbyId);
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
    const sendInviteMail = useSendInviteMail();
    const sendInviteFriends = useSendInviteFriends();

    useEffect(() => {
        if (isOpen) {
            refetch();
        }
    }, [isOpen, refetch]);

    const handleEmailChange = (value: string) => {
        setEmail(value);
        validateEmail(value);
    };

    const validateEmail = (value: string) => {
        try {
            emailSchema.parse(value);
            setEmailError(null);
        } catch (error) {
            setEmailError('Invalid email address');
        }
    };

    const handleFriendClick = (friendId: string) => {
        setSelectedFriends((prevSelectedFriends) =>
            prevSelectedFriends.includes(friendId)
                ? prevSelectedFriends.filter((id) => id !== friendId)
                : [...prevSelectedFriends, friendId]
        );
    };

    const handleSendInvite = () => {
        if (email) {
        sendInviteMail.mutate({lobbyId: lobbyId, email: email});
        }
        if (selectedFriends.length > 0) {
            sendInviteFriends.mutate({lobbyId: lobbyId, friendIds: selectedFriends});
        }
        onClose();
        setSelectedFriends([]);
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle id={'InviteFriendDialog'}>Send Invite</DialogTitle>
            <DialogContent>
                <DialogContentText color={'black'}>
                    Enter the email address of the friend you want to invite.
                </DialogContentText>
                <TextField
                    label="Email Address"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    error={Boolean(emailError)}
                    helperText={emailError}
                />
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6">Your friends</Typography>
                    {!friendlist || friendlist.length === 0 ? (
                        <Typography>You should try adding some friends!</Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {friendlist.map((friend, index) => (
                                <Grid item xs={6} key={index}>
                                    <ListItem
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            border: selectedFriends.includes(friend.id)
                                                ? '2px solid black'
                                                : 'none',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        <ListItemButton
                                            onClick={() => handleFriendClick(friend.id)}
                                        >
                                            <ListItemText primary={friend.username} />
                                        </ListItemButton>
                                    </ListItem>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button
                    onClick={handleSendInvite}
                    variant="contained"
                    disabled={Boolean(emailError)}
                >
                    Send Invite
                </Button>
            </DialogActions>
        </Dialog>
    );
}
