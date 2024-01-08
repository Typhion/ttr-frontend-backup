import SecurityContext from "../../context/SecurityContext.ts";
import React, {useContext, useState} from "react";
import {usePublicLobbies} from "../../hooks/lobbyHooks/usePublicLobbies.ts";
import {Box, Grid, Paper, ToggleButton, ToggleButtonGroup, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import {useStartedLobbies} from "../../hooks/lobbyHooks/useStartedLobbies.ts";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import StartedLobbyListItem from "./StartedLobbyListItem.tsx";
import RefreshIcon from '@mui/icons-material/Refresh';
import OpenLobbyListItem from "./OpenLobbyListItem.tsx";
import {useCreateLobby} from "../../hooks/lobbyHooks/useCreateLobby.ts";
import {useNavigate} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

export default function LobbyList() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(SecurityContext);
    const [viewPublicLobbies, setViewPublicLobbies] = useState(true);
    const publicLobbies = usePublicLobbies();
    const startedLobbies = useStartedLobbies();
    const createLobby = useCreateLobby((uuid) => {
        navigate(`/lobby/${uuid}`);
    });

    const handleToggleView = (_: React.MouseEvent<HTMLElement>, newValue: boolean) => {
        if (newValue != null) {
            setViewPublicLobbies(newValue);
        }
    };

    const handleCreateLobbyClick = () => {
        createLobby.mutate();
    };

    if (isAuthenticated()) {
        const currentLobbies = viewPublicLobbies ? publicLobbies : startedLobbies;
        return (
            <Box>
                <Grid container sx={{
                    width: "80%",
                    margin: "auto",
                    justifyContent: 'center',
                }}>
                    <Grid item xs={1} sx={{
                        justifyContent: "left",
                        display: "flex"
                    }}>
                        <Tooltip title="Refresh lobbies" placement="top">
                            <Button
                                variant="contained"
                                sx={{marginTop: '2%', marginBottom: '1%'}}
                                onClick={() => currentLobbies.refetch()}
                            >
                                <RefreshIcon/>
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={10} sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: "flex"
                    }}>
                        <ToggleButtonGroup
                            value={viewPublicLobbies}
                            exclusive
                            color="success"
                            onChange={handleToggleView}
                            aria-label="view-type"
                        >
                            <ToggleButton
                                value={true}
                                aria-label="open-lobbies"
                            >
                                Open Lobbies
                            </ToggleButton>
                            <ToggleButton
                                value={false}
                                aria-label="started-lobbies"
                            >
                                Started Lobbies
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={1} sx={{
                        justifyContent: "right",
                        display: "flex"
                    }}>
                            <Button
                                variant="contained"
                                sx={{marginTop: '2%', marginBottom: '1%'}}
                                onClick={handleCreateLobbyClick}
                            >
                                <AddIcon/>
                            </Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper} sx={{
                    width: "80%",
                    margin: "auto",
                    justifyContent: 'center',
                }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Max Size</TableCell>
                                <TableCell align="right">Host</TableCell>
                                <TableCell align="right">Access</TableCell>
                                <TableCell
                                    align="right">{currentLobbies == publicLobbies ? 'Code' : 'Player turn'}</TableCell>
                                <TableCell align="right">Join</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <>
                                {currentLobbies.data && currentLobbies.data?.map((row, index) => {
                                    if (currentLobbies === publicLobbies) {
                                        return <OpenLobbyListItem key={index} props={row}/>;
                                    } else {
                                        return <StartedLobbyListItem key={index} props={row}/>;
                                    }
                                })}
                            </>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    } else {
        return <Box>Please log in to view the rest of this page</Box>;
    }
}
