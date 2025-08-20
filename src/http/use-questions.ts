import { useQuery } from "@tanstack/react-query"
import type { getQuestions } from "./types/get-questions-request"


export const useQuestions = (roomId: string) => {
    return useQuery({
        queryKey: ['get-questions', roomId],
        queryFn: async () => {
            const data = await fetch(`http://localhost:3333/rooms/${roomId}/question`)
            const response:getQuestions = await data.json()

            return response;
        }
    })
}