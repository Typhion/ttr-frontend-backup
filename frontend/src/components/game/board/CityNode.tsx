import {City} from "../../../model/GameState.ts";
import {Box} from "@mui/material";
import {useContext, useState} from "react";
import {useCreateStation} from "../../../hooks/gameHooks/useCreateStation.ts";
import CreateStationDialog, {StationCreate} from "./CreateStationDialog.tsx";
import {useGameState} from "../../../hooks/gameHooks/useGameState.ts";
import AddConnectionToStationDialog from "./AddConnectionToStationDialog.tsx";
import Loader from "../../general/Loader.tsx";
import StationIconHover from "./stationIconHover.tsx";
import {useStationForCity} from "../../../hooks/gameHooks/useStationForCity.ts";
import SecurityContext from "../../../context/SecurityContext.ts";

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
    const {loggedInUserId} = useContext(SecurityContext);
    const [isHovered, setHovered] = useState(false);

    const {data: station, isError: isStationError, isLoading: isStationLoading, refetch} = useStationForCity(city.id)


    const [isCreateStationDialogOpen, setIsCreateStationDialogOpen] = useState(false);
    const [isAddConnectionToStationDialogueOpen, setIsAddConnectionToStationDialogueOpen] = useState(false);
    const {refetch: refetchStations} = useGameState(gameId, playerId, true);
    const createStationMutation = useCreateStation(
        () => {
            setIsCreateStationDialogOpen(false);
            refetchStations();
            refetch();
        },
    );

    if (isStationLoading) return <Loader>Loading Game Details...</Loader>;

    if (isStationError) return;

    const handleCityClick = () => {
        if (myTurn && tempWagonCards?.length === 0 && city.hasStation) {
                setIsAddConnectionToStationDialogueOpen(true);

        } else if (myTurn && tempWagonCards?.length === 0 && !city.hasStation) {
            setIsCreateStationDialogOpen(true);
        }
    };

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
                pointerEvents: myTurn && station?.applicationUserId === loggedInUserId && tempWagonCards?.length === 0
                    ? 'auto'
                    : 'none',
            }}
                 onMouseEnter={() => myTurn && station?.applicationUserId === loggedInUserId && setHovered(true)}
                 onMouseLeave={() => myTurn && station?.applicationUserId === loggedInUserId && setHovered(false)}
                 onClick={handleCityClick}
            >
                {city.hasStation && station?.stationId && <StationIconHover stationId={station.stationId} />}
            </Box>
            {city.hasStation && station ? (
                <AddConnectionToStationDialog
                    isOpen={isAddConnectionToStationDialogueOpen}
                    onClose={() => setIsAddConnectionToStationDialogueOpen(false)}
                    playerId={playerId}
                    cityId={city.id}
                    boardId={boardUuid}
                />
            ) : (
                <Box sx={{
                    ...cityStyle,
                    pointerEvents: myTurn && tempWagonCards?.length === 0
                        ? 'auto'
                        : 'none',
                }}
                     onMouseEnter={() => myTurn && setHovered(true)}
                     onMouseLeave={() => myTurn && setHovered(false)}
                     onClick={() => myTurn && tempWagonCards?.length === 0 && setIsCreateStationDialogOpen(true)}
                >
                    {city.hasStation && station?.stationId && <StationIconHover stationId={station.stationId} />}
                </Box>
            )}
            {!city.hasStation && (
                <CreateStationDialog
                    isOpen={isCreateStationDialogOpen}
                    onSubmit={handleStationDialogSubmit}
                    onClose={() => setIsCreateStationDialogOpen(false)}
                    playerId={playerId}
                    cityId={city.id}
                    boardId={boardUuid}
                />
            )}
        </Box>
    );
}


