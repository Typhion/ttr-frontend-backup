import {useQuery} from "@tanstack/react-query";
import {getUserCredits} from "../../services/CreditDataService.ts";

export function useGetUserCredits() {
    const {
        data: userCredits,
        refetch
    } = useQuery({
        queryKey: ['userCredits'],
        queryFn: () => getUserCredits()
    });

    return {
        data: userCredits,
        refetch
    };
}