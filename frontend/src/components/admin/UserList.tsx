import {
    Alert,
    Box,
    Paper,
    Table, TableBody,
    TableCell, TableContainer, TableFooter,
    TableHead, TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import {useGetUserList} from "../../hooks/useGetUserList.ts";
import Loader from "../general/Loader.tsx";
import {useState} from "react";

export default function UserList() {
    const [page, setPage] = useState({pageNumber: 0, size: 5});
    const {isLoading: isLoading, isError: isError, data: userPage} = useGetUserList(page);

    if (isLoading) return <Loader>Loading User List...</Loader>;

    if (isError) {
        return <Alert severity="error">Unable to load the list of users.</Alert>;
    }

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage({pageNumber: newPage, size: page.size});
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setPage({pageNumber: 0, size: parseInt(event.target.value, 10)});
    };

    return (
        <Box sx={{width: '60%'}}>
            {!userPage ? (
                <Typography sx={{mt: 2}}>No pages found</Typography>
            ) : (
                <div>
                    <Typography variant="h6">Users</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">Username</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userPage.applicationUsers.map((user, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {user.id}
                                        </TableCell>
                                        <TableCell align="right">{user.username}</TableCell>
                                        <TableCell align="right">{user.email}</TableCell>
                                    </TableRow>
                                ))}
                                {Array.apply(null, Array(page.size - userPage.applicationUsers.length)).map((_, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            -
                                        </TableCell>
                                        <TableCell align="right">-</TableCell>
                                        <TableCell align="right">-</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        sx={{justifyContent: 'center'}}
                                        count={userPage.totalUsers}
                                        page={page.pageNumber}
                                        onPageChange={handleChangePage}
                                        rowsPerPage={page.size}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        rowsPerPageOptions={[5, 10, 15, 20, 25]}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </Box>
    )
}