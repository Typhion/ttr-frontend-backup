import Button from '@mui/material/Button'
import {Box, IconButton, Stack, Typography} from '@mui/material'
import { useContext } from 'react'
import SecurityContext from '../context/SecurityContext.ts'
import {useLocation} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useNavigate} from "react-router-dom";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export function AuthHeader() {
    const { isAuthenticated, logout, loggedInUser, isAdmin } = useContext(SecurityContext)
    const navigate = useNavigate();

    const handleNavProfile = () => {
        navigate(`/profile`);
    }

    const handleNavAdminScreen = () => {
        navigate(`/admin/users`);
    }

    const location = useLocation();
    const excludePattern = /^\/game\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/; // Regex for UUID

    if (excludePattern.test(location.pathname)) {
        return null;
    }
    return (
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1, mx: 2, mb: 2 }}>
            {isAuthenticated() && (
                <>
                    <Typography>Hello {loggedInUser}</Typography>
                    <Button type="submit" variant="contained" sx={{ mt: 1 }} onClick={logout}>
                        Log out
                    </Button>
                    <Box flexGrow={1} />
                    {isAdmin() && (
                        <IconButton sx={{ mt: 1 }} onClick={handleNavAdminScreen}>
                            <AdminPanelSettingsIcon fontSize={"large"}/>
                        </IconButton>
                    )}
                    <IconButton sx={{ mt: 1 }} onClick={handleNavProfile}>
                        <AccountCircleIcon fontSize={"large"} />
                    </IconButton>
                </>
            )}
        </Stack>
    )
}
