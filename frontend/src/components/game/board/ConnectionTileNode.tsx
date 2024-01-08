import {Connection, ConnectionTile, PlayerState} from "../../../model/GameState.ts";
import {useState} from "react";
import {Box} from "@mui/material";

interface ConnectionTileProps {
    connectionTile: ConnectionTile;
    imageSize: { width: number; height: number };
    connection: Connection;
    isConnectionHovered: boolean;
    myTurn: boolean;
    playerColor: string;
    playerState: PlayerState;
    gameEnding: boolean;
}


const originalSize = {width: 1328, height: 863};

export default function ConnectionTileNode({
                                               connectionTile,
                                               imageSize,
                                               connection,
                                               isConnectionHovered,
                                               myTurn,
                                               playerColor,
                                               playerState,
                                           }: ConnectionTileProps) {
    const [isHovered, setHovered] = useState(false);

    // Calculate scaling factors
    const scaleX = imageSize.width / originalSize.width;
    const scaleY = imageSize.height / originalSize.height;

    // Apply scaling to connection tile coordinates
    const scaledX = connectionTile.x * scaleX;
    const scaledY = connectionTile.y * scaleY;
    const rectWidth = 43 * scaleX;
    const rectHeight = 17 * scaleY;
    const borderWidth = connection.connectionType === 'TUNNEL' ? 5 : 1;
    const scaledBorderWidthX = borderWidth * scaleX;
    const scaledBorderWidthY = borderWidth * scaleY;

    const rectangleSize = {width: rectWidth, height: rectHeight}; // Specify the rectangle size

    const isJokerColor = connection.wagonColor === "JOKER";
    const isBlack = connection.wagonColor === "BLACK";

    const tileStyle = {
        position: "absolute",
        left: `${scaledX}px`,
        top: `${scaledY}px`,
        width: rectangleSize.width,
        height: rectangleSize.height,
        background: connectionTile.isJoker
            ? "linear-gradient(45deg, violet, indigo, blue, green, yellow, orange, red)"
            : isJokerColor
                ? "grey"
                : connection.wagonColor,
        transform: `translate(-50%, -50%) rotate(${connectionTile.rotation}deg)`,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        cursor: playerColor.toLowerCase() === 'gray' && myTurn ? "pointer" : "default",
        border: isBlack ? "solid white" : "solid black",
        borderStyle: connection.connectionType == 'TUNNEL' ? "dashed" : "solid",
        borderWidth: connection.connectionType === 'TUNNEL' ? `${scaledBorderWidthX}px` : `${scaledBorderWidthY}px`,
    };

    const carriageStyle = {
        display: "inline-block",
        width: `${40 * scaleX}px`,
        height: `${20 * scaleY}px`,
        backgroundColor: playerColor.toLowerCase() !== 'gray' ? playerColor : playerState.color,
        borderRadius: "5%",
    };

    const windowStyle = {
        display: "inline-block",
        width: `${6 * scaleX}px`,
        height: `${12 * scaleY}px`,
        backgroundColor: "#FFF",
        border: "1px solid #000",
        margin: `0 ${2 / 40 * (40 * scaleX)}px`,
        position: "absolute",
        top: "10%"
    };

    return (
        <Box
            sx={tileStyle}
            onMouseEnter={() => myTurn && setHovered(true)}
            onMouseLeave={() => myTurn && setHovered(false)}
        >
            {playerColor.toLowerCase() !== 'gray' &&
                <>
                    <Box sx={{position: "relative", display: "inline-block"}}>
                        <Box sx={carriageStyle}>
                            <Box sx={windowStyle} left={'10%'}></Box>
                            <Box sx={windowStyle} left={'40%'}></Box>
                            <Box sx={windowStyle} left={'70%'}></Box>
                        </Box>
                    </Box>
                </>
            }
            {playerColor.toLowerCase() === 'gray' && (isHovered || isConnectionHovered) && myTurn &&
                <>
                    <Box sx={{position: "relative", display: "inline-block", opacity: "0.6"}}>
                        <Box sx={carriageStyle}>
                            <Box sx={windowStyle} left={'10%'}></Box>
                            <Box sx={windowStyle} left={'40%'}></Box>
                            <Box sx={windowStyle} left={'70%'}></Box>
                        </Box>
                    </Box>
                </>
            }
        </Box>
    );
}
