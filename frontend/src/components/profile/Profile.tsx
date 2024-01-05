import { useParams } from "react-router-dom";
import {Alert, Avatar, Grid, Typography, Button, Card, CardContent, Box} from "@mui/material";
import { useProfile } from "../../hooks/userHooks/useProfile.ts";
import Loader from "../general/Loader.tsx";
import { getAvatarImage } from "../../model/Profile.ts";
import PersonIcon from "@mui/icons-material/Person";
import { useGetUnlockedAvatars } from "../../hooks/userHooks/useGetUnlockedAvatars.ts";
import { useChangeAvatar } from "../../hooks/userHooks/useChangeAvatar.ts";
import EditProfileDialog from "./EditProfileDialog.tsx";
import {useState} from "react";

const Profile = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const { isLoading, isError, data: profile, refetch } = useProfile(uuid);
    const { isLoading: isLoadingAvatars, isError: isErrorAvatars, data: unlockedAvatars } = useGetUnlockedAvatars();
    const [isEditProfileDialogOpen, setEditProfileDialogOpen] = useState(false);
    const changeAvatar = useChangeAvatar(() => {
        refetch();
    });

    if (isLoading || isLoadingAvatars) return <Loader>Loading profile...</Loader>;

    if (isError || isErrorAvatars) {
        return <Alert severity="error">Unable to load profile.</Alert>;
    }

    const handleEditProfileDialogOpen = () => setEditProfileDialogOpen(true);
    const handleEditProfileDialogClose = () => setEditProfileDialogOpen(false);

    const handleAvatarChange = (avatarId: string) => {
        changeAvatar.mutate(avatarId);
    };

    let avatarImage: string | null = null;
    if (profile?.avatar?.image) {
        avatarImage = getAvatarImage(profile.avatar.image);
    }

    return (
        <Box>
            <Box>
                <Card sx={{ border: '1px solid black', borderRadius: '5px' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Avatar sx={{ width: 150, height: 150, mb: 2 }}>
                            {avatarImage ? (
                                <Avatar src={avatarImage} alt="Profile" sx={{ width: '100%', height: '100%' }} />
                            ) : (
                                <PersonIcon sx={{ fontSize: '200%' }} />
                            )}
                        </Avatar>
                        <Typography variant="h4" sx={{ mb: 1 }}>{profile?.username}</Typography>
                        <Button variant="outlined" onClick={handleEditProfileDialogOpen}>Edit Profile</Button>
                    </CardContent>
                </Card>
                {profile != null && (<EditProfileDialog
                    isOpen={isEditProfileDialogOpen}
                    onClose={handleEditProfileDialogClose}
                    oldUsername={profile.username}
                    refetch={refetch}/>)}
            </Box>

            <Grid item xs={12} marginTop={2}>
                <Card sx={{ border: '1px solid black', borderRadius: '5px' }}>
                    <CardContent>
                        <Typography variant="h5">Unlocked Avatars</Typography>
                        <Grid container spacing={2}>
                            {unlockedAvatars && unlockedAvatars.map((avatar, index) => (
                                <Grid item key={index}>
                                    <Avatar
                                        sx={{ width: 75, height: 75, cursor: 'pointer' }}
                                        onClick={() => handleAvatarChange(avatar.id)}
                                    >
                                        {getAvatarImage(avatar.image) ? (
                                            <Avatar src={getAvatarImage(avatar.image)!} alt="Profile" sx={{ width: '100%', height: '100%' }} />
                                        ) : (
                                            <PersonIcon sx={{ fontSize: '200%' }} />
                                        )}
                                    </Avatar>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Box>
    );
};

export default Profile;
