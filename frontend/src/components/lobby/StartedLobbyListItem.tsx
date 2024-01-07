import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {LobbyState} from "../../model/LobbyState.ts";
import {Box, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useJoinLobby} from "../../hooks/lobbyHooks/useJoinLobby.ts";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import {useCurrentPlayer} from "../../hooks/gameHooks/useCurrentPlayer.ts";

export default function StartedLobbyListItem({props}: { props: LobbyState }) {
    const {loggedInUserId} = useContext(SecurityContext);
    const navigate = useNavigate();

    const joinLobby = useJoinLobby((uuid) => {
        navigate(`/lobby/${uuid}`);
    });

    const currentPlayer = useCurrentPlayer(props.gameId);

    const isCurrentPlayer = currentPlayer.data?.applicationUserId === loggedInUserId;

    const handleJoinLobbyClick = (lobby: LobbyState) => {
        if (lobby.code) {
            joinLobby.mutate(lobby.code);
        } else {
            const uuid = lobby.gameId
            if (uuid) {
                navigate(`/game/${uuid}`);
            }
        }
    };


    return <TableRow>
        <TableCell align="right">
            {props.lobbyUsersDto.length}/{props.maxSize}
        </TableCell>
        <TableCell align="right">
            {props.lobbyUsersDto.map((user, index) => (
                user.isHost && (
                    <Typography key={index}>
                        {user.applicationUserDto.username}
                    </Typography>
                )
            ))}
        </TableCell>
        <TableCell align="right">{props.lobbyUsersDto.map((user, index) => (
            user.isHost && (
                <Typography key={index}>
                    {props.isPublic ? <PublicIcon/> : <LockIcon/>}
                </Typography>
            )
        ))}</TableCell>
        <TableCell align="right" style={{alignItems: 'center'}}>
            {isCurrentPlayer ? (
                <>
                    <Typography style={{fontWeight: 'bold', color: 'green'}}>
                        Your Turn
                    </Typography>

                </>
            ) : <Box style={{marginRight: '8px'}}>{currentPlayer.data?.username}</Box>}
            {currentPlayer.data?.secondsLeft && currentPlayer.data?.secondsLeft > 0 ? (
                <>
                    {currentPlayer.data?.secondsLeft} seconds left
                </>
            ) : (
                'Turn ended'
            )}
        </TableCell>
        <TableCell align="right">
            <Button
            variant="contained"
            onClick={() => handleJoinLobbyClick(props)}
            disabled={props.lobbyUsersDto.length >= props.maxSize || props.bannedApplicationUsers.some(appuser => appuser.id === loggedInUserId)}
            style={{
                width: '120px',
                backgroundColor: props.bannedApplicationUsers.some(appuser => appuser.id === loggedInUserId) ? 'rgba(255, 0, 0, 0.5)' : ''
            }}
        >
            {(props.bannedApplicationUsers.some(appuser => appuser.id === loggedInUserId) ? 'BANNED' : 'Join Game')}
        </Button></TableCell>
    </TableRow>
}
