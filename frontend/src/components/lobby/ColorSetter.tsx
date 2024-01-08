import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {LobbyState} from "../../model/LobbyState.ts";
import {QueryObserverResult} from "@tanstack/react-query";
import {useSetColor} from "../../hooks/lobbyHooks/useSetColor.ts";
import {defaultTheme} from "../../assets/themes/defaultTheme.ts";

type ToggleReadyButtonType = {
    lobbyState: LobbyState;
    lobbyId: string;
    refetch: () => Promise<QueryObserverResult<LobbyState | null | undefined, unknown>>,
    loggedInUserId: string | undefined;
}

export default function ColorSetter({lobbyState, lobbyId, refetch, loggedInUserId}: ToggleReadyButtonType) {
    const [userColor, setUserColor] = useState<string | null>(null);
    const setColor = useSetColor()

    const handleColorChange = (newColor: string) => {
        setUserColor(newColor);
    };

    const handleOnColorClick = (color: string) => {
        setColor.mutate({lobbyId, color});
        refetch();
    }

    return <>
        {lobbyState.lobbyUsersDto.some(
            (player) => player.applicationUserDto.id === loggedInUserId
        ) && !lobbyState.gameId && (
            <Box
                sx={{
                    width: "100%",
                    marginBottom: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '25px',
                    justifyContent: 'center',
                    maxWidth: '40vw',
                    border: defaultTheme.palette.primary.main,
                    borderRadius: "3px",
                    borderStyle:  "solid",
                    borderWidth: "1px",
                    padding: "4px"
                }}
            >
                <input
                    type="color"
                    value={userColor || lobbyState.lobbyUsersDto.find(
                        (player) => player.applicationUserDto.id === loggedInUserId
                    )?.color || '#000000'}
                    onChange={(e) => handleColorChange(e.target.value)}
                    style={{
                        marginRight: '10px',
                        border: 'none',
                        width: '30px',
                        height: '30px',
                        borderRadius: '100%',
                        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
                        cursor: 'pointer',
                        outline: 'none',
                    }}
                />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "green",
                        color: "white",
                        marginLeft: '10px',
                    }}
                    onClick={() => handleOnColorClick(userColor || '#000000')}
                >
                    Set Color
                </Button>
            </Box>

        )}
    </>;
}