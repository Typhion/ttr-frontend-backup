import { Box, Card, CardContent, Typography, Divider } from "@mui/material";

type Match = {
    result: string;
    date: string;
    opponents: string[];
    gameType: "Normal" | "Custom";
    outcome: "Win" | "Loss" | "Draw";
};

type MatchHistoryProps = {
    matchData: Match[];
};


//TODO: change this to be modern react syntax
const MatchHistory: React.FC<MatchHistoryProps> = ({ matchData }) => {
    return (
        <Box>
            <Card sx={{ border: '1px solid black', borderRadius: '5px' }}>
                <CardContent>
                    <Typography variant="h5">Match History</Typography>
                    <Divider sx={{ my: 2 }} />

                    {matchData.map((match, index) => (
                        <Box key={index}>
                            <Typography variant="body1">
                                <strong>Match {index + 1}:</strong> {match.result}
                            </Typography>
                            <Typography variant="body2">
                                Date: {match.date}
                            </Typography>
                            <Typography variant="body2">
                                {match.opponents.length > 1 ? "Opponents:" : "Opponent:"} {match.opponents.join(", ")}
                            </Typography>
                            <Typography variant="body2">Game Type: {match.gameType}</Typography>
                            <Typography variant="body2">Outcome: {match.outcome}</Typography>
                            <Divider sx={{ my: 1 }} />
                        </Box>
                    ))}
                </CardContent>
            </Card>
        </Box>
    );
};

// Hardcoded match data
const hardcodedMatchData: Match[] = [
    {
        result: "Victory",
        date: "2023-01-01",
        opponents: ["Player A", "Player B"],
        gameType: "Normal",
        outcome: "Win",
    },
    {
        result: "Defeat",
        date: "2023-01-05",
        opponents: ["Player C", "Player D", "Player E"],
        gameType: "Custom",
        outcome: "Loss",
    },
];

export default function Stats() {
    return <MatchHistory matchData={hardcodedMatchData} />;
}
