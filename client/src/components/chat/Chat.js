import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";
import Header from "../header/Header";
import Input from "../input/Input";
import Messages from "../messages/Messages";
import "./Chat.css";

let socket;
const ENDPOINT = "localhost:5000";

function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  let history = useHistory();

  useEffect(() => {
    let isMounted = true;
    const { name, room } = queryString.parse(location.search);

    if (isMounted) {
      socket = io(ENDPOINT);
      setName(name);
      setRoom(room);

      socket.emit("join", { name, room }, (err) => {
        if (err) {
          alert(err);
          history.push("/");
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [location.search, history]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  function sendMessage(e) {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  }

  return (
    <div className="body-container">
      <div className="chat-container">
        <Header room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
