import "./visualForm.css"


const Letters = ["I", "II", "III", "IV", "V", "Vi", "VII", "VIII", "IX", "X", "XI", "XII", "XIII"];

const VisualCard = ({ question, qNo, totalQn,cssAnimate }) => {
    return (
        <div className='visual-card'>
        {
            question?<>
            <p style={cssAnimate?{animation: "0.3s ease-out 0s 1 slideInLeft"}:{}}>Question {qNo} of {totalQn}</p>
            <div className="question">
                <p style={cssAnimate?{animation: "0.4s ease-out 0s 1 slideInLeft"}:{}}>{question.question}</p>
            </div>
            <div className="options">
                {question.options.map((option, index) => {
                    return (<ul style={cssAnimate?{animation: "0.5s ease-out 0s 1 slideInLeft"}:{}}>
                        <li>
                            <input type="checkbox" value={Letters[index]} name={option} />
                            ({Letters[index]}) {option}
                        </li>
                    </ul>)
                })}
            </div>
            </>:<p>No Questions</p>
        }
            
        </div>
    )
}

export default VisualCard