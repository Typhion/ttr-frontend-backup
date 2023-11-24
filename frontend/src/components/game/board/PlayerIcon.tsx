import {PlayerState} from "../../../model/GameState.ts";
import {Avatar, Badge, Box, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

interface PlayerIconProps {
    playerState: PlayerState;
}

export default function PlayerIcon({playerState}: PlayerIconProps) {
    const {score, wagonAmount, stationAmount} = playerState;

    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '5px solid grey', //should be the player color eventually
            borderRadius: '50%',
            width: '6vw',
            height: '6vw',
        }}>
            <Avatar sx={{width: '100%', height: '100%'}}>
                <PersonIcon sx={{fontSize: '200%'}}/>
            </Avatar>
            <Badge
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                badgeContent={<Typography variant="caption"
                                          sx={{fontSize: '0.8em'}}>{score}</Typography>} // Font size in em for relative sizing
                color="primary"
                sx={{
                    position: 'absolute',
                    transform: 'translate(50%, -40%)',
                    top: '35%',
                    right: '0%'
                }}
            />
            <Badge
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                badgeContent={<Typography variant="caption"
                                          sx={{fontSize: '0.8em'}}>{`${wagonAmount}/${stationAmount}`}</Typography>}
                color="secondary"
                sx={{
                    position: 'absolute',
                    transform: 'translate(50%, 40%)',
                    bottom: '35%',
                    right: '0%'
                }}
            />
        </Box>
    );
}
