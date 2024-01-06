import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import {Link} from 'react-router-dom'
import {useContext} from "react";
import SecurityContext from "../context/SecurityContext.ts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import GavelIcon from '@mui/icons-material/Gavel';

interface NavigationProps {
    isOpen: boolean
    onClose: () => void
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
    const { isAdmin, logout, isAuthenticated } = useContext(SecurityContext);

    const handleLogout = () => {
        logout();
        onClose();
    }

    const menuItems = [
        { label: 'Home', link: '/', icon: <HomeIcon /> },
        { label: 'Lobbies', link: '/lobby', icon: <SportsEsportsIcon /> },
        { label: 'Leaderboard', link: '/leaderboard', icon: <LeaderboardIcon /> },
        ...(isAuthenticated() ? [{ label: 'My Profile', link: '/profile', icon: <AccountCircleIcon /> }] : []),
        ...(isAdmin() ? [{ label: 'Admin Panel', link: '/admin/users', icon: <AdminPanelSettingsIcon /> }] : []),
        { label: 'Rules', link: '/rules', icon: <GavelIcon /> },
        { label: 'About', link: '/about', icon: <InfoIcon /> },
        ...(isAuthenticated() ? [{ label: 'Logout', action: handleLogout, icon: <LogoutIcon /> }] : [])
    ];

    return (
        <Drawer open={isOpen} onClose={onClose}>
            <List sx={{ width: 250 }}>
                {menuItems.map((menuItem) => (
                    <ListItem disableGutters key={menuItem.label}>
                        {menuItem.link ? (
                            <ListItemButton component={Link} to={menuItem.link} onClick={onClose}>
                                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                                <ListItemText primary={menuItem.label} />
                            </ListItemButton>
                        ) : (
                            <ListItemButton onClick={menuItem.action ? menuItem.action : onClose}>
                                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                                <ListItemText primary={menuItem.label} />
                            </ListItemButton>
                        )}
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
