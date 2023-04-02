import { useEffect, useState } from "react";
import "./listAll.css"
import { useSelector, useDispatch } from "react-redux";
import { getAllQuizes, getQuizStatus, getQuizError, fetchQuizes } from "./createQuezeSlice";
import { Box, CircularProgress } from "@mui/material";
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import ListQuizCard from "./ListQuizCard";

const ListAllQuizes = () => {
  const dispatch = useDispatch();
  const [refAnim, setRefAnim] = useState("");
  const quizes = useSelector(getAllQuizes);
  const quizStatus = useSelector(getQuizStatus);
  const quizError = useSelector(getQuizError)
  useEffect(() => {
    if (quizStatus === "idle") {
      dispatch(fetchQuizes());
    }
  }, [quizStatus, dispatch])
  // console.log(quizes);
  let content;

  const refreshQuizCard=()=>{
    dispatch(fetchQuizes());
  }

  if (quizStatus === "loading") {
    content = <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  }

  if (quizStatus === "fullfield") {
    content = quizes?.map((quiz) => {
      return (
        <ListQuizCard key={quiz.quizId} quizId={quiz.quizId} quizName={quiz.quizName}/>
      )
    })
  }

  if (quizStatus === "failed") {
    content = <p>{quizError}</p>
  }

  const refreshAnimate = () => {
    setRefAnim('refresh-start')
    setTimeout(function () {
      setRefAnim('');
    }, 800);
  }

  return (
    <div className="list-quiz">
    <div onClick={refreshAnimate} className="referesh-button">
      <button onClick={refreshQuizCard} className={refAnim} ><ReplayRoundedIcon fontSize="large" /></button>
    </div>
      {content}
    </div>
  )
}

export default ListAllQuizes