import TrainIcon from "@mui/icons-material/Train";
import {useOwnerColorByStation} from "../../../hooks/gameHooks/useOwnerColorByStation.ts";
import {Box} from "@mui/material";


export default function StationIconHover({stationId}: { stationId: string }) {
    const {data: stationWithColor} = useOwnerColorByStation(stationId);

    return (
        <Box>
            {<TrainIcon style={{color: `${stationWithColor?.gamePlayerColor}`}}/>}
        </Box>
    );
}
