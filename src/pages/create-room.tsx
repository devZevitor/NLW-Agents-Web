import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

type getRoomApiExpected = Array<{
    id: string
    name: string
}>

export function CreateRoom(){
    const { data, isLoading } = useQuery({
        queryKey: ['get-rooms'],
        queryFn: async () => {
            const response = await fetch("http://localhost:3333/rooms")
            const result: getRoomApiExpected = await response.json()

            return result;
        },
    })

    return  (
        <div>
            {isLoading && <div>carregando...</div>}

            <div className="flex flex-col gap-1">
                {data?.map((room) => {
                    return (
                         <Link key={room.id} to={`/room/${room.id}`}>
                            {room.name}
                        </Link>
                    )
                })}
            </div> 
        </div>
    )
}