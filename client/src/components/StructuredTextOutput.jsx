import React, { useState, useEffect } from "react";
import axios from "axios";

const StructuredTextOutput = () => {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState([]);
  useEffect(() => {
    handlePromptSend();
  });
  const handlePromptSend = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/googleai/textstructured`,
        {
          prompt,
        }
      );
      console.log(data);
      setResponses(data);
    } catch (error) {
      console.error("Error in chat:", error);
    } finally {
      setPrompt("");
    }

    return (
      <>
        StructuredTextOutput
        <div>{prompt}</div>
        <div>{responses}</div>
      </>
    );
  };
};
export default StructuredTextOutput;
