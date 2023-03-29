import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    name: "quezes",
    quizes: [
        {
            quizName: "Opt test-1",
            quizId: nanoid(),
            quizDesc: "Your task is to create a quiz application using React JS as the front-end. The application should have the following features: ",
            totalPoint: "100 (10 per question)",
            quizCreatDate: new Date().getDate(),
            timeLimit: 60,
            quizQuesOpt: [
                {
                    quesId: "ques" + nanoid(),
                    question: "Here we place Question.",
                    options: [
                        {
                            value: "A",
                            name: "options1"
                        },
                        {
                            value: "B",
                            name: "options2"
                        },
                        {
                            value: "C",
                            name: "options3"
                        },
                        {
                            value: "D",
                            name: "options4"
                        },
                    ]
                },
                {
                    quesId: "ques" + nanoid(),
                    question: "Here we place Question.",
                    options: [
                        {
                            value: "A",
                            name: "options1"
                        },
                        {
                            value: "B",
                            name: "options2"
                        },
                        {
                            value: "C",
                            name: "options3"
                        },
                        {
                            value: "D",
                            name: "options4"
                        },
                    ]
                }
            ]
        },
        {
            quizName: "Opt test-2",
            quizId: nanoid(),
            quizDesc: "Your task is to create a quiz application using React JS as the front-end. The application should have the following features: ",
            totalPoint: "100 (10 per question)",
            quizCreatDate: new Date().getDate(),
            timeLimit: 60,
            quizQuesOpt: [
                {
                    quesId: "ques" + nanoid(),
                    question: "Here we place Question.",
                    options: [
                        {
                            value: "A",
                            name: "options1"
                        },
                        {
                            value: "B",
                            name: "options2"
                        },
                        {
                            value: "C",
                            name: "options3"
                        },
                        {
                            value: "D",
                            name: "options4"
                        },
                    ]
                },
                {
                    quesId: "ques" + nanoid(),
                    question: "Here we place Question.",
                    options: [
                        {
                            value: "A",
                            name: "options1"
                        },
                        {
                            value: "B",
                            name: "options2"
                        },
                        {
                            value: "C",
                            name: "options3"
                        },
                        {
                            value: "D",
                            name: "options4"
                        },
                    ]
                }
            ]
        }
    ],
}


const createQuizSlice=createSlice({
    name:"quizes",
    initialState,
    reducers:{
        addnewQuize:{
            reducer: (state,action)=>{
                state.quizes.push(action.payload);
            },
            prepare(quizData){
                return {
                    payload:{
                        quizName: quizData.quizName,
                        quizId: nanoid(),
                        quizDesc: quizData.quizDesc,
                        totalPoint: quizData.totalPoint,
                        quizCreatDate: new Date().getDate(),
                        timeLimit: quizData.timeLimit,
                        quizQuesOpt: quizData.quizQuesOpt
                    }
                }
            }
        }
    }
})

export const getAllQuizes=(state)=>state.quizes.quizes;

export const getQuesById= (state,quizId)=>state.quizes.find(quize=>quize.quesId===quizId);

export const {addnewQuize} = createQuizSlice.actions;

export default createQuizSlice.reducer;