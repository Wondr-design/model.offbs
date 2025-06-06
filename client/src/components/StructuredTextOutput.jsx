import React, { useState, useEffect } from "react";
import axios from "axios";

const StructuredTextOutput = () => {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    handlePromptSend();
  }, []);

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
  };

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">StructuredTextOutput</h2>
      <div className="mb-2">
        <strong>Prompt:</strong> {prompt || "<empty>"}
      </div>
      <div>
        <strong>Response:</strong>
        <pre className="whitespace-pre-wrap mt-2 bg-gray-800 p-2 rounded">
          {JSON.stringify(responses, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default StructuredTextOutput;
