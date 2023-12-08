import {useState} from "react";
import {Box} from "@mui/material";
import PlayerRouteCard from "./PlayerRouteCard";
import {RouteCard} from "../../../model/GameState";

interface PlayerRouteCardsProps {
    routeCards: RouteCard[];
}

export default function PlayerRouteCards(props: PlayerRouteCardsProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const sortedRouteCards = props.routeCards.sort(
        (a, b) => b.connectionSize - a.connectionSize
    );

    if (sortedRouteCards.length === 0 || sortedRouteCards[0] === undefined)
        return (
            <Box
                style={{
                    height: "100%",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <PlayerRouteCard
                    beginCity={"No cards found"}
                    endCity={"Grab a card"}
                    connectionSize={0}
                    large={true}
                    isCompleted={false}
                />
            </Box>
        );

    return (
        <Box
            style={{
                height: "100%",
                position: 'relative'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <PlayerRouteCard
                beginCity={sortedRouteCards[0].beginCity}
                endCity={sortedRouteCards[0].endCity}
                connectionSize={sortedRouteCards[0].connectionSize}
                large={true}
                isCompleted={sortedRouteCards[0].isCompleted}
            />

            {isHovered && (
                <Box style={{
                    position: "absolute",
                    bottom: `calc(100% - ${sortedRouteCards.length}px)`,
                    marginLeft: "2px",
                    width: '100%'
                }}>
                    {sortedRouteCards.slice(-(sortedRouteCards.length - 1)).map((routeCard, index) => (
                        <PlayerRouteCard
                            key={index}
                            beginCity={routeCard.beginCity}
                            endCity={routeCard.endCity}
                            connectionSize={routeCard.connectionSize}
                            large={false}
                            isCompleted={routeCard.isCompleted}
                        />
                    ))
                    }
                </Box>
            )}
        </Box>
    );
}
