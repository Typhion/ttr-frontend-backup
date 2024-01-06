import {AppBar, Box, IconButton, Stack, Toolbar, Typography} from '@mui/material'
import {useContext} from 'react'
import SecurityContext from '../context/SecurityContext.ts'
import {useLocation} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from "@mui/icons-material/Menu";
import {useNavigate} from "react-router-dom";

type HeaderProps = {
    onOpenDrawer: () => void
}

export function AuthHeader({onOpenDrawer}: HeaderProps) {
    const {isAuthenticated} = useContext(SecurityContext)
    const navigate = useNavigate();

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
                        <img src="/src/assets/images/logo.png" alt="logo" style={{width: '50px', height: '50px'}}/>
                        <Typography variant="h6">
                            TTR
                        </Typography>
                    </Box>
                </IconButton>
                <Stack direction="row" sx={{justifySelf: 'end'}}>
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
