import { Link } from "react-router-dom"

const ListQuizCard = ({quizId,quizName}) => {
  return (
    <div className="quizCard">
    <p>{quizName}</p>
    <Link className="viewForm" to={`quiz/${quizId}`}>View Form</Link>
    </div>
  )
}

export default ListQuizCard