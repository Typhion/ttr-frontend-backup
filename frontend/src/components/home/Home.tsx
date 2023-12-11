import Button from "@mui/material/Button";
import {useCreateLobby} from "../../hooks/useCreateLobby.ts";

import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const { isAuthenticated } = useContext(SecurityContext)
    const navigate = useNavigate();
    const createLobby = useCreateLobby(
        (uuid) => {
            navigate(`/lobby/${uuid}`)
        }
    )
    const handleOnClick = () => {
        createLobby.mutate()
    }

    if (isAuthenticated()) {
        return <Button variant="contained" sx={{width: '7%', margin: 'auto'}} onClick={handleOnClick}>Create Lobby</Button>
    }
    else return <Box>
        Please log in to view the rest of this page
    </Box>
}
