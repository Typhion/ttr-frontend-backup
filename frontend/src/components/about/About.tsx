import { useTranslation } from 'react-i18next';
import {
    Box,
    Typography,
    Container,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton
} from "@mui/material";
import ComputerIcon from '@mui/icons-material/Computer';
import PeopleIcon from '@mui/icons-material/People';
import GamesIcon from '@mui/icons-material/Games';

export default function About() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <IconButton onClick={() => changeLanguage('en')} size="large">
                        EN
                    </IconButton>
                    <IconButton onClick={() => changeLanguage('fr')} size="large">
                        FR
                    </IconButton>
                    <IconButton onClick={() => changeLanguage('nl')} size="large">
                        NL
                    </IconButton>
                </Box>

                <Typography variant="h3" component="h1" gutterBottom>
                    {t('header')}
                </Typography>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {t('welcomeTitle')}
                    </Typography>
                    <Typography paragraph>
                        {t('welcomeDescription')}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        {t('whyPlayHeader')}
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <ComputerIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={t('accessibleAnytime')}
                                secondary={t('accessibleDescription')}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={t('connectWithFriends')}
                                secondary={t('connectDescription')}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <GamesIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={t('engagingGameplay')}
                                secondary={t('gameplayDescription')}
                            />
                        </ListItem>
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        {t('joinCommunityHeader')}
                    </Typography>
                    <Typography paragraph>
                        {t('communityDescription')}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}