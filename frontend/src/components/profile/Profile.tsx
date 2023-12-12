import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";

export default function Profile() {
    const navigate = useNavigate();

    const handleNavFriends = () => {
        navigate(`/profile/friends`);
    }

    return (
        <Grid container style={{justifyContent: 'center', alignItems: 'center'}} spacing={2}>
            <Grid item>
                <Button
                    variant="contained"
                    sx={{height: '100%', marginBottom: '10%'}}
                    onClick={handleNavFriends}
                >
                    Friends
                </Button>
            </Grid>
        </Grid>
    )
}