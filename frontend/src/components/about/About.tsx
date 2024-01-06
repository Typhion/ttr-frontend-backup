import { Box, Typography, Container, Paper, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ComputerIcon from '@mui/icons-material/Computer';
import PeopleIcon from '@mui/icons-material/People';
import GamesIcon from '@mui/icons-material/Games';

export default function About() {
    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    About Ticket to Ride Online
                </Typography>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Welcome to the World of Online Board Gaming!
                    </Typography>
                    <Typography paragraph>
                        Ticket to Ride Online brings the excitement of the classic board game to your screen, allowing you to compete with players from around the world. Dive into a thrilling journey where strategy and luck play a vital role in connecting cities and reaching your destinations.
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        Why Play Ticket to Ride Online?
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <ComputerIcon />
                            </ListItemIcon>
                            <ListItemText primary="Accessible Anytime, Anywhere" secondary="Play from the comfort of your home or on-the-go, with seamless online experiences." />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Connect with Friends and Family" secondary="Invite friends or family members to join you in a game, or make new connections with players worldwide." />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <GamesIcon />
                            </ListItemIcon>
                            <ListItemText primary="Engaging and Strategic Gameplay" secondary="Enjoy the classic gameplay with added online features, enhancing your gaming experience." />
                        </ListItem>
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        Join the Community
                    </Typography>
                    <Typography paragraph>
                        Become a part of a growing community of board game enthusiasts. Share tips, strategies, and fun moments as you embark on this digital rail adventure!
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}