import React from 'react';
import { useState } from "react"

import Dialog from '@mui/material/Dialog';

const letters = ["A", "B", "C", "D", "E", "G", "H", "I", "J", "K", "L"];


const AddQuestionForm = ({ addQuestion, handleQnClose }) => {
  const [open, setOpen] = React.useState(false);
  const [inputOption, setInputOption] = useState("");
  const [inputQuestion, setInputQuestion] = useState("")
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const canAddQues = Boolean(inputQuestion);
  const canEditQuestion = Boolean(question);

  const handleInputDone = () => {
    if (canAddQues) {
      setQuestion(inputQuestion);
      setInputQuestion("");
    }
  }

  const canAddOpt = Boolean(inputOption);
  const handleOptionAdd = () => {
    if (canAddOpt) {
      setOptions(pre => [...pre, inputOption]);
      setInputOption("");
      handleClose();
    } else {
      alert("Enter Valid Argument");
    }
  }

  const handleOptionCancle = () => {
    handleClose();
  }

  const handleQuesSubmit = () => {
    if (canEditQuestion) {
      addQuestion({
        question,
        options
      })
      setQuestion("");
      setOptions([]);
      handleQnClose();
    }
  }

  return (
    <section className='addQuest'>
      <div className="questionVisual">
        <p>{question ? "Q :" : "Your question will show Here..."} {question}</p>
        <div>
          {options?.map((option, index) => {
            return (
              <div key={index} className="option">
                <span>({letters[index]}) {option}</span>
              </div>
            )
          })}
        </div>
      </div>
      {!question ? <div className='question-sec'>
        <label htmlFor="questionName">Enter Question</label>
        <input value={inputQuestion} disabled={canEditQuestion} onChange={e => {
          if (e.target.value) {
            return setInputQuestion(e.target.value)
          }
        }} type="text" id="questionName" />
        <button onClick={handleInputDone}>Add</button>

      </div> : ""}
      <div className="button-add">
        <button disabled={!canEditQuestion} onClick={handleClickOpen}>Add Option</button>
      </div>
      <div className='button-submit'>
        <button disabled={!canEditQuestion} onClick={handleQuesSubmit}>Submit</button>
      </div>
      <div className="buttonExit">
        <button onClick={() => {
          handleQnClose()
        }}>Exit</button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <div className="dialogue">
          <div className="inputFeild">
            <label htmlFor="optionName">Option Name</label>
            <input value={inputOption} onChange={e => setInputOption(e.target.value)} type="text" id='optionName' />
          </div>
          <div className="actionbutton">
            <button onClick={handleOptionAdd} disabled={!canAddOpt}>Add</button>
            <button onClick={handleOptionCancle}>Cancle</button>
          </div>
        </div>
      </Dialog>
    </section>
  )
}

export default AddQuestionForm