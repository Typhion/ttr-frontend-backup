import {useQuery} from "@tanstack/react-query";
import {getUserCredits} from "../../services/CreditDataService.ts";

export function useGetUserCredits() {
    const {
        isLoading,
        isError,
        data: userCredits,
        refetch
    } = useQuery({
        queryKey: ['userCredits'],
        queryFn: () => getUserCredits()
    });

    return {
        isLoading,
        isError,
        data: userCredits,
        refetch
    };
}