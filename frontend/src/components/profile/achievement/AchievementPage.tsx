import SingleAchievement from "./SingleAchievement.tsx";
import {Alert, Box} from "@mui/material";
import {useGetPlayerAchievements} from "../../../hooks/userHooks/useGetPlayerAchievements.ts";
import Loader from "../../general/Loader.tsx";
import ListItem from "@mui/material/ListItem";

export default function AchievementPage() {
    const {isLoading: isLoading, isError: isError, data: availableAchievements} = useGetPlayerAchievements();

    if (isError) return <Alert severity="error">Unable to load the achievements.</Alert>;

    if (isLoading) return <Loader>Loading Achievements...</Loader>;

    return <Box>
        <Box sx={{marginX: "25%"}}>
        {availableAchievements?.map((achievement, index) => (
            <ListItem key={index}>
                    <SingleAchievement id={achievement.id} achievementTiers={achievement.achievementTiers}
                                       dateAchieved={achievement.dateAchieved}
                                       description={achievement.description} name={achievement.name}></SingleAchievement>
            </ListItem>
        ))}</Box>
    </Box>
}