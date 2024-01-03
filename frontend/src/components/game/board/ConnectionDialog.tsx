import {
    Button, Card, CardMedia,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, PaperProps
} from "@mui/material";
import {usePlayerCardsForConnection} from "../../../hooks/gameHooks/usePlayerCardsForConnection.ts";
import CardImages from "../../../assets/images/cards/index.ts";
import {useState} from "react";
import {usePickConnection} from "../../../hooks/gameHooks/usePickConnection.ts";
import Draggable from "react-draggable";

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
    onSubmit: (connectionPick: ConnectionPick) => void;
    onClose: () => void;}

function PaperComponent(props: PaperProps) {
    return (
        <Draggable
            handle="#ConnectionDialog"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export default function ConnectionDialog({
                                             isOpen,
                                             onSubmit,
                                             onClose,
                                             connectionId,
                                             playerId,
                                             boardId,
                                         }: ConnectionDialogProps) {
    const {isLoading, isError, data: wagonColors, refetch} = usePlayerCardsForConnection(connectionId, playerId);
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

    const pickConnection = usePickConnection(data => {
            onSubmit({
                connectionId,
                playerId,
                boardId,
                pickedWagonCards: data.wagonColors || []
            });
        }
    );

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
        const safeWagonColors = wagonColors.wagonColors ?? [];
        const pickedWagonCards = selectedIndices.map(index => safeWagonColors[index]);
        pickConnection.mutate({
                connectionId,
                playerId,
                boardId,
                pickedWagonCards,
            },
            {
                onSuccess: () => {
                    setSelectedIndices([])
                    refetch();
                    onClose()
                }
            });
    };

    const selectedCardStyle = {
        border: '5px solid green'
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth PaperComponent={PaperComponent}>
            <DialogTitle id={"ConnectionDialog"} sx={{
                cursor: 'all-scroll'
            }}>Pick cards</DialogTitle>
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
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Pick</Button>
            </DialogActions>
        </Dialog>
    );
}

