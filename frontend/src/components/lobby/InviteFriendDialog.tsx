import React, {SyntheticEvent, useEffect, useState} from 'react';
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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {useSendInviteUsername} from "../../hooks/lobbyHooks/useSendInviteUsername.ts";

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
    const [username, setUsername] = useState<string>("");
    const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
    const [value, setValue] = useState(0);
    const sendInviteMail = useSendInviteMail();
    const sendInviteUsername = useSendInviteUsername();
    const sendInviteFriends = useSendInviteFriends();

    useEffect(() => {
        if (isOpen) {
            refetch();
        }
    }, [isOpen, refetch]);

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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

    const handleUsernameChange = (value: string) => {
        setUsername(value);
    };

    const handleFriendClick = (friendId: string) => {
        setSelectedFriends((prevSelectedFriends) =>
            prevSelectedFriends.includes(friendId)
                ? prevSelectedFriends.filter((id) => id !== friendId)
                : [...prevSelectedFriends, friendId]
        );
    };

    const handleSendInvite = () => {
        if (email || username) {
            if (value === 0) {
                sendInviteMail.mutate({lobbyId: lobbyId, email: email});
            } else {
                sendInviteUsername.mutate({lobbyId: lobbyId, username: username});
            }

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
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                        <Tab label="Email" {...a11yProps(0)} />
                        <Tab label="Username" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
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
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <DialogContentText color={'black'}>
                        Enter the username of the friend you want to invite.
                    </DialogContentText>
                    <TextField
                        label="Username"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={(e) => handleUsernameChange(e.target.value)}
                    />
                </CustomTabPanel>
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
                    disabled={Boolean(emailError) && value !== 1}
                >
                    Send Invite
                </Button>
            </DialogActions>
        </Dialog>
    );
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
