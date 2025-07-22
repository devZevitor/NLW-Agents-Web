import {
    Card,
    CardContent,
    CardDescription,
    CardHeader, 
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { useCreateRoom } from "@/http/create-room-request"


export const RoomForm = ()=> {

    const {mutateAsync: createRoom} = useCreateRoom()

    const createRoomSchema = z.object({
        name: z.string().min(3, {message: "Preencha com pelo menos 3 caracteres"}),
        description: z.string()
    })

    type roomSchemaType = z.infer<typeof createRoomSchema>

    const createRoomForm = useForm<roomSchemaType>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            name: '', 
            description: '',
        }
    })

    const handleCreateRoom = async ({name, description}: roomSchemaType) => {
        await createRoom({name, description})
        createRoomForm.reset()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Criar sala
                </CardTitle>
                <CardDescription>
                    Crie sua sala para criar perguntas e receber respostas da I.A.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...createRoomForm}>
                    <form onSubmit={createRoomForm.handleSubmit(handleCreateRoom)} className="flex flex-col gap-4">
                        <FormField 
                            control={createRoomForm.control}
                            name="name"
                            render={({field}) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Digite o seu nome"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField 
                            control={createRoomForm.control}
                            name="description"
                            render={({field}) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <Button className="w-full" type="submit">Criar sala</Button>
                        
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}