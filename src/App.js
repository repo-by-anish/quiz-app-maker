import React from 'react';
import CreateQuizForm from './features/quiz-create/CreateQuizForm';
import ListAllQuizes from './features/quiz-create/ListAllQuizes';
function App() {
  return (
    <main className='app'>
    <CreateQuizForm/>
    <ListAllQuizes/>
    </main>
  );
}

export default App;
