import {useState, useEffect, ChangeEvent} from 'react';
import {Badge, Card, CardMedia, Tooltip} from '@mui/material';
import RouteCardDialog from './RandomRouteCardsDialog';
import CardRoute from '../../../assets/images/cards/card-route.png';
import {TempRouteCard} from '../../../model/GameState';
import {useDrawRouteCards} from '../../../hooks/gameHooks/useDrawRouteCards.ts';
import {useGameState} from "../../../hooks/gameHooks/useGameState.ts";

type RouteCardsPileProps = {
    playerId: string;
    boardId: string;
    pileSize: number;
    routes: TempRouteCard[];
    gameId: string;
    myTurn: boolean;
    tempWagonCards?: string[];
};

export default function RouteCardsPile({
                                           playerId,
                                           boardId,
                                           pileSize,
                                           routes,
                                           gameId,
                                           myTurn,
                                           tempWagonCards
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
                <Tooltip title="Pick 3 random route cards to choose from" placement="right">
                    <Card
                        onClick={() => {
                            if (myTurn && tempWagonCards?.length === 0) handleCardClick();
                        }}
                        sx={{cursor: myTurn && tempWagonCards?.length === 0 ? 'pointer' : 'default'}}
                    >
                        <CardMedia component="img" image={CardRoute} alt="Card"/>
                    </Card>
                </Tooltip>
            </Badge>
            {myTurn && (
                <RouteCardDialog
                    open={isDialogOpen}
                    onClose={() => handleCloseDialog}
                    routes={routes}
                    playerId={playerId}
                    boardId={boardId}
                    gameId={gameId}
                />
            )}
        </>
    );
}
