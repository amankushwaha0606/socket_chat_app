
# Socket Chat App

A real-time chat application with user presence and avatar support built using React and a custom WebSocket client (`TelepartyClient`).

---

## Demo

Live demo: [https://socket-chat-app-murex.vercel.app/](https://socket-chat-app-murex.vercel.app/)

---

## Features

- Create or join chat rooms by entering a nickname and a room ID.
- Select a user avatar from a set of generated DiceBear avatars.
- Real-time messaging powered by WebSocket.
- Typing indicator to show when others are typing.
- Shows user avatars next to messages to enhance chat experience.
- Responsive UI built with Tailwind CSS.

---

## Tech Stack

- React (with Hooks)
- Tailwind CSS for styling
- Custom WebSocket client: [`TelepartyClient`](https://github.com/watchparty-org/teleparty-websocket-lib)
- DiceBear Avatars (`@dicebear/core` and `@dicebear/collection`) for avatar generation
- Hosted on Vercel

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository**

```
git clone https://github.com/amankushwaha0606/socket_chat_app.git
cd socket_chat_app
```

2. **Install dependencies**

```
npm install
# or
yarn install
```

3. **Run the app locally**

```
npm start
# or
yarn start
```

The app will open at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
/src
  /components
    - AvatarSelector.jsx       # Avatar selection component using DiceBear
    - ChatRoom.jsx             # Main chat room with message list and input
    - CreateOrJoinRoom.jsx     # UI for entering nickname, choosing avatar and room
    - MessageInput.jsx         # Input box with debounce typing events
    - MessageList.jsx          # Displays messages with avatars
    - TypingIndicator.jsx      # Shows "Someone is typing..." indicator
  /utils
    /teleparty-websocket-lib
      - TelepartyClient.js     # WebSocket client implementation
      - SocketMessageTypes.js  # Message types constants
  - App.jsx
  - index.js
```

---

## Usage

- On load, enter your nickname.
- Select an avatar from the displayed choices.
- Create a new room or enter an existing room ID to join.
- Start chatting! Messages and typing status are broadcast in real-time.
- Your avatar and nickname will appear with your messages.

---

## Avatar System

- Uses [DiceBear Avatars](https://avatars.dicebear.com/) with the Pixel Art collection.
- Fixed set of 16 predefined avatar seeds.
- Avatars are generated dynamically on the client based on selected seed.
- User’s selected `avatarSeed` is sent with messages, enabling consistent avatar display.

---

## Typing Indicator

- When a user types, a typing presence event is sent with their `userId`.
- The UI only shows "Someone is typing..." if another user (not yourself) is typing.
- Debounced with a 1.2 second delay to minimize network spam.

---

## Deployment

The app is currently deployed on Vercel:

```
https://socket-chat-app-murex.vercel.app/
```

You can deploy your own copy by linking your repo on Vercel or another hosting platform.

---

## Troubleshooting

- If you see typing indicator while typing, ensure your client association between `userId` and typing events is correct.
- Make sure your WebSocket server supports user IDs and sends typing presence with user identification.
- To avoid Git issues, verify your repository URL and SSH credentials if pushing issues occur.

---

## License

This project is for demonstration purposes.

---

## Contact

For questions or feedback, feel free to reach out to Aman Kushwaha.

---

**Thank you for trying out my Socket Chat App!**
