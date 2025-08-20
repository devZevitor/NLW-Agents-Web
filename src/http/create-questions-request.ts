import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { createQuestionRequestType } from "./types/post-question-request"
import type { createQuestionResponseType } from "./types/post-question-response"
import type { getQuestions } from "./types/get-questions-request"


export const useCreateQuestion = (roomId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (req: createQuestionRequestType)=> {
        const data = await fetch(`http://localhost:3333/rooms/${roomId}/question`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(req, null, 2)
        })
        const response: createQuestionResponseType = await data.json()

        return response
        },
       

       onMutate({question}){
            const questions = queryClient.getQueryData<getQuestions>(['get-questions', roomId])

            const questionsArray = questions ?? []

            const newQuestion = {
                id: crypto.randomUUID(),
                question,
                answer: null,
                createdAt: new Date().toISOString(),
                isGeneratingAnswer: true,
            }

            queryClient.setQueryData<getQuestions>(['get-questions', roomId], [
                newQuestion,
                ...questionsArray
            ])

            return {newQuestion, questions}
       },

       onSuccess(data, _variables, context){
           queryClient.setQueryData<getQuestions>(['get-questions', roomId], 
            questions => {
                if(!questions){
                    return questions
                }

                if(!context.newQuestion){
                    return questions
                }

                return questions.map(question => {
                    if(question.id === context.newQuestion.id){
                        return { ...context.newQuestion, id: data.questionId, answer: data.anwer, isGeneratingAnswer: false}
                    }
                    return question
                }) 
            }
           )
       },

        onError(_error, _variables, context){
           if(context?.questions){
               queryClient.setQueryData<getQuestions>(['get-questions', roomId], context.questions)
           }
       }
       
    //    onSuccess: () => {
    //        queryClient.invalidateQueries({queryKey: ['get-questions', roomId]})
    //    },
    })
}