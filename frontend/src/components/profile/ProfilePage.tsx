import {Box} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import Friends from "./friend/Friends.tsx";
import AchievementPage from "./achievement/AchievementPage.tsx";
import Profile from "./Profile.tsx";
import MatchHistory from "./statistic/MatchHistory.tsx";
import {useParams} from "react-router-dom";
import SecurityContext from "../../context/SecurityContext.ts";

export default function ProfilePage() {
    const { uuid } = useParams<{ uuid: string }>();
    const { loggedInUserId } = useContext(SecurityContext);
    const [currentTab, setCurrentTab] = useState(0);

    useEffect(() => {
        setCurrentTab(0);
    }, [uuid]);

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const isOwnProfile = uuid === loggedInUserId || uuid === undefined;

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentTab} onChange={handleChange} aria-label="profile tabs" centered>
                    <Tab label="Profile" {...a11yProps(0)} />
                    {isOwnProfile && <Tab label="Friends" {...a11yProps(1)} />}
                    {isOwnProfile && <Tab label="Achievements" {...a11yProps(2)} />}
                    {isOwnProfile && <Tab label="Match History" {...a11yProps(3)} />}
                </Tabs>
            </Box>
            <CustomTabPanel value={currentTab} index={0}>
                <Profile uuid={isOwnProfile ? undefined : uuid}/>
            </CustomTabPanel>
            {isOwnProfile && (
                <CustomTabPanel value={currentTab} index={1}>
                    <Friends/>
                </CustomTabPanel>
            )}
            {isOwnProfile && (
            <CustomTabPanel value={currentTab} index={2}>
                <AchievementPage/>
            </CustomTabPanel>
            )}
            {isOwnProfile && (
                <CustomTabPanel value={currentTab} index={3}>
                    <MatchHistory/>
                </CustomTabPanel>
            )}
        </Box>
    );
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </Box>
    );
}

export function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
