import React, { useState } from "react";
import CreateOrJoinRoom from "./components/CreateOrJoinRoom";
import ChatRoom from "./components/ChatRoom";

export default function App() {
  const [roomId, setRoomId] = useState(null);
  const [nickname, setNickname] = useState("");
  const [avatarSeed, setAvatarSeed] = useState("");

  return (
    <div className="min-h-screen w-[100vw] bg-gray-100 flex items-center justify-center p-4">
      {!nickname ? (
        <CreateOrJoinRoom
          setRoomId={setRoomId}
          setNickname={setNickname}
          setAvatarSeed={setAvatarSeed}
          selectedAvatarSeed={avatarSeed}
        />
      ) : (
        <ChatRoom
          roomId={roomId}
          nickname={nickname}
          avatarSeed={avatarSeed}
          setRoomId={setRoomId}
        />
      )}
    </div>
  );
}
