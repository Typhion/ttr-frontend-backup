import {useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useSetLobbySettings } from '../../hooks/lobbyHooks/useSetLobbySettings.ts';
import {LobbySettings, SettingDto} from "../../model/LobbyState.ts";
import * as z from 'zod';
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TextField} from "@mui/material";

type SettingsDialogProps = {
    open: boolean;
    onClose: () => void;
    lobbySettings: LobbySettings;
};

const settingsSchema = z.object({
    wagonAmount: z.number().min(5).max(60),
    jokerWagonCardAmount: z.number().min(1).max(30),
    normalWagonCardCount: z.number().min(3).max(30),
    maxSize: z.number().min(2).max(5),
});

export default function SettingsDialog({ open, onClose, lobbySettings }: SettingsDialogProps) {
    const setLobbySettings = useSetLobbySettings();

    const { handleSubmit, control, reset, formState: { errors } } = useForm<SettingDto>({
        resolver: zodResolver(settingsSchema),
        defaultValues: lobbySettings.settingDto,
    });

    useEffect(() => {
        reset(lobbySettings.settingDto); // Reset form when lobbySettings change
    }, [lobbySettings, reset]);

    const onSubmit = (data: SettingDto) => {
        setLobbySettings.mutate({
            lobbyId: lobbySettings.lobbyId,
            settingDto: data,
        });
        onClose();
    };

    const handleNumberInput = (fieldValue: string) => {
        const number = parseInt(fieldValue, 10);
        return isNaN(number) ? 0 : number; // Convert to number, defaulting to 0 if NaN
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Settings</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Controller
                        name="wagonAmount"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Wagons"
                                type="number"
                                onChange={(e) => field.onChange(handleNumberInput(e.target.value))}
                                error={!!errors.wagonAmount}
                                helperText={errors.wagonAmount?.message}
                                fullWidth
                                margin="dense"
                            />
                        )}
                    />
                    <Controller
                        name="jokerWagonCardAmount"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Joker Cards"
                                type="number"
                                onChange={(e) => field.onChange(handleNumberInput(e.target.value))}
                                error={!!errors.jokerWagonCardAmount}
                                helperText={errors.jokerWagonCardAmount?.message}
                                fullWidth
                                margin="dense"
                            />
                        )}
                    />
                    <Controller
                        name="normalWagonCardCount"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Normal Cards"
                                type="number"
                                onChange={(e) => field.onChange(handleNumberInput(e.target.value))}
                                error={!!errors.normalWagonCardCount}
                                helperText={errors.normalWagonCardCount?.message}
                                fullWidth
                                margin="dense"
                            />
                        )}
                    />
                    <Controller
                        name="maxSize"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Max Players"
                                type="number"
                                onChange={(e) => field.onChange(handleNumberInput(e.target.value))}
                                error={!!errors.maxSize}
                                helperText={errors.maxSize?.message}
                                fullWidth
                                margin="dense"
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
