import {FormControlLabel, FormGroup, Switch} from "@mui/material";
import {LobbyState} from "../../model/LobbyState.ts";

export default function TogglePrivateLobby(props: { lobbyState: LobbyState, onChange: () => Promise<void> }) {
    return <FormGroup>
        <FormControlLabel control={<Switch defaultValue={String(props.lobbyState.isPublic)}/>}
                          onChange={props.onChange}
                          label={props.lobbyState.isPublic ? "public" : "private"}/>
    </FormGroup>;
}