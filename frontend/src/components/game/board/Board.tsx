import {useBoardImage} from "../../../hooks/useBoardImage.ts";
import Loader from "../../general/Loader.tsx";
import {Alert} from "@mui/material";

interface BoardProps {
    boardUuid: string;
}

export default function Board({ boardUuid }: BoardProps) {
    const { isLoading, isError, data: imageUrl } = useBoardImage(boardUuid!);

    if (isLoading) return <Loader>Loading Game Details...</Loader>;

    if (isError || !imageUrl) {
        return <Alert severity="error">Unable to load this game's details.</Alert>;
    }

    const backgroundStyle = {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: 'auto',
        height: '80vh'
    };

    return (
        <div style={backgroundStyle}>
        </div>
    )
}