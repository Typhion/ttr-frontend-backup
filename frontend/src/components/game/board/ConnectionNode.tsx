import {ChangeEvent, Suspense, useState} from 'react';
import {Connection as ConnectionType, ConnectionTile, PlayerState} from '../../../model/GameState';
import ConnectionTileNode from './ConnectionTileNode';
import {Box} from '@mui/material';
import ConnectionDialog from "./ConnectionDialog.tsx";
import TunnelDialog from "./TunnelDialog.tsx";

interface ConnectionNodeProps {
    connection: ConnectionType;
    boardId: string;
    playerId: string;
    connectionTiles: ConnectionTile[];
    imageSize: { width: number; height: number };
    gameId: string;
    myTurn: boolean;
    playerState: PlayerState;
    tempWagonCards?: string[];
    gameEnding: boolean;
}

export default function ConnectionNode({
                                           connection,
                                           boardId,
                                           playerId,
                                           connectionTiles,
                                           imageSize,
                                           myTurn,
                                           gameId,
                                           playerState,
                                           tempWagonCards,
                                           gameEnding
                                       }: ConnectionNodeProps) {
    const [connectionHoverStates, setConnectionHoverStates] = useState<{ [key: string]: boolean }>({});
    const [isConnectionDialogOpen, setIsConnectionDialogOpen] = useState(false);

    const handleConnectionClick = () => {
        if (myTurn && connection.playerColor.toLowerCase() === 'gray') {
            setIsConnectionDialogOpen(true);
        }
    };

    const handleConnectionDialogClose = (_: ChangeEvent, reason: string) => {
        if (reason !== 'backdropClick') {
            setIsConnectionDialogOpen(false);
        }
    }

    const handleConnectionDialogSubmit = () => {
        // setIsConnectionDialogOpen(false);
    }

    const handleConnectionHover = (connectionId: string, isHovered: boolean) => {
        if (myTurn && connection.playerColor.toLowerCase() === 'gray') {
            setConnectionHoverStates(prevStates => ({
                ...prevStates,
                [connectionId]: isHovered,
            }));
        }
    };


    return (
        <Box key={connection.id}>
            {isConnectionDialogOpen && (
                <Suspense>
                    {connection.connectionType !== 'TUNNEL' ? (
                        <ConnectionDialog boardId={boardId}
                                          connectionId={connection.id}
                                          playerId={playerId}
                                          isOpen={isConnectionDialogOpen}
                            // @ts-expect-error needs to receive a ChangeEvent but doesn't use it
                                          onClose={handleConnectionDialogClose}
                                          onSubmit={handleConnectionDialogSubmit}/>
                    ) : (
                        <TunnelDialog boardId={boardId}
                                      connectionId={connection.id}
                                      playerId={playerId}
                                      gameId={gameId}
                                      isOpen={isConnectionDialogOpen}
                            // @ts-expect-error needs to receive a ChangeEvent but doesn't use it
                                      onClose={handleConnectionDialogClose}
                                      onSubmit={handleConnectionDialogSubmit}/>

                    )}
                </Suspense>
            )}
            <Box
                sx={{
                    pointerEvents: myTurn && tempWagonCards?.length === 0 ? 'auto' : 'none'
                }}
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
                                playerColor={connection.playerColor}
                                playerState={playerState}
                                gameEnding={gameEnding}
                            />
                        );
                    }
                    return null;
                })}
            </Box>
        </Box>
    );
}
