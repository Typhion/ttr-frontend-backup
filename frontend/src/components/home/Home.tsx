import Button from "@mui/material/Button";
import {useContext, useState} from "react";
import SecurityContext from "../../context/SecurityContext.ts";
import {Box, Grid, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useJoinLobby} from "../../hooks/lobbyHooks/useJoinLobby.ts";
import {useQuickPlay} from "../../hooks/lobbyHooks/useQuickPlay.ts";
import otherImage from "../../assets/title-ticket-to-ride.png";
import {defaultTheme} from "../../assets/themes/defaultTheme.ts";

export default function Home() {
    const {isAuthenticated} = useContext(SecurityContext);
    const navigate = useNavigate();
    const joinLobby = useJoinLobby((uuid) => {
        navigate(`/lobby/${uuid}`);
    });
    const quickPlay = useQuickPlay((uuid) => {
        navigate(`/lobby/${uuid}`);
    });

    const {lobbyCode: paramLobbyCode} = useParams();
    const [lobbyCode, setLobbyCode] = useState(paramLobbyCode || "");

    const handleJoinLobbyClick = () => {
        joinLobby.mutate(lobbyCode);
    };

    const handleQuickPlayClick = () => {
        quickPlay.mutate();
    };

    if (isAuthenticated()) {
        return (
            <Box sx={{width: "100%", justifyContent: "center"}}>
            <Grid
                container
                direction={"column"}
                style={{
                    justifySelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100%"
                }}
            >
                <Grid item style={{marginBottom: "1vh"}}>
                    <img
                        style={{
                            margin: "auto",
                            width: "50%",
                            display: "block",
                        }}
                        alt="homepage"
                        src={otherImage}
                    />
                </Grid>
                <Grid direction={"row"} container sx={{ width: "100%", justifyContent: "center", paddingTop: "15vh" }}>
                    <Grid xs={6} item style={{ width: "100%", display: "flex" }}>
                            <TextField
                                label="Enter Lobby Code"
                                variant="outlined"
                                sx={{
                                    width: "100%"
                                }}
                                InputProps={{ sx: { borderBottomRightRadius: 0, borderTopRightRadius: 0 } }}
                                value={lobbyCode}
                                onChange={(e) => setLobbyCode(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    width: "25%",
                                    height: "100%",
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    borderRadius: "0 3px 3px 0",
                                    boxShadow: "0",
                                }}
                                onClick={handleJoinLobbyClick}
                            >
                                Join
                            </Button>
                    </Grid>
                </Grid>
                <Grid item sx={{ width: "100%", justifyContent: "center", display: "flex", paddingTop: "5vh" }}>
                    <Grid xs={6} item style={{ display: "flex" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                width: "100%",
                                textTransform: "none",
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                display: 'inherit',
                                color: defaultTheme.palette.text.primary,
                            }}
                            onClick={handleQuickPlayClick}
                        >
                            QuickPlay
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
            </Box>

        );
    } else {
        return <Box>Please log in to view the rest of this page</Box>;
    }
}