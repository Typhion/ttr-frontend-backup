import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import {GameInitDto, LobbyState, LobbyUserDto} from "../../model/LobbyState.ts";
import {useCreateGame} from "../../hooks/gameHooks/useCreateGame.ts";
import {useStartGame} from "../../hooks/gameHooks/useStartGame.ts";
import {useNavigate} from "react-router-dom";

type StartGameButtonType = {
    lobbyState: LobbyState,
    predicate: (player: LobbyUserDto) => boolean,
    predicate1: (player: LobbyUserDto) => boolean,
    lobbyId: string
}

export default function StartGameButton(props: StartGameButtonType) {
    const navigate = useNavigate();

    const startGame = useStartGame();
    const createGame = useCreateGame(
        (gameId) => {
            const lobbyId = props.lobbyId;
            startGame.mutate({lobbyId, gameId})
            navigate(`/game/${gameId}`)
        }
    )

    const allPlayersReady = props.lobbyState.lobbyUsersDto.every((player) => player.ready);

    const handleOnStartClick = (gameInitDto: GameInitDto) => {
        if (allPlayersReady) {
            createGame.mutate(gameInitDto)
        }
    }

    return <Box sx={{
        width: "33.33%", display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}>
        {props.lobbyState.lobbyUsersDto.some(props.predicate) && (
            <Button
                variant="contained"
                sx={{
                    width: "25%",
                    marginLeft: "10px",
                    backgroundColor: "green",
                    color: "white",
                }}
                onClick={() => handleOnStartClick(props.lobbyState.gameInitDto)}
                disabled={!props.lobbyState.lobbyUsersDto.find(props.predicate1) || !!props.lobbyState.gameId || !allPlayersReady}
            >
                Start Game
            </Button>
        )}
    </Box>;
}