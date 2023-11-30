import {Connection, ConnectionTile} from "../../../model/GameState.ts";
import {useState} from "react";
import {Box} from "@mui/material";

interface ConnectionTileProps {
    connectionTile: ConnectionTile;
    imageSize: { width: number; height: number };
    connection: Connection;
    isConnectionHovered: boolean;
    myTurn: boolean;
    playerColor: string;
}


const originalSize = { width: 1328, height: 863 };

export default function ConnectionTileNode({
                                               connectionTile,
                                               imageSize,
                                               connection,
                                               isConnectionHovered,
                                               myTurn,
                                               playerColor
                                           }: ConnectionTileProps) {
    const [isHovered, setHovered] = useState(false);

    // Calculate scaling factors
    const scaleX = imageSize.width / originalSize.width;
    const scaleY = imageSize.height / originalSize.height;

    // Apply scaling to connection tile coordinates
    const scaledX = connectionTile.x * scaleX;
    const scaledY = connectionTile.y * scaleY;

    const rectangleSize = { width: 43, height: 17 }; // Specify the rectangle size

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
        cursor: myTurn ? "pointer" : "default",
        border: isHovered || isConnectionHovered && myTurn ? "solid green" : isBlack ? "solid white" : "solid black",
        borderStyle: connection.connectionType == 'TUNNEL' ? "dashed" : "solid",
        borderWidth: connection.connectionType == 'TUNNEL' ? "5px" : isHovered || isConnectionHovered ? "4px" : "1px",
    };

    const dotStyle = {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "8px",
        height: "8px",
        backgroundColor: playerColor,
        borderRadius: "50%",
        transform: "translate(-50%, -50%)"
    };

    return (
        <Box
            sx={tileStyle}
            onMouseEnter={() => myTurn && setHovered(true)}
            onMouseLeave={() => myTurn && setHovered(false)}
        >
            {playerColor.toLowerCase() !== 'gray' && <Box sx={dotStyle}/>}
        </Box>
    );
}
