import {useState, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import {TempRouteCard} from "../../../model/GameState";
import {usePickRouteCard} from "../../../hooks/usePickRouteCard.ts";
import {useGameState} from "../../../hooks/useGameState";
import {Box, DialogTitle, Paper, PaperProps} from "@mui/material";
import Draggable from 'react-draggable';

type RandomRouteCardsDialogProps = {
    open: boolean;
    onClose: () => void;

    routes: TempRouteCard[];

    boardId: string;
    playerId: string;
    gameId: string;
};

function PaperComponent(props: PaperProps) {
    return (
        <Draggable
            handle="#RandomRouteCardsDialog"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export default function RandomRouteCardsDialog({
                                                   open,
                                                   onClose,
                                                   routes,
                                                   boardId,
                                                   playerId,
                                                   gameId
                                               }: RandomRouteCardsDialogProps) {
    const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
    const { refetch } = useGameState(gameId, playerId, true);
    const pickRouteCard = usePickRouteCard(() => {
        refetch();
    });

    useEffect(() => {
        // Set all routes as selected when the component mounts
        setSelectedRoutes(routes.map((route) => route.routeId));
    }, [routes]);

    const handleCheckboxChange = (routeId: string) => {
        setSelectedRoutes((prevSelectedRoutes) =>
            prevSelectedRoutes.includes(routeId)
                ? prevSelectedRoutes.filter((id) => id !== routeId)
                : [...prevSelectedRoutes, routeId]
        );
    };

    const handlePickRoutes = () => {
        if (selectedRoutes.length > 0) {
            pickRouteCard.mutate({
                playerId: playerId,
                boardId: boardId,
                routeIds: selectedRoutes.map((route) => route),
            });

            selectedRoutes.forEach((routeId) => {
                handleCheckboxChange(routeId);
            });

            onClose();
        }
    };

    return (
        <Dialog disableEscapeKeyDown={true} open={open} onClose={onClose} maxWidth={'lg'}
                PaperComponent={PaperComponent}
        >
            <DialogTitle id={'RandomRouteCardsDialog'} sx={{
                cursor: 'all-scroll'
            }}>Select the routes you want:</DialogTitle>
            <DialogContent>
                {routes.map((route) => (
                    <Box key={route.routeId} sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Checkbox
                            checked={selectedRoutes.includes(route.routeId)}
                            onChange={() => handleCheckboxChange(route.routeId)}
                        />
                        <Typography variant="body1">
                            {route.beginCity} - {route.endCity}
                        </Typography>
                        <Typography variant="body1" sx={{
                            right: '0',
                            position: 'absolute',
                            marginRight: '10%'
                        }}>
                            {route.connectionSize}
                        </Typography>
                    </Box>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handlePickRoutes} color="primary">
                    Pick Routes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
