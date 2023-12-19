import {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";

import * as z from 'zod';
import {useSendInviteMail} from "../../hooks/useSendInviteMail.ts";

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
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const sendInviteMail = useSendInviteMail();

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

    const handleSendInvite = () => {
        sendInviteMail.mutate({lobbyId: lobbyId, email: email});
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle id={"InviteFriendDialog"}>
                Send Invite
            </DialogTitle>
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
