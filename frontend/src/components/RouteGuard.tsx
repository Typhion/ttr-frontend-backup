import { ReactElement, useContext } from 'react'
import SecurityContext from '../context/SecurityContext.ts'
import Button from '@mui/material/Button'

export interface RouteGuardProps {
    component: ReactElement
}

const RouteGuard = ({ component }: RouteGuardProps) => {
    const { isAuthenticated, login } = useContext(SecurityContext)

    if (isAuthenticated()) {
        return component
    } else {
        return <Button onClick={login}>Login</Button>
    }
}

export default RouteGuard
