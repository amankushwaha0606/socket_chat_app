import React from "react";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";

const MessageList = ({ messages, currentUserId }) => {
  const getAvatarUri = (seed) => {
    if (!seed) return null;
    return createAvatar(pixelArt, { seed, size: 32, radius: 6 }).toDataUri();
  };

  return (
    <div className="overflow-y-auto flex-1 h-full border mb-4 bg-gray-100 rounded flex flex-col gap-2 !p-4 items-start">
      {messages.map((msg) => {
        const isCurrentUser = msg.userId === currentUserId;
        const avatarUri = getAvatarUri(msg.userIcon);
        return (
          <div
            // key={idx}
            className={`flex items-center gap-2 mb-2 !p-2 rounded ${
              msg.isSystemMessage
                ? "bg-gray-300 text-gray-800 font-semibold"
                : isCurrentUser
                ? "bg-green-100 font-bold"
                : "bg-blue-100"
            }`}
          >
            {avatarUri ? (
              <img
                src={avatarUri}
                alt={msg.userNickname || "user avatar"}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-400 inline-block" />
            )}
            <div>
              <strong>{msg.userNickname || "-"}:</strong>{" "}
              <span>{msg.body}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
