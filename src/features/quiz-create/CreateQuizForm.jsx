import { useDispatch } from "react-redux";
import { addNewQuize, fetchQuizes } from "./createQuezeSlice";
import AddQuestionForm from "./AddQuestionForm";
import Dialog from '@mui/material/Dialog';
import "./quizCreate.css";
import { useEffect, useState } from "react";
import VisualForm from "./VisualForm";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";



const CreateQuizForm = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [quesData, setQuesData] = useState([]);
    const [open, setOpen] = useState(false);
    const [requestStatus, setRequestStatus] = useState("idle");
    const [quizName, setQuizName] = useState("");
    const [quizDesc, setQuizDesc] = useState("");
    const [grade, setGrade] = useState();
    const [gradeSys, setGradeSys] = useState("");
    const [answeres, setAnsweres] = useState([]);
    const [quizDuration, setquizDuration] = useState();
    const [dataPrepared, setDataPrepared] = useState({
        quizName: "",
        quizDesc: "",
        quizGrade: {},
        quizDuration: "",
        quizQnDatas: quesData,
        answeres: answeres
    })


    useEffect(() => {
        setDataPrepared(prev => {
            return {
                quizName: prev.quizName,
                quizDesc: prev.quizDesc,
                quizGrade: prev.quizGrade,
                quizDuration: prev.quizDuration,
                quizQnDatas: [...quesData],
                answeres: [...answeres],
            }
        })
    }, [quesData, answeres])

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
    const canSubmitQuestion = Boolean(dataPrepared.quizName) && Boolean(dataPrepared.quizDesc) && Boolean(dataPrepared.quizGrade) && Boolean(dataPrepared.quizDuration) && Boolean(dataPrepared.quizQnDatas) && answeres.length !== 0 && requestStatus === "idle";
    const handleFinealSubmit = async () => {
        if (canSubmitQuestion) {
            try {
                console.log(dataPrepared);
                const response = await dispatch(addNewQuize({ ...dataPrepared }));
                setDataPrepared({
                    quizName: "",
                    quizDesc: "",
                    quizGrade: {},
                    quizDuration: "",
                    quizQnDatas: [],
                    answeres: []
                })
                setQuesData([]);
                alert(response.payload.message)
                dispatch(fetchQuizes())
                Navigate("/")
            } catch (error) {
                console.log(error)
            }
            finally {
                setRequestStatus("idle");
            }
        } else {
            alert("All Feild are Required");
        }
    }

    const canAddQuestion = Boolean(dataPrepared.quizName) && Boolean(dataPrepared.quizDesc) && Boolean(dataPrepared.quizGrade) && Boolean(dataPrepared.quizDuration);
    const canViewfullHead = Boolean(dataPrepared.quizName) || Boolean(dataPrepared.quizDesc) || Boolean(dataPrepared.quizGrade.gradeSys) || Boolean(dataPrepared.quizDuration);
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

    // console.log(answeres);

    return (
        <>
            <Header />
            <div className="createQuizForm">
                <div className="formHeader">
                    <h3>Live preview of quiz form</h3>
                    <button onClick={handleFinealSubmit}>Finish</button>
                </div>
                {
                    canViewfullHead ? <div className="fullFormVisual">
                        {dataPrepared.quizName ? <p className="quizName-v"><span>Quiz Name:</span> {dataPrepared.quizName}</p> : ""}
                        <div className="quizdecription">
                            <div className="left">
                                {dataPrepared.quizGrade.grade ? <p><span>Points Distribution:</span> {dataPrepared.quizGrade?.grade + " "} Points ({dataPrepared.quizGrade?.gradeSys})</p> : ""}
                                {dataPrepared.quizDuration ? <p><span>Duration:</span> {dataPrepared.quizDuration} minutes</p> : ""}
                            </div>
                            <div className="right">
                                {dataPrepared.quizDesc ? <p><span>Description</span>: {dataPrepared.quizDesc.substring(0, 100)}...</p> : ""}
                            </div>
                        </div>
                        {quesData.length ? <VisualForm answeres={answeres} setAnsweres={setAnsweres} setQuesData={setQuesData} questionData={quesData} /> : ""}
                    </div> : ""
                }
                <div className="quizBasicDetail">
                    {!dataPrepared.quizName ? <div className="quizname">
                        <label htmlFor="qname">Quiz Name</label>
                        <div className="inputFeild">
                            <input autoComplete="off" value={quizName} onChange={e => setQuizName(e.target.value)} placeholder="Enter Quiz Name" type="text" id="qname" />
                            <button disabled={!quizName} onClick={handleAddQname}>Add</button>
                        </div>
                    </div> : ""}
                    {
                        !dataPrepared.quizDesc ? <div className="quizDesc">
                            <label htmlFor="qdesc">Quiz Description</label>
                            <div className="inputFeild">
                                <textarea value={quizDesc} onChange={e => setQuizDesc(e.target.value)} placeholder="Enter Description" name="" id="qdesc"></textarea>
                                <button disabled={!quizDesc} onClick={handleAddQdesc}>Add</button>
                            </div>
                        </div> : ""
                    }
                    {
                        !dataPrepared.quizGrade.gradeSys ? <div className="quizGrade">
                            <label htmlFor="qgrade">Point/Grade System</label>
                            <div className="inputFeild grading">
                                <div>
                                    <input autoComplete="off" value={grade} onChange={e => setGrade(e.target.value)} placeholder="Enter Grade/Point" type="number" id="qgrade" />
                                    <select value={gradeSys} onChange={e => setGradeSys(e.target.value)} name="grade" id="qgrade">
                                        <option value=""></option>
                                        <option value="Per Question">Per Question</option>
                                        <option value="Total">Total</option>
                                    </select>
                                </div>
                                <button disabled={!grade && !gradeSys} onClick={handleAddQPoint}>Add</button>
                            </div>
                        </div> : ""
                    }
                    {
                        !dataPrepared.quizDuration?<div className="quizDuration">
                        <label htmlFor="qTLimit">Time Limit</label>
                        <div className="inputFeild">
                            <input autoComplete="off" value={quizDuration} onChange={e => setquizDuration(e.target.value)} placeholder="Enter Time Limit(In Minutes)" type="number" id="qTLimit" />
                            <button disabled={!quizDuration} onClick={handleAddQlimit}>Add</button>
                        </div>
                    </div>:""
                    }
                    <div className="addNewQues">
                        <button disabled={!canAddQuestion} onClick={handleClickOpen}>Add New Question</button>
                    </div>
                </div>
                <Dialog open={open} onClose={handleQnClose}>
                    <AddQuestionForm handleQnClose={handleQnClose} addQuestion={addQuestion} />
                </Dialog>
            </div>
        </>
    )
}

export default CreateQuizForm