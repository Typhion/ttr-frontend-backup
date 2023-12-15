import {useContext} from 'react'
import SecurityContext from '../context/SecurityContext.ts'
import Button from '@mui/material/Button'
import {RouteGuardProps} from "./RouteGuard.tsx";
import {useNavigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";

const AdminRouteGuard = ({component}: RouteGuardProps) => {
    const {isAdmin} = useContext(SecurityContext)
    const navigate = useNavigate();

    if (isAdmin()) {
        return component
    } else {
        return (
            <Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <Typography align="center">You do not have the right authorisation to view this page</Typography>
                <Button onClick={() => navigate("/")}>Go to Home</Button>
            </Box>
        )
    }
}

export default AdminRouteGuard