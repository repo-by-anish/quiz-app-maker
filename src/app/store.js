import { configureStore } from '@reduxjs/toolkit';

import  quizReducer from "../features/quiz-create/createQuezeSlice"
import answereReducer from "../features/answere-create/createAnsThunk"

export const store = configureStore({
  reducer: {
    quizes:quizReducer,
    answeres:answereReducer
  },
});
