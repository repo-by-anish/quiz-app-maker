import { useDispatch } from "react-redux";
import { addnewQuize } from "./createQuezeSlice";
import AddQuestionForm from "./AddQuestionForm";
import "./quizCreate.css";



const CreateQuizForm = () => {
    const dispatch=useDispatch();
  return (
    <div className="createQuizForm">
    <AddQuestionForm/>
    </div>
  )
}

export default CreateQuizForm