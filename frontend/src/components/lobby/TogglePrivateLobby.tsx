import {FormControlLabel, FormGroup, Switch} from "@mui/material";
import {LobbyState} from "../../model/LobbyState.ts";
import {defaultTheme} from "../../assets/themes/defaultTheme.ts";
import {
    Box,
} from "@mui/material";
export default function TogglePrivateLobby(props: { lobbyState: LobbyState, onChange: () => Promise<void> }) {
    return <Box
        sx={{
            width: "100%",
            marginBottom: '2px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '25px',
            justifyContent: 'center',
            maxWidth: '40vw',
            border: defaultTheme.palette.primary.main,
            borderRadius: "3px",
            borderStyle:  "solid",
            borderWidth: "1px",
            padding: "4px"
        }}
    >
    <FormGroup>
        <FormControlLabel control={<Switch defaultValue={String(props.lobbyState.isPublic)}/>}
                          onChange={props.onChange}
                          label={props.lobbyState.isPublic ? "public" : "private"}/>
    </FormGroup>
    </Box>;
}