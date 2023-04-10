import "./visualForm.css"
import { useState } from "react";
import { updateAns } from "../answere-create/createAnsThunk";
import { useDispatch } from "react-redux";
import Timer from "./Timer";
const Letters = ["I", "II", "III", "IV", "V", "Vi", "VII", "VIII", "IX", "X", "XI", "XII", "XIII"];

const SingleQuizTest = ({ id, quiz, timeLeft, setFinalSubmitted, fetchScoreData }) => {
  const correctAns = quiz.answeres;
  const dispatch = useDispatch();
  const quizGrade = quiz.quizGrade;
  const questionData = quiz.quizQnDatas;
  const quizLength = questionData.length;
  const [timeEnd, setTimeEnd] = useState(false);
  const [current, setCurrent] = useState(0)
  const [Qno, setQno] = useState(1);
  const [cssAnimate, setCssAnimate] = useState(true);
  const [selectedAns, setSelectedAns] = useState([]);
  const [answeres, setAnsweres] = useState([]);

  const canGoNext = Boolean(Qno < quizLength);

  const canGoPrev = Boolean(Qno > 1);

  const canFinalSubmit = Boolean(answeres.length !== 0)
  const question = questionData[current];

  const canSave = Boolean(selectedAns.length !== 0);

  const [nextClick, setNextClick] = useState(false)

  const handlePrevious = () => {
    if (canGoPrev) {
      setCurrent(prev => --prev);
      setQno(prev => --prev);
      setCssAnimate(true)
    }
  }

  const handleNext = () => {
    if (canGoNext) {
      setCurrent(prev => ++prev);
      setQno(prev => ++prev);
      setCssAnimate(true);
    }
  }
  setTimeout(async () => {
    setCssAnimate(false)
  }, 550)


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

  const findScore = () => {
    let finalScore = 0;
    let correctAnswere = 0;
    let totalScore=0;
    correctAns?.forEach(ans => {
      const aQn = ans.qno;
      let isCorrect = true;
      const userAnsObj = answeres.find(ans => ans.qno === aQn);
      const actAns = ans.answere;
      let userAns;
      if (userAnsObj) {
        userAns = userAnsObj.answere;
      }else{
        return;
      }
      if (actAns.length===userAns.length) {
        actAns.forEach(a => {
          if (userAns.indexOf(a) === -1) {
            isCorrect = false;
          }
        })
      }else{
        return;
      }
      if (isCorrect) {
        correctAnswere++;
      }
    });
    if (quizGrade.gradeSys === "Per Question") {
      finalScore = Number(quizGrade.grade) * correctAnswere;
      totalScore=quizLength*quizGrade.grade;
    } else {
      const gradePerQn = Number(quizGrade.grade) / quizLength;
      finalScore = gradePerQn * correctAnswere;
      totalScore=quizGrade.grade;
    }
    return {
      finalScore:finalScore,
      totalQn:quizLength,
      totalScore:totalScore,
      attempedQn:answeres.length
    };
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
  } else {
    buttonName = "Save"
  }

  const handleFinalSubmit = async () => {
    if (!canFinalSubmit) {
      alert("somthing went wrong");
    }else{
      console.log("Hello");
      const finalScore = findScore();
      const response = await dispatch(updateAns({ id: id, answeres: answeres,score:finalScore.finalScore }))
      if (response) {
        fetchScoreData(finalScore)
        setFinalSubmitted(true);
      }
    }
  }
  if (timeEnd) {
    handleFinalSubmit();
  }


  return (
    <div className='visualForm2'>
      <div className="controllQuizHeader">
        <p>Time Left: <Timer setTimeEnd={setTimeEnd} timeLeft={timeLeft} /> minutes</p>
        <button disabled={!canFinalSubmit} onClick={handleFinalSubmit}>Finish Test</button>
      </div>
      {questionData !== [] ?
        <div className='qnCont'>
          <div className='visual-card'>
            {
              question ? <>
                <p className="qNo" >Question {Qno} of {quizLength}</p>
                <div className="question">
                  <p style={cssAnimate ? { animation: "0.4s ease-out 0s 1 slideInLeft" } : {}}>{question.question}</p>
                </div>
                <div className="options">
                  {question.options.map((option, index) => {
                    return (<ul key={index} style={cssAnimate ? { animation: "0.5s ease-out 0s 1 slideInLeft" } : {}}>
                      <li>
                        <input autoComplete='off' type="checkbox" onChange={handleInpChange} checked={nextClick ? false : null} value={selectedAns} name={`${Letters[index]}`} />
                        ({Letters[index]}) {option}
                      </li>
                    </ul>)
                  })}
                </div>
              </> : <p>No Questions</p>
            }
          </div>
          <div className="quesHead">
            <button className='prevButton' onClick={handlePrevious} disabled={cssAnimate}>{"Previous"}</button>
            <button className='nextButton' disabled={cssAnimate} onClick={handleSaveNxt}>{buttonName}</button>
          </div>
        </div>
        :
        <p>No Content Found</p>}

    </div>
  )
}

export default SingleQuizTest