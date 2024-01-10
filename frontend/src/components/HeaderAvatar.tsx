import {useProfileForHeader} from "../hooks/userHooks/useProfileForHeader.ts";
import {getAvatarImage} from "../model/Profile.ts";
import {Avatar, IconButton} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

type HeaderAvatarProps = {
    loggedInUserId: string
}

export function HeaderAvatar({loggedInUserId}: HeaderAvatarProps) {
    const {data: profile, refetch} = useProfileForHeader(loggedInUserId);
    const navigate = useNavigate();

    useEffect(() => {
        refetch()
    }, [profile?.avatar?.image]);

    const handleNavProfile = () => {
        navigate(`/profile`);
    }

    let avatarImage: string | null = null;
    if (profile?.avatar?.image) {
        avatarImage = getAvatarImage(profile.avatar.image);
    }

    return (
            <IconButton size='large' onClick={handleNavProfile}>
                <Avatar sx={{width: 40, height: 40}}>
                    {avatarImage ? (
                        <Avatar src={avatarImage} alt="Profile_Header" sx={{width: '100%', height: '100%'}}/>
                    ) : (
                        <PersonIcon sx={{fontSize: 'inherit'}}/>
                    )}
                </Avatar>
            </IconButton>
    )
}