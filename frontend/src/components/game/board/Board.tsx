import { useEffect, useRef, useState } from 'react';
import { Alert, Box } from "@mui/material";
import {City, Connection, ConnectionTile, PlayerState} from "../../../model/GameState.ts";
import CityNode from "./CityNode.tsx";
import Loader from "../../general/Loader.tsx";
import { useBoardImage } from "../../../hooks/useBoardImage.ts";
import ConnectionNode from "./ConnectionNode.tsx";

interface BoardProps {
    boardUuid: string;
    playerUuid: string;
    cities: City[];
    connections: Connection[];
    connectionTiles: ConnectionTile[];
    gameId: string;
    myTurn: boolean;
    playerState: PlayerState;
    tempWagonCards? : string[];
}

export default function Board({ boardUuid, playerUuid, cities,  connections, connectionTiles, gameId, myTurn, playerState, tempWagonCards }: BoardProps) {
    const { isLoading, isError, data: imageUrl } = useBoardImage(boardUuid!);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const imageRef = useRef<HTMLImageElement>(null);

    const updateImageSize = () => {
        if (imageRef.current) {
            setImageSize({
                width: imageRef.current.clientWidth,
                height: imageRef.current.clientHeight
            });
        }
    };

    useEffect(() => {
        updateImageSize();
        window.addEventListener('resize', updateImageSize);

        return () => window.removeEventListener('resize', updateImageSize);
    }, [imageUrl]); // Depend on imageUrl to update when image changes

    if (isLoading) return <Loader>Loading Game Details...</Loader>;
    if (isError || !imageUrl) return <Alert severity="error">Unable to load this game's details.</Alert>;

    const containerStyle = {
        position: 'relative',
        width: 'auto',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <Box sx={containerStyle}>
            <img
                src={imageUrl}
                alt="Game Board"
                ref={imageRef}
                style={{ maxHeight: '100%', maxWidth: '100%', minHeight: '80%', minWidth: '80%', opacity: '0.8' }}
                onLoad={updateImageSize}
            />
            <Box sx={{ position: 'absolute', height: imageSize.height, width: imageSize.width }}>
                {cities.map((city) => (
                    <CityNode
                        city={city}
                        key={city.id}
                        imageSize={imageSize}
                        boardUuid={boardUuid}
                        playerId={playerUuid}
                        gameId={gameId}
                        myTurn={myTurn}
                        tempWagonCards={tempWagonCards}
                    />
                ))}
                {connections && connections.map((connection) => (
                    <Box key={connection.id} sx={{ position: 'absolute' }}>
                        <ConnectionNode
                            connection={connection}
                            boardId={boardUuid}
                            playerId={playerUuid}
                            connectionTiles={connectionTiles}
                            key={connection.id}
                            imageSize={imageSize}
                            gameId={gameId}
                            myTurn={myTurn}
                            playerState={playerState}
                            tempWagonCards={tempWagonCards}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
