import React, { useEffect, useRef, useState } from "react";
import { TelepartyClient } from "../utils/teleparty-websocket-lib/TelepartyClient";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { SocketMessageTypes } from "../utils/teleparty-websocket-lib/SocketMessageTypes";

const ChatRoom = ({ roomId, nickname, avatarSeed, setRoomId }) => {
  const [messages, setMessages] = useState([]);
  const [anyoneTyping, setAnyoneTyping] = useState(false);
  const [userId, setUserId] = useState(null);
  const clientRef = useRef(null);

  useEffect(() => {
    if (!nickname || !avatarSeed) return;

    const eventHandler = {
      onConnectionReady: async () => {
        console.log("Socket connected. Joining room...");
        try {
          let effectiveRoomId = roomId;
          if (!effectiveRoomId) {
            effectiveRoomId = await client.createChatRoom(nickname, avatarSeed);
            setRoomId(effectiveRoomId);
          }
          const messageList = await clientRef.current.joinChatRoom(
            nickname,
            effectiveRoomId,
            avatarSeed
          );
          setMessages(messageList.messages || []);
        } catch (err) {
          console.error("Failed to join chat room:", err);
        }
      },

      onClose: () => {
        console.log("Socket connection closed");
      },

      onMessage: (socketMessage) => {
        switch (socketMessage.type) {
          case "userId":
            setUserId(socketMessage.data.userId);
            break;
          case SocketMessageTypes.SEND_MESSAGE:
            setMessages((prev) => [...prev, socketMessage.data]);
            break;
          case SocketMessageTypes.SET_TYPING_PRESENCE: {
            console.log("Typing presence:", socketMessage.data);
            const typingUserIds = socketMessage.data.usersTyping || [];
            if (typingUserIds.includes(userId)) {
              setAnyoneTyping(false);
            } else {
              setAnyoneTyping(socketMessage.data.anyoneTyping);
            }
            break;
          }
          default:
            console.warn("Unhandled message type:", socketMessage.type);
        }
      },
    };

    const client = new TelepartyClient(eventHandler);
    clientRef.current = client;

    return () => {
      client.teardown();
      clientRef.current = null;
    };
  }, [roomId, nickname, avatarSeed]);

  const sendMessage = (body) => {
    if (!body.trim()) return;

    clientRef.current.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
      body,
      userNickname: nickname,
      userIcon: avatarSeed,
      userId,
    });
  };

  const sendTyping = (isTyping) => {
    clientRef.current.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
      typing: isTyping,
    });
  };

  return (
    <div className="!p-4 mx-auto border rounded shadow bg-white w-full h-[100vh] overflow-hidden flex flex-col gap-2">
      <h2 className="text-xl font-bold mb-4 text-center">Room: {roomId}</h2>
      <div className="mt-3 text-gray-600 text-sm text-center">
        Nickname: <strong>{nickname}</strong> | Avatar:{" "}
        <strong>{avatarSeed}</strong>
      </div>
      <MessageList messages={messages} currentUserId={userId} />
      <TypingIndicator isTyping={anyoneTyping} />
      <MessageInput sendMessage={sendMessage} sendTyping={sendTyping} />
    </div>
  );
};

export default ChatRoom;
