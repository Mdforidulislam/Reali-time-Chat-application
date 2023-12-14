import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Home = () => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Establish a WebSocket connection when the component mounts
    const newSocket = io('http://localhost:5000/');
    setSocket(newSocket);

    // Clean up the WebSocket connection when the component unmounts
    return () => newSocket.close();
  }, []);

  const handleForm = (event) => {
    event.preventDefault();
    const userInput = event.target.message.value;
    setMessage(userInput);

    // Emit the message to the server
    if (socket) {
      socket.emit('chatMessage', userInput);
    }
  };

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-6 py-6 border md:mt-32 rounded-lg ">
        <h1 className="text-center capitalize font-semibold">chat version 0001</h1>
        <div className="h-[50vh] mb-3">
          <h1>{message}</h1>
          <form className="flex items-end h-[50vh]" onSubmit={handleForm}>
            <input
              name="message"
              className="w-full border p-2 px-3 rounded-lg flex items-end"
              type="text"
              placeholder="write your message"
            />
            <button
              className="bg-slate-200 p-2 text-black ml-3 rounded-sm text-xl px-6"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
