import FaceUpWagonCard from "./FaceUpWagonCard.tsx";

interface FaceupWagonCardsProps {
    faceUpWagonCards: string[] | undefined;
}

export default function FaceUpWagonCards({ faceUpWagonCards }: FaceupWagonCardsProps) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: 180,
            overflow: 'hidden',
            margin: 'auto'
        }}>
            {faceUpWagonCards?.map((cardColor, index) => (
                <FaceUpWagonCard key={index} cardColor={cardColor} onClick={() => {
                }} />
            ))}
        </div>
    );
}
