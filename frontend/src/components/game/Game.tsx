import {useParams} from "react-router-dom";
import {useGame} from "../../hooks/useGame.ts";
import {Alert, Grid} from "@mui/material";
import Loader from "../general/Loader.tsx";
import Board from "./board/Board.tsx";
import WagonCardPile from "./board/WagonCardPile.tsx";
import {useGameState} from "../../hooks/useGameState.ts";
import FaceUpWagonCards from "./board/FaceUpWagonCards.tsx";
import PlayerWagonCards from "./board/PlayerWagonCards.tsx";
import PlayerIcon from "./board/PlayerIcon.tsx";
import PlayerInformation from "./board/PlayerInformation";
import {usePickRandomWagonCard} from "../../hooks/usePickRandomWagonCard";

function GameContent({gameId, playerId, boardId}: { gameId: string, playerId: string, boardId: string }) {
    const {isLoading, isError, data: gameState} = useGameState(gameId, playerId);
    const {refetch: refetchWagonCardPile} = useGameState(gameId, playerId);
    const pickRandomWagonCardMutation = usePickRandomWagonCard(refetchWagonCardPile)

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
                <WagonCardPile cardCount={gameState.usedWagonCardPileSize}
                               cardColor={gameState.lastUsedWagonCard}
                               onClick={() => console.log("unimplemented")}/>
                <WagonCardPile cardCount={gameState.wagonCardPileSize}
                               onClick={() => {
                                   pickRandomWagonCardMutation.mutate({
                                       playerId: playerId,
                                       boardId: boardId,
                                   });
                               }}/>
                <FaceUpWagonCards faceUpWagonCards={gameState.faceUpWagonCards} playerId={playerId} boardId={boardId}
                                  gameId={gameId}/>
            </Grid>
            <Grid item xs={8}>
                <Board
                    boardUuid={boardId}
                    cities={gameState.cities}
                />
            </Grid>
            <Grid item xs={2}>
                {/* Right Column */}
                <Grid container direction="column" alignItems="center" justifyContent="space-evenly"
                      style={{height: '80vh'}}>
                    {gameState.players.map((playerState, index) => (
                        <Grid item key={index}>
                            <PlayerIcon playerState={playerState}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{
                backgroundColor: theme => theme.palette.secondary.main,
                height: '20vh',
            }}>
                {/* Large Bottom Bar */}
                <Grid container direction="row">
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <PlayerWagonCards wagonCards={gameState.privateGameState.wagonCards}
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

    return <GameContent gameId={uuid} playerId={game.players[0]} boardId={game.board!}/>;
}
