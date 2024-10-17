import { useState } from "react";
import apiClient from "../api/axios";
import axios from "axios";

const useAssessment = () => {
  const [error, setError] = useState(null);

  const Assessment = async (message) => {
    try {
      const response = await axios.post("/assessment/", {
        content: message,
       // history:[],
        //generalInfo:"",
        //bussinessInfo:"",
       // assessmentName:""
      });
      console.log("Assessment hook response: A:", response.data)
      console.log("hook response: B", response.data.report[0]);
      console.log("hook response: C", response.data.report[0].subReport[0].questionAnswer);
      console.log("hook response:", response.data.report[0].subReport[0].questionAnswer[0].question)
      //console.log("Assessment -> ", response.data.message);
      setError(null);
      return response.data.report[0].subReport[0].questionAnswer[0].question;
    } catch (error) {
      console.log("check", error.message);
      setError(error.message);
    }
  };

  return { error, Assessment };
};

export default useAssessment;
