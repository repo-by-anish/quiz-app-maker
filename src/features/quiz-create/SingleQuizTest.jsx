import React from 'react'
import VisualForm from './VisualForm'
const SingleQuizTest = ({quiz}) => {
  return (
    <VisualForm quizId={quiz.quizId} questionData={quiz.quizQnDatas}/>
  )
}

export default SingleQuizTest