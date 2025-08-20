import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import { Navigate, useParams } from "react-router-dom"

const isRecordingSupported = 
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === "function" &&
    typeof window.MediaRecorder === "function"


type RoomParams = {
  roomId: string
}

export const RecordRoom = () => {
    const params = useParams<RoomParams>()
    if(!params.roomId) return <Navigate replace to="/"/> 
    const [isRecording, setIsRecording] = useState(false)
    const recorder = useRef<MediaRecorder | null>(null)
    const intervalRef = useRef<NodeJS.Timeout>(null)

    const uploadAudio = async (audio: Blob) => {
        const formData = new FormData()

        formData.append("file", audio, 'audio.webm')

        const response = await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
            "method": 'POST',
            "body": formData
        })
        const data = await response.json()

        console.log(data)
    }

    const createRecorder = async (audio: MediaStream) => {
        recorder.current = new MediaRecorder(audio, {
            mimeType: 'audio/webm',
            bitsPerSecond: 64_000
        })

        recorder.current.ondataavailable = (event) => {
            if(event.data.size > 0){
                uploadAudio(event.data)
            }
        }

        recorder.current.onstart = () => console.log("Gravação Iniciada!")
        recorder.current.onstop = () => console.log("Gravação Encerrada!")


       
        recorder.current.start()
    }

    const startRecording = async () => {
        if(!isRecordingSupported) {
            alert("Seu navegador não tem suporte a gravação!")
            return
        }

        setIsRecording(true)

        const audio = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 44_100
            }
        })
 
        createRecorder(audio)

        intervalRef.current = setInterval(() => {
            recorder.current?.stop()

            createRecorder(audio)
        }, 5000)
    }

    const endRecording = () => {
       
        if(recorder.current && recorder.current.state !== 'inactive') {
            recorder.current.stop()
        }

        if(intervalRef.current){
            clearInterval(intervalRef.current)
        }

        setIsRecording(false)
    }

    return (
        <div className="h-screen flex justify-center items-center">
           { !isRecording ? <Button onClick={startRecording}>Inicar Gravação</Button> 
           : <Button onClick={endRecording}>Parar Gravação</Button> }
        </div>
    )
}