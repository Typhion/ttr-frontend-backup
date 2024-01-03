import {City} from "../../../model/GameState.ts";
import {Box} from "@mui/material";
import {useState} from "react";
import {useCreateStation} from "../../../hooks/gameHooks/useCreateStation.ts";
import CreateStationDialog, {StationCreate} from "./CreateStationDialog.tsx";
import TrainIcon from '@mui/icons-material/Train';
import {useGameState} from "../../../hooks/gameHooks/useGameState.ts";

interface CityNodeProps {
    city: City;
    imageSize: { width: number; height: number; };
    boardUuid: string;
    playerId: string;
    gameId: string;
    myTurn: boolean;
    tempWagonCards?: string[];
}

const originalSize = {width: 1328, height: 863};

export default function CityNode({city, imageSize, boardUuid, playerId, gameId, myTurn, tempWagonCards}: CityNodeProps) {
    const [isHovered, setHovered] = useState(false);
    const [isCreateStationDialogOpen, setIsCreateStationDialogOpen] = useState(false);
    const {refetch: refetchStations} = useGameState(gameId, playerId, true);
    const createStationMutation = useCreateStation(
        () => {
            setIsCreateStationDialogOpen(false);
            refetchStations();
        },
    );

    const handleStationDialogSubmit = (stationCreate: StationCreate) => {
        createStationMutation.mutate(stationCreate);
    }

    // Calculate scaling factors
    const scaleX = imageSize.width / originalSize.width;
    const scaleY = imageSize.height / originalSize.height;

    // Apply scaling to city coordinates
    const scaledX = city.x * scaleX;
    const scaledY = city.y * scaleY;

    const nodeSizePercent = 2; // 1% of the image's width
    const nodeSize = imageSize.width * (nodeSizePercent / 100);

    const cityStyle = {
        position: 'absolute',
        left: `${scaledX}px`,
        top: `${scaledY}px`,
        width: nodeSize,
        height: nodeSize,
        backgroundColor: 'grey',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        background: isHovered
            ? 'radial-gradient(circle, rgba(100, 200, 100, 1) 0%, rgba(50, 150, 50, 1) 50%, rgba(0, 100, 0, 1) 100%)'
            : 'radial-gradient(circle, rgba(200, 200, 200, 1) 0%, rgba(150, 150, 150, 1) 50%, rgba(100, 100, 100, 1) 100%)',
        cursor: "pointer"
    };

    return (
        <Box>
            <Box sx={{
                ...cityStyle,
                pointerEvents: myTurn && tempWagonCards?.length === 0 ? (city.hasStation ? 'none' : 'auto') : 'none',
            }}
                 onMouseEnter={() => myTurn && setHovered(true)}
                 onMouseLeave={() => myTurn && setHovered(false)}
                 onClick={() => myTurn && tempWagonCards?.length === 0 && !city.hasStation && setIsCreateStationDialogOpen(true)}
            >
                {city.hasStation && <TrainIcon/>}
            </Box>
            <CreateStationDialog
                isOpen={isCreateStationDialogOpen}
                onSubmit={handleStationDialogSubmit}
                onClose={() => setIsCreateStationDialogOpen(false)}
                playerId={playerId}
                cityId={city.id}
                boardId={boardUuid}/>
        </Box>

    );
}
