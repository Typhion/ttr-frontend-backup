import {useState, useEffect, ChangeEvent} from 'react';
import {Badge, Card, CardMedia} from '@mui/material';
import RouteCardDialog from './RandomRouteCardsDialog';
import CardRoute from '../../../assets/images/card-route.png';
import {RouteCard} from '../../../model/GameState';
import {useDrawRouteCards} from '../../../hooks/useDrawRouteCards';
import {useGameState} from "../../../hooks/useGameState";

type RouteCardsPileProps = {
    playerId: string;
    boardId: string;
    pileSize: number;
    routes: RouteCard[];
    gameId: string;
    myTurn: boolean;
};

export default function RouteCardsPile({
                                           playerId,
                                           boardId,
                                           pileSize,
                                           routes,
                                           gameId,
                                           myTurn
                                       }: RouteCardsPileProps) {
    const [isDialogOpen, setDialogOpen] = useState(true);
    const {refetch} = useGameState(gameId, playerId, true)
    const drawRouteCards = useDrawRouteCards(() => {
        refetch();
    });

    useEffect(() => {
        if (routes.length > 0) {
            setDialogOpen(true);
        } else {
            setDialogOpen(false);
        }
    }, [routes.length]);

    const handleCloseDialog = (_: ChangeEvent, reason: string) => {
        if (reason !== 'backdropClick') {
            setDialogOpen(false);
        }
    }

    const handleCardClick = () => {
        drawRouteCards.mutate({
            playerId: playerId,
            boardId: boardId
        });
    };

    return (
        <>
            <Badge
                badgeContent={pileSize}
                color="primary"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    margin: 'auto',
                    width: '40%',
                }}
                showZero
            >
                <Card
                    onClick={() => { if (myTurn) handleCardClick(); }}
                    sx={{ cursor: myTurn ? 'pointer' : 'default' }}
                >
                    <CardMedia component="img" image={CardRoute} alt="Card"/>
                </Card>

            </Badge>
            <RouteCardDialog
                open={isDialogOpen}
                onClose={() => handleCloseDialog}
                routes={routes}
                playerId={playerId}
                boardId={boardId}
                gameId={gameId}
            />
        </>
    );
}
