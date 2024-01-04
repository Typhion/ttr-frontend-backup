import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";

export default function LobbyDisbanded() {
    const navigate = useNavigate();
    return <Box textAlign={"center"}>
        <Typography variant={"h3"}>The lobby you were in has been disbanded.</Typography>
        <Button
            variant="contained"
            sx={{height: '100%', marginBottom: '10%', marginTop: '2%'}}
            onClick={() => navigate('/')}
        >
            Back to Home
        </Button>

    </Box>
}
