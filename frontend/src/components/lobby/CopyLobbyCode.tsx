import {Input, InputAdornment} from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import Button from "@mui/material/Button";

export default function CopyLobbyCode(props: {lobbyCode: string, onCopy: () => void, copied: boolean }) {
    return <Input
        value={props.lobbyCode}
        endAdornment={
            <InputAdornment position="end">
                <CopyToClipboard text={props.lobbyCode} onCopy={props.onCopy}>
                    <Button
                        variant="contained"
                        sx={{
                            width: "100%",
                            backgroundColor: "green",
                            color: "white",
                        }}
                    >
                        {props.copied ? "Copied!" : "Copy Code"}
                    </Button>
                </CopyToClipboard>
            </InputAdornment>
        }
        readOnly
        sx={{
            width: "100%",
            padding: "8px",
            fontSize: "16px",
            borderRadius: "4px",
        }}
    />;
}