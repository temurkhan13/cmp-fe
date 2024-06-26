import { useState } from "react";
import apiClient from "../api/axios";

const useAssessment = () => {
  const [error, setError] = useState(null);

  const Assessment = async (message,generalInfo,bussinessInfo,assessmentName) => {
    try {
      const response = await apiClient.post("/assessment/", {
        message: "",
        history:[],
        generalInfo:"",
        bussinessInfo:"",
        assessmentName:""
      });
      console.log("Assessment -> ", response.data.message);
      setError(null);
      return response.data.message;
    } catch (error) {
      console.log("check", error.message);
      setError(error.message);
    }
  };

  return { error, Assessment };
};

export default useAssessment;
