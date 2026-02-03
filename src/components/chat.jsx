// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
// import { useSelector } from "react-redux";

// const Chat = () => {
//   const { toUserId } = useParams();
//   const [newMessage, setnewMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const user = useSelector((store) => store.user);
//   const userId = user?._id;
//   //   console.log(userId);
//   //   console.log(toUserId);
//   useEffect(() => {
//     if (!userId) return;
//     const socket = createSocketConnection();
//     socket.emit("joinChat", { firstName: user.firstName, userId, toUserId });

//     // socket.on("messageReceived", ({firstName, text}) => {
//     //   console.log(firstName + " : " + text);
//     // });
//     socket.on("messageReceived", ({ firstName, text }) => {
//       console.log(firstName + " :" + text);
//       setMessages((messages) => [...messages, { firstName, text }]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, toUserId]);

//   const sendMessage = () => {
//     const socket = createSocketConnection();
//     socket.emit("sendMessage", {
//       firstName: user.firstName,
//       userId,
//       toUserId,
//       text: newMessage,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#1F1B2E] px-4 py-8">
//       <div className="mx-auto max-w-5xl">
//         <div className="mb-6">
//           <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
//             Chat
//           </h1>
//           <p className="text-sm text-violet-200/80 mt-1">
//             Conversation with user:{" "}
//             <span className="font-semibold">{toUserId}</span>
//           </p>
//         </div>

//         <div className="grid grid-rows-[1fr_auto] rounded-3xl bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(124,58,237,0.35)] overflow-hidden">
//           {/* Messages */}
//           <div className="p-6 space-y-4 h-[60vh] overflow-y-auto">
//             <div className="flex items-start gap-3">
//               <div className="h-10 w-10 rounded-full bg-violet-200 text-violet-700 flex items-center justify-center font-bold">
//                 U
//               </div>
//               <div className="max-w-[70%]">
//                 <div className="text-xs text-gray-400">User</div>
//                 <div className="mt-1 rounded-2xl rounded-tl-sm bg-violet-50 px-4 py-3 text-gray-700">
//                   Hey! Great to connect here.
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-start gap-3 justify-end">
//               <div className="max-w-[70%] text-right">
//                 <div className="text-xs text-gray-400">You</div>
//                 <div className="mt-1 rounded-2xl rounded-tr-sm bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 text-white shadow">
//                   Hi! Looking forward to chatting.
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Composer */}
//           <div className="border-t border-violet-100 bg-white/90 p-4">
//             <div className="flex items-center gap-3">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setnewMessage(e.target.value)}
//                 placeholder="Type your message..."
//                 className="flex-1 rounded-2xl border border-violet-200 bg-white px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400"
//               />
//               <button
//                 onClick={sendMessage}
//                 className="rounded-2xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 transition"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Chat;

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const { toUserId } = useParams();
  const [newMessage, setnewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + toUserId, {
        withCredentials: true,
      });

      // console.log(chat.data.messages);

      if (chat?.data?.messages && chat.data.messages.length > 0) {
        setMessages(chat.data.messages);
      }
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { firstName: user.firstName, userId, toUserId });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((prev) => [...prev, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, toUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    // Add message to state immediately for UI feedback
    const newMsg = {
      senderId: {
        _id: userId,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      text: newMessage,
    };

    setMessages((prev) => [...prev, newMsg]);

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      toUserId,
      text: newMessage,
    });

    setnewMessage("");
  };

  return (
    <div className="min-h-screen bg-[#1F1B2E] px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-violet-400">Chat</h1>
          <p className="text-sm text-violet-200">
            Conversation with user: {toUserId}
          </p>
        </div>

        <div className="grid grid-rows-[1fr_auto] rounded-3xl bg-white shadow overflow-hidden">
          {/* Messages */}
          <div className="p-6 space-y-4 h-[60vh] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <p className="text-lg font-semibold">No messages yet</p>
                  <p className="text-sm mt-2">
                    Start a conversation by sending a message
                  </p>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.senderId?._id === userId
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="max-w-[70%]">
                    <div className="text-xs text-gray-400">
                      {msg.senderId?.firstName} {msg.senderId?.lastName}
                    </div>
                    <div
                      className={`mt-1 px-4 py-3 rounded-2xl ${
                        msg.senderId?._id === userId
                          ? "bg-violet-500 text-white"
                          : "bg-violet-200 text-violet-900"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-violet-100 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-sm p-5 flex gap-3 items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setnewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-white border-2 border-violet-200 rounded-2xl px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-300/50 transition-all duration-200 shadow-sm hover:border-violet-300"
            />
            <button
              onClick={sendMessage}
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold rounded-2xl hover:from-violet-600 hover:to-fuchsia-600 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
