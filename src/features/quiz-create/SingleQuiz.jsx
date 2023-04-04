import "./singleQuiz.css"
import { useState } from "react";
// import { Link } from "react-router-dom"
import SingleQuizBsic from "./SingleQuizBsic";
import SingleQuizTest from "./SingleQuizTest";
import { addAnswere, updateAns } from '../answere-create/createAnsThunk'
import { useDispatch } from "react-redux";

const SingleQuiz = ({ quiz }) => {
    const dispatch = useDispatch();
    const basicSubmit = async(basicData) => {
        const prepareData = {
            studentName: basicData.stName,
            studentEmail: basicData.stEmail,
            studentSection: basicData.stSection,
            studentRollno: basicData.stRollNo,
            quizId: quiz._id,
            answeres: []
        }
        const response = await dispatch(addAnswere({...prepareData}))
        if (response) {
            console.log(response);
            setIsSubmitted(true)
        }
    }
    const [isSubmited, setIsSubmitted] = useState(false);

    const submitted = (value) => {
        setIsSubmitted(value)
    }
    return (
        <div className='singleQuiz'>
            <SingleQuizTest quiz={quiz} /> 
        </div>
    )
}

export default SingleQuiz