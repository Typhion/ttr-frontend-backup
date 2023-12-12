import Button from '@mui/material/Button'
import {Box, IconButton, Stack, Typography} from '@mui/material'
import { useContext } from 'react'
import SecurityContext from '../context/SecurityContext.ts'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useNavigate} from "react-router-dom";

export function AuthHeader() {
    const { isAuthenticated, logout, loggedInUser } = useContext(SecurityContext)
    const navigate = useNavigate();

    const handleNavProfile = () => {
        navigate(`/profile`);
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
                    <IconButton sx={{ mt: 1 }} onClick={handleNavProfile}>
                        <AccountCircleIcon fontSize={"large"} />
                    </IconButton>
                </>
            )}
        </Stack>
    )
}
