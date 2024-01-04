import SingleAchievement from "./SingleAchievement.tsx";
import {Alert, Box, Card, CardContent, Divider, Typography} from "@mui/material";
import {useGetPlayerAchievements} from "../../../hooks/userHooks/useGetPlayerAchievements.ts";
import Loader from "../../general/Loader.tsx";

export default function AchievementPage() {
    const {isLoading: isLoading, isError: isError, data: availableAchievements} = useGetPlayerAchievements();

    if (isError) return <Alert severity="error">Unable to load the achievements.</Alert>;

    if (isLoading) return <Loader>Loading Achievements...</Loader>;

    return <Card sx={{border: '1px solid black', borderRadius: '5px', width: "100%"}}>
        <CardContent>
            <Typography variant="h5">Achievements</Typography>
            <Divider sx={{ my: 2 }} />
            {availableAchievements?.map((achievement, index) => (
                <Box padding={'1px'} key={index}>
                    <SingleAchievement key={index} id={achievement.id} achievementTiers={achievement.achievementTiers}
                                       dateAchieved={achievement.dateAchieved}
                                       description={achievement.description}
                                       name={achievement.name}></SingleAchievement>
                </Box>
            ))}
        </CardContent>
    </Card>
}