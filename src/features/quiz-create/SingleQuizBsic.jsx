import { useState } from "react"


const SingleQuizBsic = ({ quiz,basicSubmit }) => {
  const [stName, setStName] = useState("");
  const [stEmail, setStEmail] = useState("");
  const [stSection, setStSection] = useState("");
  const [stRollNo, setStRollNo] = useState(0);
  const canSubmit=Boolean(stEmail)&&Boolean(stEmail)&&Boolean(stRollNo)&&Boolean(stSection);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) {
      basicSubmit({stName,stEmail,stRollNo,stSection});
    }else{
      alert("All Feild is required");
    }
  }
  return (
    <div className="quizBasicForm">
      <div className="header">
        <div>
          <h3><span>Test: </span>{quiz.quizName}</h3>
          <p><span>Duration: </span>{quiz.quizDuration} min</p>
        </div>
        <p><span>Description: </span>{quiz.quizDesc}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="left">
            <div>
              <label htmlFor="name">Enter Name: </label>
              <input autoComplete='off' onChange={e => setStName(e.target.value)} value={stName} type="text" id="name" />
            </div>
            <div>
              <label htmlFor="emailId">Enter Email: </label>
              <input autoComplete='off' onChange={e => setStEmail(e.target.value)} value={stEmail} type="text" id="emailId" />
            </div>
          </div>
          <div className="right">
            <div>
              <label htmlFor="section">Enter Section: </label>
              <input autoComplete='off' onChange={e => setStSection(e.target.value)} value={stSection} type="text" id="section" />
            </div>
            <div>
              <label htmlFor="roll">Enter Roll No: </label>
              <input autoComplete='off' onChange={e => setStRollNo(e.target.value)} value={stRollNo} type="text" id="roll" />
            </div>
          </div>
        </div>
        <button onClick={handleSubmit} type="button">Save</button>
      </form>
    </div>
  )
}

export default SingleQuizBsic