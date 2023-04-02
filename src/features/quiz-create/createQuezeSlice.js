import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

import axios from "axios";


// const initialState = {
//     name: "quezes",
//     quizes: [
//         {
//             quizName: "Opt test-1",
//             quizId: nanoid(),
//             quizDesc: "Your task is to create a quiz application using React JS as the front-end. The application should have the following features: ",
//             totalPoint: "100 (10 per question)",
//             quizCreatDate: new Date().getDate(),
//             timeLimit: 60,
//             quizQuesOpt: [
//                 {
//                     quesId: "ques" + nanoid(),
//                     question: "Here we place Question.",
//                     options: [
//                         {
//                             value: "A",
//                             name: "options1"
//                         },
//                         {
//                             value: "B",
//                             name: "options2"
//                         },
//                         {
//                             value: "C",
//                             name: "options3"
//                         },
//                         {
//                             value: "D",
//                             name: "options4"
//                         },
//                     ]
//                 },
//                 {
//                     quesId: "ques" + nanoid(),
//                     question: "Here we place Question.",
//                     options: [
//                         {
//                             value: "A",
//                             name: "options1"
//                         },
//                         {
//                             value: "B",
//                             name: "options2"
//                         },
//                         {
//                             value: "C",
//                             name: "options3"
//                         },
//                         {
//                             value: "D",
//                             name: "options4"
//                         },
//                     ]
//                 }
//             ]
//         },
//         {
//             quizName: "Opt test-2",
//             quizId: nanoid(),
//             quizDesc: "Your task is to create a quiz application using React JS as the front-end. The application should have the following features: ",
//             totalPoint: "100 (10 per question)",
//             quizCreatDate: new Date().getDate(),
//             timeLimit: 60,
//             quizQuesOpt: [
//                 {
//                     quesId: "ques" + nanoid(),
//                     question: "Here we place Question.",
//                     options: [
//                         {
//                             value: "A",
//                             name: "options1"
//                         },
//                         {
//                             value: "B",
//                             name: "options2"
//                         },
//                         {
//                             value: "C",
//                             name: "options3"
//                         },
//                         {
//                             value: "D",
//                             name: "options4"
//                         },
//                     ]
//                 },
//                 {
//                     quesId: "ques" + nanoid(),
//                     question: "Here we place Question.",
//                     options: [
//                         {
//                             value: "A",
//                             name: "options1"
//                         },
//                         {
//                             value: "B",
//                             name: "options2"
//                         },
//                         {
//                             value: "C",
//                             name: "options3"
//                         },
//                         {
//                             value: "D",
//                             name: "options4"
//                         },
//                     ]
//                 }
//             ]
//         }
//     ],
// }

const QUIZ_URL = "http://localhost:3500/quiz"

const initialState = {
    name: "quizes",
    quizes: [],
    status: "idle",
    error: null
}

export const fetchQuizes = createAsyncThunk("quizes/fetchQuese", async () => {
    try {
        const response = await axios.get(QUIZ_URL);
        return [...response.data];
    } catch (error) {
        return error.message;
    }
})

export const addNewQuize= createAsyncThunk("quizes/addNewQuiz",async(initialQuiz)=>{
    const inputQuiz={...initialQuiz,quizId:nanoid(),quizCreatDate:new Date()};
    console.log(initialQuiz.quizQnDatas);
    try {
        const response =await axios.post(QUIZ_URL,inputQuiz);
        return response.data;
    } catch (error) {
        return error.message;
    }
})


const createQuizSlice = createSlice({
    name: "quizes",
    initialState,
    reducers: {
        // addnewQuize: {
        //     reducer: (state, action) => {
        //         state.quizes.push(action.payload);
        //     },
        //     prepare(quizData) {
        //         return {
        //             payload: {
        //                 quizName: quizData.quizName,
        //                 quizId: nanoid(),
        //                 quizDesc: quizData.quizDesc,
        //                 totalPoint: quizData.totalPoint,
        //                 quizCreatDate: new Date().getDate(),
        //                 timeLimit: quizData.timeLimit,
        //                 quizQuesOpt: quizData.quizQuesOpt
        //             }
        //         }
        //     }
        // }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchQuizes.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchQuizes.fulfilled, (state, action) => {
                state.status = "fullfield";
                const loadedQuiz=action.payload;
                state.quizes=loadedQuiz;
            })
            .addCase(fetchQuizes.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message;
            })
            .addCase(addNewQuize.fulfilled,(state, action)=>{
                // action.payload.quizCreatDate=new Date().toISOString();
                // state.quizes=action.payload;
            })
    }
})

export const getAllQuizes = (state) => state.quizes.quizes;

export const getQuizById = (state, quizId) => state.quizes.quizes.find(quiz=>quiz.quizId===quizId);

export const getQuizStatus=(state)=>state.quizes.status;
export const getQuizError=(state)=>state.quizes.error;

// export const { addnewQuize } = createQuizSlice.actions;

export default createQuizSlice.reducer;