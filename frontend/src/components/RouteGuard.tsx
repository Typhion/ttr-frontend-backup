import { ReactElement, useContext } from 'react'
import SecurityContext from '../context/SecurityContext.ts'
import Button from '@mui/material/Button'
import {Box, Typography} from "@mui/material";
import Loader from "./general/Loader.tsx";

export interface RouteGuardProps {
    component: ReactElement
}

const RouteGuard = ({ component }: RouteGuardProps) => {
    const { isAuthenticated, isLoading, login } = useContext(SecurityContext)

    if (isLoading) return <Loader>Loading login status...</Loader>;

    if (isAuthenticated()) {
        return component
    } else {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh'
            }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Login to view this page
                </Typography>
                <Button variant="outlined" onClick={login}>
                    Login
                </Button>
            </Box>
        );
    }
}

export default RouteGuard
