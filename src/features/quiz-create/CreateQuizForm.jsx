import { useDispatch } from "react-redux";
import {addNewQuize } from "./createQuezeSlice";
import AddQuestionForm from "./AddQuestionForm";
import Dialog from '@mui/material/Dialog';
import "./quizCreate.css";
import { useEffect, useState } from "react";
import VisualForm from "./VisualForm";



const CreateQuizForm = () => {
    const dispatch = useDispatch();
    const [quesData, setQuesData] = useState([]);
    const [open, setOpen] = useState(false);
    const [requestStatus,setRequestStatus]=useState("idle");
    const [quizName, setQuizName] = useState("");
    const [quizDesc, setQuizDesc] = useState("");
    const [grade, setGrade] = useState(0);
    const [gradeSys, setGradeSys] = useState("");
    const [quizDuration, setquizDuration] = useState(0);
    const [dataPrepared, setDataPrepared] = useState({
        quizName: "",
        quizDesc: "",
        quizGrade: {},
        quizDuration: 0,
        quizQnDatas: quesData
    })

    useEffect(()=>{
        setDataPrepared(prev=>{
            return {
                quizName: prev.quizName,
                quizDesc: prev.quizDesc,
                quizGrade: prev.quizGrade,
                quizDuration: prev.quizDuration,
                quizQnDatas: [...quesData]
            }
        })
    },[quesData])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleQnClose = () => {
        setOpen(false);
    };
    const addQuestion = (question) => {
        setQuesData([...quesData, {
            question: question.question,
            options: question.options
        }])
    }
    const canSubmitQuestion = Boolean(dataPrepared.quizName) && Boolean(dataPrepared.quizDesc) && Boolean(dataPrepared.quizGrade) && Boolean(dataPrepared.quizDuration)&& Boolean(dataPrepared.quizQnDatas)&&requestStatus==="idle";
    const handleFinealSubmit = () => {
        if(canSubmitQuestion){
            try {
                console.log("Clicked");
                dispatch(addNewQuize({...dataPrepared})).unwrap();
                setDataPrepared({
                    quizName: "",
                    quizDesc: "",
                    quizGrade: {},
                    quizDuration: "",
                    quizQnDatas: ""
                })
            } catch (error) {
               console.log(error) 
            } 
            finally{
                setRequestStatus("idle");
            }    
        }
    }

    const canAddQuestion = Boolean(dataPrepared.quizName) && Boolean(dataPrepared.quizDesc) && Boolean(dataPrepared.quizGrade) && Boolean(dataPrepared.quizDuration);

    const handleAddQname = () => {

        setDataPrepared(prev => {
            return {
                quizName: quizName,
                quizDesc: prev.quizDesc,
                quizGrade: prev.quizGrade,
                quizDuration: prev.quizDuration,
                quizQnDatas: prev.quizQnDatas
            }
        })
        setQuizName("");
    }
    const handleAddQdesc = () => {

        setDataPrepared(prev => {
            return {
                quizName: prev.quizName,
                quizDesc: quizDesc,
                quizGrade: prev.quizGrade,
                quizDuration: prev.quizDuration,
                quizQnDatas: prev.quizQnDatas
            }
        })
        setQuizDesc("");
    }
    const handleAddQPoint = () => {

        setDataPrepared(prev => {
            return {
                quizName: prev.quizName,
                quizDesc: prev.quizDesc,
                quizGrade: {
                    grade: grade,
                    gradeSys: gradeSys
                },
                quizDuration: prev.quizDuration,
                quizQnDatas: prev.quizQnDatas
            }
        })
        setGradeSys("");
        setGrade(0);
    }
    const handleAddQlimit = () => {

        setDataPrepared(prev => {
            return {
                quizName: prev.quizName,
                quizDesc: prev.quizDesc,
                quizGrade: prev.quizGrade,
                quizDuration: quizDuration,
                quizQnDatas: prev.quizQnDatas
            }
        })
        setquizDuration(0);
    }



    return (
        <div className="createQuizForm">
            <div className="formHeader">
                <h3>Live preview of quiz form</h3>
                <button disabled={!canSubmitQuestion} onClick={handleFinealSubmit}>Finish</button>
            </div>
            <div className="fullFormVisual">
            <p className="quizName-v">Quiz Name: {dataPrepared.quizName}</p>
                <div className="quizdecription">
                    <div className="left">
                        <p><span>Points Distribution:</span> {dataPrepared.quizGrade?.grade + " "} Points ({dataPrepared.quizGrade?.gradeSys})</p>
                        <p><span>TimeLeft:</span> {dataPrepared.quizDuration}</p>
                    </div>
                    <div className="right">
                        <p><span>Description</span>: {dataPrepared.quizDesc.substring(0,100)}...</p>
                    </div>
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
                        <textarea value={quizDesc} onChange={e => setQuizDesc(e.target.value)} placeholder="Enter Description" name="" id="qdesc"></textarea>
                        <button disabled={!quizDesc} onClick={handleAddQdesc}>Add</button>
                    </div>
                </div>
                <div className="quizGrade">
                    <label htmlFor="qgrade">Point/Grade System</label>
                    <div className="inputFeild grading">
                        <div>
                            <input value={grade} onChange={e => setGrade(e.target.value)} placeholder="Enter Grade/Point" type="number" id="qgrade" />
                            <select value={gradeSys} onChange={e => setGradeSys(e.target.value)} name="grade" id="qgrade">
                                <option value=""></option>
                                <option value="Per Question">Per Question</option>
                                <option value="Total">Total</option>
                            </select>
                        </div>
                        <button disabled={!grade && !gradeSys} onClick={handleAddQPoint}>Add</button>
                    </div>
                </div>
                <div className="quizDuration">
                    <label htmlFor="qTLimit">Time Limit</label>
                    <div className="inputFeild">
                        <input value={quizDuration} onChange={e => setquizDuration(e.target.value)} placeholder="Enter Time Limit(In Minutes)" type="number" id="qTLimit" />
                        <button disabled={!quizDuration} onClick={handleAddQlimit}>Add</button>
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