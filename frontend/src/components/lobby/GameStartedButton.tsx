import {Box, Typography} from "@mui/material";
import Button from "@mui/material/Button";

export default function GameStartedButton(props: { onClick: () => void }) {
    return <Box
        sx={{
            marginTop: "2%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center"
        }}
    >
        <Typography>The game has already started, click here to join the game</Typography>
        <Button
            variant="contained"
            sx={{
                marginTop: "2%",
                backgroundColor: "green",
                color: "white",
            }}
            onClick={props.onClick}>
            Join Game
        </Button>
    </Box>;
}