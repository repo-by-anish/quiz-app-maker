import { useSelector } from "react-redux";

import { getAllQuizes } from "./createQuezeSlice";

const ListAllQuizes = () => {
    const quizes=useSelector(getAllQuizes);
    console.log(quizes)
  return (
    <div>ListAllQuizes</div>
  )
}

export default ListAllQuizes