import React, { useState, useEffect } from "react";
import axios from "axios";

const StructuredTextOutput = () => {
  const [mainPrompt, setMainPrompt] = useState("");
  const [responses, setResponses] = useState([]);

  const prompt = `Use the ${mainPrompt} as input and generate a structured output.
        Produce JSON matching this specification:

        Recipe = { "recipeName": string, "ingredients": array<string> }
        Return: array<Recipe>`;

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
      setMainPrompt("");
    }
  };

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">StructuredTextOutput</h2>
      <div className="mb-2">
        <input
          type="text"
          value={mainPrompt}
          onChange={(e) => setMainPrompt(e.target.value)}
          className="ml-2"
        />
        <button
          onClick={handlePromptSend}
          className="ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!mainPrompt.trim()}
        >
          Generate
        </button>
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
