import React from "react";
import "./Input.css";

function Input({ setMessage, sendMessage, message }) {
  return (
    <div className="typing-section">
      <div className="typing-div">
        <input
          className="typing-input"
          placeholder="type a message..."
          type="text"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
      </div>

      <button className="send-button" onClick={(e) => sendMessage(e)}>
        Send
      </button>
    </div>
    // <form className="form">
    //   <input
    //     className="input"
    //     type="text"
    //     placeholder="Type a message..."
    //     value={message}
    //     onChange={({ target: { value } }) => setMessage(value)}
    //     onKeyPress={(event) =>
    //       event.key === "Enter" ? sendMessage(event) : null
    //     }
    //   />
    //   <button className="sendButton" onClick={(e) => sendMessage(e)}>
    //     Send
    //   </button>
    // </form>
  );
}

export default Input;
