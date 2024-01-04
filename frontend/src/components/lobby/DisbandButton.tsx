import Button from "@mui/material/Button";
import {useDisbandLobby} from "../../hooks/lobbyHooks/useDisbandLobby";
import {useNavigate} from "react-router-dom";

type DisbandButtonProps = {
    lobbyId: string;
}

export default function DisbandButton({lobbyId} : DisbandButtonProps) {
    const navigate = useNavigate();
    const disbandLobby = useDisbandLobby(() => {
        navigate(`/lobby`)
    });
    const handleDisbandClick = () => {
        disbandLobby.mutate(lobbyId);
    }

    return (
        <Button variant="contained" color="error" onClick={handleDisbandClick}>
            Disband Lobby
        </Button>
    );
}
