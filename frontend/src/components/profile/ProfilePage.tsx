import {Box} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, {SyntheticEvent, useState} from "react";
import Friends from "./friend/Friends.tsx";
import AchievementPage from "./achievement/AchievementPage.tsx";
import Profile from "./Profile.tsx";
import MatchHistory from "./statistic/MatchHistory.tsx";

export default function ProfilePage() {
    const [value, setValue] = useState(0);

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="Profile" {...a11yProps(0)} />
                    <Tab label="Friends" {...a11yProps(1)} />
                    <Tab label="Achievements" {...a11yProps(2)} />
                    <Tab label="Match History" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Profile/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Friends/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <AchievementPage/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <MatchHistory/>
            </CustomTabPanel>
        </Box>
    )
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