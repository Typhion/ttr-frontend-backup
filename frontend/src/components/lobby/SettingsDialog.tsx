import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Input from '@mui/material/Input';
import { useSetLobbySettings } from '../../hooks/useSetLobbySettings.ts';
import {LobbySettings, SettingDto} from "../../model/LobbyState.ts";

type SettingsDialogProps = {
    open: boolean;
    onClose: () => void;
    lobbySettings: LobbySettings;
};

export default function SettingsDialog({ open, onClose, lobbySettings }: SettingsDialogProps) {
    const setLobbySettings = useSetLobbySettings();

    const [settings, setSettings] = useState<SettingDto>(lobbySettings.settingDto);

    const handleInputChange = (property: keyof SettingDto, value: number) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [property]: value,
        }));
    };

    const handleSaveClick = () => {
        setLobbySettings.mutate({
            lobbyId: lobbySettings.lobbyId,
            settingDto: settings,
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <div>
                    <span>Wagons: </span>
                    <Input
                        type="number"
                        value={settings.wagonAmount}
                        onChange={(e) => handleInputChange('wagonAmount', parseInt(e.target.value, 10))}
                    />
                </div>
                <div>
                    <span>Joker Cards: </span>
                    <Input
                        type="number"
                        value={settings.jokerWagonCardAmount}
                        onChange={(e) =>
                            handleInputChange('jokerWagonCardAmount', parseInt(e.target.value, 10))
                        }
                    />
                </div>
                <div>
                    <span>Normal Cards: </span>
                    <Input
                        type="number"
                        value={settings.normalWagonCardCount}
                        onChange={(e) =>
                            handleInputChange('normalWagonCardCount', parseInt(e.target.value, 10))
                        }
                    />
                </div>
                <div>
                    <span>Max players: </span>
                    <Input
                        type="number"
                        value={settings.maxSize}
                        onChange={(e) => handleInputChange('maxSize', parseInt(e.target.value, 10))}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSaveClick}>Save</Button>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

