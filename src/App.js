import React, { useEffect } from 'react';
import CreateQuizForm from './features/quiz-create/CreateQuizForm';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuizes, getQuizStatus,fetchQuizes } from './features/quiz-create/createQuezeSlice';
import ListAllQuizes from './features/quiz-create/ListAllQuizes';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SingleQuiz from './features/quiz-create/SingleQuiz';
function App() {
  let quizes=useSelector(getAllQuizes);
  const dispatch=useDispatch();
  const quizStatus=useSelector(getQuizStatus);
  useEffect(() => {
    if (quizStatus === "idle") {
      dispatch(fetchQuizes());
    }
  }, [quizStatus, dispatch])
  if(!Array.isArray(quizes)){
    quizes=[]
  }
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<ListAllQuizes />} />
        <Route path='/quiz'>
          <Route index element={<CreateQuizForm />}/>
          {quizes?.map(quiz=><Route key={quiz._id} path={quiz.quizId} element={<SingleQuiz quiz={quiz}/>}/>)}
        </Route>
        

      </Route>
    </Routes>


  );
}

export default App;
