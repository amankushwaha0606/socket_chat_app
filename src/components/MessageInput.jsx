import React, { useState, useRef, useEffect, useCallback } from "react";

function useDebounce(fn, delay) {
  const timeoutRef = useRef();

  const debouncedFn = useCallback(
    (...args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return debouncedFn;
}

const MessageInput = ({ sendMessage, sendTyping }) => {
  const [input, setInput] = useState("");
  const typingRef = useRef(false);

  const debouncedStopTyping = useDebounce(() => {
    sendTyping(false);
    typingRef.current = false;
  }, 1000);

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    if (!typingRef.current) {
      sendTyping(true);
      typingRef.current = true;
    }
    debouncedStopTyping();
  };

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput("");
      if (typingRef.current) {
        sendTyping(false);
        typingRef.current = false;
      }
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 border rounded p-2"
        value={input}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
