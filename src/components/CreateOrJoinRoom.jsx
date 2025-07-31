import React, { useState } from "react";
import AvatarSelector from "./AvatarSelector";

const CreateOrJoinRoom = ({
  setRoomId,
  setNickname,
  setAvatarSeed,
  selectedAvatarSeed,
}) => {
  const [inputName, setInputName] = useState("");
  const [inputRoom, setInputRoom] = useState("");

  const handleCreate = () => {
    if (!inputName.trim()) {
      alert("Please enter a nickname");
      return;
    }
    if (!selectedAvatarSeed) {
      alert("Please select an avatar");
      return;
    }
    setNickname(inputName);
  };

  const handleJoin = () => {
    if (!inputName.trim()) {
      alert("Please enter a nickname");
      return;
    }
    if (!selectedAvatarSeed) {
      alert("Please select an avatar");
      return;
    }
    setNickname(inputName);
    setRoomId(inputRoom?.trim());
  };

  return (
    <div className="bg-white rounded-lg shadow-md max-w-full !p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Welcome to Teleparty Chat
      </h1>
      <input
        type="text"
        placeholder="Enter your nickname"
        className="w-full !p-2 border rounded"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Select your avatar</label>
        <AvatarSelector
          selectedSeed={selectedAvatarSeed}
          onSelect={setAvatarSeed}
        />
      </div>
      <button
        onClick={handleCreate}
        className="w-full bg-blue-600 hover:bg-blue-700 !text-white p-2 rounded mb-3"
      >
        Create Room
      </button>
      <input
        type="text"
        placeholder="Enter Room ID to Join"
        className="w-full !p-2 border rounded"
        value={inputRoom}
        onChange={(e) => setInputRoom(e.target.value)}
      />
      <button
        onClick={handleJoin}
        className="w-full bg-green-600 hover:bg-green-700 !text-white p-2 rounded"
      >
        Join Room
      </button>
    </div>
  );
};

export default CreateOrJoinRoom;
