import {useParams} from "react-router-dom";
import {useGame} from "../../hooks/useGame.ts";
import {Alert, Grid} from "@mui/material";
import Loader from "../general/Loader.tsx";
import Board from "./board/Board.tsx";
import WagonCardPile from "./board/WagonCardPile.tsx";
import {useGameState} from "../../hooks/useGameState.ts";
import FaceUpWagonCards from "./board/FaceUpWagonCards.tsx";

export default function Game() {
    const {uuid} = useParams<{ uuid: string }>();
    const {isLoading: isLoadingGame, isError: isErrorGame, data: game} = useGame(uuid!);
    const {isLoading, isError, data: gameState} = useGameState(uuid!);

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
                <WagonCardPile cardCount={gameState.usedWagonCardPileSize} cardColor={gameState.lastUsedWagonCard} onClick={() => {
                }}/>
                <WagonCardPile cardCount={gameState.wagonCardPileSize} onClick={() => {
                }}/>
                <FaceUpWagonCards faceUpWagonCards={gameState.faceUpWagonCards} />
            </Grid>
            <Grid item xs={8}>
                <Board boardUuid={game.board}/>
            </Grid>
            <Grid item xs={2}>
                {/* Right Column */}
            </Grid>
            <Grid item xs={12} sx={{
                backgroundColor: theme => theme.palette.secondary.main,
                height: '20vh'
            }}>
                {/* Large Bottom Bar */}
            </Grid>
        </Grid>
    )
}
