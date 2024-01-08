import {AppBar, Avatar, Box, IconButton, Stack, Toolbar, Typography} from '@mui/material'
import {useContext, useEffect} from 'react'
import SecurityContext from '../context/SecurityContext.ts'
import {useLocation} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {useNavigate} from "react-router-dom";
import {useGetUserCredits} from "../hooks/userHooks/useGetUserCredits.ts";
import logoImage from "../assets/images/logo.png";
import ticketImage from "../assets/images/tickets/ticket.png";
import {getAvatarImage} from "../model/Profile.ts";
import {useProfileForHeader} from "../hooks/userHooks/useProfileForHeader.ts";
import PersonIcon from "@mui/icons-material/Person";

type HeaderProps = {
    onOpenDrawer: () => void
}

export function AuthHeader({onOpenDrawer}: HeaderProps) {
    const {isAuthenticated, isLoading, loggedInUserId} = useContext(SecurityContext)
    const {data: userCredits, refetch} = useGetUserCredits();
    const {data: profile} = useProfileForHeader(loggedInUserId);
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
    const handleNavShop = () => {
        navigate(`/shop`);
    }

    let avatarImage: string | null = null;
    if (profile?.avatar?.image) {
        avatarImage = getAvatarImage(profile.avatar.image);
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
                        <IconButton onClick={handleNavShop}>
                            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography variant="h6">
                                    {userCredits}
                                </Typography>
                                <img src={ticketImage} alt="ticket" style={{width: '50px', height: '50px'}}/>
                            </Box>
                        </IconButton>)}
                    {isAuthenticated() &&
                        <IconButton size='large' onClick={handleNavProfile}>
                            <Avatar sx={{width: 40, height: 40}}>
                                {avatarImage ? (
                                    <Avatar src={avatarImage} alt="Profile_Header" sx={{width: '100%', height: '100%'}}/>
                                ) : (
                                    <PersonIcon sx={{fontSize: 'inherit'}}/>
                                )}
                            </Avatar>
                        </IconButton>}
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
