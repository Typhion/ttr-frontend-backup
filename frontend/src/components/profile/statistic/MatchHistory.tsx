import {Box, CardContent, Typography, Paper, Card, Pagination, Alert, TextField, MenuItem} from "@mui/material";
import {useGetMatchHistory} from "../../../hooks/userHooks/useGetMatchHistory.ts";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import Ticket from "../../../assets/images/tickets/ticket.png";
import {useState} from "react";
import Loader from "../../general/Loader.tsx";

export default function MatchHistory() {
    const [page, setPage] = useState({pageNumber: 0, size: 5});
    const {isLoading, isError, data: matchHistory} = useGetMatchHistory(page);

    if (isLoading) return <Loader>Loading Match Histories...</Loader>;

    if (isError) {
        return <Alert severity="error">Unable to load match histories.</Alert>;
    }

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage({pageNumber: value - 1, size: page.size});
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setPage({pageNumber: 0, size: parseInt(event.target.value, 10)});
    };

    return (
        <Box>
            <Paper elevation={3} sx={{ m: 2, border: '1px solid black', borderRadius: '5px', overflowX: "auto", bgcolor: 'primary.light' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Match History
                    </Typography>
                    {matchHistory && matchHistory.matchHistoryDtos.length !== 0 && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                '& .MuiTextField-root': { m: 1, width: '15ch',
                                mb: 2 },
                            }}
                        >
                            <Pagination count={matchHistory.totalPages}
                                        shape="rounded"
                                        onChange={handlePageChange}
                                        sx={{ mt: 1.5 }}
                            />
                            <TextField
                                select
                                label="Rows per page"
                                defaultValue={5}
                                size="small"
                                onChange={handleChangeRowsPerPage}
                            >
                                <MenuItem key={5} value={5}>
                                    {5}
                                </MenuItem>
                                <MenuItem key={10} value={10}>
                                    {10}
                                </MenuItem>
                                <MenuItem key={15} value={15}>
                                    {15}
                                </MenuItem>
                                <MenuItem key={20} value={20}>
                                    {20}
                                </MenuItem>
                                <MenuItem key={25} value={25}>
                                    {25}
                                </MenuItem>
                            </TextField>
                        </Box>
                    )}
                    {matchHistory && matchHistory.matchHistoryDtos.length !== 0 ? matchHistory.matchHistoryDtos.map((match, index) => (
                        <Card key={index} sx={{
                            mb: 2,
                            p: 2,
                            borderRadius: '5px',
                            bgcolor: match.gameWon ? 'secondary.main' : 'rgba(255, 182, 193, 0.3)', // light red for defeat
                            position: 'relative'
                        }}>
                            <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h6">
                                    {((match.score + (match.gameWon ? (match.opponents.length + 1) * 10 : 0)) > 0) ? '+ ' + (match.score + (match.gameWon ? (match.opponents.length + 1) * 10 : 0)) : '+ 0' }
                                </Typography>
                                <img src={Ticket} alt="ticket" width="40" height="40" style={{ marginLeft: '5px' }}/>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                                <Typography variant="subtitle1" sx={{ color: match.gameWon ? 'green' : 'red', display: 'inline' }}>
                                    <strong>{match.gameWon ? "Victory" : "Defeat"}</strong>
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'grey', display: 'inline', ml: 1 }}>
                                    ({new Date(match.date).toLocaleDateString('en-GB')})
                                </Typography>
                            </Box>
                            <Table size="small" sx={{ mt: 1, maxWidth: 'fit-content' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Player</TableCell>
                                        <TableCell>Score</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[...match.opponents, { applicationUser: { username: "You", isGameWinner: match.gameWon }, score: match.score }]
                                        .sort((a, b) => b.score - a.score)
                                        .map((player, playerIndex) => (
                                            <TableRow key={playerIndex}>
                                                <TableCell sx={{ color: player.applicationUser.isGameWinner ? 'green' : 'inherit' }}>
                                                    <strong>{player.applicationUser.username === "You" ? "You" : player.applicationUser.username}</strong>
                                                </TableCell>
                                                <TableCell>{player.score} points</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Card>
                    )) : (
                        <Typography variant="body1">
                            You haven't played any matches yet.
                        </Typography>
                    )}
                </CardContent>
            </Paper>
        </Box>
    );
}

