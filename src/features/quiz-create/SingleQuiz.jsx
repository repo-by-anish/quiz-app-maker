import { useSelector } from "react-redux"
import { getQuizById } from "./createQuezeSlice"
import { useParams, Link, Route, Routes } from "react-router-dom"
import SingleQuizBsic from "./SingleQuizBsic";
import SingleQuizTest from "./SingleQuizTest";
const SingleQuiz = () => {
    const { quizId } = useParams();
    const quiz = useSelector((state) => getQuizById(state, quizId));


    return (
        <div className='singleQuiz'>
        </div>
    )
}

export default SingleQuiz