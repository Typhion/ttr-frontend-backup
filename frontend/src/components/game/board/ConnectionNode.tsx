import {useState} from 'react';
import {Connection as ConnectionType, ConnectionTile} from '../../../model/GameState';
import ConnectionTileNode from './ConnectionTileNode';
import {Box} from '@mui/material';


interface ConnectionNodeProps {
    connection: ConnectionType;
    connectionTiles: ConnectionTile[];
    imageSize: { width: number; height: number };
}

export default function ConnectionNode({
                                           connection,
                                           connectionTiles,
                                           imageSize,
                                       }: ConnectionNodeProps) {
    const [connectionHoverStates, setConnectionHoverStates] = useState<{ [key: string]: boolean }>({});

    const handleConnectionClick = () => {
        console.log('Connection Clicked:', connection.id);
    };

    const handleConnectionHover = (connectionId: string, isHovered: boolean) => {
        setConnectionHoverStates(prevStates => ({
            ...prevStates,
            [connectionId]: isHovered,
        }));
    };

    return (
        <Box
            key={connection.id}
            onClick={handleConnectionClick}
            onMouseEnter={() => handleConnectionHover(connection.id, true)}
            onMouseLeave={() => handleConnectionHover(connection.id, false)}
        >
            {connection.connectionTiles.map((connectionTileId) => {
                const matchingConnectionTile = connectionTiles.find(
                    (tile) => tile.id === connectionTileId
                );
                if (matchingConnectionTile) {
                    return (
                        <ConnectionTileNode
                            key={matchingConnectionTile.id}
                            connectionTile={matchingConnectionTile}
                            imageSize={imageSize}
                            connection={connection}
                            isConnectionHovered={connectionHoverStates[connection.id] || false}
                        />
                    );
                }
                return null;
            })}
        </Box>
    );
}
