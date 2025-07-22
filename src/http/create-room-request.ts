import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { createRoomRequest} from "@/http/types/post-room-request"
import type { createRoomResponse } from "./types/post-room-reaponse";

export const useCreateRoom = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: createRoomRequest) => {
            const request = await fetch("http://localhost:3333/rooms", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(data)
            })

            const response: createRoomResponse = await request.json()
            return response
        },
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: ['get-rooms']})
        }
    })
}