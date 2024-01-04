import Dialog from "@mui/material/Dialog";
import {Box, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import ScoreDialog from "./ScoreDialog.tsx";
import {useNavigate} from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {SyntheticEvent, useState} from "react";
import {a11yProps, CustomTabPanel} from "../../profile/ProfilePage.tsx";
import LeaderBoardDialog from "./LeaderBoardDialog.tsx";

interface EndGameDialogProps {
    open: boolean;
    onClose: () => void;
    gameId: string;
}

export default function EndGameDialog({open, onClose, gameId}: EndGameDialogProps) {
    const [value, setValue] = useState(0);

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const navigate = useNavigate();

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Box>
                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="profile tabs" centered>
                            <Tab label="LeaderBoard" {...a11yProps(0)} />
                            <Tab label="Score" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <LeaderBoardDialog gameId={gameId}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <ScoreDialog gameId={gameId}/>
                    </CustomTabPanel>
                </Box>
                <Box sx={{textAlign: 'center'}}>
                    <Button onClick={() => navigate('/')}>
                        <Typography variant="body1">Go back to home</Typography>
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
}


