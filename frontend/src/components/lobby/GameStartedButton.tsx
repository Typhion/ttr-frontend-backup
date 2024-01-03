import {Box, Typography} from "@mui/material";
import Button from "@mui/material/Button";

export default function GameStartedButton(props: { onClick: () => void }) {
    return <Box
        sx={{
            marginTop: "2%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        }}
    >
        <Typography>De game is al gestart, klik hier om de game te joinen</Typography>
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