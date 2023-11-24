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

export default function Game() {
    const {uuid} = useParams<{ uuid: string }>();
    const {isLoading: isLoadingGame, isError: isErrorGame, data: game} = useGame(uuid!);
    const {isLoading, isError, data: gameState} = useGameState(uuid ?? '', game?.players[0] ?? '');
    // the above is only temporary, maybe get id from session later.
    // this method also throws a CORS error because it doesn't immediately get the value for playerid

    if (isLoadingGame || isLoading) return <Loader>Loading Game Details...</Loader>;

    if (isErrorGame || isError || !game || !gameState) {
        return <Alert severity="error">Unable to load this game's details.</Alert>;
    }

    if (gameState.lastUsedWagonCard === null) {
        gameState.lastUsedWagonCard = 'back';
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={2} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
            }}>
                {/* Left Column */}
                <WagonCardPile cardCount={gameState.usedWagonCardPileSize} cardColor={gameState.lastUsedWagonCard}
                               onClick={() => {
                               }}/>
                <WagonCardPile cardCount={gameState.wagonCardPileSize} onClick={() => {
                }}/>
                <FaceUpWagonCards faceUpWagonCards={gameState.faceUpWagonCards}/>
            </Grid>
            <Grid item xs={8}>
                <Board boardUuid={game.board}/>
            </Grid>
            <Grid item xs={2}>
                {/* Right Column */}
                <Grid container direction="column" alignItems="center" justifyContent="space-evenly" style={{height: '80vh'}}>
                    {gameState.players.map((playerState, index) => (
                        <Grid item key={index}>
                            <PlayerIcon playerState={playerState} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{
                backgroundColor: theme => theme.palette.secondary.main,
                height: '20vh',
                position: 'relative', // Make the container relative for absolute positioning
            }}>
                {/* Large Bottom Bar */}
                <Grid container direction="row">
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <PlayerWagonCards  wagonCards={gameState.privateGameState.wagonCards}
                                          onClick={() => console.log("temp")}/>
                    </Grid>
                    <Grid item xs={2} sx={{ bottom: 0, right: 0}}>
                        <PlayerInformation playerState={gameState.players[0]}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
