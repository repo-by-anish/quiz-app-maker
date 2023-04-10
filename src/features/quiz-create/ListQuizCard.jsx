import { Link } from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux"
import { deleteQuiz, fetchQuizes } from "./createQuezeSlice";

const ListQuizCard = ({quizId,quizName}) => {
  const dispatch=useDispatch();
  const deleteThis=async()=>{
    const res=await dispatch(deleteQuiz(quizId))
    if (res.payload) {
      dispatch(fetchQuizes())
      alert(res.payload.message)
    }
  }
  return (
    <div className="quizCard">
   <div className="delete">
   <p>{quizName}</p>
   <DeleteIcon onClick={deleteThis} sx={{color:"red"}}/>
   </div>
    <Link className="viewForm" to={`quiz/${quizId}`}>View Form</Link>
    <Link className="viewForm" to={`/quiz/edit/${quizId}`}>Edit</Link>
    </div>
  )
}

export default ListQuizCard