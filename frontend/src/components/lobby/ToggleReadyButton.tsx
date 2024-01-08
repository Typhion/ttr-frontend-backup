import Button from "@mui/material/Button";
import {Box} from "@mui/material";
import {useSetReady} from "../../hooks/lobbyHooks/useSetReady.ts";
import {LobbyState} from "../../model/LobbyState.ts";
import {QueryObserverResult} from "@tanstack/react-query";

type ToggleReadyButtonType = {
    lobbyState: LobbyState;
    lobbyId: string;
    refetch: () => Promise<QueryObserverResult<LobbyState | null | undefined, unknown>>,
    loggedInUserId: string | undefined;
    readyCheck: boolean;
}

export default function ToggleReadyButton({lobbyState, lobbyId, refetch, loggedInUserId, readyCheck}: ToggleReadyButtonType) {
    const setReady = useSetReady()

    const handleOnReadyClick = () => {
        setReady.mutate(lobbyId);
        refetch();
    }

    return <Box sx={{
        width: '33.33%', display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        {lobbyState.lobbyUsersDto.some(
            (player) => player.applicationUserDto.id === loggedInUserId
        ) && (
            <Button
                variant="contained"
                sx={{
                    width: '10%',
                    margin: 'auto',
                    backgroundColor: readyCheck ? 'green' : 'red',
                    color: 'white',
                }}
                onClick={handleOnReadyClick}
                disabled={!!lobbyState.gameId}
            >
                Ready
            </Button>
        )}
    </Box>;
}