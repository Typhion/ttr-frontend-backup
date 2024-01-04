import {Box, IconButton, TextField} from "@mui/material";
import {useAddFriend} from "../../../hooks/friendHooks/useAddFriend.ts";
import {useFriendlist} from "../../../hooks/friendHooks/useFriendlist.ts";
import SendIcon from '@mui/icons-material/Send';
import React, {ChangeEvent, useState} from "react";

export default function AddFriend() {
    const {refetch} = useFriendlist();
    const [borderColor, setBorderColor] = useState('default');

    const addFriend = useAddFriend(
        () => {
            refetch()
            setFriend('');
            setBorderColor('success');
        },
        () => {
            setBorderColor('error');
        });
    const [friend, setFriend] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFriend(event.target.value);
        setBorderColor('default');
    };

    const handleSendFriendRequest = () => {
        if (friend.trim() !== '') {
            addFriend.mutate(friend);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSendFriendRequest();
        }
    };

    return (
        <Box sx={{mt: 3}}>
            <TextField
                label="Friend To Add"
                variant="outlined"
                size={"small"}
                value={friend}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                sx={{
                    marginRight: 1,
                    borderColor: borderColor === 'success' ? 'green' : borderColor === 'error' ? 'red' : 'default',
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: borderColor === 'success' ? 'green' : borderColor === 'error' ? 'red' : 'default',
                        },
                    },
                }}
            />
            <IconButton onClick={handleSendFriendRequest}>
                <SendIcon color={"primary"}/>
            </IconButton>
        </Box>
    )
}