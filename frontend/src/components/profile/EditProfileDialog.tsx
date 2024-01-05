import {useEffect, useState} from "react";
import {
    Button, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import * as z from 'zod';
import {useChangeUsername} from "../../hooks/userHooks/useChangeUsername.ts";
import {useCheckIfUsernameExists} from "../../hooks/userHooks/useCheckIfUsernameExists.ts";

interface EditProfileDialogProps {
    isOpen: boolean;
    onClose: () => void;
    oldUsername: string;
    refetch: () => void;
}
const usernameSchema = z.string().min(3).max(60);
export default function EditProfileDialog({isOpen, onClose, oldUsername, refetch}: EditProfileDialogProps) {
    const [username, setUsername] = useState<string>(oldUsername);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const {data: usernameExists} = useCheckIfUsernameExists(username);
    const changeUsername = useChangeUsername(() => {
        refetch();
    });

    useEffect(() => {
        validateUsername(username);
    }, [username]);

    const handleUsernameChange = (value: string) => {
        setUsername(value);
    }

    const validateUsername = (value: string) => {
        try {
            usernameSchema.parse(value);
            if (!usernameExists) {
                setUsernameError(null);
            } else {
                setUsernameError('Username already exists');
            }
        } catch (error) {
            setUsernameError('Invalid username');
        }
    }

    const handleChangeUsername = () => {
        changeUsername.mutate(username);
        onClose();
    }

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle id={'InviteFriendDialog'}>Edit Profile</DialogTitle>
            <DialogContent>
                <DialogContentText color={'black'}>
                    Enter your new username:
                </DialogContentText>
                <TextField
                    label="Username"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    error={Boolean(usernameError)}
                    helperText={usernameError}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button
                    onClick={handleChangeUsername}
                    variant="contained"
                    disabled={Boolean(usernameError)}
                >
                    Save Profile
                </Button>
            </DialogActions>
        </Dialog>
    )
}