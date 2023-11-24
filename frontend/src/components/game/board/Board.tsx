import { useEffect, useRef, useState } from 'react';
import { Alert, Box } from "@mui/material";
import { City } from "../../../model/GameState.ts";
import CityNode from "./CityNode.tsx";
import Loader from "../../general/Loader.tsx";
import { useBoardImage } from "../../../hooks/useBoardImage.ts";

interface BoardProps {
    boardUuid: string;
    cities: City[];
}

export default function Board({ boardUuid, cities }: BoardProps) {
    const { isLoading, isError, data: imageUrl } = useBoardImage(boardUuid!);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const imageRef = useRef<HTMLImageElement>(null);

    const updateImageSize = () => {
        if (imageRef.current) {
            setImageSize({
                width: imageRef.current.clientWidth,
                height: imageRef.current.clientHeight
            });
        }
    };

    useEffect(() => {
        updateImageSize();
        window.addEventListener('resize', updateImageSize);

        return () => window.removeEventListener('resize', updateImageSize);
    }, [imageUrl]); // Depend on imageUrl to update when image changes

    if (isLoading) return <Loader>Loading Game Details...</Loader>;
    if (isError || !imageUrl) return <Alert severity="error">Unable to load this game's details.</Alert>;

    const containerStyle = {
        position: 'relative',
        width: 'auto',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <Box sx={containerStyle}>
            <img
                src={imageUrl}
                alt="Game Board"
                ref={imageRef}
                style={{ maxHeight: '100%', maxWidth: '100%', minHeight: '80%', minWidth: '80%' }}
                onLoad={updateImageSize} // Update size when image is loaded
            />
            <Box sx={{ position: 'absolute', height: imageSize.height, width: imageSize.width }}>
                {cities.map((city) => (
                    <CityNode city={city} key={city.id} imageSize={imageSize} />
                ))}
            </Box>
        </Box>
    );
}
