import {Achievement, Medal} from "../../../model/Achievement.ts";
import Avatar from "@mui/material/Avatar";
import AchievementIcons from "../../../assets/images/achievementIcons";
import {Card, Typography, CardContent, CardHeader} from "@mui/material";

export default function SingleAchievement(props: Achievement) {
    const achievedMedals = props.achievementTiers
        .filter((tier) => tier.isAchieved)
        .map((tier) => tier.medal);

    const highestAchievedMedal = achievedMedals.reduce(
        (highestMedal: Medal, currentMedal) =>
            compareMedals(currentMedal, highestMedal) > 0
                ? currentMedal
                : highestMedal,
        Medal.NONE
    );

    const currentTier =
        props.achievementTiers.find((tier) => tier.medal === highestAchievedMedal) ||
        {medal: Medal.NONE};

    const nextTier =
        props.achievementTiers.find((tier) => tier.medal === getNextMedal(highestAchievedMedal))

    const isGreyedOut = currentTier.medal === Medal.NONE;

    return (
            <Card sx={{
                display: 'flex',
                width: "100%",
                backgroundColor: theme => isGreyedOut ? theme.palette.primary.dark : theme.palette.primary.light,
                opacity: isGreyedOut ? 0.5 : 1,
            }}>
                <CardHeader
                    avatar={currentTier.medal !== Medal.NONE ? (
                        <Avatar sx={{
                            width: "100%",
                        }} src={AchievementIcons[currentTier.medal]}/>) : ("")}
                    alt={currentTier.medal !== Medal.NONE ? currentTier.medal : "No Medal"}
                    sx={{flex: '100%', width: "100%", height: "6%"}}
                />
                <CardContent sx={{flex: '1 0 auto', width: "75%"}}>
                    <Typography component="div" variant="h5">
                        {props.name}
                    </Typography>
                    <Typography variant="subtitle1" component="div" color={"black"}>
                        {props.description}
                    </Typography>
                    <Typography variant="subtitle1" component="div" color={"black"}>
                        {nextTier ? ("Next tier: " + nextTier.medal + " requires: " + nextTier.description) : ("Congratulations, you completed this achievement!")}
                    </Typography>
                </CardContent>
                <CardContent sx={{flex: '1 0 auto', width: "100%"}}>
                    {props.dateAchieved}
                </CardContent>
            </Card>
    );
}

const medalOrder: Record<Medal, number> = {
    'NONE': 0,
    'BRONZE': 1,
    'SILVER': 2,
    'GOLD': 3,
};

function compareMedals(medal1: Medal, medal2: Medal): number {
    return medalOrder[medal1] - medalOrder[medal2];
}

function getNextMedal(currentMedal: Medal): Medal | null {
    const currentIndex = medalOrder[currentMedal];
    const nextIndex = currentIndex + 1;

    const medals = Object.keys(medalOrder) as Medal[];

    if (nextIndex < medals.length) {
        return medals[nextIndex];
    } else {
        return null;
    }
}
