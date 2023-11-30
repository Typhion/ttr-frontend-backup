import FaceUpWagonCard from "./FaceUpWagonCard.tsx";
import {usePickFaceUpWagonCard} from "../../../hooks/usePickFaceUpWagonCard";
import {useGameState} from "../../../hooks/useGameState";

interface FaceupWagonCardsProps {
    faceUpWagonCards: string[] | undefined;
    boardId: string;
    playerId: string;
    gameId: string;
    myTurn: boolean;
}

export default function FaceUpWagonCards({ faceUpWagonCards, boardId, playerId, gameId, myTurn }: FaceupWagonCardsProps) {
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
            width: '40%',
            overflow: 'hidden',
            margin: 'auto'
        }}>
            {faceUpWagonCards?.map((cardColor, index) => (
                <FaceUpWagonCard myTurn={myTurn} key={index} cardColor={cardColor} onClick={() =>
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
