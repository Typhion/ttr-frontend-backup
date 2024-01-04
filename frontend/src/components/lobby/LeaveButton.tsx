import React from 'react';
import Button from "@mui/material/Button";
import {useLeaveLobby} from "../../hooks/lobbyHooks/useLeaveLobby";
import {useNavigate} from "react-router-dom";

type LeaveButtonProps = {
    lobbyId: string;
}

const LeaveButton: React.FC<LeaveButtonProps> = ({lobbyId}) => {
    const navigate = useNavigate();

    const leaveLobby = useLeaveLobby();

    const handleLeaveClick = () => {
        leaveLobby.mutate(lobbyId);
        navigate(`/lobby`)
    }

    return (
        <Button variant="contained" color="error" onClick={handleLeaveClick}>
            Leave Lobby
        </Button>
    );
}

export default LeaveButton;
