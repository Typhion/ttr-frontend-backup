import TrainIcon from "@mui/icons-material/Train";
import {Box} from "@mui/material";
type stationIconHoverProps = {
    hasStation: boolean;
}

export default function StationIconHoverNoColor({hasStation} : stationIconHoverProps) {

    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `5px solid primary`,
            borderRadius: '50%',
            width: '6vw',
            height: '6vw',
        }}>
            {hasStation && <TrainIcon/>}
        </Box>
    );
}