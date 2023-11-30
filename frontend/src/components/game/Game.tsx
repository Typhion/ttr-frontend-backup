import {useParams} from "react-router-dom";
import {useGame} from "../../hooks/useGame.ts";
import {Alert, Grid, Typography} from "@mui/material";
import Loader from "../general/Loader.tsx";
import Board from "./board/Board.tsx";
import WagonCardPile from "./board/WagonCardPile.tsx";
import {useGameState} from "../../hooks/useGameState.ts";
import FaceUpWagonCards from "./board/FaceUpWagonCards.tsx";
import PlayerWagonCards from "./board/PlayerWagonCards.tsx";
import PlayerIcon from "./board/PlayerIcon.tsx";
import PlayerInformation from "./board/PlayerInformation";
import {usePickRandomWagonCard} from "../../hooks/usePickRandomWagonCard";
import {useEffect, useState} from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RouteCardsPile from "./board/RouteCardsPile";
import PlayerRouteCards from "./board/PlayerRouteCards.tsx";

function GameContent({ gameId, defaultPlayerId, boardId }: { gameId: string, defaultPlayerId: string, boardId: string }) {
    const [playerId, setPlayerId] = useState(defaultPlayerId);
    const [shouldRefetch, setShouldRefetch] = useState(true);
    const { isLoading, isError, data: gameState } = useGameState(gameId, playerId, shouldRefetch);
    const { data: game } = useGame(gameId);

    const isPlayersTurn = gameState && game && game.players[gameState.playerTurnIndex] === playerId;

    useEffect(() => {
        if (isPlayersTurn !== undefined && isPlayersTurn) {
            setShouldRefetch(false);
        } else setShouldRefetch(true);
    }, [isPlayersTurn]);


    const { refetch: refetchGameState } = useGameState(gameId, playerId, shouldRefetch);
    const pickRandomWagonCardMutation = usePickRandomWagonCard(refetchGameState);

    if (isLoading) return <Loader>Loading Game Details...</Loader>;

    if (isError || !gameState) {
        return <Alert severity="error">Unable to load this game's details.</Alert>;
    }

    if (gameState.lastUsedWagonCard === null) {
        gameState.lastUsedWagonCard = 'back';
    }

    if (playerId === undefined) {
        return <Alert severity="error">Unable to load this game's details.</Alert>;
    }

    if (boardId === undefined) {
        return <Alert severity="error">Unable to load this game's details.</Alert>;
    }

    if (game === undefined) {
        return <Alert severity="error">Unable to load this game's details.</Alert>;
    }

    if (isPlayersTurn === undefined) {
        return <Alert severity="error">Unable to load this game's details.</Alert>;
    }



    return (
        <Grid container>
            <Grid item xs={2} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
            }}>
                {/* Left Column */}
                <RouteCardsPile boardId={boardId} playerId={playerId} routes={gameState.privateGameState.tempRouteCards}
                                pileSize={gameState.routeCardsPileSize} gameId={gameId} myTurn={isPlayersTurn}/>
                <WagonCardPile cardCount={gameState.usedWagonCardPileSize}
                               cardColor={gameState.lastUsedWagonCard}
                               onClick={() => console.log("unimplemented")}
                />
                <WagonCardPile cardCount={gameState.wagonCardPileSize}
                               onClick={() => {
                                   pickRandomWagonCardMutation.mutate({
                                       playerId: playerId,
                                       boardId: boardId,
                                   });
                               }}
                               myTurn={isPlayersTurn}
                />
                <FaceUpWagonCards faceUpWagonCards={gameState.faceUpWagonCards} playerId={playerId} boardId={boardId}
                                  gameId={gameId} myTurn={isPlayersTurn}/>
            </Grid>
            <Grid item xs={8}>
                <Board
                    boardUuid={boardId}
                    playerUuid={playerId}
                    cities={gameState.cities}
                    connections={gameState.connections}
                    connectionTiles={gameState.connectionTiles}
                    gameId={gameId}
                    myTurn={isPlayersTurn}
                />
            </Grid>
            <Grid item xs={2}>
                {/* Right Column */}
                <Grid container direction="column" alignItems="center" justifyContent="space-evenly" style={{height: '80vh'}}>

                    <Typography variant="body2" sx={{
                        fontWeight: 'bold'
                    }}>{`Turn ${gameState.turn}`}</Typography>

                    {gameState.players.map((playerState, index) => (
                        <Grid item key={index} container alignItems="center">
                            <Grid item xs={2}/>
                            <Grid item xs={2}
                                  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                {gameState.playerTurnIndex === index && (
                                    <ArrowForwardIosIcon sx={{marginRight: 1}}/>
                                )}
                            </Grid>
                            <Grid item xs={4} onClick={() => setPlayerId(game.players[index])} sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                {game.players[index] === playerId && (
                                    <Typography variant="body2" sx={{
                                        color: 'green',
                                        fontWeight: 'bold',
                                        marginBottom: 1
                                    }}>You</Typography>
                                )}
                                <PlayerIcon playerState={playerState}/>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{
                backgroundColor: theme => theme.palette.secondary.main,
                height: '20vh',
                position: 'relative'
            }}>
                {/* Large Bottom Bar */}
                <Grid container direction="row">
                    <Grid item xs={2}>
                        <PlayerRouteCards routeCards={gameState.privateGameState.routeCards}/>
                    </Grid>
                    <Grid item xs={8}>
                        <PlayerWagonCards wagonCards={gameState.privateGameState.wagonCards}
                                            tempWagonCards={gameState.privateGameState.tempWagonCards}
                                          onClick={() => console.log("clicked wagon cards")}/>
                    </Grid>
                    <Grid item xs={2}>
                        <PlayerInformation playerState={gameState.players[0]}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default function Game() {
    const {uuid} = useParams<{ uuid: string }>();
    const {isLoading: isLoadingGame, isError: isErrorGame, data: game} = useGame(uuid!);

    if (isLoadingGame) return <Loader>Loading Game Details...</Loader>;

    if (isErrorGame || !game || !uuid) {
        return <Alert severity="error">Unable to load this game's details.</Alert>;
    }

    return <GameContent gameId={uuid} defaultPlayerId={game.players[0]} boardId={game.board!}/>;
}
