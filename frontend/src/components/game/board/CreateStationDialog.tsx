import {
    Button, Card,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Grid
} from "@mui/material";
import CardImages from "../../../assets/images/cards/index.ts";
import {useState} from "react";
import {usePlayerCardsForStation} from "../../../hooks/gameHooks/usePlayerCardsForStation.ts";

export type StationCreate = {
    playerId: string;
    cityId: string;
    boardId: string;
    wagonCards: string[];
}

interface CreateStationDialogProps {
    isOpen: boolean;
    onSubmit: (stationCreate: StationCreate) => void;
    onClose: () => void;
    playerId: string;
    cityId: string;
    boardId: string;
}

export default function CreateStationDialog({
                                                isOpen,
                                                onSubmit,
                                                onClose,
                                                playerId,
                                                cityId,
                                                boardId
                                            }: CreateStationDialogProps) {
    const {isLoading, isError, data: wagonColors} = usePlayerCardsForStation(playerId);
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
        const safeWagonColors = wagonColors.wagonCards ?? [];
        const wagonCards = selectedIndices.map(index => safeWagonColors[index]);
        onSubmit({
            playerId,
            cityId,
            boardId,
            wagonCards,
        });
    };

    const selectedCardStyle = {
        border: '5px solid green'
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Pick cards</DialogTitle>
            <DialogContent>
                <DialogContentText color={'black'}>
                    Please pick the cards you want to use for this station.
                </DialogContentText>
                <Grid container spacing={1}>
                    {wagonColors.wagonCards && wagonColors.wagonCards.map((cardColor, index) => (
                        <Grid item key={index} onClick={() => handleCardClick(index)}>
                            <Card
                                sx={{cursor: 'pointer', width: '14vh', ...(selectedIndices.includes(index) ? selectedCardStyle : {})}}
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