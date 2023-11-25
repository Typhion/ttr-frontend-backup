import { useEffect, useRef, useState } from 'react';
import { Alert, Box } from "@mui/material";
import {City, Connection, ConnectionTile} from "../../../model/GameState.ts";
import CityNode from "./CityNode.tsx";
import Loader from "../../general/Loader.tsx";
import { useBoardImage } from "../../../hooks/useBoardImage.ts";
import ConnectionNode from "./ConnectionNode.tsx";

interface BoardProps {
    boardUuid: string;
    cities: City[];
    connections: Connection[];
    connectionTiles: ConnectionTile[];
}

export default function Board({ boardUuid, cities,  connections, connectionTiles  }: BoardProps) {
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
                style={{ maxHeight: '100%', maxWidth: '100%', minHeight: '80%', minWidth: '80%' }}
                onLoad={updateImageSize} // Update size when image is loaded
            />
            <Box sx={{ position: 'absolute', height: imageSize.height, width: imageSize.width }}>
                {cities.map((city) => (
                    <CityNode city={city} key={city.id} imageSize={imageSize} />
                ))}
                {connections && connections.map((connection) => (
                    <Box key={connection.id} sx={{ position: 'absolute' }}>
                        <ConnectionNode
                            connection={connection}
                            connectionTiles={connectionTiles}
                            key={connection.id}
                            imageSize={imageSize}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
