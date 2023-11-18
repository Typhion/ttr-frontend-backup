import {useParams} from "react-router-dom";
import {useGame} from "../../hooks/useGame.ts";
import {Alert} from "@mui/material";
import Loader from "../general/Loader.tsx";
import {Board} from "./board/Board.tsx";

export default function Game() {
    const { uuid } = useParams<{ uuid: string }>();
    const { isLoading, isError, data: game } = useGame(uuid!);

    if (isLoading) return <Loader>Loading Game Details...</Loader>;

    if (isError || !game) {
        return <Alert severity="error">Unable to load this game's details.</Alert>;
    }

    return (
        <Board boardUuid={
            game.board
        } />
    )
}