import React from 'react';
import { useState } from "react"

import Dialog from '@mui/material/Dialog';

var letters = ["A","B","C","D","E","G","H","I","J","K","L"];


const AddQuestionForm = ({ addQuestion }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [options,setOptions]=useState([]);

  const [questionData, setQuestionData] = useState({
    question: "",
    options: []
  });

  const [inputOption, setInputOption] = useState("");

  const [inputQuestion, setInputQuestion] = useState("")

  const canAddOpt = Boolean(inputOption);
  const handleOptionAdd = () => {
    if (canAddOpt) {
      setOptions(pre=>[...pre,inputOption]);
      handleClose();
    } else {
      alert("Enter Valid Argument");
    }
  }

  console.log(options);

  const handleOptionCancle = () => {
    handleClose();
  }


  return (
    <>
      <div className="questionVisual">
        <p>Q: {inputQuestion}</p>
        <div>
          {options?.map((option,index )=> {
            return(
              <div key={index} className="option">
              <input type="radio" name="options" value={option} id="" />
              <span>({letters[index]}) {option}</span>
            </div>
            )
          })}
        </div>
      </div>
      <label htmlFor="questionName"></label>
      <div>
        <input value={inputQuestion} onChange={e => setInputQuestion(e.target.value)} type="text" id="questionName" />
        {/* <button disabled={false} onClick={handleInputDone}>done</button> */}
      </div>
      <button onClick={handleClickOpen}>Add Option</button>
      {/* <button onClick={handleQuesSubmit}>Submit</button> */}

      <Dialog open={open} onClose={handleClose}>
        <label htmlFor="optionName">Option Name</label>
        <input value={inputOption} onChange={e => setInputOption(e.target.value)} type="text" id='optionName' />
        <div className="actionbutton">
          <button onClick={handleOptionAdd} disabled={!canAddOpt}>Add</button>
          <button onClick={handleOptionCancle}>Cancle</button>
        </div>
      </Dialog>
    </>
  )
}

export default AddQuestionForm