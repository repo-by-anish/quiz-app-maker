import { configureStore } from '@reduxjs/toolkit';

import  quizReducer from "../features/quiz-create/createQuezeSlice"

export const store = configureStore({
  reducer: {
    quizes:quizReducer
  },
});
