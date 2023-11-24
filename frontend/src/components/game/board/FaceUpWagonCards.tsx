import FaceUpWagonCard from "./FaceUpWagonCard.tsx";
import {usePickFaceUpWagonCard} from "../../../hooks/usePickFaceUpWagonCard";
import {useGameState} from "../../../hooks/useGameState";

interface FaceupWagonCardsProps {
    faceUpWagonCards: string[] | undefined;

    boardId: string;

    playerId: string;
    gameId: string;
}

export default function FaceUpWagonCards({ faceUpWagonCards, boardId, playerId, gameId }: FaceupWagonCardsProps) {
    const {refetch: refetchFaceUpWagonCards} = useGameState(gameId, playerId);
    const pickFaceUpWagonCardMutation = usePickFaceUpWagonCard(
        () => {
            refetchFaceUpWagonCards();
        },
    );

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            overflow: 'hidden',
            margin: 'auto'
        }}>
            {faceUpWagonCards?.map((cardColor, index) => (
                <FaceUpWagonCard key={index} cardColor={cardColor} onClick={() =>
                    pickFaceUpWagonCardMutation.mutate({
                        playerId: playerId,
                        boardId: boardId,
                        wagonColor: cardColor
                    })
                } />
            ))}
        </div>
    );
}
