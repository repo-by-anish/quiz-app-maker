import React from 'react';
import CreateQuizForm from './features/quiz-create/CreateQuizForm';
import ListAllQuizes from './features/quiz-create/ListAllQuizes';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SingleQuiz from './features/quiz-create/SingleQuiz';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<ListAllQuizes />} />
        <Route path='/quiz'>
          <Route index element={<CreateQuizForm />}/>
          <Route path=':quizId/*' element={<SingleQuiz/>}/>
        </Route>
        

      </Route>
    </Routes>


  );
}

export default App;
