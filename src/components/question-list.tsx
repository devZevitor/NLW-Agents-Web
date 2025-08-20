import { useQuestions } from "@/http/use-questions"
import { QuestionItem } from "./question-item"

interface QuesntionsListProps {
    roomId: string
}

export const QuestionList = (props: QuesntionsListProps) => {
     const {data, isLoading} = useQuestions(props.roomId)

    return (
         <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-2xl text-foreground">
                Perguntas & Respostas
                </h2>
            </div>

            {data?.map((quest) => {
                return (
                    <QuestionItem 
                        key={quest.id}
                        question={quest}
                    />
                )
            })}
        </div> 
    )
}