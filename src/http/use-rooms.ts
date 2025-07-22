import { useQuery } from "@tanstack/react-query";
import type { getRoomResponse } from "./types/get-rooms-response";

export const UseRooms = ()=> {
    return useQuery({
        queryKey: ['get-rooms'],
        queryFn: async () => {
            const response = await fetch("http://localhost:3333/rooms")
            const result: getRoomResponse = await response.json()

            return result;
        },
    })
}