import {
    Alert,
    Button, Card, CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, Typography
} from "@mui/material";
import {useStationConnections} from "../../../hooks/gameHooks/useStationConnections.ts";
import {usePickStationConnection} from "../../../hooks/lobbyHooks/usePickStationConnection.ts";
import Loader from "../../general/Loader.tsx";
import {Station} from "../../../model/GameState.ts";
import {useStationForCity} from "../../../hooks/gameHooks/useStationForCity.ts";

type AddConnectionToStationProps = {
    isOpen: boolean;
    onClose: () => void;
    playerId: string;
    cityId: string;
    boardId: string;
}
type AddConnectionToStationContentProps = {
    isOpen: boolean;
    onClose: () => void;
    playerId: string;
    cityId: string;
    boardId: string;
    station: Station;
}

function AddConnectionToStationDialogContent({
                                                 isOpen,
                                                 onClose,
                                                 playerId,
                                                 boardId,
                                                 station
                                             }: AddConnectionToStationContentProps) {

    const {
        data: connectionsForStation
    } = useStationConnections(station.stationId);


    const usePickStationConnectionMutation = usePickStationConnection();

    const handleCardClick = (index: number) => {
        const selectedConnection = connectionsForStation && connectionsForStation[index];
        if (selectedConnection) {
            handleSubmit(selectedConnection.connectionId);
        }
    };

    const handleSubmit = (connectionId: string) => {
        if (!station) return;
        usePickStationConnectionMutation.mutate({
            connectionId: connectionId,
            stationId: station.stationId,
            boardId: boardId,
            playerId: playerId
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Pick connection for your station</DialogTitle>
            {Array.isArray(connectionsForStation) && connectionsForStation.length > 0 ? (
                <Typography variant={'h5'} marginLeft={3}>Please keep in mind that this action is <strong>IRREVERSIBLE</strong> so choose wisely</Typography>
            ) : <Typography variant={'h5'} marginLeft={3}>There are no available connections to be claimed for this station</Typography>}
            <DialogContent>
                <Grid container spacing={1}>
                    {Array.isArray(connectionsForStation) && connectionsForStation && connectionsForStation.map((connection, index) => (
                        <Grid item key={index} onClick={() => handleCardClick(index)}>
                            <Card
                                sx={{cursor: 'pointer', width: '14vh'}}
                            >
                                <CardContent>
                                    <Typography>{connection.beginCityName} - {connection.endCityName}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                {Array.isArray(connectionsForStation) && connectionsForStation.length > 0 && (
                <Button onClick={() => handleSubmit} variant="contained">Pick</Button>
                    )}
            </DialogActions>
        </Dialog>
    );
}

export default function AddConnectionToStationDialog({
                                                         isOpen,
                                                         onClose,
                                                         playerId,
                                                         boardId,
                                                         cityId
                                                     }: AddConnectionToStationProps) {
    const {data: station, isLoading, isError} = useStationForCity(cityId);

    if (isLoading) return <Loader>Loading Stations...</Loader>
    if (isError || !station) return <Alert>Error Loading stations...</Alert>

    return (
        <AddConnectionToStationDialogContent
            isOpen={isOpen}
            onClose={onClose}
            playerId={playerId}
            boardId={boardId}
            cityId={cityId}
            station={station}
        />
    );
}
