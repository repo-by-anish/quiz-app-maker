import { useDispatch } from "react-redux";
import { addnewQuize } from "./createQuezeSlice";
import AddQuestionForm from "./AddQuestionForm";
import Dialog from '@mui/material/Dialog';
import "./quizCreate.css";
import { useState } from "react";
import VisualForm from "./VisualForm";



const CreateQuizForm = () => {
    const dispatch = useDispatch();
    const [quesData, setQuesData] = useState([]);
    const [open, setOpen] = useState(false);

    const [quizName, setQuizName] = useState("");
    const [quizDesc, setQuizDesc] = useState("");
    const [grade, setGrade] = useState(0);
    const [gradeSys, setGradeSys] = useState("");
    const [timeLimit, setTimeLimit] = useState(0);
    const [dataPrepared,setDataPrepared]=useState({
        quizName: "",
        quizDesc: "",
        totalPoint: {},
        timeLimit: "",
        quizQuesOpt: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleQnClose = () => {
        setOpen(false);
    };
    const addQuestion = (question) => {
        setQuesData(prev => [...quesData, {
            question: question.question,
            options: question.options
        }])
    }

    const handleFinealSubmit = () => {
        dispatch(addnewQuize());
    }

    const canAddQuestion=Boolean(quizName)&&Boolean(quizDesc)&&Boolean(grade)&&Boolean(gradeSys)&&Boolean(timeLimit);

    const handleAddQname=()=>{
        
        setDataPrepared(prev=>{
            return{
                quizName: quizName,
                quizDesc: prev.quizDesc,
                totalPoint: prev.totalPoint,
                timeLimit: prev.timeLimit,
                quizQuesOpt: prev.quizQuesOpt
            }
        })
        setQuizName("");
    }
    const handleAddQdesc=()=>{
        
        setDataPrepared(prev=>{
            return{
                quizName: prev.quizName,
                quizDesc: quizDesc,
                totalPoint: prev.totalPoint,
                timeLimit: prev.timeLimit,
                quizQuesOpt: prev.quizQuesOpt
            }
        })
        setQuizName("");
    }
    const handleAddQPoint=()=>{
        
        setDataPrepared(prev=>{
            return{
                quizName: prev.quizName,
                quizDesc: prev.quizDesc,
                totalPoint: {
                    grade:grade,
                    gradeSys:gradeSys
                },
                timeLimit: prev.timeLimit,
                quizQuesOpt: prev.quizQuesOpt
            }
        })
        setGradeSys("");
        setGrade(0);
    }
    const handleAddQlimit=()=>{
        
        setDataPrepared(prev=>{
            return{
                quizName: prev.quizName,
                quizDesc: prev.quizDesc,
                totalPoint: prev.totalPoint,
                timeLimit: timeLimit,
                quizQuesOpt: prev.quizQuesOpt
            }
        })
        setTimeLimit(0);
    }



    return (
        <div className="createQuizForm">
            <div className="fullFormVisual">
                <div className="formHeader">
                    <h3>Live preview of quiz form</h3>
                    <button onClick={handleFinealSubmit}>Create</button>
                </div>
                <VisualForm questionData={quesData} />
            </div>
            <div className="quizBasicDetail">
                <div className="quizname">
                    <label htmlFor="qname">Quiz Name</label>
                    <div className="inputFeild">
                        <input value={quizName} onChange={e => setQuizName(e.target.value)} placeholder="Enter Quiz Name" type="text" id="qname" />
                        <button disabled={!quizName} onClick={handleAddQname}>Add</button>
                    </div>
                </div>
                <div className="quizDesc">
                    <label htmlFor="qdesc">Quiz Description</label>
                    <div className="inputFeild">
                        <textarea onChange={e => setQuizDesc(e.target.value)} placeholder="Enter Description" name="" id="qdesc"></textarea>
                        <button disabled={!quizDesc}  onClick={handleAddQdesc}>Add</button>
                    </div>
                </div>
                <div className="quizGrade">
                    <label htmlFor="qgrade">Point/Grade System</label>
                    <div className="inputFeild grading">
                        <div>
                            <input onChange={e => setGrade(e.target.value)} placeholder="Enter Grade/Point" type="number" id="qgrade" />
                            <select onChange={e => setGradeSys(e.target.value)} name="grade" id="qgrade">
                                <option value=""></option>
                                <option value="per">Per Question</option>
                                <option value="total">Total</option>
                            </select>
                        </div>
                        <button disabled={!grade&&!gradeSys} onClick={handleAddQPoint}>Add</button>
                    </div>
                </div>
                <div className="timeLimit">
                    <label htmlFor="qTLimit">Time Limit</label>
                    <div className="inputFeild">
                        <input onChange={e => setTimeLimit(e.target.value)} placeholder="Enter Time Limit(In Minutes)" type="number" id="qTLimit" />
                        <button disabled={!timeLimit}  onClick={handleAddQlimit}>Add</button>
                    </div>
                </div>
                <div className="addNewQues">
                    <button disabled={!canAddQuestion} onClick={handleClickOpen}>Add New Question</button>
                </div>

            </div>
            <Dialog open={open} onClose={handleQnClose}>
                <AddQuestionForm handleQnClose={handleQnClose} addQuestion={addQuestion} />
            </Dialog>
        </div>
    )
}

export default CreateQuizForm