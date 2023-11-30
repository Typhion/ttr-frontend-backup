import {useState} from 'react';
import {Connection as ConnectionType, ConnectionTile} from '../../../model/GameState';
import ConnectionTileNode from './ConnectionTileNode';
import {Box} from '@mui/material';
import ConnectionDialog, {ConnectionPick} from "./ConnectionDialog.tsx";
import {usePickConnection} from "../../../hooks/usePickConnection.ts";


interface ConnectionNodeProps {
    connection: ConnectionType;
    boardId: string;
    playerId: string;
    connectionTiles: ConnectionTile[];
    imageSize: { width: number; height: number };
    myTurn: boolean;
}

export default function ConnectionNode({
                                           connection,
                                           boardId,
                                           playerId,
                                           connectionTiles,
                                           imageSize,
                                           myTurn
                                       }: ConnectionNodeProps) {
    const [connectionHoverStates, setConnectionHoverStates] = useState<{ [key: string]: boolean }>({});
    const [isConnectionDialogOpen, setIsConnectionDialogOpen] = useState(false);
    const pickConnection = usePickConnection(
        () => {
            setIsConnectionDialogOpen(false);
        },
    );

    const handleConnectionClick = () => {
        if (myTurn) {
            setIsConnectionDialogOpen(true);
        }
    };

    const handleConnectionDialogClose = () => {
        setIsConnectionDialogOpen(false);
    }

    const handleConnectionDialogSubmit = (connectionPick: ConnectionPick) => {
        pickConnection.mutate(connectionPick);
    }

    const handleConnectionHover = (connectionId: string, isHovered: boolean) => {
        if (myTurn) {
            setConnectionHoverStates(prevStates => ({
                ...prevStates,
                [connectionId]: isHovered,
            }));
        }
    };

    return (
        <Box key={connection.id}>
            {(isConnectionDialogOpen) &&
                <ConnectionDialog boardId={boardId} connectionId={connection.id} playerId={playerId}
                                  isOpen={isConnectionDialogOpen} onClose={handleConnectionDialogClose}
                                  onSubmit={handleConnectionDialogSubmit}/>}
            <Box
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
                                myTurn={myTurn}
                            />
                        );
                    }
                    return null;
                })}
            </Box>
        </Box>
    );
}
