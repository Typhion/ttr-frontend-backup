import {
    Button, Card, CardMedia,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, PaperProps
} from "@mui/material";
import {usePlayerCardsForConnection} from "../../../hooks/usePlayerCardsForConnection.ts";
import BlackCard from "../../../assets/images/card-black.png";
import BlueCard from "../../../assets/images/card-blue.png";
import GreenCard from "../../../assets/images/card-green.png";
import OrangeCard from "../../../assets/images/card-orange.png";
import PinkCard from "../../../assets/images/card-pink.png";
import RedCard from "../../../assets/images/card-red.png";
import WhiteCard from "../../../assets/images/card-white.png";
import YellowCard from "../../../assets/images/card-yellow.png";
import JokerCard from "../../../assets/images/card-joker.png";
import {useState} from "react";
import {usePickConnection} from "../../../hooks/usePickConnection.ts";
import Draggable from "react-draggable";

export type ConnectionPick = {
    connectionId: string;
    playerId: string;
    boardId: string;
    pickedWagonCards: string[];
}

const cardImages: { [key: string]: string } = {
    black: BlackCard,
    blue: BlueCard,
    green: GreenCard,
    orange: OrangeCard,
    pink: PinkCard,
    red: RedCard,
    white: WhiteCard,
    yellow: YellowCard,
    joker: JokerCard
};

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
                                    image={cardImages[cardColor.toLowerCase()]}
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

