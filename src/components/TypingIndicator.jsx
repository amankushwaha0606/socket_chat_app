import React from "react";

const TypingIndicator = ({ isTyping }) => {
  console.log("Rendering TypingIndicator with isTyping:", isTyping);
  return isTyping ? (
    <div className="text-gray-500 mb-2">Someone is typing...</div>
  ) : null;
};

export default TypingIndicator;
