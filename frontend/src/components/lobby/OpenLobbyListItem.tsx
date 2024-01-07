import {LobbyState} from "../../model/LobbyState.ts";
import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";
import {useNavigate} from "react-router-dom";
import {useJoinLobby} from "../../hooks/lobbyHooks/useJoinLobby.ts";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Typography} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";

export default function OpenLobbyListItem({props}: { props: LobbyState }) {
    const {loggedInUserId} = useContext(SecurityContext);
    const navigate = useNavigate();

    const joinLobby = useJoinLobby((uuid) => {
        navigate(`/lobby/${uuid}`);
    });

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
        <TableCell align="right">
            {props.code}
        </TableCell>
        <TableCell align="right"><Button
            variant="contained"
            onClick={() => handleJoinLobbyClick(props)}
            disabled={props.lobbyUsersDto.length >= props.maxSize || props.bannedApplicationUsers.some(appuser => appuser.id === loggedInUserId)}
            style={{
                width: '120px',
                backgroundColor: props.bannedApplicationUsers.some(appuser => appuser.id === loggedInUserId) ? 'rgba(255, 0, 0, 0.5)' : ''
            }}
        >
            {props.code ? (props.bannedApplicationUsers.some(appuser => appuser.id === loggedInUserId) ? 'BANNED' : 'Join Lobby') : 'Join Game'}
        </Button></TableCell>
    </TableRow>
}
