import React, { useState } from 'react'
import VisualCard from './VisualCard';

const VisualForm = ({ questionData }) => {
    const quizLength = questionData.length;
    const [current, setCurrent] = useState(0)
    let [Qno, setQno] = useState(1);
    const [cssAnimate, setCssAnimate] = useState(true);

    const canGoNext = Boolean(Qno < quizLength);

    const canGoPrev = Boolean(Qno > 1);


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


    return (

        <div className='visualForm'>
            {questionData !== [] ?
                <div className='qnCont'>
                    <VisualCard cssAnimate={cssAnimate} question={questionData[current]} qNo={Qno} totalQn={quizLength} />
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