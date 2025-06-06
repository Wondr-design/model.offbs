import React, { useEffect, useState } from "react";
import axios from "axios";

const Text = () => {
  const [text, setText] = useState([]);

  const prompt = `Note: Extract the event information from here:
  "Alice and Bob are going to a science fair on friday`;

  useEffect(() => {
    const handlePromptSend = async () => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/googleai/mainstructured`,
          {
            prompt,
          }
        );
        console.log(data);
        setText(data);
        console.log(text);
      } catch (error) {
        console.error("Error in chat:", error);
      }
    };
    handlePromptSend();
  }, []);

  useEffect(() => {
    console.log("Updated text:", text);
  }, [text]);

  return (
    <div>
      {text && text.length > 0 ? (
        text.map((item, index) => (
          <div key={index}>
            <h3>{item.eventName}</h3>
            <p>Date: {item.eventDate}</p>
            <p>Participants: {item.eventParticipants?.join(", ")}</p>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Text;
