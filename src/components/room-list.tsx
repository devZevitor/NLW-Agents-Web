import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { dayjs } from "@/lib/day"
import { UseRooms } from "@/http/use-rooms"


export const RoomList = ()=> {
    const {data, isLoading} = UseRooms()

    return  (
        <Card>
            <CardHeader>
                <CardTitle>
                    Salas recentes
                </CardTitle>
                <CardDescription>
                    Acesso rapido as salas mais recentes    
                </CardDescription>                    
            </CardHeader>  
            <CardContent className="flex flex-col gap-3">
                {isLoading && <p className="text-muted-foreground text-sm">Carregando salas...</p>}  
                {data?.map((room) => {
                    return (
                        <Link key={room.id} to={`room/${room.id}`}
                            className="flex items-center justify-between rounded-lg p-3 border hover:bg-accent/50">

                            <div className="flex-1 flex flex-col gap-a">
                                <h3 className="font-medium">{room.name}</h3>

                                <div>
                                    <Badge variant={"secondary"} className="text-xs">
                                        {dayjs(room.createdAt).toNow()}
                                    </Badge>
                                    <Badge variant={"secondary"} className="text-xs">
                                        {room.questionsCount} pergunta(s)
                                    </Badge>
                                </div>
                            </div>

                            <span className="flex gap-1 items-center text-sm">
                                Entrar
                                <ArrowRight  className="size-3"/>
                            </span>
                        </Link>
                    )
                })}
            </CardContent>
        </Card>
    )
}