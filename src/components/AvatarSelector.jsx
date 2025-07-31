import React from "react";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";

// Unicode checkmark or you can use SVG or emojis for a nicer icon
const TickIcon = () => (
  <div
    style={{
      position: "absolute",
      top: 2,
      right: 2,
      backgroundColor: "white",
      borderRadius: "50%",
      width: 16,
      height: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 2px rgba(0,0,0,0.2)",
      color: "green",
      fontWeight: "bold",
      fontSize: 14,
      userSelect: "none",
    }}
  >
    ✓
  </div>
);

const avatarSeeds = [
  "alpha",
  "bravo",
  "charlie",
  "delta",
  "echo",
  "foxtrot",
  "golf",
  "hotel",
  "india",
  "juliet",
  "kilo",
  "lima",
  "mike",
  "november",
  "oscar",
  "papa",
];

const AvatarSelector = ({ selectedSeed, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center !p-4">
      {avatarSeeds.map((seed) => {
        const avatarSvg = createAvatar(pixelArt, {
          seed,
          size: 48,
          radius: 5,
        }).toDataUri();

        return (
          <div
            key={seed}
            onClick={() => onSelect(seed)}
            className="relative cursor-pointer"
            title={`Avatar ${seed}`}
            style={{ width: 48, height: 48 }}
          >
            <img
              src={avatarSvg}
              alt={`Avatar ${seed}`}
              className={`rounded-full border-4 ${
                selectedSeed === seed ? "border-blue-500" : "border-transparent"
              }`}
              width={48}
              height={48}
            />
            {selectedSeed === seed && <TickIcon />}
          </div>
        );
      })}
    </div>
  );
};

export default AvatarSelector;
