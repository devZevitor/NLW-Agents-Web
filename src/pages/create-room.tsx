import { RoomForm } from "@/components/room-form"
import { RoomList } from "@/components/room-list"

export function CreateRoom(){
    
    return  (
        <div className="min-h-screen px-4 py-8 ">
            <div className="mx-auto max-w-4x">
                <div className=" 
                    sm:grid sm:grid-cols-2 sm:gap-8 sm:p-0 sm:items-start
                    flex flex-col gap-4 p-4
                ">
                    <RoomForm />
                    <RoomList />
                </div>
            </div>

        </div>
    )
}