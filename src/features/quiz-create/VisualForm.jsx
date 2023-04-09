import React, { useState } from 'react'
// import VisualCard from './VisualCard';
import "./visualForm.css"

import DeleteIcon from '@mui/icons-material/Delete';


const Letters = ["I", "II", "III", "IV", "V", "Vi", "VII", "VIII", "IX", "X", "XI", "XII", "XIII"];

const VisualForm = ({ questionData, setQuesData,setAnsweres,answeres }) => {
    const quizLength = questionData.length;
    let [Qno, setQno] = useState(1);
    const [cssAnimate, setCssAnimate] = useState(true);
    const [selectedAns, setSelectedAns] = useState([]);

    const [nextClick, setNextClick] = useState(false)

    const canGoNext = Boolean(Qno < quizLength);

    const canGoPrev = Boolean(Qno > 1);

    // const canFinalSubmit = Boolean(answeres.length !== 0)
    const canSave = Boolean(selectedAns.length !== 0);
    let question = questionData[Qno - 1];

    const handlePrevious = () => {
        if (canGoPrev) {
            setQno(prev => --prev);
            setCssAnimate(true)
        }
    }

    const handleNext = () => {
        if (canGoNext) {
            setQno(prev => ++prev);
            setCssAnimate(true);
        }
    }
    setTimeout(async () => {
        setCssAnimate(false)
    }, 550)

    const deleteOptAt = (Qno, index) => {
        const freshQn = {
            question: question.question,
            options: question?.options.filter((opt, idx) => idx !== index),
        }
        setQuesData(prev => {
            return prev.filter((_, index) => index !== Qno - 1)
        })
        setQuesData(prev => [...prev, freshQn])
    }

    const deleteQues = (qNo) => {
        setQuesData(prev => {
            return prev.filter((_, index) => index !== Qno - 1);
        })
        if (qNo !== 1 && qNo <= quizLength) {
            setQno(prev => --prev);
        }
    }

    const handleInpChange = (e) => {
        const name = e.target.name;
        if (e.target.checked) {
            setSelectedAns(prev => [...prev, name])
        }
        if (!e.target.checked) {
            setSelectedAns(prev => {
                return prev.filter(a => a !== name);
            })
        }
    }

    const handleSaveNxt = () => {
        if (canSave) {
            const duplicate = answeres.find(ans => ans.qno === Qno);
            if (duplicate) {
                setAnsweres(prev => {
                    return prev.filter(ans => ans.qno !== Qno);
                })
            }
            setAnsweres(prev => [...prev, { qno: Qno, answere: selectedAns }])
        }
        handleNext()
        setSelectedAns([]);
        setNextClick(true);
    }

    setTimeout(() => {
    if (nextClick) {
      setNextClick(false);
    }
  }, 50);

  let buttonName;
  if (canGoNext && canSave) {
    buttonName = "Save & Next"
  } else if (canSave && !canGoNext) {
    buttonName = "Save";
  } else if (!canSave && canGoNext) {
    buttonName = "Next";
  }

//   const handleFinalSubmit = async () => {
//     if (canFinalSubmit) {
      
//     }
//   }

let ansConetnt;

if(answeres.length!==0&&answeres.length>=Qno){
    const ansArr=answeres?.find(ans=>ans.qno===Qno).answere;
    console.log(ansArr);
    ansConetnt=ansArr?.map(a=><span>{a}, </span>)
}



    return (

        <div className='visualForm'>
            {questionData !== [] ?
                <div className='qnCont'>
                    {/* <VisualCard setQuesData={setQuesData} quizId={quizId} cssAnimate={cssAnimate} qNo={Qno} setQno={setQno} questionData={questionData} quizLength={quizLength} /> */}
                    <div className='visual-card'>
                        {
                            question ? <>
                                <p className="qNo" >Question {Qno} of {quizLength}</p>
                                <div className="question">
                                    <p style={cssAnimate ? { animation: "0.4s ease-out 0s 1 slideInLeft" } : {}}>{question.question}</p>
                                    <DeleteIcon onClick={() => deleteQues(Qno)} sx={{ width: "1.7rem", marginLeft: "0.5rem", color: "red" }} />
                                </div>
                                <div className="options">
                                    {question.options.map((option, index) => {
                                        return (<ul key={index} style={cssAnimate ? { animation: "0.5s ease-out 0s 1 slideInLeft" } : {}}>
                                            <li>
                                                <input type="checkbox" onChange={handleInpChange} checked={nextClick ? false : null} value={selectedAns} name={`${Letters[index]}`} />
                                                ({Letters[index]}) {option} <DeleteIcon onClick={() => deleteOptAt(Qno, index)} sx={{ width: "1rem", marginLeft: "0.5rem", color: "red" }} />
                                            </li>
                                        </ul>)
                                    })}
                                    <div className="answere">Answere: {ansConetnt}</div>
                                </div>
                            </> : <p>No Questions</p>
                        }
                    </div>
                    <div className="quesHead">
                    <button className='prevButton' onClick={handlePrevious} disabled={cssAnimate}>{"Previous"}</button>
            <button className='nextButton' disabled={cssAnimate} onClick={handleSaveNxt}>{buttonName ? buttonName : "Save"}</button>
                    </div>
                </div>
                :
                <p>No Content Found</p>}

        </div>
    )
}

export default VisualForm