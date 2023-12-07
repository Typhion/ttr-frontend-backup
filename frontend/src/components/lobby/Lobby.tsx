import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useCreateGame} from "../../hooks/useCreateGame.ts";
export default function Lobby() {
    const navigate = useNavigate();
    const createGame = useCreateGame(
        (uuid) => {
            navigate(`/game/${uuid}`)
        }
    )
    const handleOnClick = () => {
        createGame.mutate()
    }

    return <Button variant="contained" sx={{width: '1%', margin: 'auto', backgroundColor: 'green'}} onClick={handleOnClick}>Start Game</Button>

}
