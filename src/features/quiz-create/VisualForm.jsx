import React, { useState } from 'react'
import VisualCard from './VisualCard';

const VisualForm = ({ questionData,quizId,setQuesData }) => {
    const quizLength = questionData.length;
    let [Qno, setQno] = useState(1);
    const [cssAnimate, setCssAnimate] = useState(true);

    const canGoNext = Boolean(Qno < quizLength);

    const canGoPrev = Boolean(Qno > 1);


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


    return (

        <div className='visualForm'>
            {questionData !== [] ?
                <div className='qnCont'>
                    <VisualCard setQuesData={setQuesData} quizId={quizId} cssAnimate={cssAnimate} qNo={Qno} setQno={setQno} questionData={questionData} totalQn={quizLength} />
                    <div className="quesHead">
                        <button className='prevButton' onClick={handlePrevious} disabled={!canGoPrev || cssAnimate}>{"<<Previous"}</button>
                        <button className='nextButton' disabled={!canGoNext || cssAnimate} onClick={handleNext}>{"Next>>"}</button>
                    </div>
                </div>
                :
                <p>No Content Found</p>}

        </div>
    )
}

export default VisualForm