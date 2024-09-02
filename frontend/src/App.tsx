import { useEffect, useState } from "react";

export function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3030/api/msg")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return <div className="app">
    <div className="chat">
      <div className="contact-info">contact</div>
      <div className="messages">messages</div>
      <div className="msg-input">msg-input</div>
    </div>
    <div className="chats">chats</div>
    <div className="aside">aside</div>
  </div>

}