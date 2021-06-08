import React from "react";
import "./Header.css";
import onlineIcon from "../../icons/online.png";
import closeIcon from "../../icons/close.png";

function Header({ room }) {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="" />
        <p>{room}</p>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img src={closeIcon} alt="close icon" />
        </a>
      </div>
    </div>
  );
}

export default Header;
