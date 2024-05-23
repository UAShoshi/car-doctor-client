import axios from "axios";
import { useEffect, useState } from "react";


const useNumber = () => {
  const [number, setNumber] = useState();
  useEffect( () => {
    axios.get('/getNumber')
    .then(res =>{
      setNumber(res.data);
    })
  }, [])
  return number;
};

export default useNumber;