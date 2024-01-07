import {AppBar, Box, IconButton, Stack, Toolbar, Typography} from '@mui/material'
import {useContext, useEffect} from 'react'
import SecurityContext from '../context/SecurityContext.ts'
import {useLocation} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from "@mui/icons-material/Menu";
import {useNavigate} from "react-router-dom";
import {useGetUserCredits} from "../hooks/userHooks/useGetUserCredits.ts";
import logoImage from "../assets/images/logo.png";
import ticketImage from "../assets/images/tickets/ticket.png";

type HeaderProps = {
    onOpenDrawer: () => void
}

export function AuthHeader({onOpenDrawer}: HeaderProps) {
    const {isAuthenticated, isLoading} = useContext(SecurityContext)
    const {data: userCredits, refetch} = useGetUserCredits();
    const navigate = useNavigate();

    useEffect(() => {
        refetch()
    }, [isAuthenticated]);

    const handleNavHome = () => {
        navigate(`/`);
    }
    const handleNavProfile = () => {
        navigate(`/profile`);
    }

    const location = useLocation();
    const excludePattern = /^\/game\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/; // Regex for UUID

    if (excludePattern.test(location.pathname)) {
        return null;
    }
    return (
        <AppBar position="static" sx={{mb: '50px'}}>
            <Toolbar sx={{display: 'grid', gridTemplateColumns: '1fr auto 1fr'}}>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={onOpenDrawer}
                            sx={{justifySelf: 'start'}}>
                    <MenuIcon/>
                </IconButton>
                <IconButton onClick={handleNavHome}>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <img src={logoImage} alt="logo" style={{width: '50px', height: '50px'}}/>
                        <Typography variant="h6">
                            TTR
                        </Typography>
                    </Box>
                </IconButton>

                <Stack direction="row" sx={{justifySelf: 'end'}}>
                    {isAuthenticated() && !isLoading && userCredits != undefined && userCredits >= 0 && (
                        <IconButton>
                            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography variant="h6">
                                    {userCredits}
                                </Typography>
                                <img src={ticketImage} alt="ticket" style={{width: '50px', height: '50px'}}/>
                            </Box>
                        </IconButton>)}
                    {isAuthenticated() &&
                        <IconButton size='large' onClick={handleNavProfile}>
                            <AccountCircleIcon
                                sx={{fontSize: 'inherit'}}/>
                        </IconButton>}
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
