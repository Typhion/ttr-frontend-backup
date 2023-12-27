import {
    Button, Card, CardMedia,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid
} from "@mui/material";
import {usePlayerCardsForConnection} from "../../../hooks/gameHooks/usePlayerCardsForConnection.ts";
import CardImages from "../../../assets/images/cards/index.ts";
import {useState} from "react";
import {usePickConnection} from "../../../hooks/gameHooks/usePickConnection.ts";
import {useEndTurn} from "../../../hooks/gameHooks/useEndTurn.ts";

export type ConnectionPick = {
    connectionId: string;
    playerId: string;
    boardId: string;
    pickedWagonCards: string[];
}

interface ConnectionDialogProps {
    isOpen: boolean;
    connectionId: string;
    playerId: string;
    boardId: string;
    gameId: string;
    onSubmit: (connectionPick: ConnectionPick) => void;
    onClose: () => void;
}

export default function TunnelDialog({
                                         isOpen,
                                         onSubmit,
                                         onClose,
                                         connectionId,
                                         playerId,
                                         boardId,
                                         gameId
                                     }: ConnectionDialogProps) {
    const {isLoading, isError, data: wagonColors, refetch} = usePlayerCardsForConnection(connectionId, playerId);
    const [drawnCards, setDrawnCards] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');
    const endTurn = useEndTurn(() => {});


        const pickConnection = usePickConnection((data) => {
            if (data.wagonColors) {
                setDrawnCards(data.wagonColors);
                if (data.message) {
                    setMessage(data.message);
                    if (data.message !== 'ENOUGH_CARDS') {
                        setTimeout(() => {
                            onClose();
                            return;
                        }, 2500);
                    }
                }
            }
            setTimeout(() => {
                onSubmit({
                    connectionId,
                    playerId,
                    boardId,
                    pickedWagonCards: data.wagonColors || []
                });
            }, 2500);
        });


        const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
        if (isLoading) return;

        if (isError || !wagonColors) return;

        const handleCardClick = (index: number) => {
            setSelectedIndices(prevSelectedIndices => {
                if (prevSelectedIndices.includes(index)) {
                    return prevSelectedIndices.filter(selectedIndex => selectedIndex !== index);
                } else {
                    return [...prevSelectedIndices, index];
                }
            });
        };


        const handleSubmit = () => {
            const safeWagonColors = wagonColors?.wagonColors || [];
            const pickedWagonCards = selectedIndices.map((index) => safeWagonColors[index]);

            pickConnection.mutate({
                connectionId,
                playerId,
                boardId,
                pickedWagonCards,
            }, {
                onSuccess: () => {
                    setSelectedIndices([]);
                    setTimeout(() => {
                    refetch();
                    }, 1000);
                }
            });
        };

        const handleClose = () => {
            if (message === 'ENOUGH_CARDS') {
                endTurn.mutate({
                    playerId: playerId,
                    gameId: gameId
                });
                onClose();
                refetch();
            } else {
                onClose();
                refetch();
            }
        }

        const selectedCardStyle = {
            border: '5px solid green'
        };

        return (
            <Dialog disableEscapeKeyDown={true} open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>Drawn cards</DialogTitle>
                <DialogContent>
                    <DialogContentText color={'black'}>
                        {message ? (
                            message === 'CLAIMED' ? (
                                'You have successfully claimed this connection!'
                            ) : message === 'NOT_ENOUGH_CARDS' ? (
                                'Sorry, you do not have enough cards to claim this connection.'
                            ) : message === 'ENOUGH_CARDS' ? (
                                'You have enough cards, but you need to pick additional cards to fill up this connection.'
                            ) : (
                                message
                            )
                        ) : (
                            <>
                                Please pick your cards for this connection, after you picked your cards, the pile will
                                draw
                                3 cards, if these match your color, you will need to match the amount.
                            </>
                        )}
                    </DialogContentText>

                    <Grid container spacing={1}>
                        {drawnCards && drawnCards.map((cardColor, index) => (
                            <Grid item key={index}>
                                <Card
                                    sx={{
                                        width: '14vh'
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={CardImages[cardColor.toLowerCase()]}
                                        alt="FaceUpWagonCard"
                                        style={{width: '100%'}}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogContent>
                    <DialogContentText color={'black'}>
                        Please pick the cards you want to use for this connection.
                    </DialogContentText>
                    <Grid container spacing={1}>
                        {wagonColors.wagonColors && wagonColors.wagonColors.map((cardColor, index) => (
                            <Grid item key={index} onClick={() => handleCardClick(index)}>
                                <Card
                                    sx={{
                                        cursor: 'pointer',
                                        width: '14vh', ...(selectedIndices.includes(index) ? selectedCardStyle : {})
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={CardImages[cardColor.toLowerCase()]}
                                        alt="FaceUpWagonCard"
                                        style={{width: '100%'}}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit"
                            disabled={message === 'CLAIMED' || message === 'NOT_ENOUGH_CARDS'}>
                        {message === 'ENOUGH_CARDS' ? 'End Turn' : 'Cancel'}
                    </Button>
                    <Button onClick={handleSubmit} variant="contained"
                            disabled={message === 'CLAIMED' || message === 'NOT_ENOUGH_CARDS'}>
                        Pick
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

