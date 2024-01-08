import Dialog from "@mui/material/Dialog";
import {Box, Paper, PaperProps, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Draggable from "react-draggable";
function PaperComponent(props: PaperProps) {
    return (
        <Draggable
            handle="#LastTurnDialog"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}
interface LastTurnDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LastTurnDialog({isOpen, onClose}: LastTurnDialogProps) {
    return (
        <Dialog disableEscapeKeyDown={true} open={isOpen} onClose={onClose} PaperComponent={PaperComponent}>
            <Box style={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Last Turn
                </Typography>
                <Typography variant="body1" paragraph>
                    This is the last turn of the game. Please claim connections from your stations if you have any remaining.
                </Typography>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={onClose}>
                        Close
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
