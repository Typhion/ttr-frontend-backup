import Button from "@mui/material/Button";
import {useLeaveLobby} from "../../hooks/lobbyHooks/useLeaveLobby";
import {useNavigate} from "react-router-dom";

type LeaveButtonProps = {
    lobbyId: string;
}

export default function LeaveButton({lobbyId} : LeaveButtonProps) {
    const navigate = useNavigate();

    const leaveLobby =useLeaveLobby(() => {
        navigate(`/lobby`)
    });

    const handleLeaveClick = () => {
        leaveLobby.mutate(lobbyId);
    }

    return (
        <Button variant="contained" color="error" onClick={handleLeaveClick}>
            Leave Lobby
        </Button>
    );
}
