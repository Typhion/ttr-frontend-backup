import { Box, Typography, Container, Paper, List, ListItem, Divider } from "@mui/material";

export default function Rules() {
    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Ticket to Ride: Game Rules
                </Typography>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Basic Rules Overview
                    </Typography>
                    <List sx={{ ml: 3 }}>
                        <ListItem>Players collect various types of train cards to claim railway routes connecting cities across the map of Europe.</ListItem>
                        <ListItem>Each player starts with four train car cards and between two and four route cards.</ListItem>
                        <ListItem>The longer the routes, the more points they earn.</ListItem>
                        <ListItem>Additional points come from fulfilling routes – goal cards that connect distant cities; and to the player who builds the longest continuous route.</ListItem>
                        <ListItem>Players take turns to either draw train car cards, claim a route, or draw additional destination tickets.</ListItem>
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        Special Rules for the Europe Edition
                    </Typography>
                    <List sx={{ ml: 3 }}>
                        <ListItem>Includes new elements such as Tunnels, Ferries, and Train Stations.</ListItem>
                        <ListItem>Tunnels may require additional train cards to be completed.</ListItem>
                        <ListItem>Ferries require locomotive cards in addition to regular train car cards.</ListItem>
                        <ListItem>Train Stations allow players to use an opponent's route to fulfill a route.</ListItem>
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        Winning the Game
                    </Typography>
                    <Typography paragraph>
                        The game ends when one player has three or fewer train cars left. <br/>
                        There is one final round of play, giving everyone a chance to improve their score.
                        Total scores are then calculated, adding points for completed routes and subtracting points for incomplete ones.
                        Additionally, players score four points for not using a train station.
                        The player with the longest continuous route receives a bonus.
                        The player with the highest score wins.
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}