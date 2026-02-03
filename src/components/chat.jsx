import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const { toUserId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch historical messages (MUST be enriched by backend - see notes below)
  const fetchChatMessages = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/chat/${toUserId}`, {
        withCredentials: true,
      });
      
      // Backend MUST return: 
      // messages: [{ _id, senderId: { _id, firstName, lastName }, text, createdAt }, ...]
      if (Array.isArray(response.data.messages)) {
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      // Optional: Show toast notification
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize socket connection
  useEffect(() => {
    if (!userId || !toUserId) return;

    // Cleanup previous socket if exists
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    const socket = createSocketConnection();
    socketRef.current = socket;

    // Join chat room
    socket.emit("joinChat", { 
      firstName: user.firstName, 
      lastName: user.lastName, 
      userId, 
      toUserId 
    });

    // Handle incoming messages (UNIFIED STRUCTURE)
    socket.on("messageReceived", (message) => {
      // message shape: { senderId: { _id, firstName, lastName }, text, createdAt }
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    });

    // Initial load
    fetchChatMessages();

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, toUserId]); // Reconnect when chat partner changes

  // Auto-scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message handler
  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current) return;
    
    // Emit to backend WITH lastName (critical!)
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName, // REQUIRED for backend emit
      userId,
      toUserId,
      text: newMessage.trim(),
    });
    
    setNewMessage("");
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Determine message alignment and sender label
  const getMessageDisplay = (msg) => {
    const isOwnMessage = msg.senderId?._id === userId;
    const senderName = isOwnMessage 
      ? "You" 
      : `${msg.senderId?.firstName || ''} ${msg.senderId?.lastName || ''}`.trim() || "User";
    
    return {
      alignment: isOwnMessage ? "justify-end" : "justify-start",
      bgColor: isOwnMessage ? "bg-violet-500 text-white" : "bg-violet-100 text-violet-900",
      senderName
    };
  };

  return (
    <div className="min-h-screen bg-[#1F1B2E] px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Chat
          </h1>
          <p className="text-sm text-violet-200/80 mt-1">
            Conversation with user: <span className="font-semibold">{toUserId}</span>
          </p>
        </div>

        <div className="grid grid-rows-[1fr_auto] rounded-3xl bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(124,58,237,0.35)] overflow-hidden border border-violet-200">
          {/* Messages Container */}
          <div className="p-6 space-y-4 h-[60vh] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <p className="text-lg font-semibold">No messages yet</p>
                  <p className="text-sm mt-2">Start a conversation by sending a message</p>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => {
                const { alignment, bgColor, senderName } = getMessageDisplay(msg);
                return (
                  <div key={msg._id || index} className={`flex ${alignment}`}>
                    <div className="max-w-[75%]">
                      <div className="text-xs text-gray-500 mb-1">{senderName}</div>
                      <div className={`px-4 py-3 rounded-2xl ${bgColor} shadow-sm`}>
                        {msg.text}
                      </div>
                      {msg.createdAt && (
                        <div className="text-[10px] text-gray-400 mt-1 text-right">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Composer */}
          <div className="border-t border-violet-200 bg-gradient-to-r from-white/95 to-violet-50/20 p-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (Enter to send)"
                className="flex-1 rounded-xl border border-violet-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
                disabled={!userId || !toUserId}
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim() || !userId || !toUserId}
                className="rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;