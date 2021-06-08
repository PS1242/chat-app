import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [nameRedOutline, setNameRedOutline] = useState("");
  const [roomRedOutline, setRoomRedOutline] = useState("");

  function handleSubmit(e) {
    if (!name) {
      setNameRedOutline("red-alert");
      e.preventDefault();
    }
    if (!room) {
      setRoomRedOutline("red-alert");
      e.preventDefault();
    }
  }

  return (
    <div className="container">
      <h2 className="join-heading">Join</h2>
      <input
        onFocus={() => setNameRedOutline("")}
        className={`name-input ${nameRedOutline}`}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        onFocus={() => setRoomRedOutline("")}
        className={`room-input ${roomRedOutline}`}
        type="text"
        placeholder="room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      ></input>
      <Link onClick={handleSubmit} to={`/chat?name=${name}&room=${room}`}>
        <button className="join-button" type="submit">
          SIGN IN
        </button>
      </Link>
    </div>
  );
}

export default Join;
