import "./visualForm.css"

import DeleteIcon from '@mui/icons-material/Delete';


const Letters = ["I", "II", "III", "IV", "V", "Vi", "VII", "VIII", "IX", "X", "XI", "XII", "XIII"];

const VisualCard = ({ qNo, totalQn, cssAnimate, setQuesData, questionData, setQno}) => {
    let question = questionData[qNo - 1];
    const deleteOptAt = (qNo, index) => {
        const freshQn = {
            question: question.question,
            options: question?.options.filter((opt, idx) => idx !== index),
        }
        setQuesData(prev => {
            return prev.filter((data, index) => index !== qNo - 1)
        })
        setQuesData(prev => [...prev, freshQn])
    }

    const deleteQues = (qNo) => {
        setQuesData(prev => {
            return prev.filter((_, index) => index !== qNo - 1);
        })
        if (qNo !== 1&&qNo<=totalQn) {
            setQno(prev => --prev);
        }
    }

    console.log(qNo);

    return (
        <div className='visual-card'>
            {
                question ? <>
                    <p className="qNo" >Question {qNo} of {totalQn}</p>
                    <div className="question">
                        <p style={cssAnimate ? { animation: "0.4s ease-out 0s 1 slideInLeft" } : {}}>{question.question}</p>
                        <DeleteIcon onClick={() => deleteQues(qNo)} sx={{ width: "1.7rem", marginLeft: "0.5rem", color: "red" }} />
                    </div>
                    <div className="options">
                        {question.options.map((option, index) => {
                            return (<ul key={index} style={cssAnimate ? { animation: "0.5s ease-out 0s 1 slideInLeft" } : {}}>
                                <li>
                                    <input type="checkbox" value={`${qNo}/${Letters[index]}`} name={`${qNo}/${Letters[index]}`} />
                                    ({Letters[index]}) {option} <DeleteIcon onClick={() => deleteOptAt(qNo, index)} sx={{ width: "1rem", marginLeft: "0.5rem", color: "red" }} />
                                </li>
                            </ul>)
                        })}
                    </div>
                </> : <p>No Questions</p>
            }
        </div>
    )
}

export default VisualCard