import "./singleQuiz.css"
import { useState } from "react";
// import { Link } from "react-router-dom"
import SingleQuizBsic from "./SingleQuizBsic";
import SingleQuizTest from "./SingleQuizTest";
import { addAnswere} from '../answere-create/createAnsThunk'
import { useDispatch } from "react-redux";
import Rating from "./Rating";


const SingleQuiz = ({ quiz }) => {
    const dispatch = useDispatch();
    const [reqId,setReqId]=useState("");
    const [finalSubmitted,setFinalSubmitted]=useState(false);
    const [timeLeft,setTimeLeft]=useState(0);
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
            setReqId(response.payload.id);
            setTimeLeft(quiz.quizDuration*60);
            setIsSubmitted(true)
        }
    }
    const [isSubmited, setIsSubmitted] = useState(false);
    return (
        <div className='singleQuiz'>
        {
            finalSubmitted?<Rating/>:isSubmited?<SingleQuizTest setFinalSubmitted={setFinalSubmitted} timeLeft={timeLeft} id={reqId}  quiz={quiz} /> :<SingleQuizBsic quiz={quiz} basicSubmit={basicSubmit}/>
        }
            
        </div>
    )
}

export default SingleQuiz