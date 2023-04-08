import { useEffect, useState } from "react";
import "./listAll.css"
import { useSelector, useDispatch } from "react-redux";
import { getAllQuizes, getQuizStatus, getQuizError, fetchQuizes } from "./createQuezeSlice";
import { Box, CircularProgress, Grid } from "@mui/material";
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import ListQuizCard from "./ListQuizCard";
import Header from "../../components/Header"

const ListAllQuizes = () => {
  const dispatch = useDispatch();
  const [refAnim, setRefAnim] = useState("");
  let quizes = useSelector(getAllQuizes);
  const quizStatus = useSelector(getQuizStatus);
  const quizError = useSelector(getQuizError)
  useEffect(() => {
    if (quizStatus === "idle") {
      dispatch(fetchQuizes());
    }
  }, [quizStatus, dispatch])
  if (!Array.isArray(quizes)) {
    quizes = []
  }
  let content;

  const refreshQuizCard = () => {
    dispatch(fetchQuizes());
  }

  if (quizStatus === "loading") {
    content = <Box sx={{ width:"100%", height:"100vh", display:"flex", justifyContent:"space-around" }}>
      <CircularProgress  sx={{marginLeft:"auto", marginRight:"auto"}}/>
    </Box>
  }


  if (quizStatus === "fullfield") {
    if (quizes.length) {
      content = quizes?.map((quiz) => {
        return (
          <Grid item xs={2} sm={4} md={4} key={quiz.quizId}>
            <ListQuizCard quizId={quiz.quizId} quizName={quiz.quizName} />
          </Grid>
        )
      })
    }
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

  if (quizes.length === 0) {
    content = <div className="noquiz">
      <h3>No Quizes Found</h3>
      <p>Click <b>Create</b> button above to create new form</p>
    </div>
  }

  return (
    <>
      <Header />
      <div className="list-quiz">
        <div onClick={refreshAnimate} className="referesh-button">
          <button onClick={refreshQuizCard} className={refAnim} ><ReplayRoundedIcon fontSize="large" /></button>
        </div>
        <div className="message">
          <h4>Not listed created quiz Just Refres It.</h4>
        </div>
        <Grid  container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {content}
        </Grid>
      </div>
    </>
  )
}

export default ListAllQuizes