import React, { useState, useEffect } from "react";
import axios from "axios";

const StructuredTextOutput = () => {
  const [mainPrompt, setMainPrompt] = useState("");
  const [responses, setResponses] = useState([]);

  const prompt = `Use the input "${mainPrompt}" and return structured JSON with this format:

{
  "recipeName": string,
  "ingredients": array<string>
}

Return: array of such objects.`;

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

  useEffect(() => {
    if (mainPrompt.trim()) {
      handlePromptSend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainPrompt]);

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">StructuredTextOutput</h2>
      <div className="mb-2">
        <input
          type="text"
          value={mainPrompt}
          autoComplete="on"
          autoCorrect="on"
          spellCheck={true}
          inputMode="text"
          onChange={(e) => setMainPrompt(e.target.value)}
          className="ml-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePromptSend();
            }
          }}
          placeholder="Ask something..."
        />
        <button
          onClick={() => setMainPrompt(mainPrompt.trim())}
          className="ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!mainPrompt.trim()}
        >
          Generate
        </button>
      </div>
      <div>
        <strong>Response:</strong>
        <div className="mt-4 space-y-4">
          {responses.map((recipe, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded">
              <h3 className="text-xl font-bold text-yellow-400">
                {recipe.recipeName}
              </h3>
              <ul className="list-disc ml-5 mt-2">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StructuredTextOutput;
