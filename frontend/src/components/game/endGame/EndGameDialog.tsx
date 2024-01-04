import Dialog from "@mui/material/Dialog";
import {Box, DialogTitle, Paper, PaperProps} from "@mui/material";
import Button from "@mui/material/Button";
import ScoreDialog from "./ScoreDialog.tsx";
import {useNavigate} from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {SyntheticEvent, useState} from "react";
import {a11yProps, CustomTabPanel} from "../../profile/ProfilePage.tsx";
import LeaderBoardDialog from "./LeaderBoardDialog.tsx";
import StatsDialog from "./StatsDialog.tsx";
import Draggable from "react-draggable";

interface EndGameDialogProps {
    open: boolean;
    onClose: () => void;
    gameId: string;
}

function PaperComponent(props: PaperProps) {
    return (
        <Draggable
            handle="#EndGameDialog"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export default function EndGameDialog({open, onClose, gameId}: EndGameDialogProps) {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Dialog disableEscapeKeyDown={true} open={open} onClose={onClose} maxWidth="sm" fullWidth
                PaperComponent={PaperComponent}>
            <DialogTitle id={"EndGameDialog"} sx={{
                cursor: 'all-scroll'
            }}/>
            <Box>
                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider', cursor: 'all-scroll'}} id={"EndGameDialog"} >
                        <Tabs value={value} onChange={handleChange} aria-label="profile tabs" centered>
                            <Tab label="LeaderBoard" {...a11yProps(0)} />
                            <Tab label="Score" {...a11yProps(1)} />
                            <Tab label="Stats" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <LeaderBoardDialog gameId={gameId}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <ScoreDialog gameId={gameId}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <StatsDialog gameId={gameId}/>
                    </CustomTabPanel>
                </Box>
                <Box sx={{textAlign: 'center'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/')}
                        sx={{
                            marginBottom: '3%',
                        }}
                    >
                        Go Back to Home
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
}
