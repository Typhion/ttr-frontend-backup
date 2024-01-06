import {Alert, Avatar, Grid, Typography, Button, Card, CardContent, Box} from "@mui/material";
import {useProfile} from "../../hooks/userHooks/useProfile.ts";
import Loader from "../general/Loader.tsx";
import {getAvatarImage} from "../../model/Profile.ts";
import PersonIcon from "@mui/icons-material/Person";
import {useGetUnlockedAvatars} from "../../hooks/userHooks/useGetUnlockedAvatars.ts";
import {useChangeAvatar} from "../../hooks/userHooks/useChangeAvatar.ts";
import EditProfileDialog from "./EditProfileDialog.tsx";
import {useState} from "react";
import {useAddFriend} from "../../hooks/friendHooks/useAddFriend.ts";
import {useFriendlist} from "../../hooks/friendHooks/useFriendlist.ts";
import {useFriendRequestList} from "../../hooks/friendHooks/useFriendRequestList.ts";
import {useAcceptFriend} from "../../hooks/friendHooks/useAcceptFriend.ts";

interface ProfileProps {
    uuid: string | undefined;
}

const Profile = ({uuid}: ProfileProps) => {
    const {isLoading, isError, data: profile, refetch} = useProfile(uuid);
    const {isLoading: isLoadingAvatars, isError: isErrorAvatars, data: unlockedAvatars} = useGetUnlockedAvatars();
    const [isEditProfileDialogOpen, setEditProfileDialogOpen] = useState(false);
    const changeAvatar = useChangeAvatar(() => {
        refetch();
    });
    const addFriend = useAddFriend(
        () => {
            refetch();
        },
        () => {}
    );
    const acceptFriend = useAcceptFriend(() => {
            refetch();
            reqRefetch();
            flrefetch();
        }
    );
    const {isLoading: isFlLoading, isError: isFlError, data: friendlist, refetch: flrefetch} = useFriendlist();
    const {isLoading: isReqLoading, isError: isReqError, data: friendReqList, refetch: reqRefetch} = useFriendRequestList();

    if (isLoading || isLoadingAvatars || isFlLoading || isReqLoading) return <Loader>Loading profile...</Loader>;

    if (isError || isErrorAvatars || isFlError || isReqError) {
        return <Alert severity="error">Unable to load profile.</Alert>;
    }

    const handleEditProfileDialogOpen = () => setEditProfileDialogOpen(true);
    const handleEditProfileDialogClose = () => setEditProfileDialogOpen(false);

    const handleAvatarChange = (avatarId: string) => {
        changeAvatar.mutate(avatarId);
    };
    const handleAddFriend = () => {
        if (profile?.username) {
            addFriend.mutate(profile.username);
        }
    }
    const handleAcceptFriendRequest = () => {
        if (profile?.id) {
            acceptFriend.mutate(profile.id);
        }
    }
    const isFriend = friendlist?.some(friend => friend.id === profile?.id);
    const isFriendRequest = friendReqList?.some(friend => friend.id === profile?.id);

    let avatarImage: string | null = null;
    if (profile?.avatar?.image) {
        avatarImage = getAvatarImage(profile.avatar.image);
    }

    let button;
    if (isFriend) {
        // Profile belongs to an existing friend
        button = (
            <Button variant="outlined" disabled color="success">
                Already a Friend
            </Button>
        );
    } else if (isFriendRequest) {
        // Profile belongs to a pending friend request
        button = (
            <Button variant="outlined" color="primary" onClick={handleAcceptFriendRequest}>
                Accept Friend Request
            </Button>
        );
    } else {
        // Profile is neither a friend nor a friend request
        button = (
            <Button variant="outlined" color="success" onClick={handleAddFriend}>
                Add Friend
            </Button>
        );
    }

    return (
        <Box>
            <Box>
                <Card sx={{border: '1px solid black', borderRadius: '5px'}}>
                    <CardContent
                        sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
                        <Avatar sx={{width: 150, height: 150, mb: 2}}>
                            {avatarImage ? (
                                <Avatar src={avatarImage} alt="Profile" sx={{width: '100%', height: '100%'}}/>
                            ) : (
                                <PersonIcon sx={{fontSize: '200%'}}/>
                            )}
                        </Avatar>
                        <Typography variant="h4" sx={{ mb: 1 }}>{profile?.username}</Typography>
                        {uuid === undefined ? (
                            <Button variant="outlined" onClick={handleEditProfileDialogOpen}>Edit Profile</Button>
                        ) : (
                            button
                        )}
                    </CardContent>
                </Card>
                {uuid === undefined && profile != null && (
                    <EditProfileDialog
                        isOpen={isEditProfileDialogOpen}
                        onClose={handleEditProfileDialogClose}
                        oldUsername={profile.username}
                        refetch={refetch}
                    />
                )}
            </Box>

            {uuid === undefined && (
                <Grid item xs={12} marginTop={2}>
                    <Card sx={{border: '1px solid black', borderRadius: '5px'}}>
                        <CardContent>
                            <Typography variant="h5">Unlocked Avatars</Typography>
                            <Grid container spacing={2}>
                                {unlockedAvatars && unlockedAvatars.map((avatar, index) => (
                                    <Grid item key={index}>
                                        <Avatar
                                            sx={{width: 75, height: 75, cursor: 'pointer'}}
                                            onClick={() => handleAvatarChange(avatar.id)}
                                        >
                                            {getAvatarImage(avatar.image) ? (
                                                <Avatar src={getAvatarImage(avatar.image)!} alt="Profile"
                                                        sx={{width: '100%', height: '100%'}}/>
                                            ) : (
                                                <PersonIcon sx={{fontSize: '200%'}}/>
                                            )}
                                        </Avatar>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Box>
    );
};

export default Profile;